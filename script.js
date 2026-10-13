'use strict';
/* =========================================================
   ChefVoyage — application logic
   Recipe data lives in cuisines.js (global `worldCuisines`).
   ========================================================= */

/* ---------- helpers ---------- */
const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');

const store = {
  get(key, fallback = null) { try { const v = localStorage.getItem(key); return v == null ? fallback : v; } catch (e) { return fallback; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* storage unavailable */ } },
  remove(key) { try { localStorage.removeItem(key); } catch (e) { /* storage unavailable */ } }
};

/* ---------- data index (built once) ---------- */
const COUNTRIES = [];
const COUNTRY_BY_ID = new Map();
let DISH_TOTAL = 0;

// Quick ingredient-name heuristics (the data has no diet field). "Veg-friendly" = no meat/poultry/seafood
// ingredient; it can't see what's inside store-bought sauces, which the FAQ points out.
const MEAT_RE = /chicken|beef|lamb|mutton|pork|bacon|\bham\b|sausage|boerewors|fish|prawn|shrimp|crab|salmon|tuna|squid|octopus|duck|turkey|goat|veal|steak|mince|anchov|oyster|clam|mussel|lobster|eel\b|kebab|meat|liver|bone|ribs|chorizo|pepperoni|salami|dashi|bonito|lard|pancetta|guanciale|prosciutto|seafood|hilsa|rohu|catfish|sardine|\bcod\b|tilapia|snapper|mackerel/i;
const SPICY_RE = /chil|cayenne|sriracha|jalape|habanero|gochujang|gochugaru|harissa|wasabi|tabasco|sambal|scotch bonnet|peri[- ]?peri/i;

// Per-region accent + icon (used for card glow, tags and group headings)
const REGION_META = {
  'south-asian':    { icon: '🍛', accent: '#D1325C' },
  'east-asian':     { icon: '🍜', accent: '#E0663A' },
  'middle-eastern': { icon: '🥙', accent: '#B8820F' },
  'european':       { icon: '🥐', accent: '#5B6FD8' },
  'americas':       { icon: '🌮', accent: '#12A07F' },
  'african':        { icon: '🍲', accent: '#C4501B' }
};

Object.entries(worldCuisines).forEach(([regionKey, region]) => {
  region.cuisines.forEach(c => {
    c.dishes.forEach(d => {
      d.veg = !d.ingredients.some(i => MEAT_RE.test(i.name));
      d.spicy = d.ingredients.some(i => SPICY_RE.test(i.name));
    });
    const icons = [...new Set(c.dishes.map(d => d.ingredients[0] && d.ingredients[0].icon).filter(Boolean))].slice(0, 5);
    const entry = {
      ...c, region: regionKey, regionName: region.name, accent: REGION_META[regionKey]?.accent || '#D1325C',
      icons,
      ingredientCount: c.dishes.reduce((n, d) => n + d.ingredients.length, 0),
      vegCount: c.dishes.filter(d => d.veg).length,
      search: `${c.name} ${c.dishes.map(d => d.name).join(' ')}`.toLowerCase()
    };
    COUNTRIES.push(entry);
    COUNTRY_BY_ID.set(c.id, entry);
    DISH_TOTAL += c.dishes.length;
  });
});

/* ---------- state ---------- */
const RECIPE_SERVES = 4;           // every recipe in cuisines.js is written for 4 people
let currentStep = 0;
const selected = new Map();        // dishKey -> hydrated dish
let people = 10;
let shoppingList = [];
let mergeStats = { lines: 0, dishes: 0, shared: 0 };
let haveAtHome = new Set();
let checklistItems = [];
let checkedItems = new Set();
let currentRegion = 'all';
let currentSearch = '';
let currentCountry = null;
let userLocation = null;
let lastStoreRadius = 2500;
let currentStores = [];
let storeFilter = 'all';
let justAddedKey = null;
let generating = false;
let locationToken = 0;             // invalidates in-flight location lookups when the user moves on
let dietFilter = 'all';            // all | veg | spicy  (dish grid)
let listFilterText = '';
let hideHave = false;

const dishKey = (cuisineId, name) => `${cuisineId}::${name}`;
const neededItems = () => shoppingList.filter(i => !haveAtHome.has(i.key));

/* ---------- toasts ---------- */
function toast(message, opts = {}) {
  if (typeof opts === 'number') opts = { ms: opts };
  const { ms = opts.action ? 5500 : 2800, action } = opts;
  const stack = $('toastStack');
  const el = document.createElement('div');
  el.className = 'toast';
  const text = document.createElement('span');
  text.textContent = message;
  el.appendChild(text);
  const dismiss = () => { el.classList.add('out'); setTimeout(() => el.remove(), 350); };
  if (action) {                       // e.g. an "Undo" button
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'toast-action';
    btn.textContent = action.label;
    btn.addEventListener('click', () => { action.fn(); dismiss(); });
    el.appendChild(btn);
  }
  stack.appendChild(el);
  while (stack.children.length > 3) stack.firstChild.remove();
  setTimeout(dismiss, ms);
}

/* ---------- theme ---------- */
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const meta = $('metaThemeColor');
  if (meta) meta.content = theme === 'dark' ? '#16070E' : '#FFF5F8';
  const btn = $('themeToggle');
  if (btn) btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}

function initTheme() {
  applyTheme(document.documentElement.dataset.theme || 'light');
  $('themeToggle').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    root.classList.add('theme-anim');                       // brief global cross-fade
    applyTheme(next);
    store.set('chefvoyage_theme', next);
    setTimeout(() => root.classList.remove('theme-anim'), 500);
  });
  // Follow the OS setting until the user picks a theme manually
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', e => {
    if (!store.get('chefvoyage_theme')) applyTheme(e.matches ? 'dark' : 'light');
  });
}

/* ---------- persistence ---------- */
function hydrateDish(cuisineId, name) {
  const c = COUNTRY_BY_ID.get(cuisineId);
  const d = c && c.dishes.find(x => x.name === name);
  return d ? { ...d, cuisineId, cuisineName: c.name, cuisineEmoji: c.emoji } : null;
}

function saveState() {
  store.set('smartchef_dishes', JSON.stringify([...selected.values()].map(d => ({ cuisineId: d.cuisineId, name: d.name }))));
  store.set('smartchef_people', String(people));
}

function loadState() {
  try {
    const saved = JSON.parse(store.get('smartchef_dishes', '[]'));
    if (Array.isArray(saved)) {
      saved.forEach(ref => {
        const d = ref && hydrateDish(ref.cuisineId, ref.name);
        if (d) selected.set(dishKey(d.cuisineId, d.name), d);
      });
    }
  } catch (e) { console.warn('Ignoring unreadable saved dishes:', e.message); }
  const savedPeople = parseInt(store.get('smartchef_people'), 10);
  if (Number.isFinite(savedPeople) && savedPeople > 0) people = clamp(savedPeople, 1, 50);
  store.remove('smartchef_pantry');     // legacy key — the pantry is rebuilt with every generated list
}

/* ---------- step navigation ---------- */
let navToken = 0;
const stepNum = s => (s === 'complete' ? 6 : s);

function updateNav(step) {
  const sn = stepNum(step);
  document.querySelectorAll('.nav-step-dot').forEach((d, i) => {
    d.classList.toggle('done', i < sn);
    d.classList.toggle('active', i === sn);
    if (i === sn) d.setAttribute('aria-current', 'step'); else d.removeAttribute('aria-current');
  });
  document.querySelectorAll('.nav-step-line').forEach((l, i) => l.classList.toggle('done', i < sn));
}

function goToStep(step, { push = true } = {}) {
  // Guard against deep links / history entries whose data no longer exists
  if (step !== 'complete') {
    if (step >= 2 && selected.size === 0) step = 1;
    else if (step >= 3 && shoppingList.length === 0) step = 2;
  }
  if (step === currentStep) return;

  const token = ++navToken;
  const from = document.querySelector('.step-section.active');
  document.body.dataset.dir = stepNum(step) < stepNum(currentStep) ? 'back' : 'forward';

  const swap = () => {
    if (token !== navToken) return;      // a newer navigation superseded this one
    document.querySelectorAll('.step-section.active').forEach(s => s.classList.remove('active', 'leaving'));
    const target = $(step === 'complete' ? 'stepComplete' : `step${step}`);
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
    currentStep = step;
    updateNav(step);
    const heading = target.querySelector('h1, h2');
    if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    onStepEnter(step);
  };

  if (from && !reduceMotion.matches) {
    from.classList.add('leaving');
    setTimeout(swap, 170);
  } else {
    swap();
  }

  if (push) {
    try { history.pushState({ step }, '', step === 'complete' ? '#done' : `#step${step}`); } catch (e) { /* e.g. sandboxed file:// */ }
  }
}

function onStepEnter(step) {
  if (step === 0) { runCounters(); updateResumeBanner(); }
  if (step === 1) { moveTabGlider(); }
  if (step === 2) { syncPeopleUI(); renderMenuPanel(); }
  if (step === 'complete') launchConfetti(160);
}

window.addEventListener('popstate', e => goToStep(e.state && e.state.step !== undefined ? e.state.step : 0, { push: false }));

