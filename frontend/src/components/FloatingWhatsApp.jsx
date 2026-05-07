import { waLink } from "../lib/constants";
import { WhatsappIcon } from "./WhatsappIcon";

export const FloatingWhatsApp = () => (
    <a
        data-testid="floating-whatsapp"
        href={waLink()}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[var(--hs-whatsapp)] hover:bg-[var(--hs-whatsapp-hover)] text-black flex items-center justify-center whatsapp-pulse transition-all shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)]"
        aria-label="WhatsApp us"
    >
        <WhatsappIcon className="w-7 h-7 md:w-8 md:h-8" />
    </a>
);

export default FloatingWhatsApp;
