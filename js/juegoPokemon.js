let pokemonAdversario = null;
let pokemonEnemigo = null;
const pokemonEnemigosGuardados = localStorage.getItem('pokemonEnemigos');
let pokemonEnemigos = [];





function obtenerDatosPokemon(url, tabla) {
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
            mostrarDatosPokemon(pokemon, tabla);
        });
}

obtenerDatosPokemon('https://pokeapi.co/api/v2/pokemon/charmander', 'pokemon-table1');
obtenerDatosPokemon('https://pokeapi.co/api/v2/pokemon/bulbasaur', 'pokemon-table2');
obtenerDatosPokemon('https://pokeapi.co/api/v2/pokemon/squirtle', 'pokemon-table3');

function agregarFila(atributo, valor, tabla) {
    const fila = document.createElement('tr');
    const celdaAtributo = document.createElement('td');
    const celdaValor = document.createElement('td');

    celdaAtributo.textContent = atributo;

    if (atributo == '  ') {
        const imagen = document.createElement('img');
        imagen.src = valor;
        imagen.alt = 'Imagen del Pokémon';

        celdaValor.innerHTML = '';

        celdaValor.appendChild(imagen);
    } else {
        celdaValor.textContent = valor;
    }

    fila.appendChild(celdaAtributo);
    fila.appendChild(celdaValor);

    tabla.appendChild(fila);
}

function mostrarDatosPokemon(pokemon, tablaId) {
    const tabla = document.getElementById(tablaId);

    if (!tabla) {
        console.error(`Tabla con ID ${tablaId} no encontrada.`);
        return;
    }

    const filaDiv = document.createElement('div');
    filaDiv.classList.add('pokemon-row');

    agregarFila('Nombre', pokemon.name, filaDiv);
    agregarFila('  ', pokemon.sprites.front_default, filaDiv);
    agregarFila('ID', pokemon.id, filaDiv);
    agregarFila('Tipo', pokemon.types.join(', '), filaDiv);

    pokemon.stats.forEach((stats) => {
        agregarFila(stats.stat.name, stats.base_stat, filaDiv);
    });
    

    tabla.appendChild(filaDiv);
}

let MisPokemones = [];
let pokemonSeleccionado = null; 

function agregarPokemon(event) {
    event.preventDefault();

    if (pokemonSeleccionado !== null) {
        console.log('Ya has elegido tu primer Pokémon. No puedes cambiar tu elección.');
        return;
    }

    const pokemonSelect = document.getElementById('pokemonSelect');
    const selectedPokemon = pokemonSelect.value;

    fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
        .then((response) => response.json())
        .then((data) => {
            const pokemon = new Pokemon(
                data.name,
                data.id,
                data.sprites,
                data.stats,
                data.types.map((type) => type.type.name)
            );

            // Agrega el nuevo Pokémon a MisPokemones
            MisPokemones.push(pokemon);

            // Guarda MisPokemones en localStorage
            guardarMisPokemonesEnLocalStorage();

            pokemonSeleccionado = selectedPokemon;
            pokemonSelect.disabled = true;

            console.log(`¡Has elegido a ${selectedPokemon} como tu primer Pokémon!`);

            const formularioPokemon = document.querySelector('form');
            formularioPokemon.style.display = 'none';

            const tablas = document.querySelectorAll('.pokemon-table');
            tablas.forEach((tabla) => {
                if (tabla.getAttribute('data-tabla') !== selectedPokemon) {
                    tabla.style.display = 'none';
                }
            });
        });
}
function obtenerPokemonAleatorio() {
    // Genera un número aleatorio entre 1 y 151
    const numeroAleatorio = Math.floor(Math.random() * 151) + 1;

    // Busca el nombre correspondiente en el mapa
    const nombrePokemon = [...mapaPrimeros151.keys()][numeroAleatorio - 1];

    return nombrePokemon;
}

function obtenerPokemonEnemigo() {
    if (pokemonEnemigos.length < 3) {
        const nombrePokemonAleatorio = obtenerPokemonAleatorio();
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

                // Llama a una función para mostrar los detalles del Pokémon
                mostrarDetallesPokemon(nuevoPokemonEnemigo);
            })
            .catch((error) => {
                console.error(`Error al obtener el Pokémon: ${error}`);
            });
    }
}
if (pokemonEnemigosGuardados) {
    pokemonEnemigos = JSON.parse(pokemonEnemigosGuardados);
} else {
    [1, 2, 3].forEach(() => obtenerPokemonEnemigo());
}

function mostrarDetallesPokemon(pokemon) {
    console.log(`Nombre del Pokémon: ${pokemon.nombre}`);
}


function guardarMisPokemonesEnLocalStorage() {
    localStorage.setItem('misPokemones', JSON.stringify(MisPokemones));
}

// Función para cargar MisPokemones desde localStorage
function cargarMisPokemonesDesdeLocalStorage() {
    const misPokemonesJSON = localStorage.getItem('misPokemones');
    return misPokemonesJSON ? JSON.parse(misPokemonesJSON) : [];
}

// Llama a la función para cargar MisPokemones desde localStorage al cargar la página
MisPokemones = cargarMisPokemonesDesdeLocalStorage();
MisPokemones = [];





