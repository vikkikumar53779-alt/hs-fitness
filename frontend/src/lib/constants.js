export const BRAND = {
    name: "HS FITNESS",
    tagline: "Premium Fitness Equipment Manufacturing & Trading",
    phone: "+91 9217178894",
    phoneIntl: "919217178894",
    phones: [
        { label: "+91 92171 78894", tel: "919217178894" },
        { label: "+91 97116 48894", tel: "919711648894" },
        { label: "+91 96548 98894", tel: "919654898894" },
    ],
    email: "hsfitness036@gmail.com",
    instagram: "rsfitworld",
    instagramUrl: "https://instagram.com/rsfitworld",
    address:
        "52, DTC Colony, Priyadarshini Vihar, Kalyan Vihar, New Delhi, Delhi 110009",
    whatsappBase: "https://wa.me/919217178894",
    defaultMessage:
        "Hi HS Fitness, I am interested in your product",
    logoUrl:
        "https://customer-assets.emergentagent.com/job_hs-fitness-premium/artifacts/nc4kzok9_IMG_20260502_111753_715.jpg",
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
        image: "https://customer-assets.emergentagent.com/job_hs-fitness-premium/artifacts/zfe9b44q_IMG-20260502-WA0030.jpg",
    },
    {
        name: "Strength",
        description: "Benches, racks & stations.",
        image: "https://customer-assets.emergentagent.com/job_hs-fitness-premium/artifacts/reg0trj6_IMG-20260507-WA0001.jpg",
    },
    {
        name: "Machines",
        description: "Plate-loaded & selectorized.",
        image: "https://customer-assets.emergentagent.com/job_hs-fitness-premium/artifacts/ak3vbw22_IMG-20260502-WA0033.jpg",
    },
    {
        name: "Plates",
        description: "Olympic plates & dumbbells.",
        image: "https://customer-assets.emergentagent.com/job_hs-fitness-premium/artifacts/lorfekfk_IMG-20260507-WA0003.jpg",
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
        text: "Pan-India dispatch with installation and after-sales support.",
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
