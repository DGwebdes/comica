const STORAGE_KEY = 'xmen-tracker-v1';
import { eras } from "./data.js";


// ── State ──────────────────────────────────────────────────────────────
let readSet = new Set();

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const arr = JSON.parse(raw);
            readSet = new Set(arr);
        }
    } catch (e) { readSet = new Set(); }
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...readSet]));
}

// ── Helpers ────────────────────────────────────────────────────────────
function allIds() {
    const ids = [];
    eras.forEach(e => { [...e.core, ...e.tie].forEach(s => ids.push(s.id)); });
    return ids;
}

function eraIds(era) {
    return [...era.core, ...era.tie].map(s => s.id);
}

function updateGlobal() {
    const total = allIds().length;
    const read = allIds().filter(id => readSet.has(id)).length;
    const pct = total ? Math.round(read / total * 100) : 0;
    document.getElementById('global-bar').style.width = pct + '%';
    document.getElementById('global-label').textContent = `${read} / ${total} read`;
}

function updateEraPill(eraId, era) {
    const pill = document.querySelector(`[data-era-pill="${eraId}"]`);
    if (!pill) return;
    const ids = eraIds(era);
    const count = ids.filter(id => readSet.has(id)).length;
    pill.querySelector('.era-pill-count').textContent = `${count}/${ids.length}`;
    if (count > 0) pill.classList.add('has-read');
    else pill.classList.remove('has-read');
}

function updateEraProgress(eraId, era) {
    const bar = document.querySelector(`[data-era-progress="${eraId}"]`);
    if (!bar) return;
    const ids = eraIds(era);
    const count = ids.filter(id => readSet.has(id)).length;
    bar.style.width = ids.length ? (count / ids.length * 100) + '%' : '0%';
}

function updateCard(id) {
    const card = document.querySelector(`[data-series-id="${id}"]`);
    if (!card) return;
    if (readSet.has(id)) card.classList.add('read');
    else card.classList.remove('read');
}

function toggleRead(id, eraId, era) {
    if (readSet.has(id)) readSet.delete(id);
    else readSet.add(id);
    saveState();
    updateCard(id);
    updateEraPill(eraId, era);
    updateEraProgress(eraId, era);
    updateGlobal();
}

let toastTimer;
function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2000);
}

function markAllInView() {
    const ids = allIds();
    const allRead = ids.every(id => readSet.has(id));
    if (allRead) {
        showToast('Everything is already marked read');
        return;
    }
    ids.forEach(id => readSet.add(id));
    saveState();
    ids.forEach(id => updateCard(id));
    eras.forEach(e => { updateEraPill(e.id, e); updateEraProgress(e.id, e); });
    updateGlobal();
    showToast('All titles marked as read');
}

function showReset() { document.getElementById('confirm-overlay').classList.add('show'); }
function hideReset() { document.getElementById('confirm-overlay').classList.remove('show'); }

function resetAll() {
    readSet.clear();
    saveState();
    allIds().forEach(id => updateCard(id));
    eras.forEach(e => { updateEraPill(e.id, e); updateEraProgress(e.id, e); });
    updateGlobal();
    hideReset();
    showToast('Progress reset');
}

// ── Render ─────────────────────────────────────────────────────────────
function renderCard(series, eraId, era) {
    const card = document.createElement('div');
    card.className = 'series-card' + (readSet.has(series.id) ? ' read' : '');
    card.dataset.seriesId = series.id;
    card.setAttribute('role', 'checkbox');
    card.setAttribute('aria-checked', readSet.has(series.id) ? 'true' : 'false');
    card.setAttribute('tabindex', '0');
    card.title = 'Click to toggle read status';

    card.innerHTML = `
    <div class="read-stripe"></div>
    <div class="card-top">
      <div>
        <div class="series-title">${series.title} <span class="badge badge-${series.badge}">${series.badge.toUpperCase()}</span></div>
        <div class="series-range">${series.range}</div>
        ${series.note ? `<div class="series-note">${series.note}</div>` : ''}
      </div>
      <div class="check-icon" aria-hidden="true">
        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
          <path d="M1 3.5L3.5 6L8 1" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  `;

    const toggle = () => {
        const isNowRead = !readSet.has(series.id);
        card.setAttribute('aria-checked', isNowRead ? 'true' : 'false');
        toggleRead(series.id, eraId, era);
    };

    card.addEventListener('click', toggle);
    card.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); } });
    return card;
}

