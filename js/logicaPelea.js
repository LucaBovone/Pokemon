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
    let turno = pokemonInicial; // El Pokémon inicial comienza la batalla
    let oponente = pokemonSegundo;

    while (pokemonInicial.salud > 0 && pokemonSegundo.salud > 0) {
        // Realiza un turno de la pelea aquí, por ejemplo, puedes implementar ataques y daño.
        // Actualiza los puntos de salud y controla la lógica de la pelea.
        
        // Cambiar de turno
        const temp = turno;
        turno = oponente;
        oponente = temp;
    }

    // Determina al ganador y muestra un mensaje de victoria o derrota
    if (pokemonInicial.salud > 0) {
        console.log(`${pokemonInicial.name} ganó la batalla.`);
    } else {
        console.log(`${pokemonSegundo.name} ganó la batalla.`);
    }
}