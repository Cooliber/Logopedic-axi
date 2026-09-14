// Cymatic SVG patterns — concentric circles, standing waves, sacred geometry
// Pure SVG strings for Takumi PDF (dataURI inline, no network fetch)
// Inspired by Sonic Architecture Cymatics Decoded

function svgDoc(inner: string, size = 120) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">${inner}</svg>`;
}

// 1. Concentric circles — basic ripple pattern (Kepler orbits)
export function concentricCircles({
  rings = 6,
  cx = 60,
  cy = 60,
  maxR = 54,
  stroke = "#1A1A2E",
  strokeWidth = 1.5,
  fill = "none",
}: {
  rings?: number;
  cx?: number;
  cy?: number;
  maxR?: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
} = {}) {
  const circles = Array.from({ length: rings }, (_, i) => {
    const r = ((i + 1) / rings) * maxR;
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${0.4 + (i / rings) * 0.6}"/>`;
  }).join("");
  return svgDoc(circles);
}

// 2. Standing wave / Chladni pattern — nodal lines
export function standingWave({
  nodes = 4,
  cx = 60,
  cy = 60,
  r = 54,
  stroke = "#1A1A2E",
  strokeWidth = 1.2,
}: {
  nodes?: number;
  cx?: number;
  cy?: number;
  r?: number;
  stroke?: string;
  strokeWidth?: number;
} = {}) {
  const lines: string[] = [];
  // Radial spokes
  for (let i = 0; i < nodes * 2; i++) {
    const angle = (i / (nodes * 2)) * Math.PI * 2;
    const x2 = cx + Math.cos(angle) * r;
    const y2 = cy + Math.sin(angle) * r;
    lines.push(`<line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="0.3"/>`);
  }
  // Concentric node rings
  for (let i = 1; i <= nodes; i++) {
    const ringR = (i / nodes) * r;
    lines.push(`<circle cx="${cx}" cy="${cy}" r="${ringR}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-dasharray="4 3" opacity="0.5"/>`);
  }
  // Node dots at intersections
  for (let i = 0; i < nodes * 2; i++) {
    const angle = (i / (nodes * 2)) * Math.PI * 2;
    for (let j = 1; j <= nodes; j++) {
      const dotR = (j / nodes) * r;
      const dx = cx + Math.cos(angle) * dotR;
      const dy = cy + Math.sin(angle) * dotR;
      lines.push(`<circle cx="${dx}" cy="${dy}" r="2.5" fill="${stroke}" opacity="0.6"/>`);
    }
  }
  return svgDoc(lines.join(""));
}

// 3. Interference pattern — two overlapping wave sources
export function interferencePattern({
  cx1 = 35,
  cy1 = 60,
  cx2 = 85,
  cy2 = 60,
  rings = 5,
  maxR = 50,
  stroke = "#7C3AED",
  strokeWidth = 1,
}: {
  cx1?: number;
  cy1?: number;
  cx2?: number;
  cy2?: number;
  rings?: number;
  maxR?: number;
  stroke?: string;
  strokeWidth?: number;
} = {}) {
  const circles: string[] = [];
  for (let i = 1; i <= rings; i++) {
    const r = (i / rings) * maxR;
    circles.push(`<circle cx="${cx1}" cy="${cy1}" r="${r}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${0.2 + (i / rings) * 0.3}"/>`);
    circles.push(`<circle cx="${cx2}" cy="${cy2}" r="${r}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${0.2 + (i / rings) * 0.3}"/>`);
  }
  // Interference nodes (where circles cross — approximate)
  for (let i = 1; i <= rings; i++) {
    for (let j = 1; j <= rings; j++) {
      const r1 = (i / rings) * maxR;
      const r2 = (j / rings) * maxR;
      const dx = cx2 - cx1;
      const dist = Math.sqrt(dx * dx);
      if (Math.abs(r1 - r2) < dist && r1 + r2 > dist) {
        const a = (r1 * r1 - r2 * r2 + dist * dist) / (2 * dist);
        const h = Math.sqrt(Math.max(0, r1 * r1 - a * a));
        const mx = cx1 + (a * dx) / dist;
        circles.push(`<circle cx="${mx}" cy="${cy1 - h}" r="2" fill="${stroke}" opacity="0.5"/>`);
        if (h > 1) circles.push(`<circle cx="${mx}" cy="${cy1 + h}" r="2" fill="${stroke}" opacity="0.5"/>`);
      }
    }
  }
  return svgDoc(circles.join(""));
}

// 4. Flower of Life — sacred geometry
export function flowerOfLife({
  cx = 60,
  cy = 60,
  r = 20,
  stroke = "#1A1A2E",
  strokeWidth = 1.2,
}: {
  cx?: number;
  cy?: number;
  r?: number;
  stroke?: string;
  strokeWidth?: number;
} = {}) {
  const circles: string[] = [];
  // Center
  circles.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}"/>`);
  // First ring — 6 circles
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    circles.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="0.7"/>`);
  }
  // Second ring — 6 more
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
    const x = cx + Math.cos(angle) * r * 1.73;
    const y = cy + Math.sin(angle) * r * 1.73;
    circles.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="0.5"/>`);
  }
  return svgDoc(circles.join(""));
}

