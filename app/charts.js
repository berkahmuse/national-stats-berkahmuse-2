// Hand-rolled SVG charts. No library, no network: every chart is drawn from
// the numbers in data.js and rendered as inline SVG.

const C = {
  pine: "#0e4f45",
  pineLight: "#177064",
  amber: "#d97b29",
  amberLight: "#e8a33d",
  sage: "#7fae9e",
  slate: "#5b6b66",
  grid: "#e3ddd0",
  ink: "#1e2422",
  muted: "#6b7571",
  negative: "#b3402e",
};

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function niceMax(max) {
  if (max <= 0) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(max)));
  const n = max / p;
  const steps = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
  for (const s of steps) if (n <= s) return s * p;
  return 10 * p;
}

function niceMin(min) {
  if (min >= 0) return 0;
  const p = Math.pow(10, Math.floor(Math.log10(Math.abs(min))));
  const n = Math.abs(min) / p;
  const steps = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
  for (const s of steps) if (n <= s) return -s * p;
  return -10 * p;
}

// Vertical bar chart. series: [{year, value}], unit: suffix shown on labels.
export function barChart(series, { unit = "%", color = C.pine, height = 260, format = (v) => v.toFixed(2) } = {}) {
  const W = 720, H = height, padL = 44, padR = 12, padT = 26, padB = 30;
  const vals = series.map((d) => d.value);
  const lo = niceMin(Math.min(...vals));
  const hi = niceMax(Math.max(...vals));
  const iw = W - padL - padR, ih = H - padT - padB;
  const y = (v) => padT + ((hi - v) / (hi - lo)) * ih;
  const zeroY = y(0);
  const bw = Math.min(44, (iw / series.length) * 0.62);
  const step = iw / series.length;
  let g = "";
  for (let t = 0; t <= 4; t++) {
    const v = lo + ((hi - lo) * t) / 4;
    const yy = y(v);
    g += `<line x1="${padL}" y1="${yy}" x2="${W - padR}" y2="${yy}" stroke="${C.grid}" stroke-width="1"/>` +
      `<text x="${padL - 6}" y="${yy + 4}" text-anchor="end" font-size="11" fill="${C.muted}">${format(v)}${unit}</text>`;
  }
  let bars = "";
  series.forEach((d, i) => {
    const x = padL + i * step + (step - bw) / 2;
    const top = y(Math.max(d.value, 0));
    const bot = d.value >= 0 ? zeroY : y(d.value);
    const h = Math.max(1, Math.abs(zeroY - y(d.value)));
    const fill = d.value < 0 ? C.negative : color;
    bars += `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${bw}" height="${h.toFixed(1)}" rx="3" fill="${fill}"/>` +
      `<text x="${(x + bw / 2).toFixed(1)}" y="${(top - 6).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${C.ink}">${format(d.value)}${unit}</text>` +
      `<text x="${(x + bw / 2).toFixed(1)}" y="${H - 8}" text-anchor="middle" font-size="11" fill="${C.muted}">${d.year}</text>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Bar chart">${g}${bars}` +
    `<line x1="${padL}" y1="${zeroY}" x2="${W - padR}" y2="${zeroY}" stroke="${C.slate}" stroke-width="1"/></svg>`;
}

// Line chart with dots. series: [{year, value}].
export function lineChart(series, { unit = "", color = C.pine, height = 260, format = (v) => v.toFixed(1) } = {}) {
  const W = 720, H = height, padL = 48, padR = 16, padT = 26, padB = 30;
  const vals = series.map((d) => d.value);
  const lo = niceMin(Math.min(...vals));
  const hi = niceMax(Math.max(...vals));
  const iw = W - padL - padR, ih = H - padT - padB;
  const x = (i) => padL + (i / (series.length - 1)) * iw;
  const y = (v) => padT + ((hi - v) / (hi - lo)) * ih;
  let g = "";
  for (let t = 0; t <= 4; t++) {
    const v = lo + ((hi - lo) * t) / 4;
    const yy = y(v);
    g += `<line x1="${padL}" y1="${yy}" x2="${W - padR}" y2="${yy}" stroke="${C.grid}" stroke-width="1"/>` +
      `<text x="${padL - 6}" y="${yy + 4}" text-anchor="end" font-size="11" fill="${C.muted}">${format(v)}${unit}</text>`;
  }
  const pts = series.map((d, i) => `${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(" ");
  let dots = "";
  series.forEach((d, i) => {
    dots += `<circle cx="${x(i).toFixed(1)}" cy="${y(d.value).toFixed(1)}" r="4" fill="#fff" stroke="${color}" stroke-width="2.5"/>` +
      `<text x="${x(i).toFixed(1)}" y="${(y(d.value) - 10).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${C.ink}">${format(d.value)}${unit}</text>` +
      `<text x="${x(i).toFixed(1)}" y="${H - 8}" text-anchor="middle" font-size="11" fill="${C.muted}">${d.year}</text>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Line chart">${g}` +
    `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>${dots}</svg>`;
}

// Horizontal bars. items: [{name, value}], valueLabel: text shown at bar end.
export function hbarChart(items, { color = C.pine, height = null, format = (v) => v.toFixed(1) + "%", max = null } = {}) {
  const rowH = 34, padL = 210, padR = 64, padT = 8, padB = 8;
  const H = height ?? padT + padB + items.length * rowH;
  const W = 720;
  const top = max ?? niceMax(Math.max(...items.map((d) => Math.abs(d.value))));
  const iw = W - padL - padR;
  let rows = "";
  items.forEach((d, i) => {
    const y = padT + i * rowH;
    // Negative values (e.g. imports in GDP by expenditure) are drawn with
    // their magnitude, in the negative colour, so the bar stays visible.
    const w = Math.max(2, (Math.abs(d.value) / top) * iw);
    const fill = d.value < 0 ? C.negative : (i % 2 === 0 ? color : C.pineLight);
    rows += `<text x="${padL - 10}" y="${y + 21}" text-anchor="end" font-size="12.5" fill="${C.ink}">${esc(d.name)}</text>` +
      `<rect x="${padL}" y="${y + 6}" width="${w.toFixed(1)}" height="18" rx="3" fill="${fill}"/>` +
      `<text x="${(padL + w + 8).toFixed(1)}" y="${y + 21}" font-size="12" font-weight="600" fill="${C.ink}">${format(d.value)}</text>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Horizontal bar chart">${rows}</svg>`;
}

// Small donut for a single share (0-100).
export function donut(pct, { size = 120, color = C.amber } = {}) {
  const r = 46, cx = size / 2, cy = size / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="${pct}%">` +
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.grid}" stroke-width="13"/>` +
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="13" stroke-dasharray="${dash.toFixed(1)} ${circ.toFixed(1)}" stroke-linecap="round" transform="rotate(-90 ${cx} ${cy})"/>` +
    `<text x="${cx}" y="${cy + 6}" text-anchor="middle" font-size="21" font-weight="700" fill="${C.ink}">${pct}%</text></svg>`;
}

export const PALETTE = C;
