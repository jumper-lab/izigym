import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPlans, type MembershipPlan } from "@/services/api";
import { PlanCard } from "./PlanCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal } from "@/components/Reveal";

// Helpers de formatação ---------------------------------------------------

/**
 * Formata valor em BRL.
 * - Inteiro: "R$ 167" (sem centavos, mais limpo visualmente)
 * - Com centavos: "R$ 0,99" / "R$ 89,90" (sempre 2 casas)
 *
 * O comportamento antigo usava Math.trunc, que descartava centavos e
 * fazia promoções tipo R$ 0,99 aparecerem como "R$ 0".
 */
const formatBRL = (value: number) => {
  if (value % 1 === 0) {
    return `R$ ${Math.trunc(value)}`;
  }
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/**
 * Decide se um plano está em promoção e calcula os campos derivados
 * (preço efetivo, preço original riscado, label de duração).
 *
 * Critério: API EVO retorna valuePromotionalPeriod > 0 quando o plano
 * tem preço promocional ativo.
 */
function getPlanPricing(plan: MembershipPlan) {
  const hasPromo =
    typeof plan.valuePromotionalPeriod === "number" &&
    plan.valuePromotionalPeriod > 0 &&
    plan.valuePromotionalPeriod < plan.value;

  if (!hasPromo) {
    return {
      isPromo: false as const,
      price: formatBRL(plan.value),
      originalPrice: undefined,
      promoLabel: undefined,
    };
  }

  let promoLabel: string | undefined;
  if (plan.monthsPromotionalPeriod && plan.monthsPromotionalPeriod > 0) {
    promoLabel =
      plan.monthsPromotionalPeriod === 1
        ? "1 mês promocional"
        : `${plan.monthsPromotionalPeriod} meses promocionais`;
  } else if (plan.daysPromotionalPeriod && plan.daysPromotionalPeriod > 0) {
    promoLabel =
      plan.daysPromotionalPeriod === 1
        ? "1 dia promocional"
        : `${plan.daysPromotionalPeriod} dias promocionais`;
  }

  return {
    isPromo: true as const,
    price: formatBRL(plan.valuePromotionalPeriod),
    originalPrice: formatBRL(plan.value),
    promoLabel,
  };
}

// -------------------------------------------------------------------------

export const PlanosSection = () => {
  const { data: plans, isLoading, isError } = useQuery({
    queryKey: ["plans"],
    queryFn: fetchPlans,
  });

  if (isError) {
    return (
      <section className="scroll-mt-16 py-20 px-5 sm:px-6 bg-section-gray" id="planos">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Erro ao carregar os planos.
          </h2>
          <p className="text-zinc-300">
            Por favor, tente novamente mais tarde.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="scroll-mt-16 py-14 px-5 sm:px-6 lg:py-20 bg-section-gray lg:min-h-screen lg:flex lg:items-center" id="planos">
      <div className="max-w-7xl mx-auto w-full space-y-8 lg:space-y-10">
        <Reveal className="max-w-3xl text-center mx-auto">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] sm:tracking-[0.3em] text-zinc-400 mb-4 block">
            Nossos Planos
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 leading-tight text-white">
            Seu caminho para
            <br />
            estar bem.
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Sua jornada de bem-estar, mais simples do que você imagina: um plano
            completo, duas opções de pagamento e uma rotina de treinos com tudo
            o que você precisa para alcançar seus objetivos.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-stretch max-w-6xl mx-auto">
          {isLoading ? (
            <>
              <Skeleton className="h-[450px] rounded-2xl bg-zinc-800" />
              <Skeleton className="h-[450px] rounded-2xl bg-zinc-800" />
            </>
          ) : (
            plans?.map((plan, index) => {
              const pricing = getPlanPricing(plan);
              return (
                <Reveal key={plan.idMembership} delay={index * 120} className="h-full">
                  <PlanCard
                    title={plan.nameMembership}
                    description={plan.description}
                    price={pricing.price}
                    priceSuffix="/mês"
                    buttonText="Matricule-se Agora"
                    isFeatured={plan.nameMembership.toLowerCase().includes("prime")}
                    features={plan.differentials.map((d) => ({ name: d.title }))}
                    urlSale={plan.urlSale}
                    isPromo={pricing.isPromo}
                    originalPrice={pricing.originalPrice}
                    promoLabel={pricing.promoLabel}
                  />
                </Reveal>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