// 5. Metatron's Cube — 13 circles connected by lines
export function metatronsCube({
  cx = 60,
  cy = 60,
  r = 12,
  stroke = "#1A1A2E",
  strokeWidth = 1,
}: {
  cx?: number;
  cy?: number;
  r?: number;
  stroke?: string;
  strokeWidth?: number;
} = {}) {
  const points: Array<{ x: number; y: number }> = [];
  // Center
  points.push({ x: cx, y: cy });
  // Inner ring — 6
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
    points.push({ x: cx + Math.cos(angle) * r * 2, y: cy + Math.sin(angle) * r * 2 });
  }
  // Outer ring — 6
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
    points.push({ x: cx + Math.cos(angle) * r * 3.5, y: cy + Math.sin(angle) * r * 3.5 });
  }
  const lines: string[] = [];
  // Connect all points to all other points
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      lines.push(`<line x1="${points[i].x}" y1="${points[i].y}" x2="${points[j].x}" y2="${points[j].y}" stroke="${stroke}" stroke-width="${strokeWidth * 0.5}" opacity="0.2"/>`);
    }
  }
  // Draw circles at each point
  for (const p of points) {
    lines.push(`<circle cx="${p.x}" cy="${p.y}" r="${r}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="0.6"/>`);
  }
  return svgDoc(lines.join(""));
}

// 6. Spiral cymatic — energy flowing
export function spiralPattern({
  cx = 60,
  cy = 60,
  turns = 4,
  maxR = 52,
  stroke = "#1A1A2E",
  strokeWidth = 1.5,
}: {
  cx?: number;
  cy?: number;
  turns?: number;
  maxR?: number;
  stroke?: string;
  strokeWidth?: number;
} = {}) {
  const points: string[] = [];
  const totalSteps = turns * 60;
  for (let i = 0; i <= totalSteps; i++) {
    const t = i / totalSteps;
    const angle = t * turns * Math.PI * 2;
    const r = t * maxR;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return svgDoc(`<path d="${points.join(" ")}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`);
}

// 7. Cellular/honeycomb pattern — architecture cymatic
export function cellularPattern({
  cx = 60,
  cy = 60,
  cellR = 14,
  stroke = "#1A1A2E",
  strokeWidth = 1.2,
}: {
  cx?: number;
  cy?: number;
  cellR?: number;
  stroke?: string;
  strokeWidth?: number;
} = {}) {
  const hexes: string[] = [];
  const h = cellR * Math.sqrt(3);
  // Central hex
  hexes.push(hexPath(cx, cy, cellR, stroke, strokeWidth));
  // Ring 1 — 6 hexes
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const x = cx + Math.cos(angle) * h;
    const y = cy + Math.sin(angle) * h;
    hexes.push(hexPath(x, y, cellR, stroke, strokeWidth));
  }
  // Ring 2 — 6 more
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
    const x = cx + Math.cos(angle) * h * 1.73;
    const y = cy + Math.sin(angle) * h * 1.73;
    hexes.push(hexPath(x, y, cellR, stroke, strokeWidth, 0.5));
  }
  return svgDoc(hexes.join(""));
}

