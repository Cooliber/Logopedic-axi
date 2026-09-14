// Hybrid icon catalog — Doodle UI (MIT) + Fluent/Noto word pics (MIT/Apache)
// Takumi PDF supports <img src="data:image/svg+xml,..."> — no network fetch at render

// Doodle UI re-exports (react-doodle-icons, MIT) — hand-drawn dodle match
export { StarIcon as DoodleStar } from "react-doodle-icons";
export { CrownIcon as DoodleCrown } from "react-doodle-icons";
export { GiftIcon as DoodleGift } from "react-doodle-icons";
export { BalloonIcon as DoodleBalloon } from "react-doodle-icons";
export { TrophyIcon as DoodleTrophy } from "react-doodle-icons";
export { FireIcon as DoodleFire } from "react-doodle-icons";
export { HeartIcon as DoodleHeart } from "react-doodle-icons";
export { AppleIcon as DoodleApple } from "react-doodle-icons";
export { RocketIcon as DoodleRocket } from "react-doodle-icons";
export { CarIcon as DoodleCar } from "react-doodle-icons";
export { BusIcon as DoodleBus } from "react-doodle-icons";
export { PlaneIcon as DoodlePlane } from "react-doodle-icons";
export { ShipIcon as DoodleShip } from "react-doodle-icons";
export { TreeIcon as DoodleTree } from "react-doodle-icons";
export { SunIcon as DoodleSun } from "react-doodle-icons";
export { CloudIcon as DoodleCloud } from "react-doodle-icons";
export { BugIcon as DoodleBug } from "react-doodle-icons";
export { CakeIcon as DoodleCake } from "react-doodle-icons";
export { PizzaIcon as DoodlePizza } from "react-doodle-icons";
export { CandyIcon as DoodleCandy } from "react-doodle-icons";
export { MusicIcon as DoodleMusic } from "react-doodle-icons";
export { HomeIcon as DoodleHome } from "react-doodle-icons";
export { CrownIcon as DoodleCrown2 } from "react-doodle-icons";

