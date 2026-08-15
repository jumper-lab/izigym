import type { IncomingMessage, ServerResponse } from "node:http";

const EVO_MEMBERSHIP_URL =
  "https://evo-integracao-api.w12app.com.br/api/v2/membership";
const EVO_API_AUTH_TOKEN =
  process.env.EVO_API_AUTH_TOKEN ?? process.env.VITE_API_AUTH_TOKEN;
const CURRENT_CHECKOUT_URL =
  "https://vendas.online.sistemapacto.com.br/planos?un=1&k=6e2660773cc378e250e6a8731d6830e5";
const REQUEST_TIMEOUT_MS = 10_000;

const fallbackPlans = [
  {
    idMembership: 5,
    idBranch: 1,
    nameMembership: "Izi One",
    membershipType: "recurring",
    durationType: "month",
    duration: 1,
    updateDate: new Date(0).toISOString(),
    value: 167,
    maxAmountInstallments: null,
    description: "Plano essencial para treinar na unidade de matrícula.",
    urlSale: CURRENT_CHECKOUT_URL,
    onlineSalesObservations: null,
    differentials: [
      { title: "Musculação", order: 1 },
      { title: "Cardio", order: 2 },
      { title: "Aulas coletivas", order: 3 },
      { title: "Sem permanência mínima", order: 4 },
    ],
    accessBranches: null,
    additionalService: null,
    serviceYearly: null,
    typePromotionalPeriod: 0,
    valuePromotionalPeriod: 0,
    monthsPromotionalPeriod: 0,
    daysPromotionalPeriod: 0,
    minPeriodStayMembership: null,
    installmentsPromotionalPeriod: null,
    activitiesGroups: null,
    inactive: false,
    displayName: null,
    entries: {
      entriesQuantity: 0,
      idEntriesType: 0,
      entriesTypeDescription: "",
    },
    salesPage: [],
    allowsCancellationByApp: false,
    externalSaleAvailable: true,
    acceptEnrollment: true,
    enrollmentRequired: true,
  },
  {
    idMembership: 6,
    idBranch: 1,
    nameMembership: "Izi Prime",
    membershipType: "recurring",
    durationType: "month",
    duration: 12,
    updateDate: new Date(0).toISOString(),
    value: 187,
    maxAmountInstallments: null,
    description: "Plano completo com benefícios exclusivos IZI Prime.",
    urlSale: CURRENT_CHECKOUT_URL,
    onlineSalesObservations: null,
    differentials: [
      { title: "Acesso a qualquer unidade", order: 1 },
      { title: "Izi Cycle", order: 2 },
      { title: "Bioimpedância", order: 3 },
      { title: "Izi Relax", order: 4 },
      { title: "5 convidados por mês", order: 5 },
    ],
    accessBranches: null,
    additionalService: null,
    serviceYearly: null,
    typePromotionalPeriod: 1,
    valuePromotionalPeriod: 8,
    monthsPromotionalPeriod: 1,
    daysPromotionalPeriod: 0,
    minPeriodStayMembership: null,
    installmentsPromotionalPeriod: null,
    activitiesGroups: null,
    inactive: false,
    displayName: null,
    entries: {
      entriesQuantity: 0,
      idEntriesType: 0,
      entriesTypeDescription: "",
    },
    salesPage: [],
    allowsCancellationByApp: false,
    externalSaleAvailable: true,
    acceptEnrollment: true,
    enrollmentRequired: true,
  },
];

function sendJson(
  response: ServerResponse,
  statusCode: number,
  body: unknown,
  source: "evo" | "fallback",
) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=3600");
  response.setHeader("X-Plan-Source", source);
  response.end(JSON.stringify(body));
}

function sendFallback(response: ServerResponse, reason: string) {
  console.warn("[api/membership] using fallback plans", { reason });
  sendJson(
    response,
    200,
    {
      qtde: fallbackPlans.length,
      lista: null,
      list: fallbackPlans,
      ids: null,
      informacoesIndicados: null,
      idUltimaConciliacao: null,
    },
    "fallback",
  );
}

export default async function handler(
  request: IncomingMessage,
  response: ServerResponse,
) {
  if (request.method !== "GET") {
    response.statusCode = 405;
    response.setHeader("Allow", "GET");
    response.end("Method Not Allowed");
    return;
  }

  if (!EVO_API_AUTH_TOKEN) {
    sendFallback(response, "missing-token");
    return;
  }

  const requestUrl = new URL(request.url ?? "/api/membership", "https://izigym.com.br");
  const targetUrl = new URL(EVO_MEMBERSHIP_URL);
  requestUrl.searchParams.forEach((value, key) => {
    targetUrl.searchParams.set(key, value);
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const evoResponse = await fetch(targetUrl, {
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${EVO_API_AUTH_TOKEN}`,
      },
      signal: controller.signal,
    });

    if (!evoResponse.ok) {
      sendFallback(response, `evo-http-${evoResponse.status}`);
      return;
    }

    const data = await evoResponse.json();

    if (!Array.isArray(data?.list)) {
      sendFallback(response, "invalid-evo-payload");
      return;
    }

    sendJson(response, 200, data, "evo");
  } catch (error) {
    sendFallback(response, error instanceof Error ? error.message : "unknown-error");
  } finally {
    clearTimeout(timeout);
  }
}
