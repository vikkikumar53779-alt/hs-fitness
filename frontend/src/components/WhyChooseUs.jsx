import { ShieldCheck, Hammer, Dumbbell, Truck } from "lucide-react";
import { WHY_US } from "../lib/constants";

const ICONS = { ShieldCheck, Hammer, Dumbbell, Truck };

export const WhyChooseUs = () => {
    return (
        <section
            id="why"
            data-testid="why-section"
            className="relative py-24 md:py-32 bg-[#070707] border-y border-white/5 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mb-14 text-center max-w-2xl mx-auto">
                    <span className="section-kicker">Why HS Fitness</span>
                    <h2 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl text-white mt-4 leading-[0.95]">
                        Forged For{" "}
                        <span className="text-[var(--hs-red)]">Champions</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {WHY_US.map((item, i) => {
                        const Icon = ICONS[item.icon] || ShieldCheck;
                        return (
                            <div
                                key={item.title}
                                data-testid={`why-card-${i}`}
                                className="group relative p-8 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-xl backdrop-blur-sm hover:border-[var(--hs-red)]/50 hover:-translate-y-1 transition-all duration-500"
                            >
                                <div className="w-14 h-14 rounded-md bg-[var(--hs-red)]/10 border border-[var(--hs-red)]/30 flex items-center justify-center text-[var(--hs-red)] group-hover:bg-[var(--hs-red)] group-hover:text-white transition-all">
                                    <Icon className="w-7 h-7" strokeWidth={1.6} />
                                </div>
                                <h3 className="mt-6 font-display uppercase text-xl text-white">
                                    {item.title}
                                </h3>
                                <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                                    {item.text}
                                </p>
                                <div className="absolute top-6 right-6 font-display text-4xl text-white/5 group-hover:text-[var(--hs-red)]/15 transition-colors">
                                    0{i + 1}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
