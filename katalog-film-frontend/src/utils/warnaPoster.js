const PALET = [
  ['#7c2d12', '#f59e0b'],
  ['#0f172a', '#38bdf8'],
  ['#4c1d95', '#f472b6'],
  ['#14532d', '#86efac'],
  ['#831843', '#fb7185'],
  ['#1e3a8a', '#a78bfa'],
]

export function gradienPoster(id) {
  const [a, b] = PALET[id % PALET.length]
  return `linear-gradient(160deg, ${a}, ${b})`
}