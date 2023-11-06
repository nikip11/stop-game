// funcion para elegir una letra
// funcion para iniciar un timer
// funcion para elegir una room

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

// export let secounds
// export let timer
// export function getTimer() {
//   if (timer === null) {
//     timer = setInterval(() => {
//       secounds++
//     }, 1000 )
//   }
// }


const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

export function getLetter(){
  const randomIndex = Math.floor(Math.random() * letters.length);
  return letters[randomIndex];
}


// export const formFields = [
//   'nombre',
//   'apellido',
//   'cosa',
//   'color',
//   'ciudad/paìs',
//   'animal',
//   'comida',
//   'deporte',
//   'serie / película',
//   'intrumentos musicales'
// ]