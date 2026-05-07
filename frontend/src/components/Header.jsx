import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BRAND, NAV_LINKS, waLink } from "../lib/constants";
import { WhatsappIcon, WhatsappButton } from "./WhatsappIcon";

const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 72;
        window.scrollTo({ top: y, behavior: "smooth" });
    }
};

export const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", onScroll);
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleNav = (id) => {
        setOpen(false);
        scrollToId(id);
    };

    return (
        <header
            data-testid="site-header"
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "backdrop-blur-xl bg-black/80 border-b border-white/10 py-3"
                    : "bg-transparent py-5"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between gap-6">
                <button
                    data-testid="logo-home-btn"
                    onClick={() => handleNav("home")}
                    className="flex items-center gap-3 group"
                >
                    <img
                        src={BRAND.logoUrl}
                        alt={`${BRAND.name} logo`}
                        className="h-10 md:h-12 w-auto object-contain drop-shadow-[0_0_12px_rgba(220,31,38,0.35)] bg-white/95 rounded px-2 py-1"
                    />
                    <span className="sr-only">HS Fitness</span>
                </button>

                <nav className="hidden lg:flex items-center gap-9" data-testid="desktop-nav">
                    {NAV_LINKS.map((link) => (
                        <button
                            key={link.id}
                            data-testid={`nav-${link.id}`}
                            onClick={() => handleNav(link.id)}
                            className="text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-300 hover:text-white relative transition-colors group"
                        >
                            {link.label}
                            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[var(--hs-red)] transition-all group-hover:w-full" />
                        </button>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <a
                        data-testid="header-whatsapp-btn"
                        href={waLink()}
                        target="_blank"
                        rel="noreferrer"
                        className="hidden sm:inline-flex items-center gap-2 bg-[var(--hs-whatsapp)] hover:bg-[var(--hs-whatsapp-hover)] text-black font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-full transition-all shadow-[0_0_0_0_rgba(37,211,102,0)] hover:shadow-[0_0_22px_rgba(37,211,102,0.4)]"
                    >
                        <WhatsappIcon className="w-4 h-4" />
                        <span>WhatsApp</span>
                    </a>

                    <button
                        data-testid="mobile-menu-btn"
                        onClick={() => setOpen((v) => !v)}
                        className="lg:hidden text-white p-2 -mr-2"
                        aria-label="Toggle menu"
                    >
                        {open ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {/* Mobile drawer */}
            {open && (
                <div
                    data-testid="mobile-menu"
                    className="lg:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl"
                >
                    <div className="px-6 py-6 flex flex-col gap-4">
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.id}
                                data-testid={`mobile-nav-${link.id}`}
                                onClick={() => handleNav(link.id)}
                                className="text-left text-sm font-bold uppercase tracking-[0.22em] text-neutral-200 py-2 border-b border-white/5"
                            >
                                {link.label}
                            </button>
                        ))}
                        <a
                            data-testid="mobile-whatsapp-btn"
                            href={waLink()}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-flex items-center justify-center gap-3 text-white font-bold text-xs uppercase tracking-[0.18em] px-5 py-3 rounded-full"
                            style={{
                                background:
                                    "linear-gradient(135deg, #25D366 0%, #1EBE5D 50%, #128C7E 100%)",
                                boxShadow:
                                    "0 6px 22px -6px rgba(37,211,102,0.55)",
                            }}
                        >
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-[#128C7E]">
                                <WhatsappIcon className="w-3.5 h-3.5" />
                            </span>
                            WhatsApp Enquiry
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
