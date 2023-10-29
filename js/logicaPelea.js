function determinarPokemonInicial(pokemon1, pokemon2) {
    const velocidadPokemon1 = pokemon1.stats[5].base_stat;
    const velocidadPokemon2 = pokemon2.stats[5].base_stat;

    if (velocidadPokemon1 > velocidadPokemon2) {
        return pokemon1;
    } else if (velocidadPokemon2 > velocidadPokemon1) {
        return pokemon2;
    } else {
        return pokemon1;
    }
}