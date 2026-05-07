import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
    baseURL: API,
    timeout: 15000,
});

// Inject admin token automatically when present
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("hs_admin_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const publicApi = {
    getProducts: () => api.get("/products").then((r) => r.data),
    getGallery: () => api.get("/gallery").then((r) => r.data),
    submitContact: (payload) =>
        api.post("/contact", payload).then((r) => r.data),
};

export const adminApi = {
    login: (email, password) =>
        api.post("/admin/login", { email, password }).then((r) => r.data),
    me: () => api.get("/admin/me").then((r) => r.data),
    contacts: () => api.get("/admin/contacts").then((r) => r.data),
    createProduct: (p) => api.post("/admin/products", p).then((r) => r.data),
    updateProduct: (id, p) =>
        api.put(`/admin/products/${id}`, p).then((r) => r.data),
    deleteProduct: (id) =>
        api.delete(`/admin/products/${id}`).then((r) => r.data),
    createGallery: (p) => api.post("/admin/gallery", p).then((r) => r.data),
    updateGallery: (id, p) =>
        api.put(`/admin/gallery/${id}`, p).then((r) => r.data),
    deleteGallery: (id) =>
        api.delete(`/admin/gallery/${id}`).then((r) => r.data),
};
