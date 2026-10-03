/* ============ CONFIG (edit here) ============ */
const SITE_CONFIG = {
  name: "Mohsin Islam Mahim",
  displayName: "MAHIM",
  tagline: "Turning numbers into insights.",
  email: "freakmahim@gmail.com",
  phone: "01531711316",
  location: "Rajshahi, Bangladesh",
  socials: {
    github: "https://github.com/freakMahim",
    linkedin: "https://www.linkedin.com/in/mohsin-islam-mahim-ab82b642b/",
    instagram: "https://www.instagram.com/tyrannosaurusrawrr/",
    facebook: "https://www.facebook.com/esdeeemhm",
    discord: "tyrannosaurusrawrr"
  }
};
/* Flip `enabled` to true (and add the page file) to show a page in nav. */
const NAV_ITEMS = [
  { label: "HOME", href: "index.html", enabled: true },
  { label: "ABOUT", href: "about.html", enabled: true },
  { label: "CONTACT", href: "contact.html", enabled: true },
  { label: "PROJECTS", href: "projects.html", enabled: false },
  { label: "GALLERY", href: "gallery.html", enabled: false },
  { label: "CV", href: "cv.html", enabled: false }
];
/* Contact form: paste a Formspree / Web3Forms endpoint. Empty = opens mail app instead. */
const FORM_CONFIG = { endpoint: "", extraFields: {} /* e.g. { access_key: "..." } for Web3Forms */ };
const ASSETS = { audio: "./assets/audio/ambient.mp3", profile: "./assets/images/profile.webp" };
/* ============================================ */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = matchMedia("(max-width: 767px)").matches;
const store = {
  get: k => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} }
};
document.documentElement.classList.add("js");

const ICONS = {
  github: '<path d="M9 19c-4 1.3-4-2-6-2m12 4v-3.5a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.600 11.600 0 0 0-6 0C6.500 2.500 5.500 2.800 5.500 2.800a4.300 4.300 0 0 0-.1 3.200A4.600 4.600 0 0 0 4 9.200c0 4.600 2.800 5.600 5.500 6a3 3 0 0 0-.8 2.300V21"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.500 6.500h.01"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  email: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  phone: '<path d="M22 16.900v3a2 2 0 0 1-2.200 2 19.800 19.800 0 0 1-8.600-3.100 19.500 19.500 0 0 1-6-6A19.800 19.800 0 0 1 2.100 4.200 2 2 0 0 1 4.100 2h3a2 2 0 0 1 2 1.700c.1 1 .4 1.900.7 2.800a2 2 0 0 1-.5 2.100L8 9.900a16 16 0 0 0 6 6l1.300-1.300a2 2 0 0 1 2.100-.4c.9.3 1.800.6 2.800.7a2 2 0 0 1 1.700 2z"/>',
  discord: '<path d="M8 8.500c2.600-1 5.400-1 8 0M7.500 17c3 1.300 6 1.300 9 0M9 17l-1 2c-2-.5-3.500-1.300-4.500-2.500C3.500 12 5 7 7 5c1.200-.6 2.500-1 3.800-1.200l.6 1.200m3.200 12 1 2c2-.5 3.500-1.300 4.500-2.500.5-5-1-10-3-12-1.200-.6-2.500-1-3.800-1.200l-.6 1.200"/><circle cx="9.500" cy="12.500" r="1"/><circle cx="14.500" cy="12.500" r="1"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.900 4.900l1.400 1.400m11.400 11.400 1.400 1.400M2 12h2m16 0h2M4.900 19.100l1.400-1.400M17.700 6.300l1.400-1.400"/>',
  note: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>'
};
const icon = n => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[n]}</svg>`;

/* ---------- shared chrome ---------- */
function initChrome() {
  const page = location.pathname.split("/").pop() || "index.html";
  const nav = $("#nav");
  if (nav) {
    const items = NAV_ITEMS.filter(i => i.enabled).map(i =>
      `<li><a href="./${i.href}"${i.href === page ? ' aria-current="page"' : ""}>${i.label}</a></li>`).join("");
    nav.innerHTML = `<div class="wrap"><a class="logo" href="./index.html" aria-label="${SITE_CONFIG.displayName} home">${SITE_CONFIG.displayName}</a>
      <ul class="links" id="links">${items}</ul>
      <div class="tools"><button class="ib" id="music" aria-label="Play ambient music" aria-pressed="false" disabled>${icon("note")}</button>
      <button class="ib" id="theme" aria-label="Toggle light and dark theme">${icon("sun")}</button>
      <button class="ib burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="links">${icon("menu")}</button></div></div>`;
    const links = $("#links"), burger = $("#burger");
    const set = o => { links.classList.toggle("open", o); burger.setAttribute("aria-expanded", o); };
    burger.onclick = () => set(!links.classList.contains("open"));
    links.onclick = e => e.target.closest("a") && set(false);
    document.addEventListener("keydown", e => e.key === "Escape" && set(false));
    let ticking = false;
    const onScroll = () => { nav.classList.toggle("scrolled", scrollY > 30); ticking = false; };
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();
  }
  const f = $("#footer");
  if (f) {
    const s = SITE_CONFIG.socials;
    f.innerHTML = `<div class="wrap"><span>© ${new Date().getFullYear()} ${SITE_CONFIG.name}</span>
      <div class="social">${["github", "linkedin", "instagram", "facebook"].map(k =>
        `<a class="ib" href="${s[k]}" target="_blank" rel="noopener noreferrer" aria-label="${k}">${icon(k)}</a>`).join("")}</div></div>`;
  }
}

