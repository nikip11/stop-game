export const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

export const formFields = [
    'nombre',
    'apellido',
    'cosa',
    'color',
    'ciudad/paìs',
    'animal',
    'comida',
    'deporte',
    'serie / película',
    'intrumentos musicales'
]

export function selectRandomLetter(letters: string[]): string {
    const randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
  }

// const categorias = ['Frutas', 'Animales', 'Ciudades', 'Películas', 'Colores', 'Países', 'Nombres', 'Deportes', 'Comidas', 'Instrumentos Musicales'];
