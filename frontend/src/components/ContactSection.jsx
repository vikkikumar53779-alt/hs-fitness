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
                                className="wa-btn group flex-1 relative inline-flex items-center justify-center gap-3 rounded-full font-bold uppercase tracking-[0.18em] text-xs text-white px-6 py-4 overflow-hidden transition-all duration-500 hover:-translate-y-0.5"
                            >
                                <span className="wa-glow" aria-hidden="true" />
                                <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#128C7E] shadow-[0_2px_6px_rgba(0,0,0,0.25)] transition-transform duration-500 group-hover:rotate-[12deg] group-hover:scale-110">
                                    <svg viewBox="0 0 448 512" fill="currentColor" className="w-4 h-4">
                                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                                    </svg>
                                </span>
                                <span className="relative z-10">Chat on WhatsApp</span>
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