function hexPath(cx: number, cy: number, r: number, stroke: string, strokeWidth: number, opacity = 0.8) {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 - Math.PI / 6;
    pts.push(`${(cx + Math.cos(angle) * r).toFixed(1)},${(cy + Math.sin(angle) * r).toFixed(1)}`);
  }
  return `<polygon points="${pts.join(" ")}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;
}

// 8. Linear/spoke pattern — communication cymatic
export function linearPattern({
  cx = 60,
  cy = 60,
  spokes = 12,
  maxR = 54,
  stroke = "#1A1A2E",
  strokeWidth = 1.2,
}: {
  cx?: number;
  cy?: number;
  spokes?: number;
  maxR?: number;
  stroke?: string;
  strokeWidth?: number;
} = {}) {
  const lines: string[] = [];
  for (let i = 0; i < spokes; i++) {
    const angle = (i / spokes) * Math.PI * 2;
    const x2 = cx + Math.cos(angle) * maxR;
    const y2 = cy + Math.sin(angle) * maxR;
    lines.push(`<line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="0.4"/>`);
    // Node dots along each spoke
    for (let j = 1; j <= 3; j++) {
      const d = (j / 4) * maxR;
      lines.push(`<circle cx="${cx + Math.cos(angle) * d}" cy="${cy + Math.sin(angle) * d}" r="${1.5 + j * 0.5}" fill="${stroke}" opacity="${0.3 + j * 0.15}"/>`);
    }
  }
  // Center dot
  lines.push(`<circle cx="${cx}" cy="${cy}" r="3" fill="${stroke}" opacity="0.6"/>`);
  return svgDoc(lines.join(""));
}

// 9. Dodecahedron projection — DNA geometry
export function dodecahedronProjection({
  cx = 60,
  cy = 60,
  r = 48,
  stroke = "#1A1A2E",
  strokeWidth = 1.2,
}: {
  cx?: number;
  cy?: number;
  r?: number;
  stroke?: string;
  strokeWidth?: number;
} = {}) {
  // Pentagon-based: outer pentagon + inner pentagon + connecting lines
  const outer: Array<{ x: number; y: number }> = [];
  const inner: Array<{ x: number; y: number }> = [];
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
    outer.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
    inner.push({ x: cx + Math.cos(angle) * r * 0.5, y: cy + Math.sin(angle) * r * 0.5 });
  }
  const lines: string[] = [];
  // Outer pentagon
  for (let i = 0; i < 5; i++) {
    const next = (i + 1) % 5;
    lines.push(`<line x1="${outer[i].x}" y1="${outer[i].y}" x2="${outer[next].x}" y2="${outer[next].y}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`);
  }
  // Inner pentagon
  for (let i = 0; i < 5; i++) {
    const next = (i + 1) % 5;
    lines.push(`<line x1="${inner[i].x}" y1="${inner[i].y}" x2="${inner[next].x}" y2="${inner[next].y}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`);
  }
  // Connect outer to inner
  for (let i = 0; i < 5; i++) {
    lines.push(`<line x1="${outer[i].x}" y1="${outer[i].y}" x2="${inner[i].x}" y2="${inner[i].y}" stroke="${stroke}" stroke-width="${strokeWidth * 0.7}" opacity="0.6"/>`);
    lines.push(`<line x1="${outer[i].x}" y1="${outer[i].y}" x2="${inner[(i + 2) % 5].x}" y2="${inner[(i + 2) % 5].y}" stroke="${stroke}" stroke-width="${strokeWidth * 0.5}" opacity="0.3"/>`);
  }
  // Vertices
  for (const p of [...outer, ...inner]) {
    lines.push(`<circle cx="${p.x}" cy="${p.y}" r="2.5" fill="${stroke}" opacity="0.7"/>`);
  }
  return svgDoc(lines.join(""));
}

// 10. Vowel formant map — mouth shape to cymatic
export function vowelFormant({
  vowel = "A",
  cx = 60,
  cy = 60,
  r = 48,
  stroke = "#1A1A2E",
  strokeWidth = 1.5,
}: {
  vowel?: string;
  cx?: number;
  cy?: number;
  r?: number;
  stroke?: string;
  strokeWidth?: number;
} = {}) {
  // Each vowel has a unique cymatic signature based on formant frequencies
  const patterns: Record<string, () => string> = {
    A: () => {
      // Open — wide concentric, few nodes
      const lines: string[] = [];
      for (let i = 1; i <= 5; i++) {
        lines.push(`<circle cx="${cx}" cy="${cy}" r="${(i / 5) * r}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${0.3 + i * 0.12}"/>`);
      }
      // Wide opening — radial lines sparse
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        lines.push(`<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(angle) * r}" y2="${cy + Math.sin(angle) * r}" stroke="${stroke}" stroke-width="${strokeWidth * 0.6}" opacity="0.3"/>`);
      }
      return lines.join("");
    },
    E: () => {
      // Mid — moderate rings + more nodes
      const lines: string[] = [];
      for (let i = 1; i <= 4; i++) {
        lines.push(`<circle cx="${cx}" cy="${cy}" r="${(i / 4) * r}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${0.3 + i * 0.12}"/>`);
      }
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        lines.push(`<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(angle) * r}" y2="${cy + Math.sin(angle) * r}" stroke="${stroke}" stroke-width="${strokeWidth * 0.6}" opacity="0.35"/>`);
      }
      return lines.join("");
    },
    I: () => {
      // Narrow — tight central concentration, many fine nodes
      const lines: string[] = [];
      for (let i = 1; i <= 7; i++) {
        lines.push(`<circle cx="${cx}" cy="${cy}" r="${(i / 7) * r * 0.6}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth * 0.8}" opacity="${0.3 + i * 0.08}"/>`);
      }
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const x2 = cx + Math.cos(angle) * r * 0.6;
        const y2 = cy + Math.sin(angle) * r * 0.6;
        lines.push(`<line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${strokeWidth * 0.5}" opacity="0.3"/>`);
      }
      return lines.join("");
    },
    O: () => {
      // Round — strong outer ring, spiral interior
      const lines: string[] = [];
      lines.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth * 1.2}" opacity="0.6"/>`);
      lines.push(`<circle cx="${cx}" cy="${cy}" r="${r * 0.6}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="0.4"/>`);
      // Spiral
      const pts: string[] = [];
      for (let i = 0; i <= 120; i++) {
        const t = i / 120;
        const angle = t * 3 * Math.PI * 2;
        const sr = t * r * 0.5;
        pts.push(`${i === 0 ? "M" : "L"}${(cx + Math.cos(angle) * sr).toFixed(1)},${(cy + Math.sin(angle) * sr).toFixed(1)}`);
      }
      lines.push(`<path d="${pts.join(" ")}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth * 0.7}" opacity="0.3"/>`);
      return lines.join("");
    },
    U: () => {
      // Deep — strong low-frequency rings, wide spacing
      const lines: string[] = [];
      for (let i = 1; i <= 3; i++) {
        lines.push(`<circle cx="${cx}" cy="${cy}" r="${(i / 3) * r}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth * 1.3}" opacity="${0.3 + i * 0.2}"/>`);
      }
      // 3 strong radial lines
      for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2 - Math.PI / 2;
        lines.push(`<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(angle) * r}" y2="${cy + Math.sin(angle) * r}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="0.4"/>`);
      }
      return lines.join("");
    },
    Y: () => {
      // Narrow round — tight spiral with outer constraint
      const lines: string[] = [];
      lines.push(`<circle cx="${cx}" cy="${cy}" r="${r * 0.8}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="0.5"/>`);
      const pts: string[] = [];
      for (let i = 0; i <= 100; i++) {
        const t = i / 100;
        const angle = t * 4 * Math.PI * 2;
        const sr = t * r * 0.7;
        pts.push(`${i === 0 ? "M" : "L"}${(cx + Math.cos(angle) * sr).toFixed(1)},${(cy + Math.sin(angle) * sr).toFixed(1)}`);
      }
      lines.push(`<path d="${pts.join(" ")}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth * 0.8}" opacity="0.35"/>`);
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        lines.push(`<circle cx="${cx + Math.cos(angle) * r * 0.4}" cy="${cy + Math.sin(angle) * r * 0.4}" r="2" fill="${stroke}" opacity="0.4"/>`);
      }
      return lines.join("");
    },
  };
  return svgDoc((patterns[vowel] || patterns.A)());
}