// Word doodle SVGs — hand-drawn minimal, CC0/MIT internal, scalable
// Each SVG is 24x24 viewBox, stroke 1.8, rounded — matches dodle 22px radius + dashed
function svgWrap(inner: string, bg = "#FEF9C3") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect x="2" y="2" width="44" height="44" rx="12" fill="${bg}" stroke="#1A1A2E" stroke-width="2.5" stroke-dasharray="5 4"/><g transform="translate(12 10)">${inner}</g></svg>`;
}

export const wordSvg: Record<string, string> = {
  // syczacy
  SOWA: svgWrap(`<ellipse cx="12" cy="14" rx="11" ry="10" fill="#FDE68A" stroke="#1A1A2E" stroke-width="2"/><circle cx="8" cy="11" r="4" fill="white" stroke="#1A1A2E" stroke-width="1.6"/><circle cx="16" cy="11" r="4" fill="white" stroke="#1A1A2E" stroke-width="1.6"/><circle cx="8" cy="11" r="1.7" fill="#1A1A2E"/><circle cx="16" cy="11" r="1.7" fill="#1A1A2E"/><path d="M12 14 L10 17 L14 17 Z" fill="#F59E0B" stroke="#1A1A2E" stroke-width="1.2"/>`, "#FEF9C3"),
  SOK: svgWrap(`<rect x="6" y="8" width="12" height="14" rx="6" fill="white" stroke="#1A1A2E" stroke-width="1.8"/><rect x="8" y="10" width="8" height="8" rx="2" fill="#FACC15"/><path d="M4 6 Q12 2 20 6" stroke="#1A1A2E" stroke-width="1.8" fill="none" stroke-linecap="round"/>`, "#FEF9C3"),
  SER: svgWrap(`<path d="M12 4 L20 8 L20 16 Q12 22 4 16 L4 8 Z" fill="#FEF9C3" stroke="#1A1A2E" stroke-width="1.8"/><circle cx="8" cy="10" r="1.2" fill="#1A1A2E"/><circle cx="16" cy="10" r="1.2" fill="#1A1A2E"/>`, "#FEF9C3"),
  ZUPA: svgWrap(`<ellipse cx="12" cy="16" rx="10" ry="6" fill="white" stroke="#1A1A2E" stroke-width="1.8"/><ellipse cx="12" cy="12" rx="9" ry="5" fill="#FDE68A" stroke="#1A1A2E" stroke-width="1.4"/><path d="M16 8 Q18 6 17 10" stroke="#1A1A2E" stroke-width="1.2" fill="none"/>`, "#FEF9C3"),
  ZEBRA: svgWrap(`<ellipse cx="12" cy="13" rx="9" ry="8" fill="white" stroke="#1A1A2E" stroke-width="1.8"/><path d="M6 10 L8 14 M10 8 L12 14 M14 8 L16 14 M18 10 L20 14" stroke="#1A1A2E" stroke-width="1.4" stroke-linecap="round"/><circle cx="9" cy="11" r="1.3" fill="#1A1A2E"/><circle cx="15" cy="11" r="1.3" fill="#1A1A2E"/>`, "#FEF9C3"),
  ZAMEK: svgWrap(`<rect x="4" y="10" width="16" height="10" fill="#E9D5FF" stroke="#1A1A2E" stroke-width="1.8"/><rect x="7" y="6" width="3" height="6" fill="white" stroke="#1A1A2E" stroke-width="1.4"/><rect x="14" y="6" width="3" height="6" fill="white" stroke="#1A1A2E" stroke-width="1.4"/><rect x="10" y="13" width="4" height="5" rx="1" fill="#1A1A2E"/>`, "#E9D5FF"),
  CYTRYNA: svgWrap(`<ellipse cx="12" cy="12" rx="8" ry="6" fill="#FACC15" stroke="#1A1A2E" stroke-width="1.8"/><path d="M19 11 L21 9 L19 13" fill="#22C55E" stroke="#1A1A2E" stroke-width="1.2"/><path d="M5 13 L3 15 L5 11" fill="#22C55E" stroke="#1A1A2E" stroke-width="1.2"/>`, "#FEF9C3"),
  CEBULA: svgWrap(`<ellipse cx="12" cy="15" rx="7" ry="6" fill="#FEF9C3" stroke="#1A1A2E" stroke-width="1.8"/><path d="M12 9 Q12 5 14 3 Q12 5 10 3 Q12 5 12 9" fill="#22C55E" stroke="#1A1A2E" stroke-width="1.2"/><path d="M8 14 Q12 16 16 14" stroke="#1A1A2E" stroke-width="1.2" fill="none"/>`, "#FEF9C3"),
  KOC: svgWrap(`<rect x="4" y="8" width="16" height="10" rx="2" fill="#FDE68A" stroke="#1A1A2E" stroke-width="1.6"/><path d="M6 11 L18 11 M6 14 L18 14" stroke="#1A1A2E" stroke-width="1" stroke-dasharray="2 2"/>`, "#FEF9C3"),
  NOS: svgWrap(`<path d="M12 6 Q8 10 12 18 Q16 10 12 6" fill="#FDBA74" stroke="#1A1A2E" stroke-width="1.6"/><circle cx="10" cy="11" r="0.8" fill="#1A1A2E"/><circle cx="14" cy="11" r="0.8" fill="#1A1A2E"/>`, "#FFEDD5"),
  DZIK: svgWrap(`<ellipse cx="12" cy="14" rx="8" ry="7" fill="#D6B48A" stroke="#1A1A2E" stroke-width="1.8"/><circle cx="9" cy="12" r="1.3" fill="white" stroke="#1A1A2E" stroke-width="1"/><circle cx="9" cy="12" r="0.6" fill="#1A1A2E"/><path d="M6 8 L8 6 L9 8" fill="#1A1A2E"/><path d="M15 8 L17 6 L18 8" fill="#1A1A2E"/><ellipse cx="12" cy="16" rx="2" ry="1.2" fill="#1A1A2E"/>`, "#FFE8CC"),
  DZWON: svgWrap(`<path d="M12 4 L18 10 L16 10 L16 16 Q16 19 12 19 Q8 19 8 16 L8 10 L6 10 Z" fill="#FDE68A" stroke="#1A1A2E" stroke-width="1.6"/><circle cx="12" cy="20" r="1.5" fill="#1A1A2E"/>`, "#FEF9C3"),
  // szumiacy
  SZKOLA: svgWrap(`<rect x="4" y="10" width="16" height="10" fill="#D8F3DC" stroke="#1A1A2E" stroke-width="1.6"/><rect x="8" y="6" width="8" height="6" fill="white" stroke="#1A1A2E" stroke-width="1.2"/><rect x="10" y="13" width="4" height="4" fill="#1A1A2E"/>`, "#D8F3DC"),
  SZAFA: svgWrap(`<rect x="6" y="6" width="12" height="14" rx="1" fill="white" stroke="#1A1A2E" stroke-width="1.6"/><line x1="12" y1="6" x2="12" y2="20" stroke="#1A1A2E" stroke-width="1.2"/><circle cx="10" cy="13" r="1" fill="#1A1A2E"/><circle cx="14" cy="13" r="1" fill="#1A1A2E"/>`, "#F0FDF4"),
  SZALIK: svgWrap(`<path d="M8 6 Q12 10 16 6 L16 18 Q12 22 8 18 Z" fill="#F472B6" stroke="#1A1A2E" stroke-width="1.6"/><path d="M8 10 L16 10 M8 14 L16 14" stroke="white" stroke-width="1" />`, "#FFE4E6"),
  ZABA: svgWrap(`<ellipse cx="12" cy="14" rx="9" ry="7" fill="#86EFAC" stroke="#1A1A2E" stroke-width="1.6"/><circle cx="8" cy="9" r="3" fill="white" stroke="#1A1A2E" stroke-width="1.2"/><circle cx="16" cy="9" r="3" fill="white" stroke="#1A1A2E" stroke-width="1.2"/><circle cx="8" cy="9" r="1.2" fill="#1A1A2E"/><circle cx="16" cy="9" r="1.2" fill="#1A1A2E"/>`, "#DCFCE7"),
  ZYRAFA: svgWrap(`<ellipse cx="12" cy="15" rx="6" ry="7" fill="#FDE68A" stroke="#1A1A2E" stroke-width="1.6"/><rect x="10" y="4" width="4" height="7" fill="#FDE68A" stroke="#1A1A2E" stroke-width="1.2"/><circle cx="9" cy="7" r="1" fill="#1A1A2E"/><path d="M8 4 L7 2 M16 4 L17 2" stroke="#1A1A2E" stroke-width="1.2"/>`, "#FEF9C3"),
  ZELKI: svgWrap(`<rect x="6" y="10" width="12" height="8" rx="4" fill="#F472B6" stroke="#1A1A2E" stroke-width="1.4"/><circle cx="10" cy="14" r="2" fill="white"/><circle cx="14" cy="14" r="2" fill="white"/>`, "#FFE4E6"),
  CZAPKA: svgWrap(`<path d="M4 14 Q12 4 20 14 L4 14 Z" fill="#60A5FA" stroke="#1A1A2E" stroke-width="1.6"/><rect x="4" y="14" width="16" height="2" fill="#1A1A2E"/>`, "#DBEAFE"),
  CZEKOLADA: svgWrap(`<rect x="6" y="8" width="12" height="10" rx="1" fill="#92400E" stroke="#1A1A2E" stroke-width="1.6"/><line x1="10" y1="8" x2="10" y2="18" stroke="white" stroke-width="1"/><line x1="6" y1="13" x2="18" y2="13" stroke="white" stroke-width="1"/>`, "#FEF3C7"),
  DZEM: svgWrap(`<rect x="7" y="10" width="10" height="8" rx="2" fill="white" stroke="#1A1A2E" stroke-width="1.6"/><rect x="7" y="10" width="10" height="5" rx="1" fill="#EF4444"/><rect x="9" y="7" width="6" height="3" rx="1" fill="#1A1A2E"/>`, "#FEE2E2"),
  DZUNGLA: svgWrap(`<path d="M4 16 L8 8 L12 14 L16 6 L20 16 Z" fill="#86EFAC" stroke="#1A1A2E" stroke-width="1.4"/><circle cx="12" cy="6" r="1.5" fill="#FACC15" stroke="#1A1A2E" stroke-width="1"/>`, "#DCFCE7"),
  KOSZ: svgWrap(`<path d="M6 8 L18 8 L16 18 L8 18 Z" fill="#FDE68A" stroke="#1A1A2E" stroke-width="1.6"/><path d="M6 12 L18 12 M10 8 L12 18 M14 8 L14 18" stroke="#1A1A2E" stroke-width="1"/>`, "#FEF9C3"),
  MYSZ: svgWrap(`<ellipse cx="12" cy="14" rx="7" ry="6" fill="#E5E7EB" stroke="#1A1A2E" stroke-width="1.6"/><ellipse cx="6" cy="10" rx="4" ry="4" fill="#E5E7EB" stroke="#1A1A2E" stroke-width="1.2"/><ellipse cx="18" cy="10" rx="4" ry="4" fill="#E5E7EB" stroke="#1A1A2E" stroke-width="1.2"/><circle cx="10" cy="13" r="1" fill="#1A1A2E"/><circle cx="14" cy="13" r="1" fill="#1A1A2E"/>`, "#F3F4F6"),
  // rotacyzm
  RAKIETA: svgWrap(`<path d="M12 3 L16 9 L14 11 L14 18 L10 18 L10 11 L8 9 Z" fill="white" stroke="#1A1A2E" stroke-width="1.6"/><circle cx="12" cy="10" r="2" fill="#60A5FA" stroke="#1A1A2E" stroke-width="1.2"/><path d="M10 18 L8 20 L10 20 M14 18 L16 20 L14 20" fill="#EF4444" stroke="#1A1A2E" stroke-width="1.2"/>`, "#FFF7ED"),
  ROWER: svgWrap(`<circle cx="8" cy="16" r="4" fill="white" stroke="#1A1A2E" stroke-width="1.6"/><circle cx="16" cy="16" r="4" fill="white" stroke="#1A1A2E" stroke-width="1.6"/><path d="M8 16 L12 8 L16 16 M12 8 L10 6 L14 6" stroke="#1A1A2E" stroke-width="1.6" fill="none" stroke-linecap="round"/>`, "#FFF7ED"),
  RYBA: svgWrap(`<ellipse cx="12" cy="13" rx="8" ry="5" fill="#60A5FA" stroke="#1A1A2E" stroke-width="1.6"/><path d="M20 13 L22 10 L22 16 Z" fill="#60A5FA" stroke="#1A1A2E" stroke-width="1.4"/><circle cx="10" cy="12" r="1" fill="#1A1A2E"/><path d="M14 12 Q15 13 14 14" stroke="#1A1A2E" stroke-width="1" fill="none"/>`, "#DBEAFE"),
  ROZA: svgWrap(`<circle cx="12" cy="10" r="5" fill="#F472B6" stroke="#1A1A2E" stroke-width="1.4"/><circle cx="10" cy="8" r="1.2" fill="#FECACA"/><circle cx="14" cy="8" r="1.2" fill="#FECACA"/><path d="M12 15 L12 19" stroke="#22C55E" stroke-width="1.6"/><path d="M12 17 Q10 16 9 14 Q10 17 12 17 Q14 17 15 14 Q14 16 12 17" fill="#22C55E" stroke="#1A1A2E" stroke-width="1"/>`, "#FCE7F3"),
  KROWA: svgWrap(`<ellipse cx="12" cy="13" rx="9" ry="6" fill="white" stroke="#1A1A2E" stroke-width="1.6"/><ellipse cx="8" cy="12" rx="2" ry="1.5" fill="#1A1A2E"/><ellipse cx="14" cy="14" rx="1.5" ry="1" fill="#1A1A2E"/><circle cx="9" cy="10" r="1" fill="#1A1A2E"/><circle cx="15" cy="10" r="1" fill="#1A1A2E"/><path d="M12 10 L7 6 L8 8 M12 10 L17 6 L16 8" fill="#FDE68A" stroke="#1A1A2E" stroke-width="1"/>`, "#FFF7ED"),
  DRZEWO: svgWrap(`<rect x="10" y="14" width="4" height="6" fill="#92400E" stroke="#1A1A2E" stroke-width="1.4"/><circle cx="12" cy="10" r="7" fill="#86EFAC" stroke="#1A1A2E" stroke-width="1.4"/><circle cx="9" cy="9" r="1" fill="#22C55E"/><circle cx="15" cy="8" r="1" fill="#22C55E"/>`, "#DCFCE7"),
  TRAMWAJ: svgWrap(`<rect x="4" y="8" width="16" height="8" rx="1" fill="#FACC15" stroke="#1A1A2E" stroke-width="1.6"/><rect x="6" y="10" width="4" height="3" fill="white" stroke="#1A1A2E" stroke-width="1"/><rect x="14" y="10" width="4" height="3" fill="white" stroke="#1A1A2E" stroke-width="1"/><circle cx="8" cy="18" r="1.5" fill="#1A1A2E"/><circle cx="16" cy="18" r="1.5" fill="#1A1A2E"/>`, "#FEF9C3"),
  GRYKA: svgWrap(`<ellipse cx="12" cy="14" rx="7" ry="4" fill="#FDE68A" stroke="#1A1A2E" stroke-width="1.4"/><circle cx="9" cy="13" r="1" fill="#92400E"/><circle cx="12" cy="12" r="1" fill="#92400E"/><circle cx="15" cy="13" r="1" fill="#92400E"/><path d="M12 8 Q12 6 13 4 Q12 6 11 4 Q12 6 12 8" fill="#86EFAC" stroke="#1A1A2E" stroke-width="1"/>`, "#FEF9C3"),
  TORT: svgWrap(`<rect x="6" y="12" width="12" height="6" rx="1" fill="#FDE68A" stroke="#1A1A2E" stroke-width="1.4"/><rect x="7" y="9" width="10" height="4" rx="1" fill="white" stroke="#1A1A2E" stroke-width="1.2"/><path d="M9 9 L9 6 Q9 5 10 5 L10 9 M14 9 L14 6 Q14 5 15 5 L15 9" stroke="#EF4444" stroke-width="1.2"/>`, "#FEF9C3"),
  MUR: svgWrap(`<rect x="4" y="10" width="16" height="8" fill="#E5E7EB" stroke="#1A1A2E" stroke-width="1.4"/><line x1="8" y1="10" x2="8" y2="18" stroke="#1A1A2E" stroke-width="1"/><line x1="12" y1="10" x2="12" y2="18" stroke="#1A1A2E" stroke-width="1"/><line x1="4" y1="14" x2="20" y2="14" stroke="#1A1A2E" stroke-width="1"/>`, "#F3F4F6"),
  LUSTRO: svgWrap(`<ellipse cx="12" cy="12" rx="7" ry="8" fill="#DBEAFE" stroke="#1A1A2E" stroke-width="1.6"/><ellipse cx="12" cy="12" rx="5" ry="6" fill="white" stroke="#1A1A2E" stroke-width="1"/><path d="M9 9 L11 11" stroke="#1A1A2E" stroke-width="1" stroke-linecap="round"/>`, "#EFF6FF"),
  // ciszacy
  SLIMAK: svgWrap(`<path d="M6 14 Q6 10 10 10 Q14 10 14 14 Q14 18 10 18 L6 18" fill="#FDE68A" stroke="#1A1A2E" stroke-width="1.6"/><circle cx="16" cy="13" r="3" fill="white" stroke="#1A1A2E" stroke-width="1.2"/><circle cx="16" cy="13" r="0.8" fill="#1A1A2E"/><path d="M14 10 L13 7 M18 10 L19 7" stroke="#1A1A2E" stroke-width="1.2"/>`, "#FEF9C3"),
  SNIEG: svgWrap(`<circle cx="12" cy="12" r="6" fill="white" stroke="#1A1A2E" stroke-width="1.4"/><path d="M12 6 L12 18 M6 12 L18 12 M8 8 L16 16 M16 8 L8 16" stroke="#60A5FA" stroke-width="1" stroke-linecap="round"/><circle cx="12" cy="12" r="1" fill="#60A5FA"/>`, "#EFF6FF"),
  SWIECA: svgWrap(`<rect x="9" y="10" width="6" height="10" rx="1" fill="white" stroke="#1A1A2E" stroke-width="1.4"/><path d="M12 10 Q12 6 13 4 Q12 6 12 10" fill="#FACC15" stroke="#EF4444" stroke-width="1"/><ellipse cx="12" cy="10" rx="2" ry="1" fill="#1A1A2E"/>`, "#FEF9C3"),
  ZREBIE: svgWrap(`<ellipse cx="12" cy="13" rx="7" ry="6" fill="#FDE68A" stroke="#1A1A2E" stroke-width="1.4"/><ellipse cx="7" cy="11" rx="3" ry="4" fill="#FDE68A" stroke="#1A1A2E" stroke-width="1.2"/><circle cx="6" cy="11" r="0.8" fill="#1A1A2E"/><path d="M9 7 L11 5" stroke="#1A1A2E" stroke-width="1"/>`, "#FEF9C3"),
  ZRODLO: svgWrap(`<ellipse cx="12" cy="17" rx="8" ry="3" fill="#60A5FA" stroke="#1A1A2E" stroke-width="1.4"/><path d="M8 14 Q12 10 16 14" fill="#60A5FA" stroke="#1A1A2E" stroke-width="1.2"/><circle cx="12" cy="10" r="1.2" fill="white" stroke="#1A1A2E" stroke-width="1"/>`, "#DBEAFE"),
  CIAG: svgWrap(`<rect x="4" y="12" width="16" height="6" rx="1" fill="white" stroke="#1A1A2E" stroke-width="1.4"/><rect x="6" y="9" width="4" height="4" fill="#60A5FA" stroke="#1A1A2E" stroke-width="1"/><circle cx="8" cy="18" r="1.5" fill="#1A1A2E"/><circle cx="16" cy="18" r="1.5" fill="#1A1A2E"/>`, "#EFF6FF"),
  CMA: svgWrap(`<ellipse cx="12" cy="13" rx="3" ry="5" fill="#D6B48A" stroke="#1A1A2E" stroke-width="1.4"/><ellipse cx="6" cy="10" rx="6" ry="5" fill="#FDE68A" stroke="#1A1A2E" stroke-width="1.2"/><ellipse cx="18" cy="10" rx="6" ry="5" fill="#FDE68A" stroke="#1A1A2E" stroke-width="1.2"/><circle cx="6" cy="10" r="1" fill="#1A1A2E"/><circle cx="18" cy="10" r="1" fill="#1A1A2E"/>`, "#FEF9C3"),
  CIAPKI: svgWrap(`<ellipse cx="12" cy="12" rx="3" ry="3" fill="#1A1A2E"/><ellipse cx="8" cy="8" rx="1.5" ry="1.5" fill="#1A1A2E"/><ellipse cx="16" cy="8" rx="1.5" ry="1.5" fill="#1A1A2E"/><ellipse cx="7" cy="15" rx="1.2" ry="1.2" fill="#1A1A2E"/><ellipse cx="17" cy="15" rx="1.2" ry="1.2" fill="#1A1A2E"/>`, "#F3F4F6"),
  DZWIEK: svgWrap(`<path d="M6 10 L10 10 L14 6 L14 18 L10 14 L6 14 Z" fill="white" stroke="#1A1A2E" stroke-width="1.4"/><path d="M16 9 Q18 12 16 15" stroke="#1A1A2E" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M18 7 Q21 12 18 17" stroke="#1A1A2E" stroke-width="1" fill="none"/>`, "#EFF6FF"),
  DZWIG: svgWrap(`<rect x="10" y="12" width="2" height="8" fill="#FACC15" stroke="#1A1A2E" stroke-width="1.4"/><rect x="6" y="8" width="12" height="2" fill="#FACC15" stroke="#1A1A2E" stroke-width="1.2"/><path d="M6 8 L6 6 Q6 5 7 5 L7 8" stroke="#1A1A2E" stroke-width="1.2"/><circle cx="16" cy="10" r="2" fill="white" stroke="#1A1A2E" stroke-width="1"/>`, "#FEF9C3"),
  KOSC: svgWrap(`<rect x="7" y="10" width="10" height="4" rx="2" fill="white" stroke="#1A1A2E" stroke-width="1.4"/><circle cx="7" cy="10" r="2" fill="white" stroke="#1A1A2E" stroke-width="1.2"/><circle cx="7" cy="14" r="2" fill="white" stroke="#1A1A2E" stroke-width="1.2"/><circle cx="17" cy="10" r="2" fill="white" stroke="#1A1A2E" stroke-width="1.2"/><circle cx="17" cy="14" r="2" fill="white" stroke="#1A1A2E" stroke-width="1.2"/>`, "#F3F4F6"),
  LISC: svgWrap(`<path d="M12 4 Q18 10 12 20 Q6 10 12 4" fill="#86EFAC" stroke="#1A1A2E" stroke-width="1.4"/><path d="M12 4 L12 20" stroke="#1A1A2E" stroke-width="1"/><path d="M12 10 L15 8 M12 14 L16 12 M12 10 L9 8" stroke="#1A1A2E" stroke-width="1"/>`, "#DCFCE7"),
  RYSIO: svgWrap(`<circle cx="12" cy="12" r="7" fill="#FACC15" stroke="#1A1A2E" stroke-width="1.6"/><path d="M5 8 L7 6 L8 9 M19 8 L17 6 L16 9" fill="#FF7B25" stroke="#1A1A2E" stroke-width="1.2"/><circle cx="10" cy="11" r="1" fill="#1A1A2E"/><circle cx="14" cy="11" r="1" fill="#1A1A2E"/><path d="M12 13 L10 15 L14 15 Z" fill="white" stroke="#1A1A2E" stroke-width="1"/>`, "#FEF9C3"),
  CZEKO: svgWrap(`<rect x="7" y="10" width="10" height="8" rx="1" fill="#FDE68A" stroke="#1A1A2E" stroke-width="1.4"/><circle cx="12" cy="14" r="2" fill="white" stroke="#1A1A2E" stroke-width="1"/><path d="M10 8 Q12 6 14 8" stroke="#1A1A2E" stroke-width="1.2" fill="none"/>`, "#FEF9C3"),
  // === ROZSZERZENIE TEMATYCZNE — słowa tematyczne (pilot: kosmos, zwierzaki, pojazdy, ocean) ===
  SATELITA: svgWrap(`<circle cx="12" cy="12" r="7" fill="#DBEAFE" stroke="#1A1A2E" stroke-width="1.6"/><ellipse cx="12" cy="12" rx="10" ry="3" fill="none" stroke="#1A1A2E" stroke-width="1.2" stroke-dasharray="3 2"/><circle cx="12" cy="12" r="2" fill="#60A5FA" stroke="#1A1A2E" stroke-width="1.2"/>`, "#DBEAFE"),
  SONDA: svgWrap(`<circle cx="12" cy="13" r="5" fill="white" stroke="#1A1A2E" stroke-width="1.6"/><path d="M12 8 L12 4 M9 10 L6 7 M15 10 L18 7" stroke="#1A1A2E" stroke-width="1.4" stroke-linecap="round"/><circle cx="12" cy="13" r="1.5" fill="#FACC15" stroke="#1A1A2E" stroke-width="1"/>`, "#DBEAFE"),
  "SYGNAŁ": svgWrap(`<path d="M6 14 Q12 6 18 14" stroke="#1A1A2E" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="12" cy="16" r="1.5" fill="#1A1A2E"/><path d="M8 11 Q12 7 16 11" stroke="#1A1A2E" stroke-width="1.2" fill="none"/>`, "#DBEAFE"),
  KOSMOS: svgWrap(`<circle cx="12" cy="12" r="6" fill="#1E3A8A" stroke="#1A1A2E" stroke-width="1.6"/><circle cx="9" cy="10" r="1" fill="white"/><circle cx="14" cy="13" r="0.7" fill="white"/><circle cx="11" cy="14" r="0.6" fill="white"/>`, "#DBEAFE"),
  ZORZA: svgWrap(`<path d="M4 14 Q8 6 12 14 T20 14" stroke="#06B6D4" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M4 16 Q10 8 20 16" stroke="#A78BFA" stroke-width="1.2" fill="none"/>`, "#E0F2FE"),
  ZODIAK: svgWrap(`<circle cx="12" cy="12" r="6" fill="none" stroke="#1A1A2E" stroke-width="1.4" stroke-dasharray="2 2"/><path d="M8 10 L12 14 L16 9 L12 16" stroke="#1A1A2E" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="1.2" fill="#1A1A2E"/>`, "#DBEAFE"),
  CYFRA: svgWrap(`<rect x="7" y="7" width="10" height="10" rx="2" fill="white" stroke="#1A1A2E" stroke-width="1.6"/><text x="12" y="15" text-anchor="middle" font-size="8" font-weight="900" fill="#1A1A2E">5</text>`, "#FEF9C3"),
  CYRK: svgWrap(`<path d="M4 16 L12 6 L20 16 Z" fill="#F472B6" stroke="#1A1A2E" stroke-width="1.6"/><rect x="8" y="16" width="8" height="4" fill="#FEF9C3" stroke="#1A1A2E" stroke-width="1.2"/><circle cx="12" cy="10" r="1.5" fill="#FACC15" stroke="#1A1A2E" stroke-width="1"/>`, "#FFE4E6"),
  SARDYNKA: svgWrap(`<ellipse cx="12" cy="13" rx="7" ry="4" fill="#60A5FA" stroke="#1A1A2E" stroke-width="1.6"/><path d="M5 13 L2 11 L2 15 Z" fill="#60A5FA" stroke="#1A1A2E" stroke-width="1.2"/><circle cx="10" cy="12" r="1" fill="#1A1A2E"/>`, "#DBEAFE"),
  SYRENA: svgWrap(`<ellipse cx="12" cy="15" rx="6" ry="5" fill="#F472B6" stroke="#1A1A2E" stroke-width="1.6"/><path d="M12 10 Q10 6 12 4 Q14 6 12 10" fill="#FACC15" stroke="#1A1A2E" stroke-width="1.2"/><circle cx="10" cy="14" r="1" fill="#1A1A2E"/><circle cx="14" cy="14" r="1" fill="#1A1A2E"/>`, "#FFE4E6"),
  ZATOKA: svgWrap(`<path d="M4 16 Q12 8 20 16 L20 18 L4 18 Z" fill="#60A5FA" stroke="#1A1A2E" stroke-width="1.6"/><path d="M8 12 Q12 10 16 12" stroke="white" stroke-width="1" fill="none"/>`, "#DBEAFE"),
  "SAMOCHÓD": svgWrap(`<rect x="4" y="12" width="16" height="7" rx="2" fill="#EF4444" stroke="#1A1A2E" stroke-width="1.6"/><rect x="7" y="9" width="10" height="5" rx="1" fill="white" stroke="#1A1A2E" stroke-width="1.2"/><circle cx="8" cy="19" r="2" fill="#1A1A2E"/><circle cx="16" cy="19" r="2" fill="#1A1A2E"/>`, "#FEE2E2"),
  SAMOLOT: svgWrap(`<path d="M4 12 L18 9 L18 11 L16 12 L18 13 L18 15 L4 12 Z" fill="white" stroke="#1A1A2E" stroke-width="1.6"/><path d="M4 12 L2 10 L2 14 Z" fill="#60A5FA" stroke="#1A1A2E" stroke-width="1.2"/>`, "#DBEAFE"),
  SKUTER: svgWrap(`<circle cx="8" cy="17" r="3" fill="white" stroke="#1A1A2E" stroke-width="1.4"/><circle cx="16" cy="17" r="3" fill="white" stroke="#1A1A2E" stroke-width="1.4"/><path d="M8 17 L12 11 L16 17" stroke="#1A1A2E" stroke-width="1.6" fill="none"/><rect x="11" y="8" width="4" height="3" rx="1" fill="#FACC15" stroke="#1A1A2E" stroke-width="1.2"/>`, "#FEF9C3"),
  CYSTERNA: svgWrap(`<rect x="4" y="10" width="16" height="7" rx="3" fill="#FDE68A" stroke="#1A1A2E" stroke-width="1.6"/><circle cx="8" cy="17" r="2" fill="#1A1A2E"/><circle cx="16" cy="17" r="2" fill="#1A1A2E"/><rect x="6" y="12" width="3" height="3" fill="white" stroke="#1A1A2E" stroke-width="1"/>`, "#FEF9C3"),
  SZCZUPAK: svgWrap(`<ellipse cx="12" cy="13" rx="7" ry="3.5" fill="#86EFAC" stroke="#1A1A2E" stroke-width="1.6"/><path d="M19 13 L21 11 L21 15 Z" fill="#86EFAC" stroke="#1A1A2E" stroke-width="1.2"/><circle cx="10" cy="12" r="0.9" fill="#1A1A2E"/>`, "#DCFCE7"),
  SZPROTKA: svgWrap(`<ellipse cx="12" cy="13" rx="6" ry="3" fill="#60A5FA" stroke="#1A1A2E" stroke-width="1.4"/><path d="M6 13 L3 12 L3 14 Z" fill="#60A5FA" stroke="#1A1A2E" stroke-width="1"/><circle cx="10" cy="12" r="0.8" fill="#1A1A2E"/>`, "#DBEAFE"),
  REKIN: svgWrap(`<ellipse cx="12" cy="13" rx="7" ry="4" fill="#94A3B8" stroke="#1A1A2E" stroke-width="1.6"/><path d="M18 10 L20 8 L18 12" fill="#94A3B8" stroke="#1A1A2E" stroke-width="1.2"/><circle cx="10" cy="12" r="1" fill="#1A1A2E"/><path d="M6 13 L3 11 L5 15 Z" fill="#94A3B8" stroke="#1A1A2E" stroke-width="1"/>`, "#E2E8F0"),
  KOS: svgWrap(`<ellipse cx="12" cy="13" rx="6" ry="5" fill="#1A1A2E" stroke="#1A1A2E" stroke-width="1.6"/><path d="M10 11 L11 13 L10 12 Z" fill="#FACC15"/><circle cx="10" cy="12" r="0.8" fill="white"/>`, "#FEF9C3"),
  // === SESJA 2 — dinozaury, las, jedzenie, sport ===
  SMOK: svgWrap(`<path d="M6 14 Q12 6 18 14 L16 16 Q12 12 8 16 Z" fill="#86EFAC" stroke="#1A1A2E" stroke-width="1.6"/><circle cx="9" cy="12" r="1" fill="#1A1A2E"/><circle cx="15" cy="12" r="1" fill="#1A1A2E"/><path d="M4 14 Q2 12 4 10" stroke="#1A1A2E" stroke-width="1.4" fill="none"/>`, "#DCFCE7"),
  "SKAŁA": svgWrap(`<path d="M6 16 L8 10 L12 8 L16 10 L18 16 Z" fill="#A8A29E" stroke="#1A1A2E" stroke-width="1.6"/><path d="M8 10 L10 14 M14 10 L12 14" stroke="#1A1A2E" stroke-width="1"/>`, "#F3F4F6"),
  STADO: svgWrap(`<ellipse cx="9" cy="13" rx="3" ry="2.5" fill="#FDE68A" stroke="#1A1A2E" stroke-width="1.2"/><ellipse cx="15" cy="13" rx="3" ry="2.5" fill="#FDE68A" stroke="#1A1A2E" stroke-width="1.2"/><circle cx="9" cy="13" r="0.7" fill="#1A1A2E"/><circle cx="15" cy="13" r="0.7" fill="#1A1A2E"/>`, "#FEF9C3"),
  "ZĄB": svgWrap(`<path d="M8 10 Q12 7 16 10 L16 16 Q12 19 8 16 Z" fill="white" stroke="#1A1A2E" stroke-width="1.6"/><path d="M8 10 L16 10" stroke="#1A1A2E" stroke-width="1"/>`, "#F3F4F6"),
  REX: svgWrap(`<ellipse cx="12" cy="14" rx="7" ry="6" fill="#86EFAC" stroke="#1A1A2E" stroke-width="1.6"/><path d="M10 8 L10 5 L12 7 L14 5 L14 8" fill="#1A1A2E"/><circle cx="9" cy="12" r="1" fill="#1A1A2E"/><path d="M12 15 L14 16 L12 17 L10 16 Z" fill="white" stroke="#1A1A2E" stroke-width="1"/>`, "#DCFCE7"),
  SOSNA: svgWrap(`<path d="M12 6 L6 12 L8 12 L5 16 L19 16 L16 12 L18 12 Z" fill="#22C55E" stroke="#1A1A2E" stroke-width="1.4"/><rect x="10" y="16" width="4" height="4" fill="#92400E" stroke="#1A1A2E" stroke-width="1.2"/>`, "#DCFCE7"),
  SARNA: svgWrap(`<ellipse cx="12" cy="13" rx="6" ry="5" fill="#D6B48A" stroke="#1A1A2E" stroke-width="1.4"/><path d="M8 8 L7 5 L9 8 M16 8 L17 5 L15 8" stroke="#1A1A2E" stroke-width="1.2"/><circle cx="10" cy="12" r="0.8" fill="#1A1A2E"/><circle cx="14" cy="12" r="0.8" fill="#1A1A2E"/>`, "#FFE8CC"),
  SZYSZKA: svgWrap(`<ellipse cx="12" cy="13" rx="5" ry="6" fill="#A16207" stroke="#1A1A2E" stroke-width="1.4"/><path d="M8 11 L16 11 M8 13 L16 13 M9 15 L15 15" stroke="#1A1A2E" stroke-width="1"/>`, "#FEF9C3"),
  SZPAK: svgWrap(`<ellipse cx="12" cy="13" rx="6" ry="4" fill="#1A1A2E" stroke="#1A1A2E" stroke-width="1.4"/><circle cx="10" cy="12" r="0.8" fill="white"/><path d="M18 13 L21 12 L18 11" fill="#FACC15" stroke="#1A1A2E" stroke-width="1"/>`, "#F3F4F6"),
  "ŚWIERK": svgWrap(`<path d="M12 4 L7 10 L9 10 L6 14 L8 14 L5 18 L19 18 L16 14 L18 14 L15 10 L17 10 Z" fill="#15803D" stroke="#1A1A2E" stroke-width="1.2"/><rect x="10" y="18" width="4" height="3" fill="#78350F" stroke="#1A1A2E" stroke-width="1"/>`, "#DCFCE7"),
  GRZYB: svgWrap(`<path d="M6 12 Q12 6 18 12 L6 12 Z" fill="#EF4444" stroke="#1A1A2E" stroke-width="1.4"/><rect x="10" y="12" width="4" height="6" fill="#FEF9C3" stroke="#1A1A2E" stroke-width="1.2"/><circle cx="10" cy="10" r="1" fill="white"/><circle cx="14" cy="9" r="1" fill="white"/>`, "#FEE2E2"),
  "RYŚ": svgWrap(`<ellipse cx="12" cy="13" rx="6" ry="5" fill="#FDBA74" stroke="#1A1A2E" stroke-width="1.4"/><path d="M8 8 L6 5 L9 8 M16 8 L18 5 L15 8" fill="#1A1A2E"/><circle cx="10" cy="12" r="0.8" fill="#1A1A2E"/><circle cx="14" cy="12" r="0.8" fill="#1A1A2E"/>`, "#FFEDD5"),
  ANANAS: svgWrap(`<ellipse cx="12" cy="14" rx="6" ry="7" fill="#FACC15" stroke="#1A1A2E" stroke-width="1.4"/><path d="M12 7 Q12 4 10 3 Q12 4 12 7 Q12 4 14 3 Q12 4 12 7" fill="#22C55E" stroke="#1A1A2E" stroke-width="1.2"/><path d="M9 12 L15 12 M9 14 L15 14" stroke="#1A1A2E" stroke-width="0.8"/>`, "#FEF9C3"),
  SZYNKA: svgWrap(`<ellipse cx="12" cy="13" rx="6" ry="4" fill="#FECACA" stroke="#1A1A2E" stroke-width="1.4"/><ellipse cx="12" cy="13" rx="3" ry="1.5" fill="white" stroke="#1A1A2E" stroke-width="1"/><path d="M10 10 L14 10" stroke="#1A1A2E" stroke-width="1"/>`, "#FEE2E2"),
  "ŻUREK": svgWrap(`<ellipse cx="12" cy="14" rx="7" ry="5" fill="white" stroke="#1A1A2E" stroke-width="1.4"/><ellipse cx="12" cy="13" rx="6" ry="3" fill="#FEF3C7" stroke="#1A1A2E" stroke-width="1"/><path d="M9 9 Q12 7 15 9" stroke="#1A1A2E" stroke-width="1" fill="none"/>`, "#FEF9C3"),
  CZOSNEK: svgWrap(`<ellipse cx="12" cy="14" rx="5" ry="5" fill="white" stroke="#1A1A2E" stroke-width="1.4"/><path d="M12 9 Q12 6 13 4 Q12 6 12 9" fill="#86EFAC" stroke="#1A1A2E" stroke-width="1"/><path d="M10 14 Q12 15 14 14" stroke="#1A1A2E" stroke-width="1" fill="none"/>`, "#F3F4F6"),
  "ŚLIWKA": svgWrap(`<ellipse cx="12" cy="13" rx="5" ry="6" fill="#7C3AED" stroke="#1A1A2E" stroke-width="1.4"/><path d="M12 7 Q13 5 12 4 Q11 5 12 7" fill="#22C55E" stroke="#1A1A2E" stroke-width="1"/>`, "#EDE9FE"),
  SKOK: svgWrap(`<path d="M6 16 L10 12 L12 16 L16 10 L18 12" stroke="#1A1A2E" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="10" cy="11" r="1.5" fill="#1A1A2E"/><circle cx="16" cy="9" r="1" fill="#1A1A2E"/>`, "#EDE9FE"),
  SANKI: svgWrap(`<path d="M6 16 L18 16 L16 12 L8 12 Z" fill="#60A5FA" stroke="#1A1A2E" stroke-width="1.4"/><path d="M8 12 L8 9 L10 9 L10 12" stroke="#1A1A2E" stroke-width="1.2"/><path d="M6 16 L4 17 L18 17 L20 16" stroke="#1A1A2E" stroke-width="1.2"/>`, "#DBEAFE"),
  // === SESJA 3-4 — dom, ubrania, pogoda, muzyka, ogród, miasto ===
  SALON: svgWrap(`<rect x="4" y="10" width="16" height="8" rx="1" fill="#FEF9C3" stroke="#1A1A2E" stroke-width="1.4"/><rect x="6" y="12" width="5" height="4" fill="#FACC15" stroke="#1A1A2E" stroke-width="1"/><rect x="13" y="12" width="5" height="4" fill="#60A5FA" stroke="#1A1A2E" stroke-width="1"/>`, "#FEF3C7"),
  SOFA: svgWrap(`<rect x="4" y="12" width="16" height="6" rx="2" fill="#F472B6" stroke="#1A1A2E" stroke-width="1.4"/><rect x="4" y="10" width="3" height="4" fill="#F472B6" stroke="#1A1A2E" stroke-width="1.2"/><rect x="17" y="10" width="3" height="4" fill="#F472B6" stroke="#1A1A2E" stroke-width="1.2"/>`, "#FCE7F3"),
  "ZASŁONA": svgWrap(`<rect x="6" y="6" width="12" height="12" fill="#C4B5FD" stroke="#1A1A2E" stroke-width="1.4"/><path d="M6 8 L18 8 M6 12 L18 12" stroke="white" stroke-width="1"/>`, "#EDE9FE"),
  ZLEW: svgWrap(`<rect x="6" y="10" width="12" height="6" rx="1" fill="white" stroke="#1A1A2E" stroke-width="1.4"/><ellipse cx="12" cy="12" rx="4" ry="2" fill="#DBEAFE" stroke="#1A1A2E" stroke-width="1"/><circle cx="12" cy="11" r="0.7" fill="#1A1A2E"/>`, "#F3F4F6"),
  "SUKIENKA": svgWrap(`<path d="M9 6 L7 10 L8 18 L16 18 L17 10 L15 6 Z" fill="#F472B6" stroke="#1A1A2E" stroke-width="1.4"/><path d="M9 6 L12 8 L15 6" stroke="#1A1A2E" stroke-width="1.2" fill="none"/>`, "#FCE7F3"),
  SPODNIE: svgWrap(`<path d="M8 6 L16 6 L16 14 L13 18 L11 14 L10 18 L8 14 Z" fill="#60A5FA" stroke="#1A1A2E" stroke-width="1.4"/><rect x="8" y="6" width="8" height="2" fill="#1A1A2E"/>`, "#DBEAFE"),
  SANDAŁ: svgWrap(`<ellipse cx="12" cy="14" rx="7" ry="3" fill="#FDE68A" stroke="#1A1A2E" stroke-width="1.4"/><path d="M6 12 Q12 10 18 12" stroke="#1A1A2E" stroke-width="1.2" fill="none"/><rect x="10" y="8" width="4" height="4" fill="white" stroke="#1A1A2E" stroke-width="1"/>`, "#FEF9C3"),
  "SŁOŃCE": svgWrap(`<circle cx="12" cy="12" r="5" fill="#FACC15" stroke="#1A1A2E" stroke-width="1.4"/><path d="M12 4 L12 6 M12 18 L12 20 M4 12 L6 12 M18 12 L20 12 M7 7 L8.5 8.5 M15.5 15.5 L17 17 M17 7 L15.5 8.5 M8.5 15.5 L7 17" stroke="#1A1A2E" stroke-width="1.2" stroke-linecap="round"/>`, "#FEF9C3"),
  SZRON: svgWrap(`<path d="M12 6 L12 18 M6 12 L18 12 M8 8 L16 16 M16 8 L8 16" stroke="#60A5FA" stroke-width="1.2" stroke-linecap="round"/><circle cx="12" cy="12" r="1.2" fill="#60A5FA" stroke="#1A1A2E" stroke-width="1"/>`, "#EFF6FF"),
  "SAKSOFON": svgWrap(`<path d="M9 6 Q14 8 12 16 L10 18 L8 16 Q10 10 9 6" fill="#FACC15" stroke="#1A1A2E" stroke-width="1.4"/><circle cx="11" cy="10" r="1" fill="#1A1A2E"/><circle cx="11" cy="13" r="1" fill="#1A1A2E"/>`, "#FEF9C3"),
  "CYMBAŁ": svgWrap(`<circle cx="12" cy="13" r="6" fill="#FACC15" stroke="#1A1A2E" stroke-width="1.4"/><circle cx="12" cy="13" r="2" fill="#1A1A2E"/><path d="M12 7 L12 4" stroke="#1A1A2E" stroke-width="1.2"/>`, "#FEF9C3"),
  SKLEP: svgWrap(`<rect x="4" y="10" width="16" height="8" rx="1" fill="#FEF9C3" stroke="#1A1A2E" stroke-width="1.4"/><rect x="6" y="7" width="10" height="5" fill="#F472B6" stroke="#1A1A2E" stroke-width="1.2"/><rect x="10" y="13" width="4" height="5" fill="white" stroke="#1A1A2E" stroke-width="1"/>`, "#FEF9C3"),
  RATUSZ: svgWrap(`<rect x="6" y="10" width="12" height="8" fill="#E5E7EB" stroke="#1A1A2E" stroke-width="1.4"/><rect x="10" y="6" width="4" height="6" fill="white" stroke="#1A1A2E" stroke-width="1.2"/><path d="M6 10 L12 6 L18 10" fill="#1A1A2E"/>`, "#F3F4F6"),
  // functional icons for plynnosc/oddech
  "ŻÓŁW": svgWrap(`<ellipse cx="12" cy="15" rx="7" ry="4" fill="#86EFAC" stroke="#1A1A2E" stroke-width="1.6"/><ellipse cx="12" cy="12" rx="5" ry="4" fill="#FDE68A" stroke="#1A1A2E" stroke-width="1.4"/><circle cx="10" cy="12" r="1" fill="#1A1A2E"/><path d="M8 15 L6 17 M16 15 L18 17" stroke="#1A1A2E" stroke-width="1.2" fill="none"/>`, "#DCFCE7"),
  "ZAJĄC": svgWrap(`<ellipse cx="12" cy="14" rx="5" ry="5" fill="white" stroke="#1A1A2E" stroke-width="1.6"/><ellipse cx="9" cy="8" rx="2" ry="5" fill="white" stroke="#1A1A2E" stroke-width="1.4"/><ellipse cx="15" cy="8" rx="2" ry="5" fill="white" stroke="#1A1A2E" stroke-width="1.4"/><circle cx="10" cy="13" r="1" fill="#1A1A2E"/><circle cx="14" cy="13" r="1" fill="#1A1A2E"/>`, "#F3F4F6"),
  "PIÓRKO": svgWrap(`<path d="M8 18 Q12 6 16 8 Q14 12 12 16 L8 18" fill="white" stroke="#1A1A2E" stroke-width="1.4"/><path d="M12 8 L12 16" stroke="#1A1A2E" stroke-width="1"/>`, "#EFF6FF"),
  "SŁOMKA": svgWrap(`<rect x="10" y="6" width="4" height="14" rx="2" fill="white" stroke="#1A1A2E" stroke-width="1.4"/><rect x="11" y="6" width="2" height="6" fill="#FACC15"/><circle cx="12" cy="18" r="2" fill="#60A5FA" stroke="#1A1A2E" stroke-width="1"/>`, "#DBEAFE"),
  BALON: svgWrap(`<ellipse cx="12" cy="10" rx="6" ry="7" fill="#F472B6" stroke="#1A1A2E" stroke-width="1.6"/><path d="M12 17 L10 20 L14 20 Z" fill="#F472B6" stroke="#1A1A2E" stroke-width="1.2"/>`, "#FCE7F3"),
  "ODDECH": svgWrap(`<path d="M8 12 Q12 6 16 12 Q12 18 8 12" fill="none" stroke="#1A1A2E" stroke-width="1.6"/><path d="M12 8 L12 16" stroke="#06D6A0" stroke-width="1.4"/>`, "#ECFDF5"),
};

