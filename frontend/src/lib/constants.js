export const BRAND = {
    name: "HS FITNESS",
    tagline: "Premium Fitness Equipment Manufacturing & Trading",
    phone: "+91 9717648894",
    phoneIntl: "919717648894",
    email: "contact@hsfitness.in",
    address:
        "52, DTC Colony, Priyadarshini Vihar, Kalyan Vihar, New Delhi, Delhi 110009",
    whatsappBase: "https://wa.me/919717648894",
    defaultMessage:
        "Hi HS Fitness, I am interested in your product",
    logoUrl:
        "https://customer-assets.emergentagent.com/job_ef732ca6-c14e-4250-bbc8-4f4cf1247ef8/artifacts/sowj2soz_IMG_20260502_111753_715.jpg",
    heroImage:
        "https://images.unsplash.com/photo-1770513649465-2c60c8039806?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY2luZW1hdGljJTIwZ3ltfGVufDB8fHx8MTc3ODEyNjIzOXww&ixlib=rb-4.1.0&q=85",
};

export const waLink = (msg) => {
    const text = encodeURIComponent(msg || BRAND.defaultMessage);
    return `${BRAND.whatsappBase}?text=${text}`;
};

export const NAV_LINKS = [
    { id: "home", label: "Home" },
    { id: "shop", label: "Shop" },
    { id: "categories", label: "Categories" },
    { id: "gallery", label: "Gallery" },
    { id: "reviews", label: "Reviews" },
    { id: "contact", label: "Contact" },
];

export const CATEGORIES = [
    {
        name: "Cardio",
        description: "Treadmills, bikes & ellipticals.",
        image: "https://images.unsplash.com/photo-1736851137148-f7a8a04f1c0a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBmaXRuZXNzJTIwZXF1aXBtZW50JTIwZGFya3xlbnwwfHx8fDE3NzgxMjYyMzl8MA&ixlib=rb-4.1.0&q=85",
    },
    {
        name: "Strength",
        description: "Benches, racks & stations.",
        image: "https://images.unsplash.com/photo-1774864040225-867c8806d78e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBmaXRuZXNzJTIwZXF1aXBtZW50JTIwZGFya3xlbnwwfHx8fDE3NzgxMjYyMzl8MA&ixlib=rb-4.1.0&q=85",
    },
    {
        name: "Machines",
        description: "Plate-loaded & selectorized.",
        image: "https://customer-assets.emergentagent.com/job_ef732ca6-c14e-4250-bbc8-4f4cf1247ef8/artifacts/p88hgf3x_IMG-20260502-WA0038.jpg",
    },
    {
        name: "Plates",
        description: "Olympic plates & dumbbells.",
        image: "https://images.unsplash.com/photo-1620188540300-c156a625c6fc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBmaXRuZXNzJTIwZXF1aXBtZW50JTIwZGFya3xlbnwwfHx8fDE3NzgxMjYyMzl8MA&ixlib=rb-4.1.0&q=85",
    },
];

export const WHY_US = [
    {
        icon: "ShieldCheck",
        title: "Commercial Grade",
        text: "Built to endure the toughest commercial gym floors.",
    },
    {
        icon: "Hammer",
        title: "Durable & Premium Build",
        text: "Heavy-gauge steel, bio-mechanical engineering, zero compromise.",
    },
    {
        icon: "Dumbbell",
        title: "Trusted by Gyms",
        text: "Chosen by leading gyms, trainers & athletes across India.",
    },
    {
        icon: "Truck",
        title: "Fast Delivery",
        text: "Pan-India dispatch with installation & after-sales support.",
    },
];

export const REVIEWS = [
    {
        name: "Fit n Fast Gym",
        location: "Paschim Vihar",
        quote: "Top quality equipment, very satisfied!",
    },
    {
        name: "Flux Fit Gym",
        location: "Outram Lane",
        quote: "Professional service and durable machines.",
    },
    {
        name: "Feel Fit Gym",
        location: "Gujranwala Town",
        quote: "Best fitness equipment supplier in Delhi.",
    },
    {
        name: "Abhishek Malhan",
        location: "Fukra Insaan",
        quote: "Premium quality and amazing build!",
    },
];
