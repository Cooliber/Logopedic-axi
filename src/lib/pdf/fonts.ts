import { googleFonts } from "@takumi-rs/helpers";

export async function kidFonts() {
  // Baloo 2 + Nunito + Inter = kid-friendly rounded + readable
  return googleFonts(["Baloo 2", "Nunito", "Inter", "Fredoka"] as never);
}

// fallback if googleFonts fails (offline)
export const fontFallback = undefined;