/* ---------- theme ---------- */
function initTheme() {
  const root = document.documentElement, btn = $("#theme");
  const saved = store.get("theme") || "dark";
  root.dataset.theme = saved;
  if (!btn) return;
  btn.onclick = () => { const t = root.dataset.theme === "dark" ? "light" : "dark"; root.dataset.theme = t; store.set("theme", t); };
}

/* ---------- scene (ocean/sky) built lazily from JS ---------- */
function initScenes() {
  const cloud = '<svg class="cloud" viewBox="0 0 200 60" aria-hidden="true"><path fill="#fff" d="M30 52c-14 0-24-8-24-18s10-17 22-16c4-12 18-18 32-12 8-9 26-8 32 4 14-4 30 4 30 16 8 1 14 6 14 12 0 8-8 14-16 14z"/></svg>';
  const wave = c => `<svg class="wave ${c}" viewBox="0 0 2400 46" preserveAspectRatio="none" aria-hidden="true"><path fill="rgba(190,230,255,.35)" d="M0 24c100 0 100-14 200-14s100 14 200 14 100-14 200-14 100 14 200 14 100-14 200-14 100 14 200 14 100-14 200-14 100 14 200 14 100-14 200-14 100 14 200 14 100-14 200-14 100 14 200 14V46H0z"/></svg>`;
  $$("[data-scene]").forEach(el => {
    const full = el.dataset.scene === "full";
    const n = full ? (isMobile ? 7 : 20) : 0;
    let dots = "";
    if (!reduced) for (let i = 0; i < n; i++)
      dots += `<i class="dot" style="left:${Math.random() * 100}%;bottom:${Math.random() * 35}%;animation-duration:${14 + Math.random() * 16}s;animation-delay:-${Math.random() * 20}s"></i>`;
    el.innerHTML = `<div class="sun"></div>${cloud}${cloud}${cloud}<div class="horizon"></div><div class="sea"></div>${wave("a")}${wave("b")}${dots}`;
    // pause CSS animation off-screen
    new IntersectionObserver(([e]) => el.classList.toggle("paused", !e.isIntersecting)).observe(el);
  });
}

/* ---------- music ---------- */
function initMusic() {
  const btn = $("#music"), gate = $("#gate");
  const audio = new Audio();
  audio.loop = true; audio.preload = "none"; audio.volume = .5;
  let available = false;
  const setState = () => {
    const on = available && !audio.paused;
    if (!btn) return;
    btn.setAttribute("aria-pressed", on);
    btn.setAttribute("aria-label", on ? "Pause ambient music" : "Play ambient music");
    btn.style.opacity = on ? 1 : .6;
  };
  // existence check (HEAD) so a missing file never throws
  fetch(ASSETS.audio, { method: "HEAD" }).then(r => {
    if (!r.ok) throw 0;
    audio.src = ASSETS.audio; available = true;
    if (btn) { btn.disabled = false; btn.title = "Music"; }
  }).catch(() => { if (btn) btn.title = "Add assets/audio/ambient.mp3 to enable music"; });
  const play = () => available && audio.play().then(setState).catch(() => {});
  if (btn) btn.onclick = () => { audio.paused ? (play(), store.set("music", "on")) : (audio.pause(), store.set("music", "off")); setState(); };
  audio.addEventListener("pause", setState); audio.addEventListener("play", setState);
  if (gate) {
    if (store.get("music")) gate.hidden = true;
    else {
      $("#gate-with").onclick = () => { store.set("music", "on"); closeGate(); const t = setInterval(() => { if (available) { clearInterval(t); play(); } }, 100); setTimeout(() => clearInterval(t), 3000); };
      $("#gate-without").onclick = () => { store.set("music", "off"); closeGate(); };
      $("#gate-with").focus();
    }
  }
  function closeGate() {
    const done = () => { gate.hidden = true; document.dispatchEvent(new Event("gate:closed")); };
    window.gsap && !reduced ? gsap.to(gate, { opacity: 0, duration: .4, onComplete: done }) : done();
  }
}

/* ---------- smooth scroll ---------- */
let lenis;
function initLenis() {
  if (reduced || !window.Lenis) return;
  lenis = new Lenis({ lerp: .1, smoothWheel: true, syncTouch: false });
  if (window.ScrollTrigger) { lenis.on("scroll", ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }
  else { const raf = t => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf); }
}

