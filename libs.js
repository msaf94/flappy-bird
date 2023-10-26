export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + max);
}

export function getRandomBoolean() {
  return Math.random() > 0.5;
}