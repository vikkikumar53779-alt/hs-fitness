import { ArrowRight } from "lucide-react";
import { BRAND, waLink } from "../lib/constants";
import { WhatsappButton } from "./WhatsappIcon";

const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 72;
        window.scrollTo({ top: y, behavior: "smooth" });
    }
};

export const Hero = () => {
    return (
        <section
            id="home"
            data-testid="hero-section"
            className="relative min-h-[100vh] flex items-center overflow-hidden"
        >
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={BRAND.heroImage}
                    alt="Cinematic gym interior"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            </div>

            {/* Subtle large logo watermark — bottom-right */}
            <img
                src={BRAND.logoUrl}
                alt=""
                aria-hidden="true"
                className="hidden lg:block absolute bottom-12 right-12 w-[420px] opacity-[0.08] blur-[0.5px] mix-blend-screen pointer-events-none z-[1] select-none"
            />

            {/* Red accent blade */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-56 bg-[var(--hs-red)] shadow-[0_0_30px_rgba(220,31,38,0.6)] z-10" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 pb-20">
                <div className="max-w-3xl">
                    <div className="fade-up inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.4em] text-[var(--hs-red)] mb-6">
                        <span className="w-10 h-[2px] bg-[var(--hs-red)]" />
                        Since Delhi · Since Day One
                    </div>

                    <h1
                        data-testid="hero-heading"
                        className="font-display uppercase text-5xl sm:text-6xl md:text-7xl lg:text-[96px] leading-[0.9] text-white fade-up fade-up-delay-1"
                    >
                        Strong Equipment,
                        <br />
                        <span className="text-[var(--hs-red)]">Stronger</span>{" "}
                        You.
                    </h1>

                    <p
                        data-testid="hero-subheading"
                        className="mt-8 max-w-xl text-base sm:text-lg text-neutral-300 leading-relaxed fade-up fade-up-delay-2"
                    >
                        {BRAND.tagline}. Commercial-grade builds engineered in
                        India for gyms that demand nothing less than legendary.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 fade-up fade-up-delay-3">
                        <button
                            data-testid="hero-explore-btn"
                            onClick={() => scrollToId("shop")}
                            className="group inline-flex items-center justify-center gap-3 bg-[var(--hs-red)] hover:bg-[var(--hs-red-hover)] text-white font-bold uppercase tracking-[0.18em] text-xs px-8 py-4 rounded-none transition-all hover:shadow-[0_0_30px_rgba(220,31,38,0.45)]"
                        >
                            Explore Products
                            <ArrowRight
                                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                            />
                        </button>

                        <WhatsappButton
                            href={waLink()}
                            size="lg"
                            testId="hero-whatsapp-btn"
                        >
                            WhatsApp Enquiry
                        </WhatsappButton>
                    </div>

                    {/* Stat strip */}
                    <div className="mt-16 grid grid-cols-3 gap-6 max-w-xl fade-up fade-up-delay-3">
                        <Stat label="Commercial Gyms" value="500+" />
                        <Stat label="Product Lines" value="40+" />
                        <Stat label="Cities Served" value="50+" />
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-neutral-500 text-[10px] tracking-[0.4em] uppercase z-10 hidden md:flex flex-col items-center gap-2">
                <span>Scroll</span>
                <span className="w-[1px] h-10 bg-gradient-to-b from-[var(--hs-red)] to-transparent" />
            </div>
        </section>
    );
};

const Stat = ({ label, value }) => (
    <div className="border-l border-white/10 pl-4">
        <div className="font-display text-3xl md:text-4xl text-white">
            {value}
        </div>
        <div className="mt-1 text-[10px] tracking-[0.25em] uppercase text-neutral-400">
            {label}
        </div>
    </div>
);

export default Hero;