/* ---------- step 1: countries & dishes ---------- */
function renderCountries() {
  const grid = $('countryGrid');
  const q = currentSearch.trim().toLowerCase();
  const counts = new Map();
  selected.forEach(d => counts.set(d.cuisineId, (counts.get(d.cuisineId) || 0) + 1));

  const list = COUNTRIES.filter(c => (currentRegion === 'all' || c.region === currentRegion) && (!q || c.search.includes(q)));
  if (list.length === 0) {
    grid.innerHTML = `<div class="empty-note">No countries or dishes match “${esc(currentSearch.trim())}”.</div>`;
    return;
  }

  // Group under region headings when browsing everything without a search term
  const grouped = currentRegion === 'all' && !q;
  let lastRegion = null;
  let html = '';
  list.forEach((c, i) => {
    if (grouped && c.region !== lastRegion) {
      lastRegion = c.region;
      const inRegion = list.filter(x => x.region === c.region);
      const meta = REGION_META[c.region] || {};
      html += `
      <div class="region-head" style="--accent:${meta.accent};--i:${Math.min(i, 14)}">
        <div class="region-head-icon" aria-hidden="true">${meta.icon || '🍽️'}</div>
        <div><h3>${esc(c.regionName)}</h3><p>${inRegion.length} countries · ${inRegion.reduce((n, x) => n + x.dishes.length, 0)} dishes</p></div>
      </div>`;
    }
    const n = counts.get(c.id) || 0;
    const dishMatch = q && !c.name.toLowerCase().includes(q) ? c.dishes.find(d => d.name.toLowerCase().includes(q)) : null;
    const shown = c.dishes.slice(0, 3).map(d => esc(d.name)).join(' · ');
    const more = c.dishes.length > 3 ? ` <span class="cc-more">+${c.dishes.length - 3} more</span>` : '';
    html += `
    <div class="country-card tilt${n ? ' has-selected' : ''}" role="button" tabindex="0" style="--i:${Math.min(i, 14)};--accent:${c.accent}"
         data-id="${esc(c.id)}" aria-label="${esc(c.name)}, ${c.dishes.length} dishes${n ? `, ${n} selected` : ''}">
      <div class="cc-top">
        <div class="cc-flag" aria-hidden="true">${c.emoji}</div>
        <span class="cc-region"><i></i>${esc(c.regionName.split(' & ')[0])}</span>
      </div>
      <div class="cc-name">${esc(c.name)}</div>
      <div class="cc-meta"><b>${c.dishes.length}</b> dish${c.dishes.length === 1 ? '' : 'es'} · <b>${c.ingredientCount}</b> ingredients${c.vegCount ? ` · 🌱 ${c.vegCount}` : ''}</div>
      <div class="cc-dishes">${shown}${more}</div>
      ${dishMatch ? `<div class="country-match">🍽️ Has ${esc(dishMatch.name)}</div>` : ''}
      <div class="cc-icons" aria-hidden="true">${c.icons.map(ic => `<span>${ic}</span>`).join('')}</div>
      <div class="cc-foot">
        ${n ? `<span class="cc-selected">✓ ${n} selected</span>` : '<span class="cc-cta">Explore dishes</span>'}
        <span class="cc-arrow" aria-hidden="true">→</span>
      </div>
    </div>`;
  });
  grid.innerHTML = html;
}

function filterRegion(region) {
  currentRegion = region;
  document.querySelectorAll('.region-tab').forEach(tab => {
    const on = tab.dataset.region === region;
    tab.classList.toggle('active', on);
    tab.setAttribute('aria-selected', on);
  });
  moveTabGlider(true);
  renderCountries();
}

