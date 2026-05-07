import { Truck, ShieldCheck, Award, Hammer, Wrench, Star } from "lucide-react";

const ITEMS = [
    { icon: Award, text: "Commercial Grade Build" },
    { icon: ShieldCheck, text: "Heavy-Duty Steel" },
    { icon: Truck, text: "Pan-India Delivery" },
    { icon: Hammer, text: "Discovery Series" },
    { icon: Star, text: "Trusted by 500+ Gyms" },
    { icon: Wrench, text: "Installation & Service" },
];

const FULL = [...ITEMS, ...ITEMS]; // duplicate for seamless loop

export const TickerStrip = () => (
    <div
        data-testid="ticker-strip"
        className="relative bg-[var(--hs-red)] overflow-hidden border-y border-black/30"
    >
        {/* Sub-stripes */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-black/40" />
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-black/40" />

        <div className="marquee-track flex items-center gap-12 py-4 whitespace-nowrap text-white font-bold uppercase tracking-[0.25em] text-xs">
            {FULL.map((it, i) => {
                const Icon = it.icon;
                return (
                    <div
                        key={i}
                        className="flex items-center gap-3 flex-shrink-0"
                    >
                        <Icon className="w-4 h-4" strokeWidth={2.2} />
                        <span>{it.text}</span>
                        <span className="w-1 h-1 rounded-full bg-white/60" />
                    </div>
                );
            })}
        </div>
    </div>
);

export default TickerStrip;
