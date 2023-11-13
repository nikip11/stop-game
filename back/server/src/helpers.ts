import { Answer } from "./types";
import { getUser } from "./user";

export function getRoom() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const length = 5;
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars.charAt(randomIndex);
  }

  return result;
}

export function checkAnswers(answers: {}, letter: string) {
  const totalPoints: number[] = [];
  Object.entries(answers).forEach(([key, value]: [key: string, value: unknown]) => {
    console.log({ key, value })
    if (!value) return
    const valid = startWith((value as string), letter);
    const points = valid ? 100 : 0;
    console.log({ key, value, valid, points });
    totalPoints.push(points);
  });
  return totalPoints.reduce((a, b) => a + b, 0);
}

export async function checkMultiAnswer() {

}

function startWith(name: string, initialLetter: string) {
  const escapedInitialLetter = initialLetter.toLowerCase().replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  );
  const regex = new RegExp(`^${escapedInitialLetter}[A-Za-z]{2,}$`);
  return regex.test(name.toLowerCase());
}

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
export function getLetter() {
  const randomIndex = Math.floor(Math.random() * letters.length);
  return letters[randomIndex];
}

export const categories = [
  'nombre',
  'apellido',
  'cosa',
  'color',
  'ciudad/país',
  'animal',
  'comida',
  'deporte',
  'serie/película',
  'intrumentos musicales'
]