function moveTabGlider(reveal) {
  const glider = $('tabGlider');
  const active = document.querySelector('.region-tab.active');
  if (!glider || !active || !active.offsetWidth) return;      // step 1 not laid out yet
  glider.style.width = `${active.offsetWidth}px`;
  glider.style.transform = `translateX(${active.offsetLeft}px)`;
  if (reveal) {
    const tabs = $('regionTabs');
    tabs.scrollTo({ left: active.offsetLeft - (tabs.clientWidth - active.offsetWidth) / 2, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  }
}

function openCountry(cuisineId) {
  const country = COUNTRY_BY_ID.get(cuisineId);
  if (!country) return;
  currentCountry = country;

  $('currentCountryHeader').innerHTML = `
    <div class="current-country-flag" aria-hidden="true">${country.emoji}</div>
    <div class="current-country-info">
      <div class="current-country-name">${esc(country.name)}</div>
      <div class="current-country-region">${esc(country.regionName)} Cuisine</div>
      <div class="current-country-stats"></div>
    </div>`;
  updateCountryHeader();

  currentSearch = '';
  dietFilter = 'all';
  $('searchInput').value = '';
  renderDishes();
  $('countriesView').hidden = true;
  $('dishesView').hidden = false;
  $('step1Title').textContent = `${country.emoji} ${country.name} Dishes`;
  $('step1Subtitle').textContent = 'Select the dishes you want to cook';
  window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
}

function visibleDishes() {
  if (!currentCountry) return [];
  const q = currentSearch.trim().toLowerCase();
  return currentCountry.dishes.filter(d =>
    (!q || d.name.toLowerCase().includes(q)) &&
    (dietFilter === 'all' || (dietFilter === 'veg' && d.veg) || (dietFilter === 'spicy' && d.spicy)));
}

function renderDishes() {
  const grid = $('dishGrid');
  if (!currentCountry) return;
  const dishes = visibleDishes();
  document.querySelectorAll('#dishToolbar [data-diet]').forEach(b => b.classList.toggle('active', b.dataset.diet === dietFilter));

  if (dishes.length === 0) {
    grid.innerHTML = '<div class="empty-note">No dishes match — try another filter.</div>';
    return;
  }
  grid.innerHTML = dishes.map((dish, i) => {
    const on = selected.has(dishKey(currentCountry.id, dish.name));
    return `
    <div class="dish-card tilt${on ? ' selected' : ''}" role="button" tabindex="0" aria-pressed="${on}" style="--i:${Math.min(i, 14)}"
         data-name="${esc(dish.name)}">
      <div class="check-mark" aria-hidden="true">✓</div>
      <div class="dish-emoji" aria-hidden="true">${(dish.ingredients[0] && dish.ingredients[0].icon) || '🍽️'}</div>
      <div class="dish-name">${esc(dish.name)}</div>
      <div class="dish-ingredients-count">${dish.ingredients.length} ingredients</div>
      <div class="dish-tags">${dish.veg ? '<span class="dish-tag">🌱 Veg-friendly</span>' : ''}${dish.spicy ? '<span class="dish-tag spicy">🌶️ Spicy</span>' : ''}</div>
      <button type="button" class="dish-cook" aria-label="How to cook ${esc(dish.name)}">How to cook it</button>
    </div>`;
  }).join('');
}

function setDietFilter(diet) {
  dietFilter = diet;
  renderDishes();
}

function addAllShown() {
  if (!currentCountry) return;
  let added = 0;
  visibleDishes().forEach(d => {
    const key = dishKey(currentCountry.id, d.name);
    if (!selected.has(key)) { selected.set(key, hydrateDish(currentCountry.id, d.name)); added++; }
  });
  if (!added) { toast('Everything shown is already on your menu'); return; }
  syncDishCards();
  refreshSelectionUI();
  saveState();
  toast(`Added ${added} dish${added === 1 ? '' : 'es'} to your menu`);
}

function showCountries() {
  $('countriesView').hidden = false;
  $('dishesView').hidden = true;
  $('step1Title').textContent = 'Pick a Country';
  $('step1Subtitle').textContent = 'Choose a country to explore its signature dishes';
  currentCountry = null;
  currentSearch = '';
  $('searchInput').value = '';
  renderCountries();
  moveTabGlider();
  window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
}

function toggleDish(name, card, cuisineId = currentCountry && currentCountry.id) {
  if (!cuisineId) return false;
  const key = dishKey(cuisineId, name);
  let added;
  if (selected.has(key)) {
    selected.delete(key);
    added = false;
  } else {
    const dish = hydrateDish(cuisineId, name);
    if (!dish) return false;
    selected.set(key, dish);
    justAddedKey = key;
    added = true;
  }
  if (card) {          // update in place so the grid cascade doesn't replay on every pick
    card.classList.toggle('selected', added);
    card.setAttribute('aria-pressed', added);
    if (added) { card.classList.remove('just-selected'); void card.offsetWidth; card.classList.add('just-selected'); }
  } else {
    syncDishCards();
  }
  refreshSelectionUI();
  saveState();
  return added;
}

function syncDishCards() {
  if (!currentCountry) return;
  document.querySelectorAll('#dishGrid .dish-card').forEach(card => {
    const on = selected.has(dishKey(currentCountry.id, card.dataset.name));
    card.classList.toggle('selected', on);
    card.setAttribute('aria-pressed', on);
  });
}

function refreshSelectionUI() {
  updateSelectedSummary();
  updateCountryHeader();
  $('btnToStep2').disabled = selected.size === 0;
}

function updateCountryHeader() {
  if (!currentCountry) return;
  const stats = document.querySelector('.current-country-stats');
  if (!stats) return;
  let sc = 0;
  selected.forEach(d => { if (d.cuisineId === currentCountry.id) sc++; });
  stats.innerHTML = `<div class="stat-pill"><strong>${currentCountry.dishes.length}</strong> dishes</div><div class="stat-pill"><strong>${sc}</strong> selected</div>`;
}

function updateSelectedSummary() {
  const summary = $('selectedSummary');
  const count = $('selectedCount');
  if (selected.size === 0) {
    summary.hidden = true;
    return;
  }
  const changed = count.textContent !== String(selected.size);
  summary.hidden = false;
  count.textContent = selected.size;
  $('selectedTags').innerHTML = [...selected.entries()].map(([key, d]) => `
    <span class="selected-tag${key === justAddedKey ? ' tag-new' : ''}">${d.cuisineEmoji} ${esc(d.name)}
      <button type="button" class="tag-remove" data-key="${esc(key)}" aria-label="Remove ${esc(d.name)}">✕</button>
    </span>`).join('');
  justAddedKey = null;
  if (changed) { count.classList.remove('bump'); void count.offsetWidth; count.classList.add('bump'); }
}

function removeDish(key) {
  const dish = selected.get(key);
  if (!dish || !selected.delete(key)) return;
  syncDishCards();
  if (!currentCountry) renderCountries();
  refreshSelectionUI();
  saveState();
  if (currentStep === 2) {
    if (selected.size === 0) { goToStep(1); } else { renderMenuPanel(); syncPeopleUI(); }
  }
  toast(`Removed ${dish.name}`, { action: { label: 'Undo', fn: () => restoreDishes([[key, dish]]) } });
}

function restoreDishes(entries) {
  entries.forEach(([key, dish]) => selected.set(key, dish));
  syncDishCards();
  if (!currentCountry) renderCountries();
  refreshSelectionUI();
  if (currentStep === 2) { renderMenuPanel(); syncPeopleUI(); }
  saveState();
}

function clearAllDishes() {
  if (selected.size === 0) return;
  const snapshot = [...selected.entries()];
  selected.clear();
  syncDishCards();
  if (!currentCountry) renderCountries();
  refreshSelectionUI();
  saveState();
  toast('Selection cleared', { action: { label: 'Undo', fn: () => restoreDishes(snapshot) } });
}

function handleSearch() { debouncedSearch(); }
const debouncedSearch = debounce(() => {
  currentSearch = $('searchInput').value;
  if (currentCountry) renderDishes(); else renderCountries();
}, 140);

/* ---------- step 2: people ---------- */
function syncPeopleUI(prev) {
  const el = $('peopleCount');
  el.textContent = people;
  if (prev !== undefined && prev !== people) {
    el.classList.remove('tick-up', 'tick-down');
    void el.offsetWidth;
    el.classList.add(people > prev ? 'tick-up' : 'tick-down');
  }
  const range = $('peopleRange');
  range.value = people;
  range.style.setProperty('--fill', `${((people - 1) / 49) * 100}%`);
  document.querySelectorAll('#peoplePresets .chip').forEach(c => c.classList.toggle('active', +c.dataset.n === people));
  const factor = +(people / RECIPE_SERVES).toFixed(2);
  $('peopleScale').innerHTML = `Recipes are written for ${RECIPE_SERVES} — quantities for your <strong>${selected.size} dish${selected.size === 1 ? '' : 'es'}</strong> are multiplied by <strong>×${factor}</strong>.`;
}

function setPeople(n) {
  const prev = people;
  people = clamp(Math.round(n) || 1, 1, 50);
  syncPeopleUI(prev);
  saveState();
}
function changePeople(delta) { setPeople(people + delta); }

function renderMenuPanel() {
  $('menuTags').innerHTML = [...selected.entries()].map(([key, d]) => `
    <span class="selected-tag">${d.cuisineEmoji} ${esc(d.name)}
      <button type="button" class="tag-remove" data-key="${esc(key)}" aria-label="Remove ${esc(d.name)}">✕</button>
    </span>`).join('');
}

/* ---------- thinking overlay ---------- */
function showThinking(title, subs, dur = 1700) {
  const overlay = $('thinkingOverlay');
  const lines = [].concat(subs);
  if (reduceMotion.matches) dur = Math.min(dur, 600);
  $('thinkingText').textContent = title;
  $('thinkingSub').textContent = lines[0];
  overlay.style.setProperty('--dur', `${dur}ms`);
  overlay.classList.add('show');
  const timers = lines.slice(1).map((line, i) => setTimeout(() => { $('thinkingSub').textContent = line; }, (dur * (i + 1)) / lines.length));
  return new Promise(resolve => setTimeout(() => {
    timers.forEach(clearTimeout);
    overlay.classList.remove('show');
    resolve();
  }, dur));
}

/* ---------- step 3: merged shopping list ---------- */
/* Quantities in cuisines.js mix g/kg and ml/L for the SAME ingredient (e.g. Onion is 200 g in one
   dish and 0.2 kg in another). Everything is converted to a base unit before merging, then
   formatted back to the friendliest unit. */
const UNIT_INFO = { kg: { fam: 'mass', f: 1000 }, g: { fam: 'mass', f: 1 }, L: { fam: 'volume', f: 1000 }, ml: { fam: 'volume', f: 1 } };
const PLURALS = { heads: ['head', 'heads'], slices: ['slice', 'slices'], pcs: ['pc', 'pcs'] };

function formatAmount(fam, amount, unit) {
  if (fam === 'mass' || fam === 'volume') {
    const big = fam === 'mass' ? 'kg' : 'L';
    const small = fam === 'mass' ? 'g' : 'ml';
    let v = amount >= 50 ? Math.round(amount / 5) * 5 : Math.max(1, Math.round(amount));
    if (v >= 1000) return { qty: +(v / 1000).toFixed(2), unit: big };
    return { qty: v, unit: small };
  }
  const qty = Math.max(1, Math.ceil(amount - 1e-9));       // you can't buy 0.4 of a bay leaf
  const forms = PLURALS[unit];
  return { qty, unit: forms ? forms[qty === 1 ? 0 : 1] : unit };
}

function buildShoppingList(dishes, headcount) {
  const scale = headcount / RECIPE_SERVES;
  const merged = new Map();
  let lines = 0;
  dishes.forEach(dish => dish.ingredients.forEach(ing => {
    lines++;
    const info = UNIT_INFO[ing.unit];
    const fam = info ? info.fam : ing.unit;
    const key = `${ing.name}|${fam}`;
    let m = merged.get(key);
    if (!m) { m = { key, name: ing.name, icon: ing.icon, fam, unit: ing.unit, amount: 0, dishes: new Set() }; merged.set(key, m); }
    m.amount += ing.qty * scale * (info ? info.f : 1);
    m.dishes.add(dish.name);
  }));

  const items = [...merged.values()].map(m => {
    const { qty, unit } = formatAmount(m.fam, m.amount, m.unit);
    return { key: m.key, name: m.name, icon: m.icon, dishes: [...m.dishes], qty, unit, label: `${qty} ${unit}`, fam: m.fam, amount: m.amount };
  });
  // Ingredients shared by several dishes first (that's where merging saves you money), then A–Z
  items.sort((a, b) => b.dishes.length - a.dishes.length || a.name.localeCompare(b.name));
  return { items, lines };
}

async function generateList() {
  if (generating || selected.size === 0) return;
  generating = true;
  try {
    await showThinking('Analyzing recipes...', [
      `Reading ${selected.size} dish${selected.size === 1 ? '' : 'es'}`,
      'Merging shared ingredients',
      `Scaling for ${people} ${people === 1 ? 'person' : 'people'}`
    ], 1700);
    const { items, lines } = buildShoppingList([...selected.values()], people);
    shoppingList = items;
    mergeStats = { lines, dishes: selected.size, shared: items.filter(i => i.dishes.length > 1).length };
    haveAtHome.clear();
    listFilterText = ''; hideHave = false;
    $('listFilter').value = '';
    $('hideHaveChip').setAttribute('aria-pressed', 'false');
    renderShoppingList();
    goToStep(3);
  } finally {
    generating = false;
  }
}

const STAPLES_RE = /^(salt|coarse sea salt|water|oil|cooking oil|vegetable oil|olive oil|mustard oil|oil for frying|sugar|black pepper|white pepper|black peppercorns|whole peppercorn|vinegar)$/i;
const MASS_SYMBOL = (kg) => (kg >= 10 ? kg.toFixed(0) : kg.toFixed(1)) + ' kg';

function renderShoppingList(animate = true) {
  const q = listFilterText.trim().toLowerCase();
  const rows = shoppingList.filter(i =>
    (!q || i.name.toLowerCase().includes(q) || i.dishes.some(d => d.toLowerCase().includes(q))) &&
    (!hideHave || !haveAtHome.has(i.key)));
  const container = $('shoppingItems');
  container.classList.toggle('no-anim', !animate);

  container.innerHTML = rows.length ? rows.map((i, idx) => `
    <div class="shopping-item${haveAtHome.has(i.key) ? ' have' : ''}" role="checkbox" aria-checked="${haveAtHome.has(i.key)}" tabindex="0" style="--i:${Math.min(idx, 14)}" data-key="${esc(i.key)}">
      <div class="item-toggle" aria-hidden="true">✓</div>
      <div class="item-icon" aria-hidden="true">${i.icon}</div>
      <div class="item-main">
        <div class="item-name"><span>${esc(i.name)}</span></div>
        <div class="item-sub">${esc(i.dishes.join(' · '))}</div>
      </div>
      ${i.dishes.length > 1 ? `<span class="item-shared" title="Used in ${i.dishes.length} dishes — merged into one line">×${i.dishes.length}</span>` : ''}
      <div class="item-qty">${esc(i.label)}</div>
      ${i.custom ? `<button type="button" class="item-del" data-key="${esc(i.key)}" aria-label="Remove ${esc(i.name)}">✕</button>` : ''}
    </div>`).join('')
    : `<div class="list-empty">${shoppingList.length ? 'Nothing matches your filter.' : 'Your list is empty.'}</div>`;

  const note = $('mergeNote');
  note.hidden = false;
  note.innerHTML = `✨ Merged <strong>${mergeStats.lines}</strong> ingredient lines from <strong>${mergeStats.dishes}</strong> dish${mergeStats.dishes === 1 ? '' : 'es'} into <strong>${shoppingList.filter(i => !i.custom).length}</strong> items${mergeStats.shared ? ` — <strong>${mergeStats.shared}</strong> shared between dishes` : ''}.`;
  updateShoppingMeta();
}

function setStat(id, text) {
  const el = $(id);
  if (el.textContent === String(text)) return;
  el.textContent = text;
  el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
}

function updateShoppingMeta() {
  const total = shoppingList.length;
  const needed = neededItems();
  $('shoppingCount').textContent = `${needed.length} item${needed.length === 1 ? '' : 's'} to buy`;
  $('listProgressFill').style.transform = `scaleX(${total ? haveAtHome.size / total : 0})`;
  $('haveHint').textContent = haveAtHome.size
    ? `✅ ${haveAtHome.size} item${haveAtHome.size === 1 ? '' : 's'} at home — ${needed.length} to buy`
    : '💡 Tap items you already have to remove them from the list';

  const grams = needed.filter(i => i.fam === 'mass').reduce((n, i) => n + i.amount, 0);
  setStat('lsItems', needed.length);
  setStat('lsDishes', mergeStats.dishes);
  setStat('lsGuests', people);
  setStat('lsWeight', MASS_SYMBOL(grams / 1000));
  $('staplesChip').setAttribute('aria-pressed', String(shoppingList.some(i => STAPLES_RE.test(i.name)) && shoppingList.filter(i => STAPLES_RE.test(i.name)).every(i => haveAtHome.has(i.key))));
}

function toggleHave(key, el) {
  const on = !haveAtHome.has(key);
  if (on) haveAtHome.add(key); else haveAtHome.delete(key);
  if (hideHave) { renderShoppingList(false); return; }
  if (el) { el.classList.toggle('have', on); el.setAttribute('aria-checked', on); }
  updateShoppingMeta();
}

function markStaples() {
  const staples = shoppingList.filter(i => STAPLES_RE.test(i.name));
  if (!staples.length) { toast('No common pantry staples in this list'); return; }
  const allOn = staples.every(i => haveAtHome.has(i.key));
  const before = new Set(haveAtHome);
  staples.forEach(i => (allOn ? haveAtHome.delete(i.key) : haveAtHome.add(i.key)));
  renderShoppingList(false);
  toast(allOn ? 'Staples unticked' : `Marked ${staples.length} pantry staple${staples.length === 1 ? '' : 's'} as at home`,
    { action: { label: 'Undo', fn: () => { haveAtHome = before; renderShoppingList(false); } } });
}

function addCustomItem(name, qty) {
  name = name.trim();
  if (!name) return;
  const id = `custom|${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;
  shoppingList.push({ key: id, name, icon: '📝', dishes: ['Added by you'], qty: qty.trim() || '1', unit: '', label: qty.trim() || '1', fam: 'custom', amount: 0, custom: true });
  renderShoppingList(false);
  const row = $('shoppingItems').querySelector(`[data-key="${CSS.escape(id)}"]`);
  if (row) row.scrollIntoView({ block: 'nearest', behavior: reduceMotion.matches ? 'auto' : 'smooth' });
}

function removeCustomItem(key) {
  shoppingList = shoppingList.filter(i => i.key !== key);
  haveAtHome.delete(key);
  renderShoppingList(false);
}

function listAsText() {
  const needed = neededItems();
  return `🛒 My ChefVoyage Shopping List (${people} people)\n\n` +
    needed.map(i => `• ${i.name} — ${i.label}`).join('\n') + '\n\nGenerated by ChefVoyage 🍳';
}

function downloadList() {
  if (neededItems().length === 0) { toast('Your shopping list is empty 🎉'); return; }
  const blob = new Blob([listAsText()], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'chefvoyage-shopping-list.txt';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast('Shopping list downloaded ⬇️');
}

function shareWhatsApp() {
  if (neededItems().length === 0) { toast('Your shopping list is empty 🎉'); return; }
  window.open(`https://wa.me/?text=${encodeURIComponent(listAsText())}`, '_blank', 'noopener,noreferrer');
}

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch (e) {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.cssText = 'position:fixed;opacity:0;top:0';
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (err) { /* ignore */ }
    ta.remove();
    return ok;
  }
}

async function shareList() {
  if (neededItems().length === 0) { toast('Your shopping list is empty 🎉'); return; }
  const text = listAsText();
  if (navigator.share) {
    try { await navigator.share({ title: 'My ChefVoyage shopping list', text }); return; }
    catch (e) { if (e && e.name === 'AbortError') return; }
  }
  toast(await copyText(text) ? 'Shopping list copied to clipboard 📋' : 'Could not copy — please select and copy manually');
}

/* ---------- networking helpers ---------- */
// Compute API_BASE dynamically so it works on localhost, LAN IPs, or static hosting
function getApiBase() {
  if (typeof location === 'undefined' || location.protocol === 'file:' || !location.hostname) return 'http://localhost:3000';
  if (location.port === '3000') return location.origin;
  if (location.protocol === 'https:') return '';
  return `${location.protocol}//${location.hostname}:3000`;
}
const API_BASE = getApiBase();
let backendDownUntil = 0;

// Some networks silently drop packets instead of refusing them; without a timeout a dead
// backend would hang forever and the direct-to-provider fallback would never run.
function fetchWithTimeout(url, opts = {}, ms = 6000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  return fetch(url, { ...opts, signal: ctrl.signal }).finally(() => clearTimeout(timer));
}

async function getJson(url, opts, ms) {
  const res = await fetchWithTimeout(url, opts, ms);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// Talk to our own backend. Only a dead connection pauses further backend calls —
// a slow store search must not disable geocoding for a minute.
async function viaBackend(path, opts, ms) {
  if (!API_BASE || Date.now() < backendDownUntil) throw new Error('Backend unavailable');
  try {
    return await getJson(API_BASE + path, opts, ms);
  } catch (e) {
    const aborted = e && (e.name === 'AbortError' || /aborted/i.test(e.message));
    if (!aborted && !/^HTTP /.test(e.message || '')) backendDownUntil = Date.now() + 15000;
    throw e;
  }
}

// Every attempt starts immediately. The first useful answer wins; empty answers don't count.
function raceFirst(attempts) {
  return new Promise((resolve, reject) => {
    let pending = attempts.length;
    let lastErr = null;
    let settled = false;
    if (!pending) { resolve(null); return; }
    for (const run of attempts) {
      Promise.resolve().then(run).then(value => {
        if (settled) return;
        if (value) { settled = true; resolve(value); return; }
        if (--pending === 0) resolve(null);
      }, err => {
        if (settled) return;
        lastErr = err;
        console.warn(err.message);
        if (--pending === 0) lastErr ? reject(lastErr) : resolve(null);
      });
    }
  });
}

const photonName = p => [p.name, p.street, p.city || p.town || p.district, p.state, p.country].filter(Boolean).join(', ');

async function geocode(query) {
  const q = encodeURIComponent(query);
  const results = await raceFirst([
    async () => { const d = await viaBackend(`/api/geocode?q=${q}`, {}, 4500); return Array.isArray(d) && d.length ? d : null; },
    async () => { const d = await getJson(`https://nominatim.openstreetmap.org/search?format=jsonv2&q=${q}&limit=1&accept-language=en`, {}, 4500); return Array.isArray(d) && d.length ? d : null; },
    async () => {
      const d = await getJson(`https://photon.komoot.io/api/?q=${q}&limit=1&lang=en`, {}, 4500);
      const f = d && d.features && d.features[0];
      if (!f) return null;
      const [lon, lat] = f.geometry.coordinates;
      return [{ lat: String(lat), lon: String(lon), display_name: photonName(f.properties || {}) || query }];
    }
  ]);
  if (!results) throw new Error('Location not found');
  return results;
}

async function reverseGeocode(lat, lng) {
  const fallback = { display_name: `${lat.toFixed(3)}°, ${lng.toFixed(3)}°` };
  try {
    const found = await raceFirst([
      () => viaBackend(`/api/reverse?lat=${lat}&lon=${lng}`, {}, 4000),
      () => getJson(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1&accept-language=en`, {}, 4000),
      async () => {
        const d = await getJson(`https://photon.komoot.io/reverse?lat=${lat}&lon=${lng}`, {}, 4000);
        const p = d && d.features && d.features[0] && d.features[0].properties;
        if (!p) return null;
        return { display_name: photonName(p), address: { road: p.street || p.name, city: p.city || p.town, country: p.country } };
      }
    ]);
    return found || fallback;
  } catch (e) {
    return fallback;
  }
}

async function getAddressName(lat, lng) {
  const data = await reverseGeocode(lat, lng);
  const a = data.address;
  if (!a) return data.display_name;
  const parts = [a.road, a.suburb, a.city || a.town || a.village, a.country].filter(Boolean);
  return parts.join(', ') || data.display_name;
}

async function getIpLocation() {
  const found = await raceFirst([
    async () => {
      const d = await viaBackend('/api/ip-location', {}, 3500);
      return Number.isFinite(d.lat) && Number.isFinite(d.lng) ? { lat: d.lat, lng: d.lng, city: d.city, region: d.region, country: d.country } : null;
    },
    async () => {
      const d = await getJson('https://ipwho.is/', {}, 3500);
      return d.success !== false && Number.isFinite(d.latitude) ? { lat: d.latitude, lng: d.longitude, city: d.city, region: d.region, country: d.country } : null;
    },
    async () => {
      const d = await getJson('https://freeipapi.com/api/json', {}, 3500);
      return Number.isFinite(d.latitude) ? { lat: d.latitude, lng: d.longitude, city: d.cityName, region: d.regionName, country: d.countryName } : null;
    }
  ]);
  if (!found) throw new Error('All IP geolocation providers failed');
  return found;
}

/* ---------- step 4: location + stores ---------- */
function findStores() {
  if (neededItems().length === 0) { toast('You already have everything at home — nothing to buy! 🎉'); return; }
  goToStep(4);
  resetLocationUI();
  if (canHover.matches) setTimeout(() => $('manualLocationInput').focus({ preventScroll: true }), 650);
}

function setLocationState(state, label, detail = '') {
  $('locationBox').className = `location-box ${state}`;
  $('locationStatusDisplay').hidden = false;
  $('statusLabel').textContent = label;
  $('statusAddress').textContent = detail;
}

function showLocationError(msg) {
  const el = $('manualLocationError');
  el.textContent = msg;
  el.hidden = !msg;
}

function setLocationBusy(busy, which) {
  $('manualLocationBtn').disabled = busy;
  $('gpsBtn').disabled = busy;
  if (which === 'manual') $('manualLocationBtn').textContent = busy ? 'Searching…' : 'Find Stores';
  if (which === 'gps') $('gpsBtn').textContent = busy ? 'Locating…' : '🎯 Use my current location';
  if (!busy) { $('manualLocationBtn').textContent = 'Find Stores'; $('gpsBtn').textContent = '🎯 Use my current location'; }
}

function resetLocationUI() {
  locationToken++;                                   // abandon any lookup still in flight
  setLocationBusy(false);
  $('locationBox').className = 'location-box';
  $('manualLocationInput').value = '';
  showLocationError('');
  $('locationStatusDisplay').hidden = true;
  $('storeAnalysis').innerHTML = '';
  $('storeFilters').hidden = true;
  $('storeSubtitle').textContent = 'Enter your location to find real supermarkets nearby';
  $('startShoppingBtn').hidden = true;
  currentStores = [];
  storeFilter = 'all';
}

async function searchManualLocation() {
  const input = $('manualLocationInput');
  const query = (input.value || '').trim();
  if (!query) { showLocationError('Please enter a city or address'); input.focus(); return; }

  const token = ++locationToken;
  setLocationBusy(true, 'manual');
  showLocationError('');
  setLocationState('loading', 'Searching…', `Looking up “${query}”`);

  try {
    let data;
    try {
      data = await geocode(query);
    } catch (primaryErr) {
      // A very specific street address may not exist in the geocoder; retry with the broader area.
      const parts = query.split(',').map(p => p.trim()).filter(Boolean);
      if (parts.length < 2) throw primaryErr;
      data = await geocode(parts.slice(1).join(', '));
    }
    if (token !== locationToken) return;
    const result = data[0];
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    const name = result.display_name || query;
    userLocation = { lat, lng };
    setLocationState('success', '✅ Location found', name);
    await processLocation(lat, lng, name, token);
  } catch (err) {
    if (token !== locationToken) return;
    console.error('Manual search error:', err);
    showLocationError(`Could not find “${query}”. Check the spelling or try just your city name.`);
    setLocationState('error', '⚠️ Location not found', 'Try searching by city name.');
  } finally {
    if (token === locationToken) setLocationBusy(false);
  }
}

function getPosition(options) {
  return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, options));
}

