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

            // Agrega el nuevo Pokémon enemigo al array
            pokemonEnemigos.push(nuevoPokemonEnemigo);

            // Guarda el array pokemonEnemigos en localStorage
            localStorage.setItem('pokemonEnemigos', JSON.stringify(pokemonEnemigos));

            // Muestra los detalles del Pokémon en tu juego
            mostrarDetallesPokemon(nuevoPokemonEnemigo);
        })
        .catch((error) => {
            console.error(`Error al buscar el Pokémon: ${error}`);
        });
}

function buscarPokemonAleatorio() {
    let numeroAleatorio;

    // Genera un número aleatorio entre 1 y 5 para los primeros 5 días
    if (diaActual <= 5) {
        numeroAleatorio = Math.floor(Math.random() * 4) + 1;
    } else {
        // Después del día 5, genera un número aleatorio entre 1 y 151 (todos los Pokémon)
        numeroAleatorio = Math.floor(Math.random() * 151) + 1;
    }

    let nombrePokemon;

    // Selecciona un Pokémon según el número aleatorio
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

            // Agrega el nuevo Pokémon enemigo al array
            pokemonEnemigos.push(pokemon);

            // Guarda el array pokemonEnemigos en localStorage
            localStorage.setItem('pokemonEnemigos', JSON.stringify(pokemonEnemigos));

            // Muestra los detalles del Pokémon en tu juego
            mostrarDetallesPokemon(pokemon);
        })
        .catch((error) => {
            console.error(`Error al buscar el Pokémon: ${error}`);
        });
}
function mostrarPokemonesEnemigos() {
    const tabla = document.getElementById('pokemon-seleccionado');

    if (!tabla) {
        console.error('Tabla de Pokémon seleccionados no encontrada.');
        return;
    }

    // Limpia la tabla antes de agregar nuevos Pokémon
    tabla.innerHTML = '';

    pokemonEnemigos.forEach((pokemon) => {
        const tablaPokemon = document.createElement('table');
        tablaPokemon.classList.add('pokemon-table'); // Agrega la clase CSS

        // Crea y agrega filas y celdas para mostrar los datos del Pokémon
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