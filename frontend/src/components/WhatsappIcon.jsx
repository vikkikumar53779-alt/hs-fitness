// Official WhatsApp brand icon (current 2024 mark) with crisp curves
export const WhatsappIcon = ({ className = "w-5 h-5", ...rest }) => (
    <svg
        viewBox="0 0 448 512"
        fill="currentColor"
        className={className}
        aria-hidden="true"
        {...rest}
    >
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
);

// Premium WhatsApp BUTTON wrapper with breathing glow + shimmer
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
    const iconSize = {
        sm: "w-6 h-6",
        md: "w-7 h-7",
        lg: "w-8 h-8",
    };
    const iconInner = {
        sm: "w-3.5 h-3.5",
        md: "w-4 h-4",
        lg: "w-[18px] h-[18px]",
    };
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            data-testid={testId}
            className={`wa-btn group relative inline-flex items-center gap-3 rounded-full font-bold uppercase tracking-[0.18em] text-white overflow-hidden transition-all duration-500 hover:-translate-y-0.5 ${sizeMap[size]} ${className}`}
            {...rest}
        >
            {/* Breathing glow halo */}
            <span className="wa-glow pointer-events-none" aria-hidden="true" />
            {/* Shimmer sweep on hover */}
            <span
                className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
                style={{
                    background:
                        "linear-gradient(120deg, transparent 35%, rgba(255,255,255,0.4) 50%, transparent 65%)",
                }}
            />
            {/* Icon disc */}
            <span
                className={`relative z-10 flex items-center justify-center ${iconSize[size]} rounded-full bg-white text-[#128C7E] shadow-[0_2px_6px_rgba(0,0,0,0.25)] transition-transform duration-500 group-hover:rotate-[12deg] group-hover:scale-110`}
            >
                <WhatsappIcon className={iconInner[size]} />
            </span>
            <span className="relative z-10">{children}</span>
        </a>
    );
};

export default WhatsappIcon;
