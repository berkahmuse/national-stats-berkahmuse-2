// Page renderers for NusaData. Each returns an HTML string for #view.
// Interactive regions carry stable ids; main.js wires the controls.

import {
  SITE, HEADLINE, GDP_GROWTH, POPULATION, INFLATION, POVERTY, UNEMPLOYMENT,
  YEAR_HEADLINES, SECTORS, EXPENDITURE, TRADE, AGE_GROUPS, PROVINCES,
  DEMOGRAPHICS, EDUCATION, HEALTH, WORK, SOURCES,
} from "./data.js";
import { barChart, lineChart, hbarChart, donut } from "./charts.js";

function kpiCard(item) {
  return `<article class="kpi"><p class="kpi-value">${item.value}</p>` +
    `<p class="kpi-label">${item.label}</p><p class="kpi-sub">${item.sub}</p>` +
    `<p class="kpi-source">${item.source}</p></article>`;
}

function kpiGrid(items) {
  return `<div class="kpi-grid">${items.map(kpiCard).join("")}</div>`;
}

function head(title, sub) {
  return `<header class="page-head"><h1>${title}</h1><p>${sub}</p></header>`;
}

function srcLine(text) {
  return `<p class="src-line">Source: ${text}</p>`;
}

function chartCard(title, body, source, controls = "") {
  return `<section class="card chart-card"><div class="card-head"><h2>${title}</h2>${controls}</div>` +
    `<div class="chart">${body}</div>${srcLine(source)}</section>`;
}

// ---- Overview -------------------------------------------------------------

const METRICS = {
  growth: {
    label: "GDP growth", series: GDP_GROWTH, unit: "%",
    kind: "bar", source: "BPS, real GDP growth 2015–2024.",
    note: "Growth stayed above 5% in 2022, 2023 and 2024 — the only dip in the decade was the pandemic year 2020.",
  },
  population: {
    label: "Population", series: POPULATION, unit: "m",
    kind: "line", format: (v) => v.toFixed(0), source: "World Bank WDI, rounded to the nearest million.",
    note: "Indonesia passed 280 million people in 2024 and is the world's fourth most populous country.",
  },
  inflation: {
    label: "Inflation", series: INFLATION, unit: "%",
    kind: "bar", source: "BPS, consumer price index, December year-on-year.",
    note: "Inflation spiked to 5.51% in 2022, then fell back to 1.57% by December 2024.",
  },
  poverty: {
    label: "Poverty rate", series: POVERTY, unit: "%",
    kind: "line", format: (v) => v.toFixed(2), source: "BPS, September of each year, national poverty line.",
    note: "Poverty fell to 8.57% in September 2024 — the lowest rate in the series.",
  },
};

export function overviewChart(metric) {
  const m = METRICS[metric];
  const body = m.kind === "bar"
    ? barChart(m.series, { unit: m.unit, format: m.format })
    : lineChart(m.series, { unit: m.unit, format: m.format });
  const buttons = Object.entries(METRICS).map(([key, val]) =>
    `<button type="button" class="chip${key === metric ? " on" : ""}" data-metric="${key}">${val.label}</button>`).join("");
  return chartCard(m.label + ", 2015–2024", body, m.source, `<div class="chip-row" role="group" aria-label="Choose indicator">${buttons}</div>`) +
    `<p class="note">${m.note}</p>`;
}

