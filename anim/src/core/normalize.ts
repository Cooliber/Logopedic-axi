// WordNormalizer — jedna implementacja zamiast 5× regex
export function normalizeWord(word: string): string {
  return word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/Ł/g, "L")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

export function toFileId(word: string): string {
  return normalizeWord(word);
}

export function toHeroId(theme: string): string {
  return `hero-${normalizeWord(theme).toLowerCase()}`;
}
