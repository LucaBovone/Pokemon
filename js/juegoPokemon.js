let pokemonAdversario = null;
let pokemonEnemigo = null;
const misPokemonesJSON = localStorage.getItem('misPokemones');
misPokemones = misPokemonesJSON ? JSON.parse(misPokemonesJSON) : [];



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

            if(misPokemones.length>0){
                Toastify({
                    text: `Ya habias elejido pokemon inicial, continua`,
                    duration: 5000, 
                }).showToast();
            }else{
            MisPokemones.push(pokemon);
            Toastify({
                text: `¡Has elegido a ${selectedPokemon} como tu primer Pokémon!`,
                duration: 5000, 
            }).showToast();
            }

            guardarMisPokemonesEnLocalStorage();

            pokemonSeleccionado = selectedPokemon;
            pokemonSelect.disabled = true;

            const formularioPokemon = document.querySelector('form');
            formularioPokemon.style.display = 'none';

            const formularioAcciones = document.getElementById('acciones-form');
            formularioAcciones.classList.remove('ocultar');

            const tablas = document.querySelectorAll('.pokemon-table');
            tablas.forEach((tabla) => {
                tabla.style.display = 'none';
            });
        });
}

function mostrarMisPokemones() {
    const tabla = document.getElementById('pokemon-seleccionado');

    if (!tabla) {
        console.error('Tabla de Pokémon seleccionados no encontrada.');
        return;
    }

    tabla.innerHTML = '';

    misPokemones.forEach((pokemon) => {
        const tablaPokemon = document.createElement('table');
        tablaPokemon.classList.add('pokemon-table'); // Agrega la clase CSS

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
const mostrarPokemonesButton = document.getElementById('mostrar-pokemones-button');

mostrarPokemonesButton.addEventListener('click', function() {
    mostrarMisPokemones();
});




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

MisPokemones = cargarMisPokemonesDesdeLocalStorage();


