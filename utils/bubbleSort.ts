import { Pokemon } from "../models/pokemon";

export function bubbleSort(pokemons: Pokemon[]): Pokemon[] {
  const result = [...pokemons];

  for (let i = 0; i < result.length - 1; i++) {
    for (let j = 0; j < result.length - i - 1; j++) {
      if (result[j].name.localeCompare(result[j + 1].name) > 0) {
        const temp = result[j];
        result[j] = result[j + 1];
        result[j + 1] = temp;
      }
    }
  }

  return result;
}