export function renderOverview(state) {
  return head("Indonesia in numbers", "The country at a glance — population, economy, and everyday life, with every figure sourced and dated.") +
    kpiGrid(HEADLINE) +
    `<div id="metric-chart">${overviewChart(state.metric)}</div>` +
    `<section class="card"><h2>Three things to know</h2><ol class="takeaways">` +
    `<li><strong>Java holds about 54% of all Indonesians</strong> on roughly 7% of the country's land — West Java alone (50.3 million people) is more populous than Spain.</li>` +
    `<li><strong>Growth has held above 5%</strong> for three straight years (2022–2024), while inflation fell to 1.57% and poverty to 8.57%.</li>` +
    `<li><strong>The economy is still industrialising:</strong> manufacturing is the largest sector at 19.0% of GDP, ahead of trade (13.1%) and agriculture (12.6%).</li>` +
    `</ol>${srcLine("BPS and World Bank, 2024. See the Sources page for the full list.")}</section>` +
    `<section class="card"><h2>Explore the numbers</h2><div class="link-cards">` +
    `<a class="link-card" href="#/economy"><strong>Economy</strong><span>GDP, sectors, trade and prices</span></a>` +
    `<a class="link-card" href="#/people"><strong>People &amp; places</strong><span>Population, age, and the 11 largest provinces</span></a>` +
    `<a class="link-card" href="#/education"><strong>Education</strong><span>Literacy, schooling and skills</span></a>` +
    `<a class="link-card" href="#/health"><strong>Health</strong><span>How long people live, and how healthy</span></a>` +
    `<a class="link-card" href="#/work"><strong>Work</strong><span>Jobs, pay gaps and the informal economy</span></a>` +
    `<a class="link-card" href="#/sources"><strong>Sources</strong><span>Where every figure comes from</span></a>` +
    `</div></section>`;
}

// ---- Economy --------------------------------------------------------------

export function yearKpis(year) {
  return `<div class="chip-row" role="group" aria-label="Choose year">` +
    [2022, 2023, 2024].map((y) =>
      `<button type="button" class="chip${y === year ? " on" : ""}" data-year="${y}">${y}</button>`).join("") +
    `</div>` + kpiGrid(YEAR_HEADLINES[year]);
}

export function sectorChart(view) {
  const items = [...SECTORS].sort((a, b) => b.share - a.share);
  const body = view === "value"
    ? hbarChart(items, { format: (v) => "Rp " + v.toLocaleString("en-US") + "tn", max: 4500 })
    : hbarChart(items.map((d) => ({ name: d.name, value: d.share })), { format: (v) => v.toFixed(1) + "%", max: 20 });
  const buttons = `<button type="button" class="chip${view === "share" ? " on" : ""}" data-sector-view="share">Share of GDP</button>` +
    `<button type="button" class="chip${view === "value" ? " on" : ""}" data-sector-view="value">Value, Rp trillion</button>`;
  return chartCard("What the economy is made of — 2024", body,
    "BPS, GDP by sector at current prices, 2024. “Other services” is the residual to 100% (health, arts, household services).",
    `<div class="chip-row" role="group" aria-label="Choose measure">${buttons}</div>`);
}

export function renderEconomy(state) {
  return head("Economy", "How big the economy is, what drives it, and what households and the government spend.") +
    `<section class="card"><div class="card-head"><h2>Headline indicators</h2></div><div id="year-kpis">${yearKpis(state.year)}</div></section>` +
    `<div id="sector-chart">${sectorChart(state.sectorView)}</div>` +
    chartCard("Where the money goes — GDP by expenditure, 2024",
      hbarChart(EXPENDITURE.map((d) => ({ name: d.name, value: d.share })), {
        format: (v) => (v > 0 ? "+" : "") + v.toFixed(1) + "%", max: 60,
      }),
      "BPS (household consumption) and IMF WEO (investment, government consumption); World Bank (exports, imports). The five parts do not sum to 100%: inventories and the statistical discrepancy make up the rest.") +
    `<section class="card"><h2>Trade &amp; money</h2>${kpiGrid(TRADE)}</section>`;
}

// ---- People ---------------------------------------------------------------

export function provinceRows(state) {
  const q = state.q.trim().toLowerCase();
  let rows = PROVINCES.filter((p) =>
    (state.island === "All" || p.island === state.island) &&
    (!q || p.name.toLowerCase().includes(q)));
  const dir = state.sortDir;
  rows = [...rows].sort((a, b) => {
    if (state.sortKey === "name") return dir * a.name.localeCompare(b.name);
    if (state.sortKey === "island") return dir * a.island.localeCompare(b.island);
    if (state.sortKey === "share") return dir * ((a.pop / 283.5) - (b.pop / 283.5));
    return dir * (a.pop - b.pop);
  });
  if (rows.length === 0) return `<tr><td colspan="4" class="empty">No province matches that search.</td></tr>`;
  // Rank is always the population rank (West Java is 1), whatever the sort.
  return rows.map((p) => {
    const rank = PROVINCES.indexOf(p) + 1;
    return `<tr><td>${rank}</td><td>${p.name}</td><td>${p.island}</td>` +
      `<td class="num">${p.pop.toFixed(1)}m</td><td class="num">${(p.pop / 283.5 * 100).toFixed(1)}%</td></tr>`;
  }).join("");
}

