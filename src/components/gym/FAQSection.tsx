import React from "react";
import { Plus, Minus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Quais são as formas de pagamento e vigência dos planos?",
    answer: "Nossos planos são individuais, no formato de assinatura com cobrança recorrente em cartão de crédito/débito, ou pagamento à vista via boleto. As mensalidades têm vigência de 30 dias a partir da data da compra e sua assinatura permanece ativa até a solicitação de cancelamento.",
  },
  {
    question: "Qual a diferença entre os planos Izi One e Izi Prime?",
    answer: "O Izi One é focado na unidade de matrícula (musculação e estúdio) e não possui permanência mínima. O Izi Prime permite treinar em qualquer unidade, inclui Izi Cycle, Bioimpedância, cadeira de massagem, 5 convidados por mês e possui fidelidade de 12 meses.",
  },
  {
    question: "Como funciona o processo de cancelamento?",
    answer: "O cancelamento deve ser solicitado pessoalmente na recepção para assinatura do termo. Planos com fidelidade (como o Izi Prime) têm multa de 20% sobre as mensalidades restantes se cancelados antes do prazo. Planos promocionais exigem permanência mínima de 4 meses para manter o benefício.",
  },
  {
    question: "Posso trancar minha matrícula?",
    answer: "O trancamento é permitido apenas por razões médicas, mediante apresentação de atestado no início da licença. O procedimento não é retroativo.",
  },
  {
    question: "A academia tem estacionamento?",
    answer: "Sim, oferecemos estacionamento no condomínio com isenção de 2 horas para clientes. Após esse período, a tabela do administrador local é aplicada.",
  },
  {
    question: "Como funcionam os armários e vestiários?",
    answer: "Disponibilizamos armários rotativos (traga seu cadeado) para uso durante o treino. Itens deixados após o treino são doados. Nossos vestiários são completos e possuem duchas aquecidas.",
  },
  {
    question: "A academia possui acessibilidade?",
    answer: "Sim, nossas unidades contam com elevadores que garantem acesso desde o estacionamento até as áreas de treino.",
  },
  {
    question: "O que é o Izi Relax?",
    answer: "É um espaço exclusivo para clientes Izi Prime com cadeiras de massagem programadas para sessões de 5 minutos.",
  },
  {
    question: "Posso treinar um dia para experimentar?",
    answer: "Não trabalhamos com free pass. Clientes Izi Prime podem levar um convidado até 5 vezes por mês. O registro deve ser feito antecipadamente via app ou recepção, e o convidado deve estar acompanhado do titular.",
  },
  {
    question: "Quais são os horários de funcionamento?",
    answer: "Segunda a sexta: 05:00 às 23:00. Sábados e domingos: 08:00 às 20:00. Consulte o horário de feriados em nossas redes sociais.",
  },
  {
    question: "Quais são os preços dos planos?",
    answer: "Izi One: R$ 167,00. Izi Prime: R$ 187,00.",
  },
];

const FaqColumn = ({ items }: { items: typeof faqItems }) => (
  <Accordion type="single" collapsible className="w-full">
    {items.map((item, index) => (
      <AccordionItem
        key={index}
        value={`item-${index}`}
        className="border-b border-zinc-700 py-4"
      >
        <AccordionTrigger className="text-md font-medium text-left text-white hover:no-underline group">
          <span className="flex-1 pr-4">{item.question}</span>
          <Plus className="h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-data-[state=open]:hidden" />
          <Minus className="h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-data-[state=closed]:hidden" />
        </AccordionTrigger>
        <AccordionContent className="text-zinc-400 text-base pt-4 pr-8">
          {item.answer}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export const FAQSection = () => {
  const half = Math.ceil(faqItems.length / 2);
  const firstHalf = faqItems.slice(0, half);
  const secondHalf = faqItems.slice(half);

  return (
    <section className="py-24 px-6 bg-section-gray" id="faq">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-4 block">
            Perguntas Frequentes
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display leading-tight text-white">
            Tudo o que você precisa saber.
          </h2>
          <p className="text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed mt-4">
            Ainda tem dúvidas? Encontre aqui as respostas para as perguntas mais comuns sobre nossos planos, estrutura e funcionamento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          <FaqColumn items={firstHalf} />
          <FaqColumn items={secondHalf} />
        </div>
      </div>
    </section>
  );
};