function firstPlace(promises) {
  return new Promise(resolve => {
    let pending = promises.length;
    let won = false;
    if (!pending) { resolve(null); return; }
    for (const p of promises) {
      Promise.resolve(p).then(value => {
        if (won) return;
        if (value) { won = true; resolve(value); return; }
        if (--pending === 0) resolve(null);
      }, () => { if (!won && --pending === 0) resolve(null); });
    }
  });
}

// A recent device fix is instant. A network guess starts in the same moment, so a laptop
// without GPS does not wait out a location timeout before anything else is tried.
async function useMyLocation() {
  const input = $('manualLocationInput');
  const token = ++locationToken;
  setLocationBusy(true, 'gps');
  showLocationError('');
  setLocationState('loading', '📡 Finding you…', 'Allow location if your browser asks');

  const gps = (navigator.geolocation && typeof navigator.geolocation.getCurrentPosition === 'function')
    ? getPosition({ enableHighAccuracy: false, timeout: 5000, maximumAge: 5 * 60 * 1000 }).then(pos => ({
        lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy, source: 'GPS'
      })).catch(err => { console.warn('Device location failed:', err.message || err.code); return null; })
    : Promise.resolve(null);

  const ip = new Promise(resolve => setTimeout(resolve, 700)).then(() => getIpLocation()).then(hit => ({
    lat: hit.lat, lng: hit.lng, source: 'Network',
    label: [hit.city, hit.region, hit.country].filter(Boolean).join(', ')
  })).catch(err => { console.warn('IP geolocation failed:', err.message); return null; });

  const detected = await firstPlace([gps, ip]);
  if (token !== locationToken) return;

  try {
    if (!detected) throw new Error('Unable to detect location automatically');
    const { lat, lng } = detected;
    userLocation = { lat, lng };
    const addrPromise = detected.source === 'GPS'
      ? getAddressName(lat, lng).then(name => name + (detected.accuracy ? ` (±${Math.round(detected.accuracy)} m)` : '')).catch(() => `${lat.toFixed(3)}°, ${lng.toFixed(3)}°`)
      : Promise.resolve(detected.label ? `${detected.label} (Network)` : `${lat.toFixed(3)}°, ${lng.toFixed(3)}° (Network)`);

    setLocationState('loading', 'Finding nearby supermarkets…', detected.label || 'Scanning shops around you');
    renderStoreSkeleton();
    const [label, stores] = await Promise.all([
      addrPromise,
      fetchRealStores(lat, lng).catch(err => { console.warn('Real store fetch failed:', err); return null; })
    ]);
    if (token !== locationToken) return;
    if (!input.value) input.value = String(label).replace(/ \((Network|±\d+ m)\)$/, '');
    showStoreResults(lat, lng, label, stores);
  } catch (err) {
    if (token !== locationToken) return;
    console.error('Location error:', err);
    showLocationError('Could not detect your location automatically — please type your city or address above.');
    setLocationState('error', '⚠️ Location unavailable', 'Type your city or address above to find nearby stores.');
    input.focus();
  } finally {
    if (token === locationToken) setLocationBusy(false);
  }
}