export function provinceTable(state) {
  const arrow = (key) => state.sortKey === key ? (state.sortDir === 1 ? " ▲" : " ▼") : "";
  const chips = ["All", "Java", "Sumatra", "Sulawesi"].map((isl) =>
    `<button type="button" class="chip${state.island === isl ? " on" : ""}" data-island="${isl}">${isl}</button>`).join("");
  return `<div class="table-tools"><label class="search">Search provinces <input type="search" id="prov-search" value="${state.q.replace(/"/g, "&quot;")}" placeholder="Type a name…" aria-label="Search provinces"></label>` +
    `<div class="chip-row" role="group" aria-label="Filter by island">${chips}</div></div>` +
    `<div class="table-wrap"><table class="data-table"><thead><tr>` +
    `<th>#</th><th><button type="button" class="th-btn" data-sort="name">Province${arrow("name")}</button></th>` +
    `<th><button type="button" class="th-btn" data-sort="island">Island${arrow("island")}</button></th>` +
    `<th class="num"><button type="button" class="th-btn" data-sort="pop">Population${arrow("pop")}</button></th>` +
    `<th class="num"><button type="button" class="th-btn" data-sort="share">Share${arrow("share")}</button></th>` +
    `</tr></thead><tbody id="prov-body">${provinceRows(state)}</tbody></table></div>` +
    srcLine("BPS mid-year estimates, 2024, rounded to 0.1 million. Shares are of the national total of 283.5 million (World Bank, 2024).");
}

export function renderPeople(state) {
  return head("People & places", "Who lives in Indonesia, how old they are, where they live — and which provinces hold the most people.") +
    chartCard("Population, 2015–2024 (millions)",
      lineChart(POPULATION, { unit: "m", format: (v) => v.toFixed(0) }),
      "World Bank WDI, rounded to the nearest million.") +
    `<section class="card"><h2>Age structure, 2024</h2><div class="age-grid">` +
    AGE_GROUPS.map((a) => `<div class="age-row"><span>${a.group}</span>${donut(a.pct)}<span class="age-people">${a.people} people</span></div>`).join("") +
    `</div>${srcLine("World Bank WDI, 2024. Two in three Indonesians are of working age (15–64).")}</section>` +
    kpiGrid(DEMOGRAPHICS) +
    `<section class="card"><h2>The 11 largest provinces</h2><p class="card-intro">Sort the table, search it, or filter by island. Together these 11 provinces hold about 74% of the country.</p><div id="prov-table">${provinceTable(state)}</div></section>`;
}

// ---- Education ------------------------------------------------------------

export function renderEducation() {
  return head("Education", "How much schooling Indonesians get, and how well the youngest can read and write.") +
    kpiGrid(EDUCATION) +
    chartCard("Years of schooling",
      hbarChart([
        { name: "Expected years of schooling", value: 13.7 },
        { name: "Mean years of schooling (adults 25+)", value: 8.6 },
      ], { format: (v) => v.toFixed(1) + " yrs", max: 15 }),
      "UNDP Human Development Report, 2023. A child starting school today can expect 13.7 years of education; adults over 25 average 8.6 — the gap is the story of Indonesia's schooling expansion.") +
    `<section class="card"><h2>Reading the numbers</h2><ul class="bullets">` +
    `<li><strong>Youth literacy is near-universal</strong> at 99.8% — almost every Indonesian aged 15–24 can read and write.</li>` +
    `<li><strong>Schooling keeps lengthening:</strong> expected years of schooling (13.7) is five years more than the average adult actually received (8.6).</li>` +
    `<li><strong>Higher education is still selective:</strong> only about a third of tertiary-age Indonesians are enrolled.</li>` +
    `</ul>${srcLine("World Bank WDI 2020–2022; UNDP 2023.")}</section>`;
}

