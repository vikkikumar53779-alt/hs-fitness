import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogIn } from "lucide-react";
import { adminApi } from "../lib/api";
import { BRAND } from "../lib/constants";

export default function AdminLogin() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await adminApi.login(form.email, form.password);
            localStorage.setItem("hs_admin_token", data.token);
            localStorage.setItem("hs_admin_email", data.email);
            toast.success("Welcome back, admin.");
            navigate("/admin");
        } catch (err) {
            toast.error(err?.response?.data?.detail || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--hs-bg)] text-white flex items-center justify-center p-6">
            <form
                data-testid="admin-login-form"
                onSubmit={onSubmit}
                className="w-full max-w-md bg-[#0f0f0f] border border-white/10 rounded-xl p-10 backdrop-blur-xl"
            >
                <img
                    src={BRAND.logoUrl}
                    alt="HS Fitness"
                    className="h-12 bg-white/95 px-3 py-2 rounded inline-block object-contain"
                />
                <h1 className="mt-6 font-display uppercase text-3xl">
                    Admin <span className="text-[var(--hs-red)]">Access</span>
                </h1>
                <p className="mt-2 text-sm text-neutral-400">
                    Sign in to manage products, gallery and enquiries.
                </p>

                <div className="mt-8 space-y-5">
                    <div>
                        <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold mb-2">
                            Email
                        </label>
                        <input
                            data-testid="login-email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={onChange}
                            required
                            className="w-full bg-black border border-white/10 focus:border-[var(--hs-red)] outline-none rounded-md px-4 py-3 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold mb-2">
                            Password
                        </label>
                        <input
                            data-testid="login-password"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={onChange}
                            required
                            className="w-full bg-black border border-white/10 focus:border-[var(--hs-red)] outline-none rounded-md px-4 py-3 text-sm"
                        />
                    </div>
                </div>

                <button
                    data-testid="login-submit-btn"
                    type="submit"
                    disabled={loading}
                    className="mt-7 w-full inline-flex items-center justify-center gap-2 bg-[var(--hs-red)] hover:bg-[var(--hs-red-hover)] disabled:opacity-60 text-white font-bold uppercase tracking-[0.18em] text-xs px-6 py-4 transition-all"
                >
                    <LogIn className="w-4 h-4" />
                    {loading ? "Signing in…" : "Sign In"}
                </button>
            </form>
        </div>
    );
}
