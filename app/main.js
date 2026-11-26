// NusaData router and controls. Hash routes only — no network, no build step.
// Every control on every page works: metric and year switchers, the sector
// view toggle, the province search / filter / sort, and the work chart toggle.

import { SITE } from "./data.js";
import {
  renderOverview, renderEconomy, renderPeople, renderEducation,
  renderHealth, renderWork, renderSources,
  overviewChart, yearKpis, sectorChart, provinceTable, provinceRows, workChart,
} from "./views.js";

const view = document.getElementById("view");
const navLinks = [...document.querySelectorAll(".site-nav a")];

const state = {
  route: "#/",
  metric: "growth",
  year: 2024,
  sectorView: "share",
  workView: "rate",
  q: "",
  island: "All",
  sortKey: "pop",
  sortDir: -1,
};

const ROUTES = {
  "#/": { render: () => renderOverview(state), title: "Overview" },
  "#/economy": { render: () => renderEconomy(state), title: "Economy" },
  "#/people": { render: () => renderPeople(state), title: "People & places" },
  "#/education": { render: () => renderEducation(), title: "Education" },
  "#/health": { render: () => renderHealth(), title: "Health" },
  "#/work": { render: () => renderWork(state), title: "Work" },
  "#/sources": { render: () => renderSources(), title: "Sources & methods" },
};

function route() {
  const hash = location.hash || "#/";
  const key = ROUTES[hash] ? hash : "#/";
  state.route = key;
  view.innerHTML = ROUTES[key].render();
  document.title = `${ROUTES[key].title} — ${SITE.name}: ${SITE.tagline}`;
  for (const a of navLinks) {
    if (a.getAttribute("href") === key) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  }
  window.scrollTo(0, 0);
}

// One delegated listener for every button on the site.
document.addEventListener("click", (event) => {
  const metricBtn = event.target.closest("[data-metric]");
  if (metricBtn) {
    state.metric = metricBtn.dataset.metric;
    document.getElementById("metric-chart").innerHTML = overviewChart(state.metric);
    return;
  }
  const yearBtn = event.target.closest("[data-year]");
  if (yearBtn) {
    state.year = Number(yearBtn.dataset.year);
    document.getElementById("year-kpis").innerHTML = yearKpis(state.year);
    return;
  }
  const sectorBtn = event.target.closest("[data-sector-view]");
  if (sectorBtn) {
    state.sectorView = sectorBtn.dataset.sectorView;
    document.getElementById("sector-chart").innerHTML = sectorChart(state.sectorView);
    return;
  }
  const workBtn = event.target.closest("[data-work-view]");
  if (workBtn) {
    state.workView = workBtn.dataset.workView;
    document.getElementById("work-chart").innerHTML = workChart(state.workView);
    return;
  }
  const islandBtn = event.target.closest("[data-island]");
  if (islandBtn) {
    state.island = islandBtn.dataset.island;
    document.getElementById("prov-table").innerHTML = provinceTable(state);
    return;
  }
  const sortBtn = event.target.closest("[data-sort]");
  if (sortBtn) {
    const key = sortBtn.dataset.sort;
    if (state.sortKey === key) state.sortDir = -state.sortDir;
    else { state.sortKey = key; state.sortDir = key === "name" || key === "island" ? 1 : -1; }
    document.getElementById("prov-table").innerHTML = provinceTable(state);
    const input = document.getElementById("prov-search");
    if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
  }
});

// Province search filters as you type, without losing focus.
document.addEventListener("input", (event) => {
  if (event.target.id === "prov-search") {
    state.q = event.target.value;
    const body = document.getElementById("prov-body");
    if (body) body.innerHTML = provinceRows(state);
  }
});

window.addEventListener("hashchange", route);
route();
