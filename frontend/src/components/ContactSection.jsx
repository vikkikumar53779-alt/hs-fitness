import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { BRAND, waLink } from "../lib/constants";
import { publicApi } from "../lib/api";
import { WhatsappButton } from "./WhatsappIcon";

export const ContactSection = () => {
    const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
            toast.error("Please fill Name, Phone and Message.");
            return;
        }
        setLoading(true);
        try {
            await publicApi.submitContact(form);
            setDone(true);
            toast.success("Message sent! Opening WhatsApp…");

            // Auto-open WhatsApp with pre-filled details
            const text = `Hi HS Fitness, I am ${form.name} (${form.phone}).\n${form.message}`;
            setTimeout(() => {
                window.open(waLink(text), "_blank");
            }, 600);

            setForm({ name: "", phone: "", email: "", message: "" });
        } catch (err) {
            toast.error("Something went wrong. Please WhatsApp us directly.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="contact"
            data-testid="contact-section"
            className="relative py-24 md:py-32 bg-black"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mb-14">
                    <span className="section-kicker">Get In Touch</span>
                    <h2
                        data-testid="contact-heading"
                        className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl text-white mt-4 leading-[0.95]"
                    >
                        Let&rsquo;s Build Your{" "}
                        <span className="text-[var(--hs-red)]">Gym</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Form */}
                    <form
                        data-testid="contact-form"
                        onSubmit={onSubmit}
                        className="relative p-8 md:p-10 bg-[#0f0f0f] border border-white/10 rounded-xl backdrop-blur-xl"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Field
                                name="name"
                                label="Your Name"
                                value={form.name}
                                onChange={onChange}
                                required
                                testId="form-name"
                            />
                            <Field
                                name="phone"
                                label="Phone"
                                type="tel"
                                value={form.phone}
                                onChange={onChange}
                                required
                                testId="form-phone"
                            />
                        </div>
                        <div className="mt-5">
                            <Field
                                name="email"
                                label="Email (optional)"
                                type="email"
                                value={form.email}
                                onChange={onChange}
                                testId="form-email"
                            />
                        </div>
                        <div className="mt-5">
                            <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold mb-2">
                                Your Message
                            </label>
                            <textarea
                                data-testid="form-message"
                                name="message"
                                value={form.message}
                                onChange={onChange}
                                rows={5}
                                required
                                placeholder="Tell us about your requirement…"
                                className="w-full bg-black border border-white/10 focus:border-[var(--hs-red)] outline-none rounded-md px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition-colors"
                            />
                        </div>

                        <div className="mt-6 flex flex-col sm:flex-row gap-4">
                            <button
                                data-testid="form-submit-btn"
                                type="submit"
                                disabled={loading}
                                className="flex-1 inline-flex items-center justify-center gap-2 bg-[var(--hs-red)] hover:bg-[var(--hs-red-hover)] disabled:opacity-60 text-white font-bold uppercase tracking-[0.18em] text-xs px-6 py-4 transition-all"
                            >
                                {done ? (
                                    <>
                                        <CheckCircle2 className="w-4 h-4" /> Sent
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        {loading ? "Sending…" : "Send Enquiry"}
                                    </>
                                )}
                            </button>
                            <a
                                data-testid="contact-whatsapp-btn"
                                href={waLink()}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 group relative inline-flex items-center justify-center gap-3 rounded-full font-bold uppercase tracking-[0.18em] text-xs text-white px-6 py-4 overflow-hidden transition-all duration-300"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #25D366 0%, #1EBE5D 50%, #128C7E 100%)",
                                    boxShadow:
                                        "0 8px 28px -8px rgba(37,211,102,0.55), inset 0 1px 0 rgba(255,255,255,0.25)",
                                }}
                            >
                                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white text-[#128C7E]">
                                    <svg viewBox="0 0 32 32" fill="currentColor" className="w-4 h-4">
                                        <path d="M19.11 17.53c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.34.44-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.51-.07-.15-.66-1.6-.91-2.18-.24-.58-.48-.5-.66-.51h-.57c-.2 0-.51.07-.78.37-.27.3-1.03 1-1.03 2.45 0 1.44 1.05 2.83 1.2 3.03.15.2 2.07 3.16 5.02 4.43.7.3 1.25.48 1.68.62.71.22 1.35.19 1.86.12.57-.08 1.75-.71 2-1.39.25-.68.25-1.26.17-1.39-.07-.13-.27-.2-.57-.35zM16.03 5.33C10.03 5.33 5.2 10.16 5.2 16.15c0 1.91.5 3.79 1.44 5.44L5.07 27.2l5.82-1.52a10.8 10.8 0 0 0 5.14 1.3h.01c5.99 0 10.83-4.83 10.83-10.83 0-2.89-1.12-5.61-3.18-7.66a10.78 10.78 0 0 0-7.66-3.17zm0 19.84h-.01a9 9 0 0 1-4.58-1.26l-.33-.2-3.46.9.93-3.37-.21-.35a8.97 8.97 0 0 1-1.38-4.8c0-4.98 4.05-9.02 9.04-9.02 2.41 0 4.68.94 6.38 2.65a9 9 0 0 1 2.64 6.38c0 4.98-4.05 9.02-9.02 9.02z" />
                                    </svg>
                                </span>
                                Chat on WhatsApp
                            </a>
                        </div>
                    </form>

                    {/* Right: Info + Map */}
                    <div className="flex flex-col gap-6">
                        <div className="p-6 md:p-8 bg-[#0f0f0f] border border-white/10 rounded-xl">
                            <div className="space-y-5">
                                <InfoLine
                                    icon={<MapPin className="w-5 h-5" />}
                                    title="Visit Us"
                                    text={BRAND.address}
                                />
                                <InfoLine
                                    icon={<Phone className="w-5 h-5" />}
                                    title="Call"
                                    text={BRAND.phone}
                                    href={`tel:${BRAND.phoneIntl}`}
                                />
                                <InfoLine
                                    icon={<Mail className="w-5 h-5" />}
                                    title="Email"
                                    text={BRAND.email}
                                    href={`mailto:${BRAND.email}`}
                                />
                            </div>
                        </div>

                        <div className="relative h-72 md:flex-1 overflow-hidden rounded-xl border border-white/10">
                            <iframe
                                data-testid="google-map"
                                title="HS Fitness location"
                                src="https://www.google.com/maps?q=52+DTC+Colony+Priyadarshini+Vihar+Kalyan+Vihar+New+Delhi+110009&output=embed"
                                className="absolute inset-0 w-full h-full grayscale contrast-125"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Field = ({ label, name, value, onChange, type = "text", required, testId }) => (
    <div>
        <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold mb-2">
            {label}
        </label>
        <input
            data-testid={testId}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full bg-black border border-white/10 focus:border-[var(--hs-red)] outline-none rounded-md px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition-colors"
        />
    </div>
);

const InfoLine = ({ icon, title, text, href }) => {
    const body = (
        <div className="flex gap-4 items-start">
            <div className="w-10 h-10 flex-shrink-0 rounded bg-[var(--hs-red)]/10 border border-[var(--hs-red)]/30 text-[var(--hs-red)] flex items-center justify-center">
                {icon}
            </div>
            <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold">
                    {title}
                </div>
                <div className="mt-1 text-white text-sm md:text-base">
                    {text}
                </div>
            </div>
        </div>
    );
    if (href) {
        return (
            <a href={href} className="block hover:opacity-80 transition-opacity">
                {body}
            </a>
        );
    }
    return body;
};

export default ContactSection;
