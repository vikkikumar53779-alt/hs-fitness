import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { publicApi } from "../lib/api";
import { BRAND, waLink } from "../lib/constants";
import { WhatsappIcon } from "./WhatsappIcon";

export const GallerySection = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        publicApi
            .getGallery()
            .then((data) => {
                setImages(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <section
            id="gallery"
            data-testid="gallery-section"
            className="relative py-24 md:py-32 bg-black"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
                    <div>
                        <span className="section-kicker">Gallery</span>
                        <h2
                            data-testid="gallery-heading"
                            className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl text-white mt-4 leading-[0.95]"
                        >
                            Iron In{" "}
                            <span className="text-[var(--hs-red)]">Motion</span>
                        </h2>
                    </div>
                    <p className="max-w-md text-sm text-neutral-400 leading-relaxed">
                        A curated look at the HS FITNESS commercial line. Tap
                        any piece to enquire on WhatsApp.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="aspect-[4/5] bg-white/5 animate-pulse rounded-xl"
                            />
                        ))}
                    </div>
                ) : (
                    <div
                        data-testid="gallery-grid"
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
                    >
                        {images.map((img, idx) => (
                            <GalleryCard
                                key={img.id}
                                img={img}
                                featured={idx === 0}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

const GalleryCard = ({ img, featured }) => {
    const message = `Hi HS Fitness, I am interested in your product: ${img.name}`;
    return (
        <div
            data-testid={`gallery-card-${img.id}`}
            className={`group relative overflow-hidden rounded-xl bg-[#f3efe6] ${
                featured ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-[4/5]"
            }`}
        >
            <img
                src={img.image_url}
                alt={img.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[800ms]"
            />
            {/* Always-visible gradient bottom for product name */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                <div className="min-w-0">
                    <div className="text-[10px] tracking-[0.25em] uppercase text-[var(--hs-red)] font-bold">
                        HS Fitness
                    </div>
                    <div className="mt-1 font-display uppercase text-white text-lg md:text-xl leading-tight truncate">
                        {img.name}
                    </div>
                </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-[3px] flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--hs-red)] font-bold">
                    Enquire Now
                </div>
                <div className="font-display uppercase text-white text-xl md:text-2xl leading-tight">
                    {img.name}
                </div>
                <a
                    href={`tel:${BRAND.phoneIntl}`}
                    className="inline-flex items-center gap-2 text-white text-sm font-semibold"
                >
                    <Phone className="w-4 h-4 text-[var(--hs-red)]" />
                    {BRAND.phone}
                </a>
                <a
                    data-testid={`gallery-whatsapp-${img.id}`}
                    href={waLink(message)}
                    target="_blank"
                    rel="noreferrer"
                    className="wa-btn group relative w-16 h-16 rounded-full inline-flex items-center justify-center text-white overflow-hidden transition-transform duration-500 hover:scale-110"
                    aria-label="WhatsApp enquiry"
                >
                    <span className="wa-glow" aria-hidden="true" />
                    <span className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#128C7E] transition-transform duration-500 group-hover:rotate-[12deg]">
                        <WhatsappIcon className="w-7 h-7" />
                    </span>
                </a>
            </div>
        </div>
    );
};

export default GallerySection;