// ═══════════════════════════════════════════
// MANDALA GENERATOR v2 — real Chladni mode math + sacred geometry
// Each series maps to a distinct acoustic/visual cymatic mode:
//   syczacy  → concentric rings + radial spokes + petal layers (sonic ripple)
//   szumiacy → Archimedean spiral + interference ring flower (flowing breath)
//   ciszacy  → hexagonal nodal lattice + curved Bessel lines (quiet resonance)
//   rotacyzm → 6-fold star crown + inner mandala rose (rolling tongue)
//
// Layer structure per mandala:
//   1. Outer frame (dashed ring) — coloring boundary
//   2. Outer zone  — sacred geometry (Flower of Life / Metatron / Seed of Life / Sri Yantra)
//   3. Middle zone — Chladni nodal lines + antinode dots
//   4. Inner zone  — petals / curves / spirals (colored accents)
//   5. Center      — letter in circle
// ═══════════════════════════════════════════

export function cymaticMandala({
  size = 120,
  letter = "S",
  accent = "#FACC15",
  series = "syczacy",
  strokeWidth = 1.4,
}: {
  size?: number;
  letter?: string;
  accent?: string;
  series?: "syczacy" | "szumiacy" | "ciszacy" | "rotacyzm";
  strokeWidth?: number;
} = {}) {
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2 - 4;
  const e: string[] = [];

  // ── 1. Outer frame ──
  e.push(`<circle cx="${cx}" cy="${cy}" r="${maxR}" fill="none" stroke="${accent}" stroke-width="${strokeWidth * 1.5}" stroke-dasharray="6 4" opacity="0.4"/>`);
  e.push(`<circle cx="${cx}" cy="${cy}" r="${maxR * 0.97}" fill="none" stroke="${accent}" stroke-width="${strokeWidth * 0.5}" opacity="0.15"/>`);

  if (series === "syczacy") {
    // ── Sibilant: concentric rings + radial spokes + flower petals ──
    // Outer sacred: 6-petal Flower of Life (rings 0.78–0.95)
    const folR = maxR * 0.13;
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const fx = cx + Math.cos(a) * maxR * 0.82;
      const fy = cy + Math.sin(a) * maxR * 0.82;
      e.push(`<circle cx="${fx.toFixed(1)}" cy="${fy.toFixed(1)}" r="${folR}" fill="none" stroke="${accent}" stroke-width="${strokeWidth * 0.6}" opacity="0.18"/>`);
    }
    // Middle Chladni rings (4,0) mode — 5 concentric rings with varying thickness
    for (let i = 1; i <= 5; i++) {
      const r = (i / 5) * maxR * 0.72;
      const sw = i === 3 ? strokeWidth * 1.3 : strokeWidth * 0.9;
      const op = 0.22 + (i === 3 ? 0.18 : i * 0.06);
      e.push(`<circle cx="${cx}" cy="${cy}" r="${r.toFixed(1)}" fill="none" stroke="${accent}" stroke-width="${sw.toFixed(2)}" opacity="${op.toFixed(2)}"/>`);
    }
    // Radial spokes — 12 lines with node dots at ring intersections
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const thick = i % 3 === 0;
      const x2 = cx + Math.cos(a) * maxR * 0.88;
      const y2 = cy + Math.sin(a) * maxR * 0.88;
      e.push(`<line x1="${cx}" y1="${cy}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${accent}" stroke-width="${(thick ? strokeWidth : strokeWidth * 0.5).toFixed(2)}" opacity="${thick ? "0.3" : "0.15"}"/>`);
      // Node dots at 3 ring intersections per spoke
      for (let j = 1; j <= 3; j++) {
        const d = (j / 4) * maxR * 0.72;
        const dotR = thick ? 2.2 + j * 0.5 : 1.4 + j * 0.3;
        e.push(`<circle cx="${(cx + Math.cos(a) * d).toFixed(1)}" cy="${(cy + Math.sin(a) * d).toFixed(1)}" r="${dotR.toFixed(1)}" fill="${accent}" opacity="${(0.15 + j * 0.08).toFixed(2)}"/>`);
      }
    }
    // Inner flower petals — 8 rounded petals between middle rings
    for (let i = 0; i < 8; i++) {
      const a1 = (i / 8) * Math.PI * 2;
      const a2 = ((i + 1) / 8) * Math.PI * 2;
      const mid = (a1 + a2) / 2;
      const pr = maxR * 0.48;
      const px = cx + Math.cos(mid) * pr;
      const py = cy + Math.sin(mid) * pr;
      const ix1 = cx + Math.cos(a1) * maxR * 0.28;
      const iy1 = cy + Math.sin(a1) * maxR * 0.28;
      const ix2 = cx + Math.cos(a2) * maxR * 0.28;
      const iy2 = cy + Math.sin(a2) * maxR * 0.28;
      e.push(`<path d="M${ix1.toFixed(1)},${iy1.toFixed(1)} Q${px.toFixed(1)},${py.toFixed(1)} ${ix2.toFixed(1)},${iy2.toFixed(1)}" fill="none" stroke="${accent}" stroke-width="${strokeWidth}" opacity="0.32"/>`);
      // Mirror petal (inward-facing)
      const ir = maxR * 0.18;
      const ipx = cx + Math.cos(mid) * ir;
      const ipy = cy + Math.sin(mid) * ir;
      e.push(`<path d="M${ix1.toFixed(1)},${iy1.toFixed(1)} Q${ipx.toFixed(1)},${ipy.toFixed(1)} ${ix2.toFixed(1)},${iy2.toFixed(1)}" fill="none" stroke="${accent}" stroke-width="${strokeWidth * 0.6}" opacity="0.18"/>`);
    }
    // Antinode dots — at spoke+ring crossings in outer zone
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 + Math.PI / 12;
      for (let j = 4; j <= 5; j++) {
        const d = (j / 5) * maxR * 0.72;
        e.push(`<circle cx="${(cx + Math.cos(a) * d).toFixed(1)}" cy="${(cy + Math.sin(a) * d).toFixed(1)}" r="1.8" fill="white" stroke="${accent}" stroke-width="0.8" opacity="0.3"/>`);
      }
    }
  } else if (series === "szumiacy") {
    // ── Fricative: Archimedean spiral + interference ring flower ──
    // Outer sacred: Metatron's Cube (13 circles + connecting lines)
    const mcR = maxR * 0.08;
    const mcPts: Array<{ x: number; y: number }> = [{ x: cx, y: cy }];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
      mcPts.push({ x: cx + Math.cos(a) * maxR * 0.85, y: cy + Math.sin(a) * maxR * 0.85 });
    }
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2 + Math.PI / 6;
      mcPts.push({ x: cx + Math.cos(a) * maxR * 0.72, y: cy + Math.sin(a) * maxR * 0.72 });
    }
    for (let i = 0; i < mcPts.length; i++) {
      for (let j = i + 1; j < mcPts.length; j++) {
        const dx = mcPts[j].x - mcPts[i].x;
        const dy = mcPts[j].y - mcPts[i].y;
        if (Math.sqrt(dx * dx + dy * dy) < maxR * 0.6) {
          e.push(`<line x1="${mcPts[i].x.toFixed(1)}" y1="${mcPts[i].y.toFixed(1)}" x2="${mcPts[j].x.toFixed(1)}" y2="${mcPts[j].y.toFixed(1)}" stroke="${accent}" stroke-width="${strokeWidth * 0.3}" opacity="0.1"/>`);
        }
      }
    }
    for (const p of mcPts) {
      e.push(`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${mcR}" fill="none" stroke="${accent}" stroke-width="${strokeWidth * 0.4}" opacity="0.12"/>`);
    }
    // Middle: interference ring flower — 6 petal-shaped rings
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const fr = maxR * 0.42;
      const fx = cx + Math.cos(a) * fr;
      const fy = cy + Math.sin(a) * fr;
      e.push(`<circle cx="${fx.toFixed(1)}" cy="${fy.toFixed(1)}" r="${(maxR * 0.28).toFixed(1)}" fill="none" stroke="${accent}" stroke-width="${strokeWidth * 0.6}" opacity="0.18"/>`);
    }
    // Middle: concentric ring
    e.push(`<circle cx="${cx}" cy="${cy}" r="${(maxR * 0.45).toFixed(1)}" fill="none" stroke="${accent}" stroke-width="${strokeWidth * 0.8}" opacity="0.22"/>`);
    // Inner: Archimedean spiral (5 turns)
    const pts: string[] = [];
    for (let i = 0; i <= 300; i++) {
      const t = i / 300;
      const angle = t * 5 * Math.PI * 2;
      const r = t * maxR * 0.38;
      pts.push(`${i === 0 ? "M" : "L"}${(cx + Math.cos(angle) * r).toFixed(1)},${(cy + Math.sin(angle) * r).toFixed(1)}`);
    }
    e.push(`<path d="${pts.join(" ")}" fill="none" stroke="${accent}" stroke-width="${strokeWidth}" opacity="0.35" stroke-linecap="round"/>`);
    // Inner: leaf/petal shapes along spiral arm
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const lr = maxR * 0.35;
      const lx = cx + Math.cos(a) * lr;
      const ly = cy + Math.sin(a) * lr;
      const lpts: string[] = [];
      for (let j = 0; j <= 24; j++) {
        const t = j / 24;
        const la = a + (t - 0.5) * 1.0;
        const lrr = maxR * (0.08 + Math.sin(t * Math.PI) * 0.06);
        lpts.push(`${j === 0 ? "M" : "L"}${(lx + Math.cos(la) * lrr).toFixed(1)},${(ly + Math.sin(la) * lrr).toFixed(1)}`);
      }
      e.push(`<path d="${lpts.join(" ")}" fill="none" stroke="${accent}" stroke-width="${strokeWidth * 0.7}" opacity="0.25" stroke-linecap="round"/>`);
    }
    // Antinode dots along spiral
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const d = (0.3 + (i % 4) * 0.15) * maxR;
      e.push(`<circle cx="${(cx + Math.cos(a) * d).toFixed(1)}" cy="${(cy + Math.sin(a) * d).toFixed(1)}" r="2" fill="${accent}" opacity="0.2"/>`);
    }
  } else if (series === "ciszacy") {
    // ── Palatal: hexagonal nodal lattice + curved Bessel lines ──
    // Outer sacred: Seed of Life (7 overlapping circles)
    const solR = maxR * 0.15;
    e.push(`<circle cx="${cx}" cy="${cy}" r="${solR.toFixed(1)}" fill="none" stroke="${accent}" stroke-width="${strokeWidth * 0.5}" opacity="0.15"/>`);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const sx = cx + Math.cos(a) * solR;
      const sy = cy + Math.sin(a) * solR;
      e.push(`<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="${solR.toFixed(1)}" fill="none" stroke="${accent}" stroke-width="${strokeWidth * 0.5}" opacity="0.15"/>`);
    }
    // Middle: hexagonal nodal lattice — 2 rings of 6 nodes + center
    const h = maxR * 0.22;
    const nodePoints: Array<{ x: number; y: number; ring: number }> = [{ x: cx, y: cy, ring: 0 }];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      nodePoints.push({ x: cx + Math.cos(a) * h * 2.2, y: cy + Math.sin(a) * h * 2.2, ring: 1 });
    }
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
      nodePoints.push({ x: cx + Math.cos(a) * h * 4.2, y: cy + Math.sin(a) * h * 4.2, ring: 2 });
    }
    // Curved Bessel lines — nodal curves connecting lattice points
    for (let i = 0; i < nodePoints.length; i++) {
      for (let j = i + 1; j < nodePoints.length; j++) {
        const dx = nodePoints[j].x - nodePoints[i].x;
        const dy = nodePoints[j].y - nodePoints[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < h * 4.5) {
          // Curved line via quadratic bezier (mimics Bessel nodal curve)
          const mx = (nodePoints[i].x + nodePoints[j].x) / 2;
          const my = (nodePoints[i].y + nodePoints[j].y) / 2;
          const perp = Math.atan2(dy, dx) + Math.PI / 2;
          const bulge = dist * 0.12;
          const cpx = mx + Math.cos(perp) * bulge;
          const cpy = my + Math.sin(perp) * bulge;
          e.push(`<path d="M${nodePoints[i].x.toFixed(1)},${nodePoints[i].y.toFixed(1)} Q${cpx.toFixed(1)},${cpy.toFixed(1)} ${nodePoints[j].x.toFixed(1)},${nodePoints[j].y.toFixed(1)}" fill="none" stroke="${accent}" stroke-width="${strokeWidth * 0.5}" opacity="0.18"/>`);
        }
      }
    }
    // Concentric Bessel rings (6 thin rings)
    for (let i = 1; i <= 6; i++) {
      const r = (i / 6) * maxR * 0.88;
      e.push(`<circle cx="${cx}" cy="${cy}" r="${r.toFixed(1)}" fill="none" stroke="${accent}" stroke-width="${strokeWidth * 0.5}" opacity="${(0.12 + i * 0.03).toFixed(2)}"/>`);
    }
    // Node dots — inner ring small, outer ring larger
    for (const p of nodePoints) {
      const dotR = p.ring === 0 ? 3.5 : p.ring === 1 ? 2.8 : 2;
      e.push(`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${dotR}" fill="${accent}" opacity="0.22"/>`);
      e.push(`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${(dotR * 0.4).toFixed(1)}" fill="white"/>`);
    }
    // Inner: delicate 12-petal flower
    for (let i = 0; i < 12; i++) {
      const a1 = (i / 12) * Math.PI * 2;
      const a2 = ((i + 1) / 12) * Math.PI * 2;
      const mid = (a1 + a2) / 2;
      const pr = maxR * 0.35;
      const px = cx + Math.cos(mid) * pr;
      const py = cy + Math.sin(mid) * pr;
      const ix1 = cx + Math.cos(a1) * maxR * 0.18;
      const iy1 = cy + Math.sin(a1) * maxR * 0.18;
      const ix2 = cx + Math.cos(a2) * maxR * 0.18;
      const iy2 = cy + Math.sin(a2) * maxR * 0.18;
      e.push(`<path d="M${ix1.toFixed(1)},${iy1.toFixed(1)} Q${px.toFixed(1)},${py.toFixed(1)} ${ix2.toFixed(1)},${iy2.toFixed(1)}" fill="none" stroke="${accent}" stroke-width="${strokeWidth * 0.7}" opacity="0.2"/>`);
    }
  } else if (series === "rotacyzm") {
    // ── Rhotic: 6-fold star crown + inner rose + Sri Yantra triangles ──
    // Outer sacred: Sri Yantra — alternating up/down triangles
    const triR = maxR * 0.82;
    // Outer triangle (pointing up)
    const t1: string[] = [];
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 - Math.PI / 2;
      t1.push(`${(cx + Math.cos(a) * triR).toFixed(1)},${(cy + Math.sin(a) * triR).toFixed(1)}`);
    }
    e.push(`<polygon points="${t1.join(" ")}" fill="none" stroke="${accent}" stroke-width="${strokeWidth * 0.6}" opacity="0.15"/>`);
    // Inner triangle (pointing down)
    const t2: string[] = [];
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 + Math.PI / 2;
      t2.push(`${(cx + Math.cos(a) * triR * 0.7).toFixed(1)},${(cy + Math.sin(a) * triR * 0.7).toFixed(1)}`);
    }
    e.push(`<polygon points="${t2.join(" ")}" fill="none" stroke="${accent}" stroke-width="${strokeWidth * 0.6}" opacity="0.15"/>`);
    // Second pair of triangles (nested Sri Yantra)
    const t3: string[] = [];
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 - Math.PI / 2 + Math.PI / 6;
      t3.push(`${(cx + Math.cos(a) * triR * 0.55).toFixed(1)},${(cy + Math.sin(a) * triR * 0.55).toFixed(1)}`);
    }
    e.push(`<polygon points="${t3.join(" ")}" fill="none" stroke="${accent}" stroke-width="${strokeWidth * 0.4}" opacity="0.12"/>`);
    const t4: string[] = [];
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 + Math.PI / 2 + Math.PI / 6;
      t4.push(`${(cx + Math.cos(a) * triR * 0.55).toFixed(1)},${(cy + Math.sin(a) * triR * 0.55).toFixed(1)}`);
    }
    e.push(`<polygon points="${t4.join(" ")}" fill="none" stroke="${accent}" stroke-width="${strokeWidth * 0.4}" opacity="0.12"/>`);
    // Middle: 6-fold star crown (zigzag ring)
    const crownPts: string[] = [];
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      const r = i % 2 === 0 ? maxR * 0.7 : maxR * 0.55;
      crownPts.push(`${i === 0 ? "M" : "L"}${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`);
    }
    crownPts.push("Z");
    e.push(`<path d="${crownPts.join(" ")}" fill="none" stroke="${accent}" stroke-width="${strokeWidth}" opacity="0.3"/>`);
    // Inner: 12 spokes with alternating thick/thin
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const thick = i % 2 === 0;
      const x2 = cx + Math.cos(a) * maxR * 0.55;
      const y2 = cy + Math.sin(a) * maxR * 0.55;
      e.push(`<line x1="${cx}" y1="${cy}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${accent}" stroke-width="${(thick ? strokeWidth : strokeWidth * 0.4).toFixed(2)}" opacity="${thick ? "0.28" : "0.12"}"/>`);
    }
    // Inner: 6-petal rose
    for (let i = 0; i < 6; i++) {
      const a1 = (i / 6) * Math.PI * 2;
      const a2 = ((i + 1) / 6) * Math.PI * 2;
      const mid = (a1 + a2) / 2;
      const pr = maxR * 0.38;
      const px = cx + Math.cos(mid) * pr;
      const py = cy + Math.sin(mid) * pr;
      const ix1 = cx + Math.cos(a1) * maxR * 0.15;
      const iy1 = cy + Math.sin(a1) * maxR * 0.15;
      const ix2 = cx + Math.cos(a2) * maxR * 0.15;
      const iy2 = cy + Math.sin(a2) * maxR * 0.15;
      e.push(`<path d="M${ix1.toFixed(1)},${iy1.toFixed(1)} Q${px.toFixed(1)},${py.toFixed(1)} ${ix2.toFixed(1)},${iy2.toFixed(1)}" fill="none" stroke="${accent}" stroke-width="${strokeWidth * 0.8}" opacity="0.25"/>`);
    }
    // Crown points — dots at star tips
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const d = i % 2 === 0 ? maxR * 0.7 : maxR * 0.55;
      e.push(`<circle cx="${(cx + Math.cos(a) * d).toFixed(1)}" cy="${(cy + Math.sin(a) * d).toFixed(1)}" r="${i % 2 === 0 ? 2.5 : 1.5}" fill="${accent}" opacity="0.28"/>`);
    }
  }

  // ── 5. Center circle with letter ──
  e.push(`<circle cx="${cx}" cy="${cy}" r="${(maxR * 0.18).toFixed(1)}" fill="white" stroke="${accent}" stroke-width="${(strokeWidth * 1.5).toFixed(2)}"/>`);
  e.push(`<text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="central" font-family="Baloo 2, sans-serif" font-size="${(size * 0.14).toFixed(1)}" font-weight="900" fill="${accent}">${letter}</text>`);

  return svgDoc(e.join(""), size);
}

