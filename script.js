const STORAGE_KEY = 'xmen-tracker-v1';

const eras = [
    {
        id: "silver",
        title: "The Silver Age / Original X-Men",
        dates: "1963–1969",
        desc: "Stan Lee and Jack Kirby introduce Professor Xavier's original five. Sales were modest and the book was eventually placed on hiatus. Essential for origin context but slow-paced by modern standards.",
        core: [
            { id: "s01", title: "X-Men (vol. 1)", range: "#1–66 (1963–1970)", note: "Original series; becomes reprints after #67", badge: "core" },
        ],
        tie: []
    },
    {
        id: "giant",
        title: "Giant-Size Revival & Bronze Age",
        dates: "1975–1981",
        desc: "Giant-Size X-Men #1 relaunches the concept with an international team. Claremont and Cockrum/Byrne define the X-Men as we know them. Uncanny X-Men becomes the #1 book in comics.",
        core: [
            { id: "g01", title: "Giant-Size X-Men", range: "#1 (1975)", note: "Introduces Wolverine, Storm, Colossus, Nightcrawler", badge: "core" },
            { id: "g02", title: "Uncanny X-Men", range: "#94–143 (1975–1981)", note: "Claremont era begins; Phoenix Saga, Days of Future Past", badge: "core" },
        ],
        tie: [],
        arcs: ["Dark Phoenix Saga (#129–138)", "Days of Future Past (#141–142)"]
    },
    {
        id: "claremont",
        title: "The Claremont Golden Age",
        dates: "1981–1991",
        desc: "The franchise explodes. New Mutants and X-Factor launch alongside Uncanny. Mutant Massacre, Fall of the Mutants, Inferno, and Acts of Vengeance define 80s Marvel.",
        core: [
            { id: "c01", title: "Uncanny X-Men", range: "#144–280 (1981–1991)", note: "Flagship; core reading throughout this era", badge: "core" },
            { id: "c02", title: "New Mutants (vol. 1)", range: "#1–100 (1983–1991)", note: "Xavier's next class; leads into X-Force", badge: "core" },
            { id: "c03", title: "X-Factor (vol. 1)", range: "#1–70 (1986–1991)", note: "Original X-Men reunited; essential for Apocalypse intro", badge: "core" },
        ],
        tie: [
            { id: "c04", title: "Wolverine (vol. 2)", range: "#1–57 (1988–1992)", note: "Solo title; mostly standalone", badge: "tie" },
            { id: "c05", title: "X-Men: Classic", range: "#1–110 (1986–1995)", note: "Reprints with new framing — skip unless collecting", badge: "tie" },
        ],
        arcs: ["Mutant Massacre (UXM #210–213, XF #9–11, NM #46)", "Fall of the Mutants (UXM #225–227, XF #24–26, NM #59–61)", "Inferno (UXM #239–243, XF #33–40, NM #71–73)"]
    },
    {
        id: "nineties",
        title: "The X-Men Expansion Era",
        dates: "1991–2001",
        desc: "Jim Lee's X-Men #1 sells 8 million copies. The line balloons to a dozen titles. X-Cutioner's Song, Age of Apocalypse, Onslaught, and Operation: Zero Tolerance are the key crossovers. Quality is uneven — pick your battles.",
        core: [
            { id: "n01", title: "X-Men (vol. 2)", range: "#1–113 (1991–2001)", note: "Jim Lee launch; Blue team. Read alongside Uncanny", badge: "core" },
            { id: "n02", title: "Uncanny X-Men", range: "#281–390 (1991–2001)", note: "Gold team. Continues as co-flagship", badge: "core" },
            { id: "n03", title: "X-Factor (vol. 1)", range: "#71–149 (1991–1998)", note: "Peter David's acclaimed run #71–89 & 100+", badge: "core" },
            { id: "n04", title: "Generation X", range: "#1–75 (1994–2001)", note: "Next generation; Banshee & Emma Frost lead", badge: "core" },
            { id: "n05", title: "Excalibur", range: "#1–125 (1988–1998)", note: "British-based team; quirky tone, Alan Davis highlights", badge: "tie" },
        ],
        tie: [
            { id: "n06", title: "X-Force (vol. 1)", range: "#1–129 (1991–2002)", note: "Cable leads; grim/gritty New Mutants successor", badge: "tie" },
            { id: "n07", title: "Cable (vol. 1)", range: "#1–107 (1993–2002)", note: "Solo series; catch key crossover chapters", badge: "tie" },
            { id: "n08", title: "Wolverine (vol. 2)", range: "#58–189 (1992–2002)", note: "Lengthy solo run through the era", badge: "tie" },
            { id: "n09", title: "X-Man", range: "#1–75 (1995–2001)", note: "AoA Nate Grey; interesting alternate take", badge: "tie" },
        ],
        arcs: ["X-Cutioner's Song (1992–1993)", "Fatal Attractions (1993)", "Age of Apocalypse (1995 — full line relaunch)", "Onslaught Saga (1996)", "Operation: Zero Tolerance (1997)"]
    },
    {
        id: "morrison",
        title: "Marvel Knights / Morrison Reinvention",
        dates: "2001–2004",
        desc: "Grant Morrison's New X-Men redefines the franchise for a new generation. Best era to start reading if new to X-Men.",
        core: [
            { id: "m01", title: "New X-Men (Morrison)", range: "#114–154 (2001–2004)", note: "Morrison's complete run — read this first above all", badge: "core" },
            { id: "m02", title: "Uncanny X-Men", range: "#391–443 (2001–2004)", note: "Casey (#391–409) and Austen (#410–443) runs", badge: "core" },
            { id: "m03", title: "X-Treme X-Men", range: "#1–46 (2001–2004)", note: "Claremont returns with Storm-led team", badge: "tie" },
        ],
        tie: [
            { id: "m04", title: "Wolverine (vol. 3)", range: "#1–32 (2003–2005)", note: "Rucka's espionage-tinged solo run", badge: "tie" },
            { id: "m05", title: "X-Statix", range: "#1–26 (2002–2004)", note: "Milligan/Allred satirical spin-off, excellent standalone", badge: "tie" },
        ],
        arcs: ["E Is for Extinction (#114–116)", "Planet X (#146–150)", "Assault on Weapon Plus (#142–145)"]
    },
    {
        id: "astonishing",
        title: "Astonishing Era & House of M",
        dates: "2004–2007",
        desc: "Joss Whedon's Astonishing X-Men is a love letter to classic X-Men. House of M and Decimation reshape the mutant population to 198 survivors.",
        core: [
            { id: "a01", title: "Astonishing X-Men (Whedon)", range: "#1–24 + Giant-Size (2004–2008)", note: "Whedon/Cassaday; essential, self-contained", badge: "core" },
            { id: "a02", title: "House of M", range: "#1–8 + tie-ins (2005)", note: "Scarlet Witch rewrites reality; 'No more mutants'", badge: "event" },
            { id: "a03", title: "Uncanny X-Men", range: "#444–544 (2004–2011)", note: "Brubaker (#444–486) and Fraction (#500–534) runs", badge: "core" },
            { id: "a04", title: "X-Men: Deadly Genesis", range: "#1–6 (2006)", note: "Brubaker retcon; ties into Havok/Vulcan arc", badge: "core" },
        ],
        tie: [
            { id: "a05", title: "X-Men (vol. 2)", range: "#157–207 (2004–2007)", note: "Various writers; declining quality post-Decimation", badge: "tie" },
            { id: "a06", title: "New X-Men: Academy X", range: "#1–46 (2004–2008)", note: "Next generation of students at Xavier's", badge: "tie" },
            { id: "a07", title: "X-Factor (vol. 3)", range: "#1–50 (2005–2009)", note: "Peter David returns with X-Factor Investigations — superb", badge: "tie" },
        ],
        arcs: ["Decimation (post-House of M, 2005–2006)", "Rise and Fall of the Shi'ar Empire (#155–167 UXM)", "Messiah Complex (2007–2008)"]
    },
    {
        id: "schism",
        title: "Utopia, Schism & AvX",
        dates: "2008–2012",
        desc: "Cyclops moves to San Francisco, then Utopia. A major split between Cyclops and Wolverine. Avengers vs. X-Men ends with the Phoenix Force's return.",
        core: [
            { id: "sc01", title: "Uncanny X-Men", range: "#500–544 (2008–2011)", note: "Fraction run; Utopia arc is the highlight", badge: "core" },
            { id: "sc02", title: "X-Men: Legacy", range: "#208–275 (2008–2012)", note: "Rogue and Magneto focus; Carey's excellent run", badge: "core" },
            { id: "sc03", title: "New Mutants (vol. 3)", range: "#1–50 (2009–2012)", note: "Original team returns", badge: "tie" },
            { id: "sc04", title: "X-Men: Schism", range: "#1–5 (2011)", note: "Event that splits the team; required", badge: "event" },
            { id: "sc05", title: "Avengers vs. X-Men", range: "#0–12 (2012)", note: "Phoenix Force returns; reshapes the MU", badge: "event" },
        ],
        tie: [
            { id: "sc06", title: "X-Force (vol. 3)", range: "#1–28 (2008–2010)", note: "Kyle/Yost black-ops team; dark, violent", badge: "tie" },
            { id: "sc07", title: "X-Factor (vol. 3)", range: "#50–262 (2009–2013)", note: "Peter David continues; strongest long-running tie-in", badge: "tie" },
            { id: "sc08", title: "Generation Hope", range: "#1–17 (2011–2012)", note: "Hope Summers and the new Five Lights", badge: "tie" },
            { id: "sc09", title: "Wolverine and the X-Men (vol. 1)", range: "#1–42 (2011–2014)", note: "Aaron's fun post-Schism school series", badge: "tie" },
        ],
        arcs: ["Messiah War (2009)", "Second Coming (2010)", "Avengers vs. X-Men (2012)"]
    },
    {
        id: "marvel_now",
        title: "Marvel NOW! & All-New",
        dates: "2012–2015",
        desc: "Brian Michael Bendis takes over. Original five brought to the present. Brian Wood writes an acclaimed adjective-less X-Men. The era culminates in Secret Wars.",
        core: [
            { id: "mn01", title: "All-New X-Men (vol. 1)", range: "#1–41 (2012–2015)", note: "Bendis brings original five to present day", badge: "core" },
            { id: "mn02", title: "Uncanny X-Men (vol. 3)", range: "#1–35 (2013–2015)", note: "Bendis's Cyclops revolution; reads alongside All-New", badge: "core" },
            { id: "mn03", title: "X-Men (vol. 4)", range: "#1–26 (2013–2015)", note: "Brian Wood; all-female team, standout run", badge: "core" },
            { id: "mn04", title: "Wolverine and the X-Men (vol. 1)", range: "#1–42 (2011–2014)", note: "Jason Aaron's anarchic Jean Grey School", badge: "tie" },
        ],
        tie: [
            { id: "mn05", title: "Uncanny X-Force (vol. 1)", range: "#1–35 (2010–2012)", note: "Remender's acclaimed black-ops run; one of the best", badge: "tie" },
            { id: "mn06", title: "Uncanny X-Force (vol. 2)", range: "#1–17 (2013–2014)", note: "Humphries; Storm leads new team", badge: "tie" },
            { id: "mn07", title: "X-Factor (vol. 3)", range: "#200–262 (2011–2013)", note: "Peter David concludes his definitive run", badge: "tie" },
            { id: "mn08", title: "Amazing X-Men", range: "#1–19 (2014–2015)", note: "Aaron; Nightcrawler returns from death", badge: "tie" },
        ],
        arcs: ["Battle of the Atom (2013)", "Black Vortex (2015)", "Secret Wars (2015 — line-wide event)"]
    },
    {
        id: "resurrxion",
        title: "ResurrXion & Death of X",
        dates: "2016–2018",
        desc: "Post-Secret Wars, the X-Men deal with the Terrigen Mists. Death of X clarifies Cyclops's fate. ResurrXion relaunches the entire line.",
        core: [
            { id: "r01", title: "Extraordinary X-Men", range: "#1–20 (2015–2017)", note: "Storm leads remaining mutants to X-Haven", badge: "core" },
            { id: "r02", title: "Death of X", range: "#1–4 (2016)", note: "Clarifies Cyclops's death; essential context", badge: "event" },
            { id: "r03", title: "X-Men: Blue", range: "#1–36 (2017–2018)", note: "Original five; Bunn", badge: "core" },
            { id: "r04", title: "X-Men: Gold", range: "#1–36 (2017–2018)", note: "Kitty Pryde leads classic team", badge: "core" },
            { id: "r05", title: "Weapon X (vol. 3)", range: "#1–27 (2017–2018)", note: "Old Man Logan and Sabretooth", badge: "tie" },
        ],
        tie: [
            { id: "r06", title: "Jean Grey", range: "#1–11 (2017–2018)", note: "Young Jean faces the Phoenix; solid mini", badge: "tie" },
            { id: "r07", title: "Iceman (vol. 3)", range: "#1–11 (2017–2018)", note: "Bobby Drake comes out; important character work", badge: "tie" },
            { id: "r08", title: "Generation X (vol. 2)", range: "#1–87 (2017)", note: "Jubilee teaches young mutants; underrated", badge: "tie" },
            { id: "r09", title: "Astonishing X-Men (vol. 4)", range: "#1–12 (2017–2018)", note: "Soule; Psylocke leads team against Shadow King", badge: "tie" },
        ],
        arcs: ["Inhumans vs. X-Men (2016–2017)", "X-Men: Disassembled (Uncanny vol. 5 #1–10, 2018)"]
    },
    {
        id: "hox",
        title: "House of X / Powers of X & Krakoa Era",
        dates: "2019–2024",
        desc: "Jonathan Hickman's House of X / Powers of X is a genuine paradigm shift. Mutants establish Krakoa, a sovereign nation. Read HoX/PoX before anything else in this era.",
        core: [
            { id: "h01", title: "House of X / Powers of X", range: "#1–6 each (2019)", note: "Read interlaced per release order. Essential.", badge: "core" },
            { id: "h02", title: "X-Men (vol. 5, Hickman)", range: "#1–21 (2019–2021)", note: "Hickman's main Krakoa series; anthology feel", badge: "core" },
            { id: "h03", title: "Marauders (vol. 1)", range: "#1–27 (2019–2021)", note: "Kate Pryde and Emma Frost; fan favorite Krakoa title", badge: "core" },
            { id: "h04", title: "X-Force (vol. 6)", range: "#1–50 (2019–2023)", note: "Percy's spy-thriller black-ops; one of the best Krakoa books", badge: "core" },
            { id: "h05", title: "Inferno (Hickman)", range: "#1–4 (2021–2022)", note: "Hickman's Krakoa conclusion; read after vol.5 ends", badge: "event" },
        ],
        tie: [
            { id: "h06", title: "New Mutants (vol. 4)", range: "#1–33 (2019–2022)", note: "Hickman #1–6 + Ayala continues; wildly fun", badge: "tie" },
            { id: "h07", title: "Excalibur (vol. 4)", range: "#1–26 (2019–2022)", note: "Betsy Braddock as Captain Britain; magical", badge: "tie" },
            { id: "h08", title: "Wolverine (vol. 7)", range: "#1–50 (2020–2023)", note: "Percy's Logan in the Krakoa era; essential X-Force companion", badge: "tie" },
            { id: "h09", title: "Cable (vol. 4)", range: "#1–12 (2020–2021)", note: "Young Cable in the Krakoa era", badge: "tie" },
            { id: "h10", title: "Way of X", range: "#1–6 (2021)", note: "Nightcrawler on mutant spirituality; superb", badge: "tie" },
            { id: "h11", title: "X-Corp", range: "#1–5 (2021)", note: "Monet and Angel run a mutant mega-corp", badge: "tie" },
            { id: "h12", title: "S.W.O.R.D. (vol. 2)", range: "#1–11 (2021–2022)", note: "Al Ewing; X-Men in space", badge: "tie" },
        ],
        arcs: ["X of Swords (2020 — full crossover)", "X Deaths / X Lives of Wolverine (2022)", "Judgment Day (2022)", "Sins of Sinister (2023)", "Fall of X (2023–2024)"]
    },
    {
        id: "from_the_ashes",
        title: "From the Ashes (Post-Krakoa)",
        dates: "2024–2026",
        desc: "After the Fall of X, the line relaunches under 'From the Ashes.' Multiple new #1s reimagine the X-Men's place in the Marvel Universe. This era is ongoing as of mid-2026.",
        core: [
            { id: "f01", title: "X-Men (vol. 7)", range: "#1–ongoing (2024–)", note: "Jed MacKay leads; primary flagship post-Krakoa", badge: "core" },
            { id: "f02", title: "Uncanny X-Men (vol. 6)", range: "#1–ongoing (2024–)", note: "Gail Simone's acclaimed revival; co-flagship", badge: "core" },
            { id: "f03", title: "Exceptional X-Men", range: "#1–ongoing (2024–)", note: "Emma Frost mentors new team; Eve L. Ewing", badge: "core" },
            { id: "f04", title: "NYX (vol. 2)", range: "#1–ongoing (2024–)", note: "Young mutants in NYC; street-level focus", badge: "core" },
        ],
        tie: [
            { id: "f05", title: "Phoenix (vol. 2)", range: "#1–ongoing (2024–)", note: "Jean Grey as Phoenix; cosmic scale", badge: "tie" },
            { id: "f06", title: "Wolverine (vol. 8)", range: "#1–ongoing (2024–)", note: "Saladin Ahmed; new chapter for Logan", badge: "tie" },
            { id: "f07", title: "Magik", range: "#1–ongoing (2024–)", note: "Illyana solo; dark fantasy tone", badge: "tie" },
            { id: "f08", title: "X-Factor (vol. 4)", range: "#1–ongoing (2025–)", note: "Mark Russell; new investigative team", badge: "tie" },
        ],
        arcs: ["From the Ashes launch event (2024)", "Blood Hunt tie-ins (2024)", "One World Under Doom tie-ins (2025–2026)"]
    }
];

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