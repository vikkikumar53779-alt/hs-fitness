import { Quote, Star } from "lucide-react";
import { REVIEWS } from "../lib/constants";

export const Reviews = () => {
    return (
        <section
            id="reviews"
            data-testid="reviews-section"
            className="relative py-24 md:py-32 bg-[#0A0A0A]"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                        <span className="section-kicker">Client Reviews</span>
                        <h2
                            data-testid="reviews-heading"
                            className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl text-white mt-4 leading-[0.95]"
                        >
                            Trusted By{" "}
                            <span className="text-[var(--hs-red)]">Gyms</span>
                        </h2>
                    </div>
                    <p className="max-w-md text-sm text-neutral-400 leading-relaxed">
                        Real words from gym owners and industry pros who
                        demanded the best.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {REVIEWS.map((r, i) => (
                        <div
                            key={i}
                            data-testid={`review-card-${i}`}
                            className="relative p-8 md:p-10 border border-white/10 rounded-xl bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-sm hover:border-[var(--hs-red)]/40 transition-all"
                        >
                            <Quote className="absolute top-6 right-6 w-10 h-10 text-[var(--hs-red)]/30" />
                            <div className="flex gap-1 mb-5">
                                {[...Array(5)].map((_, s) => (
                                    <Star
                                        key={s}
                                        className="w-4 h-4 fill-[var(--hs-red)] text-[var(--hs-red)]"
                                    />
                                ))}
                            </div>
                            <p className="text-lg md:text-xl text-white font-display uppercase leading-snug">
                                &ldquo;{r.quote}&rdquo;
                            </p>
                            <div className="mt-6 pt-5 border-t border-white/10">
                                <div className="text-white font-bold text-sm uppercase tracking-wider">
                                    {r.name}
                                </div>
                                <div className="text-xs text-neutral-400 mt-1">
                                    {r.location}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