function renderEra(era) {
    const section = document.createElement('section');
    section.className = 'era';
    section.id = 'era-' + era.id;

    const header = document.createElement('div');
    header.className = 'era-header';
    header.innerHTML = `<span class="era-title">${era.title}</span><span class="era-dates">${era.dates}</span>`;
    section.appendChild(header);

    const desc = document.createElement('div');
    desc.className = 'era-desc';
    desc.textContent = era.desc;
    section.appendChild(desc);

    const progressWrap = document.createElement('div');
    progressWrap.className = 'era-progress-wrap';
    const ids = eraIds(era);
    const readCount = ids.filter(id => readSet.has(id)).length;
    const pct = ids.length ? (readCount / ids.length * 100) : 0;
    progressWrap.innerHTML = `<div class="era-progress-fill" data-era-progress="${era.id}" style="width:${pct}%"></div>`;
    section.appendChild(progressWrap);

    const cols = document.createElement('div');
    cols.className = 'columns';

    // Core column
    const coreCol = document.createElement('div');
    const coreLabel = document.createElement('div');
    coreLabel.className = 'col-label';
    coreLabel.textContent = 'Core Reading';
    coreCol.appendChild(coreLabel);
    const coreList = document.createElement('div');
    coreList.className = 'series-list';
    if (era.core.length) {
        era.core.forEach(s => coreList.appendChild(renderCard(s, era.id, era)));
    }
    coreCol.appendChild(coreList);
    cols.appendChild(coreCol);

    // Tie-in column
    const tieCol = document.createElement('div');
    const tieLabel = document.createElement('div');
    tieLabel.className = 'col-label';
    tieLabel.textContent = 'Companion Titles';
    tieCol.appendChild(tieLabel);
    const tieList = document.createElement('div');
    tieList.className = 'series-list';
    if (era.tie.length) {
        era.tie.forEach(s => tieList.appendChild(renderCard(s, era.id, era)));
    } else {
        tieList.innerHTML = `<div class="series-card" style="cursor:default;color:var(--text3);font-size:12px">None in this era</div>`;
    }
    tieCol.appendChild(tieList);
    cols.appendChild(tieCol);

    section.appendChild(cols);

    // Arcs
    if (era.arcs && era.arcs.length) {
        const arcsDiv = document.createElement('div');
        arcsDiv.style.marginTop = '12px';
        arcsDiv.innerHTML = `<div class="col-label" style="margin-bottom:6px">Key Storylines / Crossovers</div>
      <div class="arcs-section">${era.arcs.map(a => `<span class="arc-tag">${a}</span>`).join('')}</div>`;
        section.appendChild(arcsDiv);
    }

    return section;
}

// ── Build ──────────────────────────────────────────────────────────────
function build() {
    loadState();

    const nav = document.getElementById('era-nav');
    const container = document.getElementById('eras-container');

    eras.forEach((era, i) => {
        // Nav pill
        const pill = document.createElement('button');
        pill.className = 'era-pill' + (eraIds(era).some(id => readSet.has(id)) ? ' has-read' : '');
        pill.dataset.eraPill = era.id;
        const shortTitle = era.title.split('/')[0].trim().split(' ').slice(0, 4).join(' ');
        const ids = eraIds(era);
        const readCount = ids.filter(id => readSet.has(id)).length;
        pill.innerHTML = `${shortTitle} <span class="era-pill-count">${readCount}/${ids.length}</span>`;
        pill.onclick = () => document.getElementById('era-' + era.id).scrollIntoView({ behavior: 'smooth', block: 'start' });
        nav.appendChild(pill);

        // Era section
        container.appendChild(renderEra(era));

        if (i < eras.length - 1) {
            const hr = document.createElement('hr');
            hr.className = 'era-divider';
            container.appendChild(hr);
        }
    });

    updateGlobal();
}

build();