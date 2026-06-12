import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Reduz spam de refetch em foco; planos não mudam de minuto em minuto.
      refetchOnWindowFocus: false,
      // Considera dados frescos por 5 minutos.
      staleTime: 5 * 60 * 1000,
      // Retry com backoff em caso de erro transitório.
      retry: 1,
    },
  },
});

// Configuração ----------------------------------------------------------

// Em dev passa pelo proxy do vite.config.ts; em prod pelo proxy do nginx.conf.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api-evo/api/v2";
const API_AUTH_TOKEN = import.meta.env.VITE_API_AUTH_TOKEN;

if (!API_AUTH_TOKEN) {
  // Aviso em dev pra detectar config faltando antes de virar 401 silencioso.
  console.warn(
    "[api] VITE_API_AUTH_TOKEN não definido — chamadas à EVO vão falhar com 401.",
  );
}

const REQUEST_TIMEOUT_MS = 15_000;

// Tipos -----------------------------------------------------------------

export interface PlanDifferential {
  title: string;
  order: number;
}

export interface SalesPageEntry {
  idSalesPage: number;
  order: number;
  salesPageDescription: string;
}

export interface MembershipEntries {
  entriesQuantity: number;
  idEntriesType: number;
  entriesTypeDescription: string;
}

export interface MembershipPlan {
  idMembership: number;
  idBranch: number;
  nameMembership: string;
  membershipType: string;
  durationType: string;
  duration: number;
  updateDate: string;
  value: number;
  maxAmountInstallments: number | null;
  description: string;
  urlSale: string;
  onlineSalesObservations: string | null;
  differentials: PlanDifferential[];
  // Campos cuja estrutura completa não é usada no front — manter como unknown
  // força quem for consumir a fazer narrowing antes de acessar.
  accessBranches: unknown;
  additionalService: unknown;
  serviceYearly: unknown;
  typePromotionalPeriod: number;
  valuePromotionalPeriod: number;
  monthsPromotionalPeriod: number;
  daysPromotionalPeriod: number;
  minPeriodStayMembership: unknown;
  installmentsPromotionalPeriod: unknown;
  activitiesGroups: unknown;
  inactive: boolean;
  displayName: string | null;
  entries: MembershipEntries;
  salesPage: SalesPageEntry[];
  allowsCancellationByApp: boolean;
  externalSaleAvailable: boolean;
  acceptEnrollment: boolean;
  enrollmentRequired: boolean;
}

interface ApiResponse {
  qtde: number;
  lista: unknown;
  list: MembershipPlan[];
  ids: unknown;
  informacoesIndicados: unknown;
  idUltimaConciliacao: unknown;
}

// Helpers ---------------------------------------------------------------

/**
 * Erro com contexto útil pra debug (status HTTP + corpo da resposta).
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Wrapper de fetch com timeout via AbortController.
 */
async function fetchWithTimeout(
  url: string,
  init: RequestInit = {},
  timeoutMs = REQUEST_TIMEOUT_MS,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

// Endpoints --------------------------------------------------------------

export async function fetchPlans(): Promise<MembershipPlan[]> {
  const url = `${API_BASE_URL}/membership?take=25&skip=0&showAccessBranches=false&showOnlineSalesObservation=false&showActivitiesGroups=false&externalSaleAvailable=false`;

  const response = await fetchWithTimeout(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Basic ${API_AUTH_TOKEN}`,
    },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new ApiError(
      `Falha ao carregar planos (HTTP ${response.status})`,
      response.status,
      body,
    );
  }

  const data = (await response.json()) as ApiResponse;

  if (!Array.isArray(data?.list)) {
    throw new ApiError(
      "Resposta da API em formato inesperado: campo 'list' ausente",
      200,
    );
  }

  // Filtra: planos ativos, com URL de venda, e que não sejam variantes "Day"
  // (passe diário não faz parte do funil principal de matrícula).
  return data.list.filter(
    (plan) =>
      !plan.inactive &&
      Boolean(plan.urlSale) &&
      !plan.nameMembership.toLowerCase().includes("day"),
  );
}
