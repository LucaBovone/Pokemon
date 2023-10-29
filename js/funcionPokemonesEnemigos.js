const pokemonEnemigosGuardados = localStorage.getItem('pokemonEnemigos');
let pokemonEnemigos = [];

if (pokemonEnemigosGuardados) {
    pokemonEnemigos = JSON.parse(pokemonEnemigosGuardados);
}

if (pokemonEnemigos.length === 0) {
    const nombrePokemonAleatorio = buscarPokemonAleatorio();
    const url = `https://pokeapi.co/api/v2/pokemon/${nombrePokemonAleatorio}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const nuevoPokemonEnemigo = new Pokemon(
                data.name,
                data.id,
                data.sprites,
                data.stats,
                data.types.map((type) => type.type.name)
            );

            pokemonEnemigos.push(nuevoPokemonEnemigo);

            localStorage.setItem('pokemonEnemigos', JSON.stringify(pokemonEnemigos));

            mostrarDetallesPokemon(nuevoPokemonEnemigo);
        })
        .catch((error) => {
            console.error(`Error al buscar el Pokémon: ${error}`);
        });
}

function buscarPokemonAleatorio() {
    let numeroAleatorio;

    if (diaActual <= 5) {
        numeroAleatorio = Math.floor(Math.random() * 4) + 1;
    } else {
        numeroAleatorio = Math.floor(Math.random() * 151) + 1;
    }

    let nombrePokemon;

    if (diaActual <= 5) {
        switch (numeroAleatorio) {
            case 1:
                nombrePokemon = 'pidgey';
                break;
            case 2:
                nombrePokemon = 'rattata';
                break;
            case 3:
                nombrePokemon = 'caterpie';
                break;
            case 4:
                nombrePokemon = 'weedle';
                break;
        }
    } else {
        nombrePokemon = [...mapaPrimeros151.keys()][numeroAleatorio - 1];
    }

    const url = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const pokemon = new Pokemon(
                data.name,
                data.id,
                data.sprites,
                data.stats,
                data.types.map((type) => type.type.name)
            );

            pokemonEnemigos.push(pokemon);

            localStorage.setItem('pokemonEnemigos', JSON.stringify(pokemonEnemigos));


            mostrarDetallesPokemon(pokemon);
        })
        .catch((error) => {
            console.error(`Error al buscar el Pokémon: ${error}`);
        });
}
function mostrarPokemonesEnemigos() {
    const tabla = document.getElementById('pokemon-enemigo');

    if (!tabla) {
        console.error('Tabla de Pokémon seleccionados no encontrada.');
        return;
    }


    tabla.innerHTML = '';

    pokemonEnemigos.forEach((pokemon) => {
        const tablaPokemon = document.createElement('table');
        tablaPokemon.classList.add('pokemon-table'); 


        agregarFila('Nombre', pokemon.name, tablaPokemon);
        agregarFila('  ', pokemon.sprites.front_default, tablaPokemon);
        agregarFila('ID', pokemon.id, tablaPokemon);
        agregarFila('Tipo', pokemon.types.join(', '), tablaPokemon);

        pokemon.stats.forEach((stats) => {
            agregarFila(stats.stat.name, stats.base_stat, tablaPokemon);
        });

        tabla.appendChild(tablaPokemon);
    });
}