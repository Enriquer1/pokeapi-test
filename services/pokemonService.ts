import { APIRequestContext, expect } from "@playwright/test";
import { Pokemon } from "../models/pokemon";

export class PokemonService {

  constructor(private request: APIRequestContext) {}

  async getPokemonEvolutionData(pokemonName: string): Promise<Pokemon[]> {

    // 1. Obtener información del Pokémon
    const pokemonResponse = await this.request.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    expect(pokemonResponse.status()).toBe(200);

    const pokemonData = await pokemonResponse.json();

    // 2. Obtener la especie
    const speciesResponse = await this.request.get(
      pokemonData.species.url
    );

    expect(speciesResponse.status()).toBe(200);

    const speciesData = await speciesResponse.json();

    // 3. Obtener la cadena evolutiva
    const evolutionResponse = await this.request.get(
      speciesData.evolution_chain.url
    );

    expect(evolutionResponse.status()).toBe(200);

    const evolutionData = await evolutionResponse.json();

    const names: string[] = [];

    let current = evolutionData.chain;

    while (current) {
      names.push(current.species.name);

      current =
        current.evolves_to.length > 0
          ? current.evolves_to[0]
          : null;
    }

    const pokemons: Pokemon[] = [];

    // 4. Consultar el peso de cada Pokémon
    for (const name of names) {

      const response = await this.request.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );

      expect(response.status()).toBe(200);

      const data = await response.json();

      pokemons.push({
        name: data.name,
        weight: data.weight
      });

    }

    return pokemons;

  }

}
