/* ============================================================
   Tic Tech Toe Labs — shared JS
   - mobile nav toggle
   - tweaks panel (headline / accent / hero photo)
   - persists via localStorage (runtime only)
   ============================================================ */

// Tweakable defaults (so host can rewrite on disk if needed)
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#ff5a1f",
  "headline": "Train Your Team In AI & Digital Skills Like They Actually Want To Be There",
  "heroPhoto": "assets/duo-shouting.jpg"
}/*EDITMODE-END*/;

const HERO_PHOTOS = [
  {src:"assets/duo-shouting.jpg", label:"Shouting"},
  {src:"assets/duo-pointing.jpg", label:"Pointing"},
  {src:"assets/duo-selfie.jpg", label:"Selfie"},
  {src:"assets/duo-smile.jpg", label:"Smile"},
  {src:"assets/khai-doing-talks.jpg", label:"Khai Talk"},
  {src:"assets/zayed-presenting.jpg", label:"Zayed"}
];

const ACCENT_SWATCHES = ["#ff5a1f","#1f6feb","#0f766e","#7c3aed","#111111","#d9457b"];

function loadTweaks(){
  try {
    const saved = JSON.parse(localStorage.getItem("ttt-tweaks") || "{}");
    return Object.assign({}, TWEAK_DEFAULTS, saved);
  } catch { return {...TWEAK_DEFAULTS}; }
}
function saveTweaks(t){ localStorage.setItem("ttt-tweaks", JSON.stringify(t)); }

function applyTweaks(t){
  document.documentElement.style.setProperty("--accent", t.accent);
  // hero photo
  document.querySelectorAll("[data-hero-photo]").forEach(img => {
    img.src = t.heroPhoto;
  });
  // headline
  document.querySelectorAll("[data-hero-headline]").forEach(el => {
    el.innerHTML = renderHeadline(t.headline);
  });
}
// lightly decorate headline with wavy underline & accent italic handwritten word
function renderHeadline(text){
  // highlight the word "actually" if present
  const h = text.replace(/actually/i, '<em class="hand accent">actually</em>');
  return h;
}

/* ---------- nav mobile ---------- */
function initNav(){
  const btn = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!btn || !links) return;
  btn.addEventListener("click", () => links.classList.toggle("open"));
}

/* ---------- tweaks panel ---------- */
function initTweaks(){
  const t = loadTweaks();
  applyTweaks(t);

  // build panel
  const panel = document.createElement("div");
  panel.id = "tweaks-panel";
  panel.innerHTML = `
    <button class="close" aria-label="close">×</button>
    <h4>Tweaks</h4>
    <div class="row">
      <label>Headline</label>
      <input type="text" id="tw-headline" value="${t.headline.replace(/"/g,'&quot;')}" />
    </div>
    <div class="row">
      <label>Accent colour</label>
      <div class="swatches">
        ${ACCENT_SWATCHES.map(c=>`<button class="sw ${c===t.accent?'active':''}" style="background:${c}" data-color="${c}" aria-label="${c}"></button>`).join("")}
      </div>
    </div>
    <div class="row">
      <label>Hero photo</label>
      <div class="photos">
        ${HERO_PHOTOS.map(p=>`<button class="${p.src===t.heroPhoto?'active':''}" data-src="${p.src}" title="${p.label}"><img src="${p.src}" alt=""></button>`).join("")}
      </div>
    </div>
  `;
  document.body.appendChild(panel);

  // edit-mode indicator button
  const ind = document.createElement("button");
  ind.className = "edit-indicator";
  ind.innerHTML = "✎ Tweaks";
  document.body.appendChild(ind);

  const closeBtn = panel.querySelector(".close");
  closeBtn.addEventListener("click", ()=> panel.classList.remove("open"));
  ind.addEventListener("click", ()=> panel.classList.toggle("open"));

  panel.querySelector("#tw-headline").addEventListener("input", e=>{
    t.headline = e.target.value;
    saveTweaks(t); applyTweaks(t);
    window.parent?.postMessage({type:'__edit_mode_set_keys', edits:{headline:t.headline}}, '*');
  });
  panel.querySelectorAll(".sw").forEach(b=>{
    b.addEventListener("click", ()=>{
      panel.querySelectorAll(".sw").forEach(x=>x.classList.remove("active"));
      b.classList.add("active");
      t.accent = b.dataset.color;
      saveTweaks(t); applyTweaks(t);
      window.parent?.postMessage({type:'__edit_mode_set_keys', edits:{accent:t.accent}}, '*');
    });
  });
  panel.querySelectorAll(".photos button").forEach(b=>{
    b.addEventListener("click", ()=>{
      panel.querySelectorAll(".photos button").forEach(x=>x.classList.remove("active"));
      b.classList.add("active");
      t.heroPhoto = b.dataset.src;
      saveTweaks(t); applyTweaks(t);
      window.parent?.postMessage({type:'__edit_mode_set_keys', edits:{heroPhoto:t.heroPhoto}}, '*');
    });
  });

  // edit mode protocol
  window.addEventListener("message", (e) => {
    if (!e.data) return;
    if (e.data.type === "__activate_edit_mode") {
      ind.classList.add("visible");
    } else if (e.data.type === "__deactivate_edit_mode") {
      ind.classList.remove("visible");
      panel.classList.remove("open");
    }
  });
  window.parent?.postMessage({type:'__edit_mode_available'}, '*');
}

/* ---------- init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initTweaks();
});