// ---- Health ---------------------------------------------------------------

export function renderHealth() {
  return head("Health", "How long Indonesians live, what threatens them early in life, and what care is available.") +
    kpiGrid(HEALTH.slice(0, 6)) +
    chartCard("Life expectancy at birth, 2023 (years)",
      hbarChart([
        { name: "Women", value: 73.4 },
        { name: "Total", value: 71.2 },
        { name: "Men", value: 69.2 },
      ], { format: (v) => v.toFixed(1) + " yrs", max: 80 }),
      "World Bank WDI, 2023. Indonesian women outlive men by 4.2 years.") +
    `<section class="card"><h2>Care on the ground</h2>${kpiGrid(HEALTH.slice(6))}` +
    `<p class="note">Stunting — children under five who are short for their age — fell to 19.8% in 2024, but still affects about one child in five. There is roughly one doctor for every 2,000 people.</p></section>`;
}

// ---- Work -----------------------------------------------------------------

export function workChart(view) {
  if (view === "change") {
    const series = UNEMPLOYMENT.slice(1).map((d, i) => ({
      year: d.year, value: +(d.value - UNEMPLOYMENT[i].value).toFixed(2),
    }));
    return chartCard("Unemployment: change vs previous year (percentage points)",
      barChart(series, { unit: "pp", format: (v) => (v > 0 ? "+" : "") + v.toFixed(2) }),
      "Computed from BPS unemployment, August of each year. Negative bars mean unemployment fell.",
      `<div class="chip-row" role="group" aria-label="Choose view"><button type="button" class="chip" data-work-view="rate">Rate</button><button type="button" class="chip on" data-work-view="change">Yearly change</button></div>`);
  }
  return chartCard("Unemployment rate, 2015–2024 (%)",
    barChart(UNEMPLOYMENT, { unit: "%", format: (v) => v.toFixed(2) }),
    "BPS, August of each year. The 2020 spike is the pandemic; by 2024 unemployment was at its lowest in the series.",
    `<div class="chip-row" role="group" aria-label="Choose view"><button type="button" class="chip on" data-work-view="rate">Rate</button><button type="button" class="chip" data-work-view="change">Yearly change</button></div>`);
}

export function renderWork(state) {
  return head("Work", "Who works, who is looking for work, and how most Indonesians actually earn a living.") +
    kpiGrid(WORK.slice(0, 4)) +
    `<div id="work-chart">${workChart(state.workView)}</div>` +
    `<section class="card"><h2>How work really looks</h2>${kpiGrid(WORK.slice(4))}` +
    `<p class="note">Nearly six in ten workers are informal — no contract, no payslip, no social security. That is why the headline unemployment rate (4.91%) tells only part of the story: most Indonesians work, but often without formal protection.</p></section>`;
}

// ---- Sources --------------------------------------------------------------

export function renderSources() {
  return head("Sources & methods", "Every figure on this site, where it came from, and what to know before quoting it.") +
    `<section class="card"><h2>How to read this site</h2><ul class="bullets">` +
    `<li>Every figure names its publisher and year where it appears.</li>` +
    `<li>Where publishers disagree, the page says which one it follows — for example, population uses the World Bank's 283.5 million for 2024, while BPS's own mid-year estimate is close but not identical.</li>` +
    `<li>Figures are as published. Nothing here is forecast, modelled by this site, or adjusted — except the “Other services” sector share, which is the residual to 100% and is labelled as such.</li>` +
    `<li>Figures were last checked on ${SITE.updated}.</li>` +
    `</ul></section>` +
    `<section class="card"><h2>Sources</h2><dl class="sources">` +
    SOURCES.map((s) => `<div class="source-row"><dt>${s.publisher}</dt><dd><strong>Covers:</strong> ${s.covers}<br><strong>Years:</strong> ${s.years}<br><em>${s.note}</em></dd></div>`).join("") +
    `</dl></section>` +
    `<section class="card"><h2>About ${SITE.name}</h2><p>${SITE.note} ${SITE.name} is an independent project built to make Indonesia's official statistics easier to explore. If you spot a figure that looks wrong, check the source named beside it first — the publisher's release is the authority, not this page.</p></section>`;
}
