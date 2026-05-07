import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { BRAND, waLink } from "../lib/constants";
import { publicApi } from "../lib/api";
import { WhatsappIcon } from "./WhatsappIcon";

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
                                className="flex-1 inline-flex items-center justify-center gap-2 bg-[var(--hs-whatsapp)] hover:bg-[var(--hs-whatsapp-hover)] text-black font-bold uppercase tracking-[0.18em] text-xs px-6 py-4 rounded-full transition-all"
                            >
                                <WhatsappIcon className="w-5 h-5" />
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
