import { waLink } from "../lib/constants";
import { WhatsappIcon } from "./WhatsappIcon";

export const FloatingWhatsApp = () => (
    <a
        data-testid="floating-whatsapp"
        href={waLink()}
        target="_blank"
        rel="noreferrer"
        className="group fixed bottom-6 right-6 z-40 inline-flex items-center gap-3 pl-2 pr-5 py-2 rounded-full text-white font-bold text-xs uppercase tracking-[0.18em] whatsapp-pulse transition-all"
        style={{
            background:
                "linear-gradient(135deg, #25D366 0%, #1EBE5D 50%, #128C7E 100%)",
            boxShadow:
                "0 12px 35px -8px rgba(37,211,102,0.6), inset 0 1px 0 rgba(255,255,255,0.25)",
        }}
        aria-label="WhatsApp us"
    >
        <span className="flex items-center justify-center w-11 h-11 rounded-full bg-white text-[#128C7E] shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
            <WhatsappIcon className="w-6 h-6" />
        </span>
        <span className="hidden md:inline-flex flex-col items-start leading-tight">
            <span className="text-[9px] tracking-[0.25em] opacity-80">Chat on</span>
            <span className="text-sm tracking-wider">WhatsApp</span>
        </span>
    </a>
);

export default FloatingWhatsApp;