// Small mandala — for inline use (96x96 equivalent)
export function cymaticMandalaSmall({
  letter = "S",
  accent = "#FACC15",
  series = "syczacy" as const,
}: {
  letter?: string;
  accent?: string;
  series?: "syczacy" | "szumiacy" | "ciszacy" | "rotacyzm";
} = {}) {
  return cymaticMandala({ size: 96, letter, accent, series, strokeWidth: 1.2 });
}

// Full mandala — for full-page coloring (180x180 equivalent)
export function cymaticMandalaFull({
  letter = "S",
  accent = "#FACC15",
  series = "syczacy" as const,
}: {
  letter?: string;
  accent?: string;
  series?: "syczacy" | "szumiacy" | "ciszacy" | "rotacyzm";
} = {}) {
  return cymaticMandala({ size: 180, letter, accent, series, strokeWidth: 1.6 });
}

// Cymatic pattern metadata for speech therapy mapping
export const CYMATIC_MAP = {
  // Sibilants — high frequency, tight concentric
  syczacy: { pattern: "concentricCircles" as const, rings: 8, label: "Wysoka czestotliwosc — ciasne kola" },
  // Fricatives — medium, spiral energy flow
  szumiacy: { pattern: "spiral" as const, turns: 5, label: "Srednia czestotliwosc — spirala" },
  // Palatals — fine nodes, interference
  ciszacy: { pattern: "standingWave" as const, nodes: 6, label: "Subtelne wezly — interferencja" },
  // Rhotics — strong radial, spoke pattern
  rotacyzm: { pattern: "linear" as const, spokes: 16, label: "Mocne promienie — komunikacja" },
  // Vowels — each unique formant
  A: { pattern: "vowelFormant" as const, vowel: "A", label: "Otwarte — szerokie kola" },
  E: { pattern: "vowelFormant" as const, vowel: "E", label: "Srednie — wezly" },
  I: { pattern: "vowelFormant" as const, vowel: "I", label: "Waskie — ciasne skupisko" },
  O: { pattern: "vowelFormant" as const, vowel: "O", label: "Zaokraglone — spirala" },
  U: { pattern: "vowelFormant" as const, vowel: "U", label: "Glebokie — szerokie pierscienie" },
  Y: { pattern: "vowelFormant" as const, vowel: "Y", label: "Zaokraglone waskie — spiralny" },
} as const;
