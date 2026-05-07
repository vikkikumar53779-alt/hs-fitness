import { CheckCircle2 } from "lucide-react";

// Brand list — main agent will update logo_url when client uploads brand logos.
// Until then, premium typographic cards are shown.
const BRANDS = [
    { name: "Life Fitness", note: "Authorized Dealer" },
    { name: "Technogym", note: "Trusted Partner" },
    { name: "Precor", note: "Authorized Dealer" },
    { name: "Matrix", note: "Trusted Partner" },
    { name: "Hammer Strength", note: "Authorized Dealer" },
    { name: "Body Solid", note: "Trusted Partner" },
];

export const BrandsSection = () => (
    <section
        id="brands"
        data-testid="brands-section"
        className="relative py-24 md:py-32 bg-[#0A0A0A] overflow-hidden"
    >
        {/* Subtle red ambient glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-[0.06] blur-3xl bg-[var(--hs-red)]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="section-kicker">Trusted Network</span>
                <h2
                    data-testid="brands-heading"
                    className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl text-white mt-4 leading-[0.95]"
                >
                    Brands We{" "}
                    <span className="text-[var(--hs-red)]">Deal In</span>
                </h2>
                <p className="mt-5 text-sm md:text-base text-neutral-400 leading-relaxed">
                    Proudly authorized partner & supplier of the world&rsquo;s
                    leading commercial fitness brands.
                </p>
            </div>

            <div
                data-testid="brands-grid"
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5"
            >
                {BRANDS.map((b, i) => (
                    <BrandCard key={b.name} brand={b} index={i} />
                ))}
            </div>

            <div className="mt-12 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--hs-red)]" />
                100% Genuine · Industry Certified · Pan-India Service
            </div>
        </div>
    </section>
);

const BrandCard = ({ brand, index }) => (
    <div
        data-testid={`brand-card-${index}`}
        className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-white border border-white/10 hover:border-[var(--hs-red)]/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_-10px_rgba(220,31,38,0.45)] cursor-default"
    >
        {/* Default state: subtle grayscale tint over white */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200 group-hover:from-white group-hover:to-white transition-all duration-500" />

        {/* Optional: brand logo would replace this — for now bold text */}
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
            {brand.logo_url ? (
                <img
                    src={brand.logo_url}
                    alt={brand.name}
                    className="max-h-16 max-w-[80%] object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                />
            ) : (
                <div className="font-display uppercase text-xl md:text-2xl text-neutral-500 group-hover:text-black transition-colors duration-500 tracking-wide leading-tight">
                    {brand.name}
                </div>
            )}
            <div className="mt-2 text-[9px] uppercase tracking-[0.25em] text-neutral-400 group-hover:text-[var(--hs-red)] transition-colors duration-500 font-bold">
                {brand.note}
            </div>
        </div>

        {/* Red corner accent on hover */}
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[28px] border-l-[28px] border-t-[var(--hs-red)] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
);

export default BrandsSection;
