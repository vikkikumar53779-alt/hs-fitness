import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogOut, Plus, Trash2, Save, Image as ImageIcon, Package, Inbox } from "lucide-react";
import { adminApi, publicApi } from "../lib/api";
import { BRAND } from "../lib/constants";

const TABS = [
    { id: "products", label: "Products", icon: Package },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "contacts", label: "Enquiries", icon: Inbox },
];

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [tab, setTab] = useState("products");
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("hs_admin_token");
        if (!token) {
            navigate("/admin/login");
            return;
        }
        adminApi
            .me()
            .catch(() => {
                localStorage.removeItem("hs_admin_token");
                navigate("/admin/login");
            });
        reloadAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const reloadAll = async () => {
        setLoading(true);
        try {
            const [p, g, c] = await Promise.all([
                publicApi.getProducts(),
                publicApi.getGallery(),
                adminApi.contacts(),
            ]);
            setProducts(p);
            setGallery(g);
            setContacts(c);
        } catch (err) {
            toast.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("hs_admin_token");
        navigate("/admin/login");
    };

    return (
        <div className="min-h-screen bg-[var(--hs-bg)] text-white">
            {/* Top bar */}
            <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/70 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <img
                            src={BRAND.logoUrl}
                            alt="HS Fitness"
                            className="h-10 bg-white/95 px-2 py-1 rounded object-contain"
                        />
                        <div className="hidden md:block">
                            <div className="font-display uppercase text-xl leading-none">
                                Admin Console
                            </div>
                            <div className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mt-1">
                                HS Fitness Control Panel
                            </div>
                        </div>
                    </div>
                    <button
                        data-testid="admin-logout-btn"
                        onClick={logout}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-neutral-300 hover:text-white border border-white/10 hover:border-[var(--hs-red)] px-4 py-2 transition-all"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>

                <div className="max-w-7xl mx-auto px-6 flex gap-1 overflow-x-auto">
                    {TABS.map((t) => {
                        const Icon = t.icon;
                        return (
                            <button
                                key={t.id}
                                data-testid={`tab-${t.id}`}
                                onClick={() => setTab(t.id)}
                                className={`inline-flex items-center gap-2 px-5 py-3 text-[11px] uppercase tracking-[0.2em] font-bold border-b-2 transition-colors ${
                                    tab === t.id
                                        ? "border-[var(--hs-red)] text-white"
                                        : "border-transparent text-neutral-500 hover:text-white"
                                }`}
                            >
                                <Icon className="w-4 h-4" /> {t.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-10">
                {loading && <div className="text-neutral-500">Loading…</div>}

                {!loading && tab === "products" && (
                    <ItemManager
                        title="Products"
                        items={products}
                        fields={[
                            { key: "name", label: "Name" },
                            { key: "category", label: "Category" },
                            { key: "tag", label: "Tag" },
                            { key: "order", label: "Order", type: "number" },
                            { key: "image_url", label: "Image URL", wide: true },
                            { key: "description", label: "Description", textarea: true, wide: true },
                        ]}
                        defaults={{ name: "", description: "", category: "Machines", image_url: "", tag: "Premium", order: products.length + 1 }}
                        onCreate={async (p) => {
                            await adminApi.createProduct(p);
                            toast.success("Product added");
                            reloadAll();
                        }}
                        onUpdate={async (id, p) => {
                            await adminApi.updateProduct(id, p);
                            toast.success("Saved");
                            reloadAll();
                        }}
                        onDelete={async (id) => {
                            if (!window.confirm("Delete product?")) return;
                            await adminApi.deleteProduct(id);
                            toast.success("Deleted");
                            reloadAll();
                        }}
                    />
                )}

                {!loading && tab === "gallery" && (
                    <ItemManager
                        title="Gallery Images"
                        items={gallery}
                        fields={[
                            { key: "name", label: "Name" },
                            { key: "order", label: "Order", type: "number" },
                            { key: "image_url", label: "Image URL", wide: true },
                        ]}
                        defaults={{ name: "", image_url: "", order: gallery.length + 1 }}
                        onCreate={async (p) => {
                            await adminApi.createGallery(p);
                            toast.success("Image added");
                            reloadAll();
                        }}
                        onUpdate={async (id, p) => {
                            await adminApi.updateGallery(id, p);
                            toast.success("Saved");
                            reloadAll();
                        }}
                        onDelete={async (id) => {
                            if (!window.confirm("Delete image?")) return;
                            await adminApi.deleteGallery(id);
                            toast.success("Deleted");
                            reloadAll();
                        }}
                    />
                )}

                {!loading && tab === "contacts" && (
                    <ContactsList items={contacts} />
                )}
            </div>
        </div>
    );
}

const ItemManager = ({ title, items, fields, defaults, onCreate, onUpdate, onDelete }) => {
    const [draft, setDraft] = useState(defaults);

    const submitNew = async (e) => {
        e.preventDefault();
        await onCreate(draft);
        setDraft(defaults);
    };

    return (
        <div>
            <h2 className="font-display uppercase text-3xl mb-6">{title}</h2>

            {/* Create form */}
            <form
                onSubmit={submitNew}
                className="bg-[#0f0f0f] border border-white/10 rounded-xl p-6 mb-10"
                data-testid={`create-${title.toLowerCase()}-form`}
            >
                <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--hs-red)] font-bold mb-4">
                    Add New
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fields.map((f) => (
                        <FieldInput
                            key={f.key}
                            field={f}
                            value={draft[f.key] ?? ""}
                            onChange={(v) => setDraft({ ...draft, [f.key]: v })}
                        />
                    ))}
                </div>
                <button
                    type="submit"
                    className="mt-5 inline-flex items-center gap-2 bg-[var(--hs-red)] hover:bg-[var(--hs-red-hover)] text-white font-bold uppercase tracking-[0.18em] text-xs px-5 py-3"
                >
                    <Plus className="w-4 h-4" /> Create
                </button>
            </form>

            {/* List */}
            <div className="space-y-4">
                {items.map((it) => (
                    <ItemRow
                        key={it.id}
                        item={it}
                        fields={fields}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

const ItemRow = ({ item, fields, onUpdate, onDelete }) => {
    const [edit, setEdit] = useState({ ...item });
    return (
        <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-5 flex flex-col md:flex-row gap-5">
            {edit.image_url && (
                <img
                    src={edit.image_url}
                    alt={edit.name}
                    className="w-full md:w-36 h-36 object-cover rounded-md bg-[#f3efe6]"
                />
            )}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                {fields.map((f) => (
                    <FieldInput
                        key={f.key}
                        field={f}
                        value={edit[f.key] ?? ""}
                        onChange={(v) => setEdit({ ...edit, [f.key]: v })}
                    />
                ))}
                <div className="md:col-span-2 flex gap-3 pt-1">
                    <button
                        onClick={() => onUpdate(item.id, edit)}
                        className="inline-flex items-center gap-2 bg-white text-black font-bold uppercase tracking-widest text-xs px-4 py-2 hover:bg-neutral-200"
                    >
                        <Save className="w-4 h-4" /> Save
                    </button>
                    <button
                        onClick={() => onDelete(item.id)}
                        className="inline-flex items-center gap-2 border border-[var(--hs-red)] text-[var(--hs-red)] hover:bg-[var(--hs-red)] hover:text-white font-bold uppercase tracking-widest text-xs px-4 py-2 transition-all"
                    >
                        <Trash2 className="w-4 h-4" /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

const FieldInput = ({ field, value, onChange }) => {
    const common =
        "w-full bg-black border border-white/10 focus:border-[var(--hs-red)] outline-none rounded-md px-3 py-2 text-sm text-white";
    return (
        <div className={field.wide ? "md:col-span-2" : ""}>
            <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold mb-1">
                {field.label}
            </label>
            {field.textarea ? (
                <textarea
                    value={value}
                    rows={3}
                    onChange={(e) => onChange(e.target.value)}
                    className={common}
                />
            ) : (
                <input
                    type={field.type || "text"}
                    value={value}
                    onChange={(e) =>
                        onChange(
                            field.type === "number"
                                ? Number(e.target.value)
                                : e.target.value
                        )
                    }
                    className={common}
                />
            )}
        </div>
    );
};

const ContactsList = ({ items }) => (
    <div>
        <h2 className="font-display uppercase text-3xl mb-6">Enquiries</h2>
        {items.length === 0 && (
            <div className="text-neutral-500">No enquiries yet.</div>
        )}
        <div className="space-y-3">
            {items.map((c) => (
                <div
                    key={c.id}
                    data-testid={`contact-row-${c.id}`}
                    className="bg-[#0f0f0f] border border-white/10 rounded-xl p-5"
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                        <div>
                            <div className="font-bold text-white">{c.name}</div>
                            <div className="text-sm text-neutral-400">
                                {c.phone}
                                {c.email ? ` • ${c.email}` : ""}
                            </div>
                        </div>
                        <div className="text-xs text-neutral-500">
                            {new Date(c.created_at).toLocaleString()}
                        </div>
                    </div>
                    <p className="text-sm text-neutral-300 whitespace-pre-wrap">
                        {c.message}
                    </p>
                </div>
            ))}
        </div>
    </div>
);
