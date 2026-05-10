// HS FITNESS — Static site main script
(function () {
  const D = window.HSF_DATA;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const waLink = (msg) => {
    const text = encodeURIComponent(msg || D.brand.defaultMessage);
    return `${D.brand.whatsapp}?text=${text}`;
  };

  const tagStyle = {
    "Best Seller": "bg-[#DC1F26] text-white",
    "Premium":     "bg-white text-black",
    "Top Rated":   "bg-yellow-400 text-black"
  };

  /* WhatsApp icon SVG (reusable) */
  const waIcon = (cls = "w-8 h-8") => `
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" class="${cls}">
`;

  /* ================== TICKER ================== */
  function renderTicker() {
    const items = [...D.ticker, ...D.ticker]; // duplicate for seamless loop
    $("#ticker-track").innerHTML = items.map(it => `
      <div class="flex items-center gap-3 flex-shrink-0">
        <i data-lucide="${it.icon}" class="w-4 h-4"></i>
        <span>${it.text}</span>
        <span class="w-1 h-1 rounded-full bg-white/60"></span>
      </div>`).join("");
  }

  /* ================== PRODUCTS ================== */
  function renderProducts() {
    const products = [...D.products].sort((a,b) => (a.order||0) - (b.order||0));
    $("#products-grid").innerHTML = products.map(p => {
      const msg = `Hi HS Fitness, I am interested in your product: ${p.name}`;
      const tag = tagStyle[p.tag] || "bg-white text-black";
      return `
      <article class="group relative flex flex-col bg-[#121212] border border-white/5 rounded-xl overflow-hidden transition-all duration-500 hover:border-[#DC1F26]/60 hover:shadow-[0_15px_45px_-10px_rgba(220,31,38,0.35)] hover:-translate-y-1">
        <span class="absolute top-4 left-4 z-10 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm backdrop-blur-md ${tag}">${p.tag}</span>
        <div class="relative aspect-square bg-[#f3efe6] overflow-hidden">
          <img src="${p.image_url}" alt="${p.name}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
          <div class="absolute top-0 right-0 w-0 h-0 border-t-[48px] border-l-[48px] border-t-[#DC1F26] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div class="flex-1 flex flex-col p-6">
          <div class="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#DC1F26] font-bold">${p.category}</div>
          <h3 class="mt-2 font-display uppercase text-2xl text-white leading-tight">${p.name}</h3>
          <p class="mt-2 text-sm text-neutral-400 leading-relaxed line-clamp-2">${p.description}</p>
          <div class="mt-6 flex flex-col sm:flex-row gap-3">
            <a href="tel:${D.brand.phones[0].tel}" class="red-btn flex-1 inline-flex items-center justify-center gap-2 text-white font-bold uppercase tracking-widest text-[10px] px-4 py-3 rounded-none">
              <i data-lucide="phone" class="w-4 h-4"></i> Contact for Price
            </a>
            <a href="${waLink(msg)}" target="_blank" rel="noreferrer" class="wa-btn group flex-1 relative inline-flex items-center justify-center gap-2 rounded-full text-white font-bold uppercase tracking-widest text-[10px] px-4 py-2.5 overflow-hidden transition-all hover:-translate-y-0.5">
              <span class="wa-glow"></span>
              <span class="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-white text-[#128C7E]">${waIcon("w-3.5 h-3.5")}</span>
              <span class="relative z-10">WhatsApp</span>
            </a>
          </div>
        </div>
      </article>`;
    }).join("");
  }

  /* ================== CATEGORIES ================== */
  function renderCategories() {
    $("#categories-grid").innerHTML = D.categories.map(c => `
      <a href="${waLink(`Hi HS Fitness, I want to know more about your ${c.name} range.`)}" target="_blank" rel="noreferrer"
         class="group relative aspect-[4/5] rounded-xl overflow-hidden bg-[#121212] border border-white/5 hover:border-[#DC1F26]/60 transition-all">
        <img src="${c.image}" alt="${c.name}" loading="lazy" class="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"/>
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15"></div>
        <div class="absolute inset-0 p-6 flex flex-col justify-between">
          <i data-lucide="arrow-up-right" class="self-end w-6 h-6 text-white/70 group-hover:text-[#DC1F26] group-hover:rotate-12 transition-all"></i>
          <div>
            <div class="font-display uppercase text-3xl md:text-4xl text-white leading-none">${c.name}</div>
            <div class="mt-2 text-xs text-neutral-300 leading-relaxed">${c.description}</div>
          </div>
        </div>
      </a>`).join("");
  }

  /* ================== GALLERY ================== */
  function renderGallery() {
    const items = [...D.gallery].sort((a,b) => (a.order||0) - (b.order||0));
    $("#gallery-grid").innerHTML = items.map((g, i) => {
      const msg = `Hi HS Fitness, I am interested in your product: ${g.name}`;
      const featured = i === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-[4/5]";
      return `
      <div class="group relative overflow-hidden rounded-xl bg-[#f3efe6] ${featured}">
        <img src="${g.image_url}" alt="${g.name}" loading="lazy" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[800ms]"/>
        <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        <div class="absolute bottom-3 left-3 right-3">
          <div class="text-[10px] tracking-[0.25em] uppercase text-[#DC1F26] font-bold">HS Fitness</div>
          <div class="mt-1 font-display uppercase text-white text-lg md:text-xl leading-tight truncate">${g.name}</div>
        </div>
        <div class="absolute inset-0 bg-black/80 backdrop-blur-[3px] flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center">
          <div class="text-[10px] uppercase tracking-[0.3em] text-[#DC1F26] font-bold">Enquire Now</div>
          <div class="font-display uppercase text-white text-xl md:text-2xl leading-tight">${g.name}</div>
          <a href="tel:${D.brand.phones[0].tel}" class="inline-flex items-center gap-2 text-white text-sm font-semibold">
            <i data-lucide="phone" class="w-4 h-4 text-[#DC1F26]"></i> ${D.brand.phones[0].label}
          </a>
          <a href="${waLink(msg)}" target="_blank" rel="noreferrer" class="wa-btn group relative w-16 h-16 rounded-full inline-flex items-center justify-center overflow-hidden transition-transform duration-500 hover:scale-110" aria-label="WhatsApp enquiry">
            <span class="wa-glow"></span>
            <span class="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#128C7E] transition-transform duration-500 group-hover:rotate-[12deg]">${waIcon("w-7 h-7")}</span>
          </a>
        </div>
      </div>`;
    }).join("");
  }

  /* ================== WHY US ================== */
  function renderWhy() {
    $("#why-grid").innerHTML = D.whyUs.map((w, i) => `
      <div class="group relative p-8 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-xl backdrop-blur-sm hover:border-[#DC1F26]/50 hover:-translate-y-1 transition-all duration-500">
        <div class="w-14 h-14 rounded-md bg-[#DC1F26]/10 border border-[#DC1F26]/30 flex items-center justify-center text-[#DC1F26] group-hover:bg-[#DC1F26] group-hover:text-white transition-all">
          <i data-lucide="${w.icon}" class="w-7 h-7"></i>
        </div>
        <h3 class="mt-6 font-display uppercase text-xl text-white">${w.title}</h3>
        <p class="mt-3 text-sm text-neutral-400 leading-relaxed">${w.text}</p>
        <div class="absolute top-6 right-6 font-display text-4xl text-white/5 group-hover:text-[#DC1F26]/15 transition-colors">0${i+1}</div>
      </div>`).join("");
  }

  /* ================== BRANDS ================== */
  function renderBrands() {
    $("#brands-grid").innerHTML = D.brands.map((b, i) => `
      <div class="group relative aspect-[4/3] rounded-xl overflow-hidden bg-white border border-white/10 hover:border-[#DC1F26]/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_-10px_rgba(220,31,38,0.45)]">
        <div class="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200 group-hover:from-white group-hover:to-white transition-all duration-500"></div>
        <div class="relative h-full flex flex-col items-center justify-center px-4 text-center">
          ${b.logo_url
            ? `<img src="${b.logo_url}" alt="${b.name}" class="max-h-16 max-w-[80%] object-contain grayscale group-hover:grayscale-0 transition-all duration-500"/>`
            : `<div class="font-display uppercase text-xl md:text-2xl text-neutral-500 group-hover:text-black transition-colors duration-500 tracking-wide leading-tight">${b.name}</div>`
          }
          <div class="mt-2 text-[9px] uppercase tracking-[0.25em] text-neutral-400 group-hover:text-[#DC1F26] transition-colors duration-500 font-bold">${b.note}</div>
        </div>
        <div class="absolute top-0 right-0 w-0 h-0 border-t-[28px] border-l-[28px] border-t-[#DC1F26] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>`).join("");
  }

  /* ================== REVIEWS ================== */
  function renderReviews() {
    $("#reviews-grid").innerHTML = D.reviews.map(r => `
      <div class="relative p-8 md:p-10 border border-white/10 rounded-xl bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-sm hover:border-[#DC1F26]/40 transition-all">
        <i data-lucide="quote" class="absolute top-6 right-6 w-10 h-10 text-[#DC1F26]/30"></i>
        <div class="flex gap-1 mb-5">
          ${[1,2,3,4,5].map(()=>`<i data-lucide="star" class="w-4 h-4 text-[#DC1F26] fill-[#DC1F26]"></i>`).join("")}
        </div>
        <p class="text-lg md:text-xl text-white font-display uppercase leading-snug">&ldquo;${r.quote}&rdquo;</p>
        <div class="mt-6 pt-5 border-t border-white/10">
          <div class="text-white font-bold text-sm uppercase tracking-wider">${r.name}</div>
          <div class="text-xs text-neutral-400 mt-1">${r.location}</div>
        </div>
      </div>`).join("");
  }

  /* ================== CONTACT INFO ================== */
  function renderContactInfo() {
    const b = D.brand;
    $("#contact-info").innerHTML = `
      <div class="space-y-5">
        <div class="flex gap-4 items-start">
          <div class="w-10 h-10 flex-shrink-0 rounded bg-[#DC1F26]/10 border border-[#DC1F26]/30 text-[#DC1F26] flex items-center justify-center">
            <i data-lucide="map-pin" class="w-5 h-5"></i>
          </div>
          <div>
            <div class="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold">Visit Us</div>
            <div class="mt-1 text-white text-sm md:text-base">${b.address}</div>
          </div>
        </div>
        <div>
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded bg-[#DC1F26]/10 border border-[#DC1F26]/30 text-[#DC1F26] flex items-center justify-center"><i data-lucide="phone" class="w-5 h-5"></i></div>
            <div class="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold">Call / WhatsApp</div>
          </div>
          <div class="space-y-1">
            ${b.phones.map(p => `<a href="tel:${p.tel}" class="block text-white text-base hover:text-[#DC1F26] transition-colors">${p.label}</a>`).join("")}
          </div>
        </div>
        <a href="mailto:${b.email}" class="flex gap-4 items-start hover:opacity-80 transition-opacity">
          <div class="w-10 h-10 rounded bg-[#DC1F26]/10 border border-[#DC1F26]/30 text-[#DC1F26] flex items-center justify-center"><i data-lucide="mail" class="w-5 h-5"></i></div>
          <div>
            <div class="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold">Email</div>
            <div class="mt-1 text-white text-sm md:text-base break-all">${b.email}</div>
          </div>
        </a>
        <a href="${b.instagramUrl}" target="_blank" rel="noreferrer" class="flex gap-4 items-start hover:opacity-80 transition-opacity">
          <div class="w-10 h-10 rounded text-white flex items-center justify-center" style="background:linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);">
            <i data-lucide="instagram" class="w-5 h-5"></i>
          </div>
          <div>
            <div class="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold">Instagram</div>
            <div class="mt-1 text-white text-sm md:text-base">@${b.instagram}</div>
          </div>
        </a>
      </div>`;
  }

  /* ================== FOOTER ================== */
  function renderFooter() {
    const b = D.brand;
    $("#footer-content").innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div class="lg:col-span-2">
          <img src="assets/logo.jpg" alt="HS Fitness" class="h-12 bg-white/95 px-3 py-2 rounded inline-block object-contain"/>
          <p class="mt-6 text-sm text-neutral-400 max-w-md leading-relaxed">${b.tagline}. Engineered in Delhi for gyms that demand commercial-grade strength and enduring quality.</p>
          <div class="mt-6 flex items-center gap-3">
            <a href="${b.instagramUrl}" target="_blank" rel="noreferrer" class="w-10 h-10 rounded-full text-white flex items-center justify-center hover:scale-110 transition-transform" style="background:linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);"><i data-lucide="instagram" class="w-4 h-4"></i></a>
            <a href="#" class="w-10 h-10 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-[#DC1F26] flex items-center justify-center transition-all"><i data-lucide="facebook" class="w-4 h-4"></i></a>
            <a href="#" class="w-10 h-10 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-[#DC1F26] flex items-center justify-center transition-all"><i data-lucide="youtube" class="w-4 h-4"></i></a>
            <a href="${waLink()}" target="_blank" rel="noreferrer" class="wa-btn group relative w-10 h-10 rounded-full text-white flex items-center justify-center overflow-hidden transition-transform hover:scale-110">
              <span class="wa-glow"></span>
              <span class="relative z-10">${waIcon("w-4 h-4")}</span>
            </a>
          </div>
          <div class="mt-5 text-xs text-neutral-500">Instagram: <a href="${b.instagramUrl}" target="_blank" rel="noreferrer" class="text-[#DC1F26] font-bold tracking-wider hover:underline">@${b.instagram}</a></div>
        </div>
        <div>
          <div class="text-[10px] uppercase tracking-[0.25em] text-[#DC1F26] font-bold">Navigate</div>
          <ul class="mt-5 space-y-3">
            ${["home","shop","categories","gallery","reviews","contact"].map(id => `
              <li><a href="#${id}" data-scroll="${id}" class="text-sm text-neutral-300 hover:text-[#DC1F26] transition-colors uppercase tracking-wide">${id}</a></li>`).join("")}
          </ul>
        </div>
        <div>
          <div class="text-[10px] uppercase tracking-[0.25em] text-[#DC1F26] font-bold">Reach Out</div>
          <ul class="mt-5 space-y-4 text-sm text-neutral-300">
            <li class="flex items-start gap-3"><i data-lucide="map-pin" class="w-4 h-4 mt-0.5 text-[#DC1F26] flex-shrink-0"></i><span>${b.address}</span></li>
            ${b.phones.map(p => `<li class="flex items-center gap-3"><i data-lucide="phone" class="w-4 h-4 text-[#DC1F26] flex-shrink-0"></i><a href="tel:${p.tel}" class="hover:text-[#DC1F26] transition-colors">${p.label}</a></li>`).join("")}
            <li class="flex items-center gap-3"><i data-lucide="mail" class="w-4 h-4 text-[#DC1F26] flex-shrink-0"></i><a href="mailto:${b.email}" class="hover:text-[#DC1F26] break-all">${b.email}</a></li>
          </ul>
        </div>
      </div>
      <div class="mt-14 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
        <div>© ${new Date().getFullYear()} HS FITNESS™. All rights reserved.</div>
        <div class="uppercase tracking-[0.25em]">Strong Equipment · Stronger You</div>
      </div>`;
  }

  /* ================== INTERACTIONS ================== */
  function setupHeader() {
    const header = $("#site-header");
    const onScroll = () => {
      if (window.scrollY > 30) header.classList.add("header-scrolled");
      else header.classList.remove("header-scrolled");
    };
    window.addEventListener("scroll", onScroll);
    onScroll();

    // Mobile menu
    const btn = $("#mobile-menu-btn");
    const menu = $("#mobile-menu");
    btn.addEventListener("click", () => menu.classList.toggle("hidden"));
  }

  function setupSmoothScroll() {
    document.addEventListener("click", (e) => {
      const target = e.target.closest("[data-scroll]");
      if (!target) return;
      e.preventDefault();
      const id = target.getAttribute("data-scroll");
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 72;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      // Close mobile menu
      $("#mobile-menu").classList.add("hidden");
    });
  }

  function setupWhatsAppLinks() {
    $$("[data-wa]").forEach(a => { a.href = waLink(); });
  }

  function showToast(msg, ok = true) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.remove("hidden");
    t.style.borderColor = ok ? "rgba(37,211,102,0.5)" : "rgba(220,31,38,0.5)";
    clearTimeout(window.__toast);
    window.__toast = setTimeout(() => t.classList.add("hidden"), 3500);
  }

  function setupContactForm() {
    const form = $("#contact-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = (fd.get("name") || "").toString().trim();
      const phone = (fd.get("phone") || "").toString().trim();
      const message = (fd.get("message") || "").toString().trim();
      const email = (fd.get("email") || "").toString().trim();

      if (!name || !phone || !message) {
        showToast("Please fill Name, Phone and Message.", false);
        return;
      }
      const text = `Hi HS Fitness, I am ${name} (${phone})${email ? ", " + email : ""}.\n${message}`;
      showToast("Opening WhatsApp…", true);
      setTimeout(() => {
        window.open(`${D.brand.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
      }, 500);
      form.reset();
    });
  }

  /* ================== INIT ================== */
  function init() {
    renderTicker();
    renderProducts();
    renderCategories();
    renderGallery();
    renderWhy();
    renderBrands();
    renderReviews();
    renderContactInfo();
    renderFooter();
    setupHeader();
    setupSmoothScroll();
    setupWhatsAppLinks();
    setupContactForm();
    if (window.lucide) lucide.createIcons();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
