import { test, expect } from "@playwright/test";
import { PokemonService } from "../services/pokemonService";
import { bubbleSort } from "../utils/bubbleSort";

test("Obtener la cadena evolutiva de Squirtle y ordenarla alfabéticamente", async ({ request }) => {

  const pokemonService = new PokemonService(request);

  const pokemons = await pokemonService.getPokemonEvolutionData("squirtle");

  const orderedPokemons = bubbleSort(pokemons);

  console.table(orderedPokemons);

  expect(orderedPokemons.length).toBe(3);

  expect(orderedPokemons[0].name).toBe("blastoise");
  expect(orderedPokemons[1].name).toBe("squirtle");
  expect(orderedPokemons[2].name).toBe("wartortle");

});
