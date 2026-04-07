import type { IPokemon } from "./IPokemon";

export interface ITeam {
    id: number;
    name: string;
    pokemons: IPokemon[];
}