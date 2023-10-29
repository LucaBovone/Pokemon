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


function pelearPokemon(pokemonInicial, pokemonSegundo) {
    let turno = pokemonInicial; 
    let oponente = pokemonSegundo;

    while (pokemonInicial.salud > 0 && pokemonSegundo.salud > 0) {
        const temp = turno;
        turno = oponente;
        oponente = temp;
    }

    if (pokemonInicial.salud > 0) {
        console.log(`${pokemonInicial.name} ganó la batalla.`);
    } else {
        console.log(`${pokemonSegundo.name} ganó la batalla.`);
    }
    battleOptions.style.display = 'block';
}