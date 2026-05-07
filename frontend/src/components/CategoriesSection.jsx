import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, waLink } from "../lib/constants";

export const CategoriesSection = () => {
    return (
        <section
            id="categories"
            data-testid="categories-section"
            className="relative py-24 md:py-32 bg-[#0A0A0A] overflow-hidden"
        >
            {/* Decorative red ribbon */}
            <div className="absolute -left-20 top-10 rotate-[-8deg] overflow-hidden w-[150%] opacity-10 pointer-events-none">
                <div className="whitespace-nowrap font-display uppercase text-[12vw] leading-none text-[var(--hs-red)]">
                    Strength · Cardio · Machines · Plates · Strength · Cardio
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                        <span className="section-kicker">Categories</span>
                        <h2
                            data-testid="categories-heading"
                            className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl text-white mt-4 leading-[0.95]"
                        >
                            Find Your{" "}
                            <span className="text-[var(--hs-red)]">Arena</span>
                        </h2>
                    </div>
                    <p className="max-w-md text-sm text-neutral-400 leading-relaxed">
                        From heart-pounding cardio to raw iron — we build the
                        full spectrum of commercial fitness.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {CATEGORIES.map((cat) => (
                        <a
                            key={cat.name}
                            data-testid={`category-${cat.name.toLowerCase()}`}
                            href={waLink(
                                `Hi HS Fitness, I want to know more about your ${cat.name} range.`
                            )}
                            target="_blank"
                            rel="noreferrer"
                            className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-[#121212] border border-white/5 hover:border-[var(--hs-red)]/60 transition-all"
                        >
                            <img
                                src={cat.image}
                                alt={cat.name}
                                loading="lazy"
                                className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                            <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                <ArrowUpRight className="self-end w-6 h-6 text-white/70 group-hover:text-[var(--hs-red)] group-hover:rotate-12 transition-all" />
                                <div>
                                    <div className="font-display uppercase text-3xl md:text-4xl text-white leading-none">
                                        {cat.name}
                                    </div>
                                    <div className="mt-2 text-xs text-neutral-300 leading-relaxed">
                                        {cat.description}
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;
