import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
            </BrowserRouter>
            <Toaster
                position="top-right"
                theme="dark"
                toastOptions={{
                    style: {
                        background: "#0f0f0f",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#f5f5f5",
                    },
                }}
            />
        </div>
    );
}

export default App;
