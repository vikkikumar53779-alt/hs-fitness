// Premium WhatsApp icon — official brand silhouette with crisp curves
export const WhatsappIcon = ({ className = "w-5 h-5", ...rest }) => (
    <svg
        viewBox="0 0 32 32"
        fill="currentColor"
        className={className}
        aria-hidden="true"
        {...rest}
    >
        <path d="M19.11 17.53c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.34.44-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.51-.07-.15-.66-1.6-.91-2.18-.24-.58-.48-.5-.66-.51h-.57c-.2 0-.51.07-.78.37-.27.3-1.03 1-1.03 2.45 0 1.44 1.05 2.83 1.2 3.03.15.2 2.07 3.16 5.02 4.43.7.3 1.25.48 1.68.62.71.22 1.35.19 1.86.12.57-.08 1.75-.71 2-1.39.25-.68.25-1.26.17-1.39-.07-.13-.27-.2-.57-.35zM16.03 5.33C10.03 5.33 5.2 10.16 5.2 16.15c0 1.91.5 3.79 1.44 5.44L5.07 27.2l5.82-1.52a10.8 10.8 0 0 0 5.14 1.3h.01c5.99 0 10.83-4.83 10.83-10.83 0-2.89-1.12-5.61-3.18-7.66a10.78 10.78 0 0 0-7.66-3.17zm0 19.84h-.01a9 9 0 0 1-4.58-1.26l-.33-.2-3.46.9.93-3.37-.21-.35a8.97 8.97 0 0 1-1.38-4.8c0-4.98 4.05-9.02 9.04-9.02 2.41 0 4.68.94 6.38 2.65a9 9 0 0 1 2.64 6.38c0 4.98-4.05 9.02-9.02 9.02z" />
    </svg>
);

// Premium WhatsApp BUTTON wrapper — glossy gradient, white icon ring, tight tracking
export const WhatsappButton = ({
    href,
    children,
    size = "md",
    className = "",
    testId,
    ...rest
}) => {
    const sizeMap = {
        sm: "px-4 py-2.5 text-[10px]",
        md: "px-6 py-3.5 text-[11px]",
        lg: "px-8 py-4 text-xs",
    };
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            data-testid={testId}
            className={`group relative inline-flex items-center gap-3 rounded-full font-bold uppercase tracking-[0.18em] text-white overflow-hidden transition-all duration-300 ${sizeMap[size]} ${className}`}
            style={{
                background:
                    "linear-gradient(135deg, #25D366 0%, #1EBE5D 50%, #128C7E 100%)",
                boxShadow:
                    "0 6px 22px -6px rgba(37,211,102,0.55), inset 0 1px 0 rgba(255,255,255,0.25)",
            }}
            {...rest}
        >
            {/* Shimmer sweep on hover */}
            <span
                className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
                style={{
                    background:
                        "linear-gradient(120deg, transparent 35%, rgba(255,255,255,0.35) 50%, transparent 65%)",
                }}
            />
            {/* Icon disc */}
            <span className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full bg-white text-[#128C7E] shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
                <WhatsappIcon className="w-4 h-4" />
            </span>
            <span className="relative z-10">{children}</span>
        </a>
    );
};

export default WhatsappIcon;
