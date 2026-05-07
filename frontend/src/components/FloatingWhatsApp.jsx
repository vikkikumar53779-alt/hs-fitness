import { waLink } from "../lib/constants";
import { WhatsappIcon } from "./WhatsappIcon";

export const FloatingWhatsApp = () => (
    <a
        data-testid="floating-whatsapp"
        href={waLink()}
        target="_blank"
        rel="noreferrer"
        className="wa-btn group fixed bottom-6 right-6 z-40 inline-flex items-center gap-3 pl-2 pr-5 py-2 rounded-full text-white font-bold text-xs uppercase tracking-[0.18em] overflow-hidden whatsapp-pulse transition-all duration-500 hover:-translate-y-1"
        aria-label="WhatsApp us"
    >
        <span className="wa-glow" aria-hidden="true" />
        <span className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#128C7E] shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:rotate-[14deg] group-hover:scale-110">
            <WhatsappIcon className="w-7 h-7" />
        </span>
        <span className="relative z-10 hidden md:inline-flex flex-col items-start leading-tight">
            <span className="text-[9px] tracking-[0.25em] opacity-85">Chat on</span>
            <span className="text-sm tracking-wider">WhatsApp</span>
        </span>
    </a>
);

export default FloatingWhatsApp;
