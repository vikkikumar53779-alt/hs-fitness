import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductsSection from "../components/ProductsSection";
import GallerySection from "../components/GallerySection";
import CategoriesSection from "../components/CategoriesSection";
import WhyChooseUs from "../components/WhyChooseUs";
import Reviews from "../components/Reviews";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

export default function Home() {
    return (
        <div className="relative bg-[var(--hs-bg)] text-white min-h-screen">
            <Header />
            <main>
                <Hero />
                <ProductsSection />
                <CategoriesSection />
                <GallerySection />
                <WhyChooseUs />
                <Reviews />
                <ContactSection />
            </main>
            <Footer />
            <FloatingWhatsApp />
        </div>
    );
}
