import React from "react";
import { Check, Sparkles } from "lucide-react";

interface PlanCardProps {
  title: string;
  description: string;
  price: string;
  priceSuffix: string;
  buttonText: string;
  isFeatured: boolean;
  features: { name: string }[];
  urlSale: string;
  isPromo?: boolean;
  originalPrice?: string;
  promoLabel?: string;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  title,
  description,
  price,
  priceSuffix,
  buttonText,
  isFeatured,
  features,
  urlSale,
  isPromo = false,
  originalPrice,
  promoLabel,
}) => {
  return (
    <div
      className={`relative flex flex-col rounded-2xl p-6 transition-all duration-300 h-full
      ${
        isFeatured
          ? "bg-zinc-900 border-2 border-primary shadow-2xl shadow-primary/20"
          : "bg-zinc-800"
      }
      ${isPromo ? "ring-1 ring-primary/50" : ""}`}
    >
      {isPromo && (
        <div className="absolute -top-3 right-4 z-10">
          <span
            className="inline-flex items-center gap-1 bg-primary
                       text-white text-[10px] font-bold uppercase tracking-[0.2em]
                       px-3 py-1.5 rounded-full shadow-lg shadow-primary/40"
          >
            <Sparkles className="w-3 h-3" />
            Oferta
          </span>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-2xl font-bold font-display text-white tracking-wide mb-2">
          {title}
        </h3>
        <p className="text-sm text-zinc-400">{description}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline flex-wrap gap-x-2">
          <span className="text-5xl font-bold text-white font-display">
            {price}
          </span>
          <span className="text-lg font-medium text-zinc-400">
            {priceSuffix}
          </span>
          {isPromo && originalPrice && (
            <span
              className="text-lg font-medium text-zinc-500 line-through decoration-primary/70 decoration-2"
              aria-label={`Preço original ${originalPrice}`}
            >
              {originalPrice}
            </span>
          )}
        </div>
        {isPromo && promoLabel && (
          <span className="mt-2 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
            {promoLabel}
          </span>
        )}
      </div>

      <div className="flex-grow space-y-3 mb-8 border-t border-zinc-700 pt-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Check className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="font-medium text-zinc-300 text-sm">{feature.name}</span>
          </div>
        ))}
      </div>

      <a
        href={urlSale}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full text-center py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-all duration-300
          ${
            isFeatured
              ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30"
              : "bg-zinc-700 text-zinc-200 hover:bg-zinc-600"
          }`}
      >
        {buttonText}
      </a>
    </div>
  );
};