/* --- store lookup --- */
const SHOP_TYPES = new Set(['supermarket', 'grocery', 'convenience', 'greengrocer', 'general', 'department_store', 'food']);

function readStoreCache(key, maxAgeMs) {
  try {
    const parsed = JSON.parse(store.get(key));
    if (!parsed || !parsed.data || Date.now() - parsed.t > maxAgeMs) return null;
    return parsed.data;
  } catch (e) { return null; }
}

function shopViewbox(lat, lng, radius) {
  const dLat = radius / 111320;
  const dLon = radius / (111320 * Math.max(0.2, Math.cos(lat * Math.PI / 180)));
  return `${(lng - dLon).toFixed(5)},${(lat + dLat).toFixed(5)},${(lng + dLon).toFixed(5)},${(lat - dLat).toFixed(5)}`;
}

// Same bounded shop search the server uses, so the page still works if the backend can't reach the map service.
async function nominatimShopSearch(lat, lng, radius, term) {
  const viewbox = shopViewbox(lat, lng, radius);
  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(term)}&viewbox=${viewbox}&bounded=1&limit=15&accept-language=en`;
  const list = await getJson(url, {}, 4500);
  if (!Array.isArray(list)) return [];
  const elements = [];
  for (const item of list) {
    if (!item || !item.name || item.category !== 'shop' || !SHOP_TYPES.has(item.type)) continue;
    const sLat = parseFloat(item.lat);
    const sLng = parseFloat(item.lon);
    if (!Number.isFinite(sLat) || !Number.isFinite(sLng)) continue;
    if (calculateDistance(lat, lng, sLat, sLng) > radius / 1000 + 0.4) continue;
    elements.push({ id: item.osm_id, lat: sLat, lon: sLng, tags: { name: item.name || 'Local Store', shop: item.type } });
  }
  return elements;
}

async function fetchDirectShops(lat, lng, radius) {
  const batches = await Promise.all([
    nominatimShopSearch(lat, lng, radius, 'supermarket').catch(() => []),
    nominatimShopSearch(lat, lng, radius, 'grocery').catch(() => [])
  ]);
  let elements = batches.flat();
  let used = radius;
  if (elements.length < 4 && radius < 8000) {
    used = Math.min(radius * 2, 8000);
    try { elements = elements.concat(await nominatimShopSearch(lat, lng, used, 'supermarket')); }
    catch (e) { used = radius; }
  }
  if (!elements.length) throw new Error('No shops found');
  return { elements, sc_radius: used };
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLon = (lon2 - lon1) * rad;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const STORE_TYPES = {
  supermarket:      { label: '🛒 Supermarket',       group: 'supermarket' },
  department_store: { label: '🏬 Department store',  group: 'supermarket' },
  general:          { label: '🏪 General store',     group: 'convenience' },
  convenience:      { label: '🏪 Convenience store', group: 'convenience' },
  grocery:          { label: '🥬 Grocery store',     group: 'grocery' },
  greengrocer:      { label: '🥦 Greengrocer',       group: 'grocery' },
  food:             { label: '🍱 Food shop',         group: 'grocery' }
};
const STORE_GROUPS = [
  { id: 'all', label: 'All' },
  { id: 'supermarket', label: '🛒 Supermarkets' },
  { id: 'grocery', label: '🥬 Grocery & fresh' },
  { id: 'convenience', label: '🏪 Convenience' }
];

async function fetchRealStores(lat, lng, radius = 2500) {
  const cacheKey = `sc_stores_${lat.toFixed(3)},${lng.toFixed(3)},${radius}`;
  let data = readStoreCache(cacheKey, 30 * 60 * 1000);
  if (!data) {
    try {
      try {
        const d = await viaBackend('/api/stores', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ lat, lng, radius })
        }, 5000);
        if (d && Array.isArray(d.elements) && d.elements.length) data = d;
      } catch (err) {
        console.warn('Backend store lookup missed, searching directly:', err.message);
      }
      if (!data) data = await fetchDirectShops(lat, lng, radius);
      if (!data || !(data.elements || []).length) throw new Error('No shops found');
      store.set(cacheKey, JSON.stringify({ t: Date.now(), data }));
    } catch (err) {
      data = readStoreCache(cacheKey, 24 * 60 * 60 * 1000);
      if (!data) throw err;
      console.warn('Store service unreachable, serving shops saved on this device:', err.message);
    }
  }
  lastStoreRadius = data.sc_radius || radius;

  const seen = new Set();
  return (data.elements || []).map(el => {
    const sLat = el.lat ?? (el.center && el.center.lat);
    const sLng = el.lon ?? (el.center && el.center.lon);
    const tags = el.tags || {};
    if (sLat == null || sLng == null || tags.disused || tags.shop === 'no') return null;

    const name = tags.name || tags.brand || tags.operator || 'Local Store';
    // The same shop is sometimes mapped as both a node and a way; drop the duplicate.
    const dupKey = `${name.toLowerCase()}|${sLat.toFixed(3)}|${sLng.toFixed(3)}`;
    if (seen.has(dupKey)) return null;
    seen.add(dupKey);

    const type = STORE_TYPES[tags.shop] ? tags.shop : 'supermarket';
    return {
      id: el.id, name, brand: tags.brand || '', type, group: STORE_TYPES[type].group,
      lat: sLat, lng: sLng, distance: calculateDistance(lat, lng, sLat, sLng)
    };
  }).filter(Boolean).sort((a, b) => a.distance - b.distance).slice(0, 20);
}

function showStoreResults(lat, lng, addressName, stores) {
  const place = addressName || `${lat.toFixed(3)}°, ${lng.toFixed(3)}°`;
  const failed = stores == null;
  currentStores = stores || [];
  storeFilter = 'all';

  if (!currentStores.length) {
    setLocationState(failed ? 'error' : 'success', failed ? '⚠️ Store database unreachable' : '📍 Location found', place);
    renderNoStores(lat, lng, failed);
    $('storeSubtitle').textContent = failed ? 'Could not reach the store database' : 'No mapped supermarkets in this area';
    return;
  }
  setLocationState('success', '✅ Location found', place);
  $('storeSubtitle').textContent = `Found ${currentStores.length} real store${currentStores.length === 1 ? '' : 's'} near you`;
  renderStores();
  $('startShoppingBtn').hidden = false;
}

function renderStoreSkeleton() {
  $('storeFilters').hidden = true;
  $('storeAnalysis').innerHTML = [1, 2, 3].map(() =>
    '<div class="skeleton-card" aria-hidden="true"><div class="skeleton-line w-60"></div><div class="skeleton-line w-40"></div><div class="skeleton-line w-30"></div></div>').join('');
}

async function processLocation(lat, lng, addressName, token) {
  setLocationState('loading', 'Finding nearby supermarkets…', 'Looking up shops around this spot');
  renderStoreSkeleton();
  $('startShoppingBtn').hidden = true;

  let stores = null;
  try {
    stores = await fetchRealStores(lat, lng);
  } catch (err) {
    console.warn('Real store fetch failed:', err);
  }
  if (token !== locationToken) return;
  showStoreResults(lat, lng, addressName, stores);
}

function renderNoStores(lat, lng, failed) {
  $('storeFilters').hidden = true;
  $('storeAnalysis').innerHTML = `
    <div class="no-stores-msg">
      <div class="no-stores-emoji">${failed ? '📡' : '🗺️'}</div>
      <h3>${failed ? 'Couldn’t load nearby stores' : 'No mapped supermarkets nearby'}</h3>
      <p>${failed
        ? 'The OpenStreetMap store service didn’t answer. Check your connection and try again, or search the map directly.'
        : 'OpenStreetMap has no supermarkets recorded in this area yet. You can still search the live map for stores.'}</p>
      <a class="btn btn-primary" target="_blank" rel="noopener noreferrer"
         href="https://www.google.com/maps/search/supermarket/@${lat},${lng},14z">🗺️ Search supermarkets on the map</a>
    </div>`;
  $('startShoppingBtn').hidden = false;      // the checklist is still useful without a store
}

const fmtDistance = km => (km < 1 ? `${Math.max(10, Math.round(km * 100) * 10)} m` : `${km.toFixed(1)} km`);
const fmtTravel = km => (km <= 1.6 ? `~${Math.max(1, Math.round((km / 5) * 60))} min walk` : `~${Math.max(2, Math.round((km / 30) * 60))} min drive`);

function setStoreFilter(id) {
  storeFilter = id;
  renderStores();
}

function renderStores() {
  const counts = { all: currentStores.length, supermarket: 0, grocery: 0, convenience: 0 };
  currentStores.forEach(s => counts[s.group]++);

  const filtersEl = $('storeFilters');
  const groupsPresent = STORE_GROUPS.filter(g => g.id !== 'all' && counts[g.id] > 0).length;
  filtersEl.hidden = groupsPresent < 2;
  filtersEl.innerHTML = STORE_GROUPS.filter(g => g.id === 'all' || counts[g.id] > 0).map(g =>
    `<button type="button" class="chip${storeFilter === g.id ? ' active' : ''}" data-filter="${g.id}">${g.label}<span class="count">${counts[g.id]}</span></button>`).join('');

  const visible = currentStores.filter(s => storeFilter === 'all' || s.group === storeFilter);
  const best = visible.find(s => s.group === 'supermarket') || visible[0];   // visible is sorted nearest-first
  const km = Math.round(lastStoreRadius / 100) / 10;

  let html = `<div class="store-notice"><span aria-hidden="true">ℹ️</span><span>Stores within ${km} km, from OpenStreetMap. Stock isn’t verified — call ahead to confirm your items.</span></div>`;

  html += visible.map((s, i) => {
    const badges = [];
    if (s === best) badges.push('<span class="store-badge best">⭐ Best choice</span>');
    if (i === 0) badges.push('<span class="store-badge">Nearest</span>');
    const showBrand = s.brand && s.brand !== s.name;
    const origin = userLocation ? `&origin=${userLocation.lat},${userLocation.lng}` : '';
    return `
    <div class="store-card${s === best ? ' recommended' : ''}" style="--i:${Math.min(i, 10)}">
      ${badges.length ? `<div class="store-badges">${badges.join('')}</div>` : ''}
      <div class="store-top">
        <div>
          <div class="store-name">${esc(s.name)}${showBrand ? ` <span class="store-brand">(${esc(s.brand)})</span>` : ''}</div>
          <div class="store-type">${STORE_TYPES[s.type].label}</div>
        </div>
        <div class="store-distance"><strong>${fmtDistance(s.distance)}</strong><span>${fmtTravel(s.distance)}</span></div>
      </div>
      <a href="https://www.google.com/maps/dir/?api=1${origin}&destination=${s.lat},${s.lng}" target="_blank" rel="noopener noreferrer" class="store-directions-btn">🗺️ Get Directions</a>
    </div>`;
  }).join('');

  if (visible.length >= 2) {
    const [a, b] = visible;
    html += `
    <div class="combo-card">
      <h4>🧩 Smart Combo: split your trip</h4>
      <div class="combo-stores">
        <div class="combo-store-pill">${esc(a.name)}</div><div class="combo-plus">+</div><div class="combo-store-pill">${esc(b.name)}</div>
      </div>
      <div class="combo-detail">Your two closest options are both within <strong>${fmtDistance(Math.max(a.distance, b.distance))}</strong> — grab fresh produce at one and pantry staples at the other.</div>
    </div>`;
  }
  $('storeAnalysis').innerHTML = html;
}

/* ---------- step 5: checklist ---------- */
function startShopping() {
  checklistItems = neededItems();
  checkedItems.clear();
  renderChecklist();
  goToStep(5);
}

function renderChecklist() {
  $('checklistItems').innerHTML = checklistItems.map((i, idx) => `
    <div class="checklist-item" role="checkbox" aria-checked="false" tabindex="0" style="--i:${Math.min(idx, 14)}" data-idx="${idx}">
      <div class="cl-check" aria-hidden="true">✓</div>
      <div class="cl-icon" aria-hidden="true">${i.icon}</div>
      <div class="cl-name"><span>${esc(i.name)}</span></div>
      <div class="cl-qty">${esc(i.label)}</div>
    </div>`).join('');
  $('btnDone').disabled = true;
  updateChecklistProgress();
}

function toggleCheck(idx, el) {
  const on = !checkedItems.has(idx);
  if (on) checkedItems.add(idx); else checkedItems.delete(idx);
  el.classList.toggle('checked', on);
  el.setAttribute('aria-checked', on);
  updateChecklistProgress();
  $('btnDone').disabled = checkedItems.size === 0;
  if (on && checkedItems.size === checklistItems.length) {
    launchConfetti(90);
    toast('Basket complete! 🎉 Tap “I’m Done”');
  }
}

function updateChecklistProgress() {
  const total = checklistItems.length;
  const done = checkedItems.size;
  $('checklistProgressText').textContent = `${done} / ${total}`;
  const fill = $('checklistProgressFill');
  fill.style.transform = `scaleX(${total ? done / total : 0})`;
  fill.classList.toggle('complete', total > 0 && done === total);
}

function finishShopping() { goToStep('complete'); }

function resetAll() {
  selected.clear();
  justAddedKey = null;
  people = 10;
  shoppingList = [];
  checklistItems = [];
  haveAtHome.clear();
  checkedItems.clear();
  currentRegion = 'all';
  currentSearch = '';
  currentCountry = null;
  userLocation = null;
  generating = false;
  store.remove('smartchef_dishes');
  store.remove('smartchef_people');
  dietFilter = 'all'; listFilterText = ''; hideHave = false;
  $('listFilter').value = '';
  $('hideHaveChip').setAttribute('aria-pressed', 'false');
  updateResumeBanner();

  $('searchInput').value = '';
  filterRegion('all');
  $('selectedSummary').hidden = true;
  $('btnToStep2').disabled = true;
  $('btnDone').disabled = true;
  $('mergeNote').hidden = true;
  $('countriesView').hidden = false;
  $('dishesView').hidden = true;
  $('step1Title').textContent = 'Pick a Country';
  $('step1Subtitle').textContent = 'Choose a country to explore its signature dishes';
  syncPeopleUI();
  resetLocationUI();
  renderCountries();
  goToStep(0);
}

/* ---------- confetti ---------- */
let confettiRaf = 0;
function launchConfetti(count = 140) {
  if (reduceMotion.matches) return;
  const cv = $('confetti');
  const ctx = cv.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = innerWidth, H = innerHeight;
  cv.width = W * dpr; cv.height = H * dpr;
  cancelAnimationFrame(confettiRaf);

  const colors = ['#FF8FAB', '#D1325C', '#FFC2D1', '#FFD166', '#7BDFF2', '#B8F2E6', '#FFFFFF'];
  const parts = Array.from({ length: count }, () => ({
    x: W / 2 + (Math.random() - 0.5) * W * 0.25, y: H * 0.38,
    vx: (Math.random() - 0.5) * 16, vy: -Math.random() * 15 - 4,
    g: 0.3 + Math.random() * 0.12, s: 6 + Math.random() * 7,
    r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.4,
    c: colors[(Math.random() * colors.length) | 0], round: Math.random() < 0.35
  }));
  const end = performance.now() + 4500;

  (function frame(now) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    let alive = 0;
    for (const p of parts) {
      p.vy += p.g; p.vx *= 0.992; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      if (p.y > H + 30) continue;
      alive++;
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c;
      if (p.round) { ctx.beginPath(); ctx.arc(0, 0, p.s / 2, 0, Math.PI * 2); ctx.fill(); }
      else ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
      ctx.restore();
    }
    if (alive && now < end) confettiRaf = requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, W, H);
  })(performance.now());
}

/* ---------- landing page: counters + marquee ---------- */
function runCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const end = +el.dataset.count;
    if (reduceMotion.matches || !end) { el.textContent = end; return; }
    const t0 = performance.now();
    const dur = 1400;
    (function tick(now) {
      const p = Math.min(1, (now - t0) / dur);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  });
}

function initMarquee() {
  const track = $('marqueeTrack');
  if (!track || reduceMotion.matches) return;
  const base = [...track.children];
  const clones = () => base.map(c => { const n = c.cloneNode(true); n.setAttribute('aria-hidden', 'true'); return n; });
  // Make one "half" at least as wide as the viewport, then duplicate it so the -50% loop is seamless
  while (track.scrollWidth < track.parentElement.clientWidth) track.append(...clones());
  [...track.children].forEach(c => { const n = c.cloneNode(true); n.setAttribute('aria-hidden', 'true'); track.append(n); });
}

/* ---------- scroll, reveal, pointer effects ---------- */
function initScrollFx() {
  const nav = document.querySelector('.nav');
  const bar = $('scrollProgress');
  let ticking = false;
  const update = () => {
    ticking = false;
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 8);
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();

  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    e.target.classList.add('in');
    // Drop the reveal classes once settled so they never fight hover/tilt transitions
    setTimeout(() => e.target.classList.remove('reveal', 'in'), 1200);
  }), { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });

  document.querySelectorAll('.feature-box, .hiw-step, .hiw-title, .hiw-sub, .cuisine-strip, .completion-feature').forEach(el => {
    el.style.setProperty('--rd', [...el.parentElement.children].indexOf(el) % 5);
    el.classList.add('reveal');
    io.observe(el);
  });
}

function initPointerFx() {
  // Button ripple
  document.addEventListener('pointerdown', e => {
    const btn = e.target.closest('.btn, .manual-location-btn, .gps-btn');
    if (!btn || btn.disabled || reduceMotion.matches) return;
    const r = btn.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 2;
    const dot = document.createElement('span');
    dot.className = 'ripple';
    dot.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
    btn.appendChild(dot);
    dot.addEventListener('animationend', () => dot.remove());
  });

  if (!canHover.matches || reduceMotion.matches) return;

  // 3D tilt + cursor spotlight on any .tilt element (one delegated listener, rAF-throttled)
  let active = null, raf = 0, last = null;
  const release = el => { el.classList.remove('is-tilting'); el.style.removeProperty('--rx'); el.style.removeProperty('--ry'); };
  document.addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') return;
    const el = e.target.closest ? e.target.closest('.tilt') : null;
    if (el !== active) {
      if (active) release(active);
      active = el;
      if (el) el.classList.add('is-tilting');
    }
    if (!el) return;
    last = e;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      if (!active || !last) return;
      const r = active.getBoundingClientRect();
      const x = (last.clientX - r.left) / r.width;
      const y = (last.clientY - r.top) / r.height;
      active.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
      active.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
      active.style.setProperty('--rx', `${((0.5 - y) * 7).toFixed(2)}deg`);
      active.style.setProperty('--ry', `${((x - 0.5) * 9).toFixed(2)}deg`);
    });
  }, { passive: true });
  document.documentElement.addEventListener('mouseleave', () => { if (active) { release(active); active = null; } });

  // Hero collage parallax
  const hero = $('heroVisuals');
  let hraf = 0;
  hero.addEventListener('pointermove', e => {
    if (hraf) return;
    hraf = requestAnimationFrame(() => {
      hraf = 0;
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--px', (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
      hero.style.setProperty('--py', (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
    });
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { hero.style.setProperty('--px', 0); hero.style.setProperty('--py', 0); });
}

/* ---------- modal infrastructure ---------- */
let openModalEl = null;
let modalReturnFocus = null;

function openModal(el, focusSel) {
  if (openModalEl) closeModal(true);
  modalReturnFocus = document.activeElement;
  openModalEl = el;
  el.hidden = false;
  document.body.classList.add('modal-open');
  void el.offsetWidth;
  el.classList.add('open');
  const target = focusSel && el.querySelector(focusSel);
  if (target) target.focus({ preventScroll: true });
}

function closeModal(instant) {
  const el = openModalEl;
  if (!el) return;
  openModalEl = null;
  el.classList.remove('open');
  document.body.classList.remove('modal-open');
  const done = () => { if (!el.classList.contains('open')) el.hidden = true; };
  if (instant || reduceMotion.matches) done(); else setTimeout(done, 220);
  if (!instant && modalReturnFocus && document.contains(modalReturnFocus)) modalReturnFocus.focus({ preventScroll: true });
}

/* ---------- dish preview ---------- */
let previewRef = null;

function recipeBlock(cuisineId, name) {
  const recipe = (typeof dishRecipes !== 'undefined' && dishRecipes[`${cuisineId}|${name}`]) || null;
  if (!recipe) return '';
  return `
    <div class="dm-recipe">
      <h4>How to cook it</h4>
      <p class="dm-time">${esc(recipe.time)} · written for 4 people, using the ingredients below</p>
      <ol class="dm-steps">
        ${recipe.steps.map(step => `<li>${esc(step)}</li>`).join('')}
      </ol>
    </div>`;
}

function openDishPreview(cuisineId, name) {
  const dish = hydrateDish(cuisineId, name);
  if (!dish) return;
  previewRef = { cuisineId, name };
  const { items } = buildShoppingList([dish], people);
  const on = selected.has(dishKey(cuisineId, name));
  $('modalCard').innerHTML = `
    <button type="button" class="modal-close" data-close aria-label="Close">✕</button>
    <div class="dm-head">
      <div class="dm-emoji" aria-hidden="true">${(dish.ingredients[0] && dish.ingredients[0].icon) || '🍽️'}</div>
      <div>
        <div class="dm-country">${dish.cuisineEmoji} ${esc(dish.cuisineName)}</div>
        <h3 id="modalTitle">${esc(dish.name)}</h3>
        <div class="dm-badges">
          <span class="dish-tag">${dish.ingredients.length} ingredients</span>
          ${dish.veg ? '<span class="dish-tag">🌱 Veg-friendly</span>' : ''}
          ${dish.spicy ? '<span class="dish-tag spicy">🌶️ Spicy</span>' : ''}
        </div>
      </div>
    </div>
    ${recipeBlock(cuisineId, name)}
    <div class="dm-sub">Ingredients for <strong>${people} ${people === 1 ? 'person' : 'people'}</strong> <small>· change guests in the next step</small></div>
    <div class="dm-list">
      ${items.map((i, idx) => `<div class="dm-row" style="--i:${idx}"><span class="ic" aria-hidden="true">${i.icon}</span><span class="nm">${esc(i.name)}</span><span class="qt">${esc(i.label)}</span></div>`).join('')}
    </div>
    <div class="dm-actions">
      <button type="button" class="btn ${on ? 'btn-secondary' : 'btn-primary'}" id="dmToggle">${on ? '✓ On your menu — remove' : '＋ Add to my menu'}</button>
    </div>`;
  openModal($('modal'), '#dmToggle');
}

/* ---------- quick-search command palette ---------- */
let palIndex = [];
let palResults = [];
let palActive = 0;

function buildPaletteIndex() {
  if (palIndex.length) return;
  COUNTRIES.forEach(c => {
    palIndex.push({ type: 'country', id: c.id, icon: c.emoji, title: c.name, sub: `${c.regionName} · ${c.dishes.length} dishes`, hay: c.name.toLowerCase() });
    c.dishes.forEach(d => palIndex.push({ type: 'dish', id: c.id, dish: d.name, icon: (d.ingredients[0] && d.ingredients[0].icon) || '🍽️', title: d.name, sub: `${c.emoji} ${c.name}`, hay: `${d.name} ${c.name}`.toLowerCase() }));
  });
}

function openPalette() {
  if (currentStep !== 0 && currentStep !== 1) { toast('Go back to Step 1 to search dishes 🔍'); return; }
  buildPaletteIndex();
  $('paletteInput').value = '';
  renderPalette('');
  openModal($('palette'), '#paletteInput');
}

function renderPalette(query) {
  const q = query.trim().toLowerCase();
  let countries, dishes;
  if (!q) {
    countries = palIndex.filter(x => x.type === 'country' && ['bangladeshi', 'indian', 'italian', 'japanese', 'mexican', 'thai'].includes(x.id));
    dishes = [];
  } else {
    const score = x => (x.hay.startsWith(q) ? 0 : x.title.toLowerCase().split(/\s+/).some(w => w.startsWith(q)) ? 1 : 2);
    const hits = palIndex.filter(x => x.hay.includes(q)).sort((a, b) => score(a) - score(b) || a.title.localeCompare(b.title));
    countries = hits.filter(x => x.type === 'country').slice(0, 5);
    dishes = hits.filter(x => x.type === 'dish').slice(0, 9);
  }
  palResults = [...countries, ...dishes];
  palActive = 0;
  const hi = t => {
    const i = q ? t.toLowerCase().indexOf(q) : -1;
    return i < 0 ? esc(t) : `${esc(t.slice(0, i))}<mark>${esc(t.slice(i, i + q.length))}</mark>${esc(t.slice(i + q.length))}`;
  };
  let n = 0;
  const row = x => `
    <div class="pal-item${n === 0 ? ' on' : ''}" role="option" id="pal-${n}" data-i="${n++}" aria-selected="${n === 1}">
      <span class="pi" aria-hidden="true">${x.icon}</span>
      <span class="pt">${hi(x.title)}<small>${esc(x.sub)}</small></span>
      <span class="pa">${x.type === 'country' ? 'Open ↵' : 'Add ↵'}</span>
    </div>`;
  $('paletteList').innerHTML = palResults.length
    ? (countries.length ? `<div class="pal-group">${q ? 'Countries' : 'Popular cuisines'}</div>${countries.map(row).join('')}` : '') +
      (dishes.length ? `<div class="pal-group">Dishes</div>${dishes.map(row).join('')}` : '')
    : `<div class="pal-empty">Nothing found for “${esc(query.trim())}”</div>`;
}

function setPaletteActive(i) {
  if (!palResults.length) return;
  palActive = (i + palResults.length) % palResults.length;
  document.querySelectorAll('#paletteList .pal-item').forEach(el => {
    const on = +el.dataset.i === palActive;
    el.classList.toggle('on', on);
    el.setAttribute('aria-selected', on);
    if (on) { el.scrollIntoView({ block: 'nearest' }); $('paletteInput').setAttribute('aria-activedescendant', el.id); }
  });
}

function pickPalette(i) {
  const x = palResults[i];
  if (!x) return;
  closeModal();
  if (x.type === 'country') { showCountry(x.id); return; }
  const added = !selected.has(dishKey(x.id, x.dish)) && toggleDish(x.dish, null, x.id);
  if (currentStep === 1 && !currentCountry) renderCountries();
  toast(added ? `Added ${x.dish} to your menu 🍽️` : `${x.dish} is already on your menu`,
    { action: { label: 'View', fn: () => showCountry(x.id) } });
}

/* ---------- navigation helpers, surprise me, resume ---------- */
const stepDelay = () => (reduceMotion.matches ? 0 : 230);

function showCountry(cuisineId, then) {
  const go = () => { openCountry(cuisineId); if (then) then(); };
  if (currentStep !== 1) { goToStep(1); setTimeout(go, stepDelay()); } else go();
}

function surpriseMe() {
  if (currentStep !== 0 && currentStep !== 1) { toast('Surprise me works in Steps 1–2 🎲'); return; }
  const pool = [];
  COUNTRIES.forEach(c => c.dishes.forEach(d => { if (!selected.has(dishKey(c.id, d.name))) pool.push([c, d]); }));
  if (!pool.length) { toast('You already picked every dish — impressive! 🏆'); return; }
  const [c, d] = pool[(Math.random() * pool.length) | 0];
  showCountry(c.id, () => {
    const card = [...document.querySelectorAll('#dishGrid .dish-card')].find(el => el.dataset.name === d.name);
    toggleDish(d.name, card, c.id);
    if (card) {
      card.classList.add('highlight');
      card.scrollIntoView({ block: 'center', behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      setTimeout(() => card.classList.remove('highlight'), 3400);
    }
    toast(`🎲 How about ${d.name} from ${c.name}?`);
  });
}

function updateResumeBanner() {
  const banner = $('resumeBanner');
  if (!banner) return;
  const n = selected.size;
  banner.hidden = n === 0;
  if (n) $('resumeText').textContent = `Welcome back! You have ${n} dish${n === 1 ? '' : 'es'} on your menu.`;
}

function startFresh() {
  if (selected.size === 0) { updateResumeBanner(); return; }
  const snapshot = [...selected.entries()];
  clearAllDishesQuiet();
  updateResumeBanner();
  toast('Started fresh ✨', { action: { label: 'Undo', fn: () => { restoreDishes(snapshot); updateResumeBanner(); } } });
}

function clearAllDishesQuiet() {
  selected.clear();
  syncDishCards();
  if (!currentCountry) renderCountries();
  refreshSelectionUI();
  saveState();
}

/* ---------- landing extras: rotating headline, featured cuisines, back-to-top ---------- */
function initRotator() {
  const el = $('rotWord');
  if (!el) return;
  const words = ['Kacchi night', 'Hilsa feast', 'Bhuna Khichuri', 'Chingri malai', 'Tehari dinner', 'Pitha morning'];
  if (reduceMotion.matches) { el.textContent = words[0]; return; }
  let w = 0, c = 0, del = false, wait = 0;
  (function tick() {
    if (currentStep === 0 && !document.hidden) {
      if (wait > 0) wait--;
      else {
        const word = words[w];
        c += del ? -1 : 1;
        el.textContent = word.slice(0, c);
        if (!del && c === word.length) { del = true; wait = 22; }
        else if (del && c === 0) { del = false; w = (w + 1) % words.length; wait = 4; }
      }
    }
    setTimeout(tick, del ? 38 : 82);
  })();
}

function renderFeatured() {
  const grid = $('featuredGrid');
  if (!grid) return;
  grid.innerHTML = ['bangladeshi', 'indian', 'japanese', 'italian', 'mexican', 'thai']
    .map(id => COUNTRY_BY_ID.get(id)).filter(Boolean).map((c, i) => `
    <div class="featured-card tilt" role="button" tabindex="0" data-id="${esc(c.id)}" style="--accent:${c.accent};--i:${i}" aria-label="Explore ${esc(c.name)} cuisine">
      <div class="fc-flag" aria-hidden="true">${c.emoji}</div>
      <div class="fc-name">${esc(c.name)}</div>
      <div class="fc-dishes">${c.dishes.slice(0, 3).map(d => esc(d.name)).join(' · ')}</div>
      <div class="fc-go">Explore ${c.dishes.length} dishes <span aria-hidden="true">→</span></div>
    </div>`).join('');
}

/* ---------- event wiring (delegated: no inline handlers for dynamic content) ---------- */
function onActivate(container, selector, handler) {
  container.addEventListener('click', e => { const el = e.target.closest(selector); if (el && container.contains(el)) handler(el, e); });
  container.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const el = e.target.closest(selector);
    if (el && e.target === el) { e.preventDefault(); handler(el, e); }
  });
}

function bindEvents() {
  onActivate($('countryGrid'), '.country-card', el => openCountry(el.dataset.id));
  onActivate($('dishGrid'), '.dish-card', (el, e) => {
    if (e.target.closest('.dish-cook')) openDishPreview(currentCountry.id, el.dataset.name);
    else toggleDish(el.dataset.name, el);
  });
  $('dishToolbar').addEventListener('click', e => {
    const diet = e.target.closest('[data-diet]');
    if (diet) setDietFilter(diet.dataset.diet);
    else if (e.target.closest('#selectAllDishes')) addAllShown();
  });
  onActivate($('featuredGrid'), '.featured-card', el => showCountry(el.dataset.id));
  $('menuTags').addEventListener('click', e => { const b = e.target.closest('.tag-remove'); if (b) removeDish(b.dataset.key); });

  // modal + palette
  $('modal').addEventListener('click', e => {
    if (e.target.closest('[data-close]')) closeModal();
    else if (e.target.closest('#dmToggle') && previewRef) {
      const added = toggleDish(previewRef.name, null, previewRef.cuisineId);
      closeModal();
      toast(added ? `Added ${previewRef.name} to your menu 🍽️` : `Removed ${previewRef.name}`);
    }
  });
  $('palette').addEventListener('click', e => {
    if (e.target.closest('[data-close]')) { closeModal(); return; }
    const item = e.target.closest('.pal-item');
    if (item) pickPalette(+item.dataset.i);
  });
  $('paletteInput').addEventListener('input', e => renderPalette(e.target.value));
  $('paletteInput').addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setPaletteActive(palActive + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setPaletteActive(palActive - 1); }
    else if (e.key === 'Enter') { e.preventDefault(); pickPalette(palActive); }
  });
  $('navSearch').addEventListener('click', openPalette);
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  document.querySelectorAll('#kbdHint, #kbdHint2, .kbd-hint').forEach(k => { k.textContent = isMac ? '⌘K' : 'Ctrl K'; });

  // back to top
  const toTop = $('toTop');
  addEventListener('scroll', debounce(() => { toTop.hidden = window.scrollY < 600; }, 80), { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' }));

  // step 3 tools
  $('listFilter').addEventListener('input', debounce(e => { listFilterText = e.target.value; renderShoppingList(false); }, 120));
  $('hideHaveChip').addEventListener('click', e => {
    hideHave = !hideHave;
    e.currentTarget.setAttribute('aria-pressed', String(hideHave));
    renderShoppingList(false);
  });
  $('staplesChip').addEventListener('click', markStaples);
  $('addItemForm').addEventListener('submit', e => {
    e.preventDefault();
    addCustomItem($('addItemName').value, $('addItemQty').value);
    e.target.reset();
    $('addItemName').focus();
  });
  $('selectedTags').addEventListener('click', e => { const b = e.target.closest('.tag-remove'); if (b) removeDish(b.dataset.key); });
  onActivate($('shoppingItems'), '.shopping-item', (el, e) => {
    if (e.target.closest('.item-del')) removeCustomItem(el.dataset.key);
    else toggleHave(el.dataset.key, el);
  });
  onActivate($('checklistItems'), '.checklist-item', el => toggleCheck(+el.dataset.idx, el));
  $('peoplePresets').addEventListener('click', e => { const c = e.target.closest('.chip'); if (c) setPeople(+c.dataset.n); });
  $('storeFilters').addEventListener('click', e => { const c = e.target.closest('.chip'); if (c) setStoreFilter(c.dataset.filter); });

  $('manualLocationInput').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); searchManualLocation(); } });
  $('navLogo').addEventListener('click', () => goToStep(0));
  $('navSteps').addEventListener('click', e => {
    const dot = e.target.closest('.nav-step-dot.done');     // only completed steps are clickable
    if (dot) goToStep(+dot.dataset.step);
  });

  addEventListener('resize', debounce(() => moveTabGlider(), 120));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => moveTabGlider());

  addEventListener('keydown', e => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (openModalEl === $('palette')) closeModal(); else openPalette();
      return;
    }
    if (e.key === 'Escape' && openModalEl) { closeModal(); return; }
    if (openModalEl) {                                  // keep Tab inside an open dialog
      if (e.key === 'Tab') {
        const f = [...openModalEl.querySelectorAll('button, input, [tabindex]:not([tabindex="-1"])')].filter(n => n.offsetParent !== null);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
      return;
    }
    if (e.key === '/' && !typing && currentStep === 1) { e.preventDefault(); $('searchInput').focus(); }
    else if (e.key === 'Escape' && currentStep === 1) {
      const search = $('searchInput');
      if (search.value) { search.value = ''; handleSearch(); }
      else if (currentCountry && !typing) showCountries();
      if (typing) search.blur();
    }
  });
}

/* ---------- boot ---------- */
function init() {
  initTheme();
  loadState();
  bindEvents();

  $('statCountries').dataset.count = COUNTRIES.length;
  $('statDishes').dataset.count = DISH_TOTAL;

  renderCountries();
  renderFeatured();
  updateResumeBanner();
  initRotator();
  updateSelectedSummary();
  $('btnToStep2').disabled = selected.size === 0;
  syncPeopleUI();
  initMarquee();
  initScrollFx();
  initPointerFx();
  runCounters();
  moveTabGlider();

  try { history.replaceState({ step: 0 }, '', location.pathname + location.search); } catch (e) { /* ignore */ }
}

init();
