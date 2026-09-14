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