/* ---------- hero entrance (~1.2s) ---------- */
function initHeroAnimation() {
  const hero = $(".hero");
  if (!hero || reduced || !window.gsap) { $$("[data-r]").forEach(e => e.style.cssText = "opacity:1;transform:none"); return; }
  const run = () => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.from(".scene", { opacity: 0, duration: .4 })
      .from(".horizon", { scaleX: 0, duration: .4 }, .1)
      .fromTo(".portrait", { opacity: 0, scale: .94 }, { opacity: 1, scale: 1, duration: .5 }, .2)
      .to(hero.querySelectorAll("[data-r]"), { opacity: 1, y: 0, duration: .5, stagger: .1 }, .3);
  };
  const gate = $("#gate");
  gate && !gate.hidden ? document.addEventListener("gate:closed", run, { once: true }) : run();
}

/* ---------- scroll reveals ---------- */
function initScrollAnimations() {
  const els = $$("[data-r]").filter(e => !e.closest(".hero"));
  if (!els.length) return;
  if (reduced || !window.gsap) { els.forEach(e => e.style.cssText = "opacity:1;transform:none"); return; }
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    gsap.to(e.target, { opacity: 1, y: 0, duration: .7, ease: "power2.out", delay: (+e.target.dataset.d || 0) * .08 });
  }), { rootMargin: "0px 0px -8% 0px" });
  els.forEach(e => io.observe(e));
  // light parallax on the hero scene (desktop only)
  const sc = $(".hero .scene");
  if (sc && !isMobile && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".hero .sun", { yPercent: 18, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  }
}

/* ---------- contact ---------- */
function toast(msg) {
  const t = $("#toast"); if (!t) return;
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 2000);
}
function initContactInteractions() {
  const list = $("#clist"); if (!list) return;
  const s = SITE_CONFIG.socials;
  const item = (ic, label, val, attrs = "") => `<a class="citem" ${attrs} data-r>${icon(ic)}<div><small>${label}</small><span>${val}</span></div></a>`;
  const ext = 'target="_blank" rel="noopener noreferrer"';
  list.innerHTML =
    item("email", "EMAIL", SITE_CONFIG.email, `href="mailto:${SITE_CONFIG.email}"`) +
    item("phone", "PHONE", SITE_CONFIG.phone, `href="tel:${SITE_CONFIG.phone}"`) +
    item("github", "GITHUB", "freakMahim", `href="${s.github}" ${ext}`) +
    item("linkedin", "LINKEDIN", "mohsin-islam-mahim", `href="${s.linkedin}" ${ext}`) +
    item("instagram", "INSTAGRAM", "@tyrannosaurusrawrr", `href="${s.instagram}" ${ext}`) +
    item("facebook", "FACEBOOK", "esdeeemhm", `href="${s.facebook}" ${ext}`) +
    `<button type="button" class="citem" id="discord" data-r>${icon("discord")}<div><small>DISCORD · TAP TO COPY</small><span>${s.discord}</span></div></button>`;
  $("#discord").onclick = async () => {
    try { await navigator.clipboard.writeText(s.discord); }
    catch { const i = document.createElement("input"); i.value = s.discord; document.body.append(i); i.select(); document.execCommand("copy"); i.remove(); }
    toast("Discord username copied");
  };
  const form = $("#form"); if (!form) return;
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const msg = $("#fmsg"), d = Object.fromEntries(new FormData(form));
    if (!FORM_CONFIG.endpoint) {
      location.href = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(`${d.message}\n\n— ${d.name} (${d.email})`)}`;
      msg.textContent = "Opening your mail app…"; return;
    }
    msg.textContent = "Sending…";
    try {
      const r = await fetch(FORM_CONFIG.endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ ...FORM_CONFIG.extraFields, ...d }) });
      if (!r.ok) throw 0;
      form.reset(); msg.textContent = "Message sent. Thank you!";
    } catch { msg.textContent = `Couldn't send. Please email ${SITE_CONFIG.email} directly.`; }
  });
}

/* ---------- misc ---------- */
function initProfileImage() {
  $$(".portrait").forEach(p => { const im = $("img", p); if (im) { im.onerror = () => p.classList.add("noimg"); if (im.complete && !im.naturalWidth) p.classList.add("noimg"); } });
}
function initCursor() {
  const c = $("#cursor");
  if (!c || reduced || !matchMedia("(hover:hover) and (pointer:fine) and (min-width:1024px)").matches) return;
  let x = 0, y = 0, raf = 0;
  addEventListener("pointermove", e => { x = e.clientX; y = e.clientY; if (!raf) raf = requestAnimationFrame(() => { c.style.transform = `translate(${x}px,${y}px)`; raf = 0; }); }, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  initChrome(); initTheme(); initScenes(); initProfileImage();
  initMusic(); initLenis(); initContactInteractions(); initHeroAnimation(); initScrollAnimations();
  initCursor();
});