export function svgToDataUri(svg: string) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function stripDiacritics(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/Ł/g, "L");
}

export function wordToDataUri(word: string): string | null {
  const direct = wordSvg[word];
  if (direct) return svgToDataUri(direct);
  const normalized = stripDiacritics(word);
  const fallback = wordSvg[normalized];
  return fallback ? svgToDataUri(fallback) : null;
}

// Integracja HF — opcja A: public/anim/ (REALNE_POTRZEBY §5)
// Jeśli PNG wygenerowany przez anim/src/batch.ts → /public/anim/words/${normalized}.png
// Takumi w PDF renderuje <img src="/anim/words/KOSZ.png"> gdy plik istnieje, inaczej fallback do doodle dataURI.
// W przeglądarce (Gallery) obraz ładuje się z public/ bez base64.
// HF word canonical: white bg, 1024x1024, reużywalny na wszystkich kartach.
export function wordToImageSrc(word: string): string | null {
  // 1. spróbuj HF PNG (normalized, bez polskich znaków, lowercase)
  // Plik: public/anim/words/KOSZ.png lub kosz.png — check w runtime via fetch nie na build, więc zwracamy path i WordBubble sprawdzi fallback
  // 2. lokalny doodle dataURI
  const doodle = wordToDataUri(word);
  if (doodle) return doodle;
  // Jeśli brak doodle, zwróć ścieżkę do przyszłego HF (przeglądarka pokaże broken, PDF fallback do litery)
  const normalized = stripDiacritics(word).toLowerCase();
  return `/anim/words/${normalized}.png`;
}

export function heroImageSrc(theme: string): string {
  // hero cover per temat — 6 missing z Fazy A: dom, ubrania, pogoda, muzyka, ogrod, miasto
  return `/anim/hero/hero-${theme}.png`;
}

// Fallback CDN for words not in local map — Fluent Emoji MIT via jsDelivr (no fetch at build, client will fetch if needed)
// Example: wordCdnUrl("SOWA") → https://cdn.jsdelivr.net/npm/@svgmoji/... but we keep local first
export const fluentCdn: Record<string, string> = {
  // add when needed: SOWA: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Owl/3D/owl_3d.svg"
};
