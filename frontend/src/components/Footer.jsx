import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { BRAND, NAV_LINKS, waLink } from "../lib/constants";
import { WhatsappIcon } from "./WhatsappIcon";

const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 72;
        window.scrollTo({ top: y, behavior: "smooth" });
    }
};

export const Footer = () => {
    return (
        <footer
            data-testid="site-footer"
            className="relative bg-[#050505] border-t border-white/5 pt-20 pb-10"
        >
            {/* Red top line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[var(--hs-red)] to-transparent" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <img
                            src={BRAND.logoUrl}
                            alt="HS Fitness"
                            className="h-12 bg-white/95 px-3 py-2 rounded inline-block object-contain"
                        />
                        <p className="mt-6 text-sm text-neutral-400 max-w-md leading-relaxed">
                            {BRAND.tagline}. Engineered in Delhi for gyms that
                            demand commercial-grade strength and enduring
                            quality.
                        </p>

                        <div className="mt-6 flex items-center gap-3">
                            <a
                                href={BRAND.instagramUrl}
                                target="_blank"
                                rel="noreferrer"
                                data-testid="footer-instagram"
                                aria-label="Instagram"
                                className="group relative w-10 h-10 rounded-full overflow-hidden text-white flex items-center justify-center transition-transform duration-500 hover:scale-110"
                                style={{
                                    background:
                                        "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                                    boxShadow:
                                        "0 4px 14px -4px rgba(220,39,67,0.6)",
                                }}
                            >
                                <Instagram className="w-4 h-4 relative z-10" />
                            </a>
                            <a
                                href="#"
                                data-testid="footer-facebook"
                                aria-label="Facebook"
                                className="w-10 h-10 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-[var(--hs-red)] hover:bg-[var(--hs-red)]/10 flex items-center justify-center transition-all"
                            >
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                data-testid="footer-youtube"
                                aria-label="YouTube"
                                className="w-10 h-10 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-[var(--hs-red)] hover:bg-[var(--hs-red)]/10 flex items-center justify-center transition-all"
                            >
                                <Youtube className="w-4 h-4" />
                            </a>
                            <a
                                href={waLink()}
                                target="_blank"
                                rel="noreferrer"
                                data-testid="footer-whatsapp"
                                className="wa-btn group relative w-10 h-10 rounded-full text-white flex items-center justify-center overflow-hidden transition-transform duration-500 hover:scale-110"
                            >
                                <span className="wa-glow" aria-hidden="true" />
                                <span className="relative z-10 flex items-center justify-center">
                                    <WhatsappIcon className="w-4 h-4" />
                                </span>
                            </a>
                        </div>

                        <div className="mt-5 text-xs text-neutral-500">
                            Instagram:{" "}
                            <a
                                href={BRAND.instagramUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[var(--hs-red)] font-bold tracking-wider hover:underline"
                            >
                                @{BRAND.instagram}
                            </a>
                        </div>
                    </div>

                    {/* Quick links */}
                    <div>
                        <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--hs-red)] font-bold">
                            Navigate
                        </div>
                        <ul className="mt-5 space-y-3">
                            {NAV_LINKS.map((l) => (
                                <li key={l.id}>
                                    <button
                                        onClick={() => scrollToId(l.id)}
                                        className="text-sm text-neutral-300 hover:text-[var(--hs-red)] transition-colors uppercase tracking-wide"
                                    >
                                        {l.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--hs-red)] font-bold">
                            Reach Out
                        </div>
                        <ul className="mt-5 space-y-4 text-sm text-neutral-300">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 mt-0.5 text-[var(--hs-red)] flex-shrink-0" />
                                <span>{BRAND.address}</span>
                            </li>
                            {BRAND.phones.map((p) => (
                                <li
                                    key={p.tel}
                                    className="flex items-center gap-3"
                                >
                                    <Phone className="w-4 h-4 text-[var(--hs-red)] flex-shrink-0" />
                                    <a
                                        href={`tel:${p.tel}`}
                                        className="hover:text-[var(--hs-red)] transition-colors"
                                    >
                                        {p.label}
                                    </a>
                                </li>
                            ))}
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-[var(--hs-red)] flex-shrink-0" />
                                <a
                                    href={`mailto:${BRAND.email}`}
                                    className="hover:text-[var(--hs-red)] transition-colors break-all"
                                >
                                    {BRAND.email}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-14 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
                    <div>
                        © {new Date().getFullYear()} HS FITNESS™. All rights
                        reserved.
                    </div>
                    <div className="uppercase tracking-[0.25em]">
                        Strong Equipment · Stronger You
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
