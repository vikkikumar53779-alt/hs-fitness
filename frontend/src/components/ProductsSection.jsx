import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { publicApi } from "../lib/api";
import { BRAND, waLink } from "../lib/constants";
import { WhatsappIcon, WhatsappButton } from "./WhatsappIcon";

const TAG_STYLES = {
    "Best Seller": "bg-[var(--hs-red)] text-white",
    Premium: "bg-white text-black",
    "Top Rated": "bg-yellow-400 text-black",
};

export const ProductsSection = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        publicApi
            .getProducts()
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <section
            id="shop"
            data-testid="products-section"
            className="relative py-24 md:py-32 bg-[var(--hs-bg)]"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
                    <div>
                        <span className="section-kicker">Our Equipment</span>
                        <h2
                            data-testid="products-heading"
                            className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl text-white mt-4 leading-[0.95]"
                        >
                            Built For The{" "}
                            <span className="text-[var(--hs-red)]">Strong</span>.
                        </h2>
                    </div>
                    <p className="max-w-md text-sm text-neutral-400 leading-relaxed">
                        Explore our hand-picked commercial line. Every machine is
                        engineered for iron-clad durability and biomechanical
                        perfection.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="h-96 bg-white/5 animate-pulse rounded-xl"
                            />
                        ))}
                    </div>
                ) : (
                    <div
                        data-testid="products-grid"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {products.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

const ProductCard = ({ product }) => {
    const message = `Hi HS Fitness, I am interested in your product: ${product.name}`;
    return (
        <article
            data-testid={`product-card-${product.id}`}
            className="group relative flex flex-col bg-[#121212] border border-white/5 rounded-xl overflow-hidden transition-all duration-500 hover:border-[var(--hs-red)]/60 hover:shadow-[0_15px_45px_-10px_rgba(220,31,38,0.35)] hover:-translate-y-1"
        >
            {/* Tag */}
            <span
                className={`absolute top-4 left-4 z-10 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm backdrop-blur-md ${
                    TAG_STYLES[product.tag] || "bg-white text-black"
                }`}
            >
                {product.tag}
            </span>

            {/* Image */}
            <div className="relative aspect-square bg-[#f3efe6] overflow-hidden">
                <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                />
                {/* Red corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[48px] border-l-[48px] border-t-[var(--hs-red)] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col p-6">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[var(--hs-red)] font-bold">
                    {product.category}
                </div>
                <h3 className="mt-2 font-display uppercase text-2xl text-white leading-tight">
                    {product.name}
                </h3>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed line-clamp-2">
                    {product.description}
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <a
                        data-testid={`product-contact-${product.id}`}
                        href={`tel:${BRAND.phoneIntl}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-[var(--hs-red)] hover:bg-[var(--hs-red-hover)] text-white font-bold uppercase tracking-widest text-[10px] px-4 py-3 transition-all"
                    >
                        <Phone className="w-4 h-4" />
                        Contact for Price
                    </a>
                    <WhatsappButton
                        href={waLink(message)}
                        size="sm"
                        testId={`product-whatsapp-${product.id}`}
                        className="flex-1 justify-center"
                    >
                        WhatsApp
                    </WhatsappButton>
                </div>
            </div>
        </article>
    );
};

export default ProductsSection;
