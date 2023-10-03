let pokemonAdversario = null;
let pokemonEnemigo = null;
const pokemonEnemigosGuardados = localStorage.getItem('pokemonEnemigos');
let pokemonEnemigos = [];



const mapaPrimeros151 = new Map([
    ['bulbasaur', 1],
    ['ivysaur', 2],
    ['venusaur', 3],
    ['charmander', 4],
    ['charmeleon', 5],
    ['charizard', 6],
    ['squirtle', 7],
    ['wartortle', 8],
    ['blastoise', 9],
    ['caterpie', 10],
    ['metapod', 11],
    ['butterfree', 12],
    ['weedle', 13],
    ['kakuna', 14],
    ['beedrill', 15],
    ['pidgey', 16],
    ['pidgeotto', 17],
    ['pidgeot', 18],
    ['rattata', 19],
    ['raticate', 20],
    ['spearow', 21],
    ['fearow', 22],
    ['ekans', 23],
    ['arbok', 24],
    ['pikachu', 25],
    ['raichu', 26],
    ['sandshrew', 27],
    ['sandslash', 28],
    ['nidoran-f', 29],
    ['nidorina', 30],
    ['nidoqueen', 31],
    ['nidoran-m', 32],
    ['nidorino', 33],
    ['nidoking', 34],
    ['clefairy', 35],
    ['clefable', 36],
    ['vulpix', 37],
    ['ninetales', 38],
    ['jigglypuff', 39],
    ['wigglytuff', 40],
    ['zubat', 41],
    ['golbat', 42],
    ['oddish', 43],
    ['gloom', 44],
    ['vileplume', 45],
    ['paras', 46],
    ['parasect', 47],
    ['venonat', 48],
    ['venomoth', 49],
    ['diglett', 50],
    ['dugtrio', 51],
    ['meowth', 52],
    ['persian', 53],
    ['psyduck', 54],
    ['golduck', 55],
    ['mankey', 56],
    ['primeape', 57],
    ['growlithe', 58],
    ['arcanine', 59],
    ['poliwag', 60],
    ['poliwhirl', 61],
    ['poliwrath', 62],
    ['abra', 63],
    ['kadabra', 64],
    ['alakazam', 65],
    ['machop', 66],
    ['machoke', 67],
    ['machamp', 68],
    ['bellsprout', 69],
    ['weepinbell', 70],
    ['victreebel', 71],
    ['tentacool', 72],
    ['tentacruel', 73],
    ['geodude', 74],
    ['graveler', 75],
    ['golem', 76],
    ['ponyta', 77],
    ['rapidash', 78],
    ['slowpoke', 79],
    ['slowbro', 80],
    ['magnemite', 81],
    ['magneton', 82],
    ['farfetchd', 83],
    ['doduo', 84],
    ['dodrio', 85],
    ['seel', 86],
    ['dewgong', 87],
    ['grimer', 88],
    ['muk', 89],
    ['shellder', 90],
    ['cloyster', 91],
    ['gastly', 92],
    ['haunter', 93],
    ['gengar', 94],
    ['onix', 95],
    ['drowzee', 96],
    ['hypno', 97],
    ['krabby', 98],
    ['kingler', 99],
    ['voltorb', 100],
    ['electrode', 101],
    ['exeggcute', 102],
    ['exeggutor', 103],
    ['cubone', 104],
    ['marowak', 105],
    ['hitmonlee', 106],
    ['hitmonchan', 107],
    ['lickitung', 108],
    ['koffing', 109],
    ['weezing', 110],
    ['rhyhorn', 111],
    ['rhydon', 112],
    ['chansey', 113],
    ['tangela', 114],
    ['kangaskhan', 115],
    ['horsea', 116],
    ['seadra', 117],
    ['goldeen', 118],
    ['seaking', 119],
    ['staryu', 120],
    ['starmie', 121],
    ['mr-mime', 122],
    ['scyther', 123],
    ['jynx', 124],
    ['electabuzz', 125],
    ['magmar', 126],
    ['pinsir', 127],
    ['tauros', 128],
    ['magikarp', 129],
    ['gyarados', 130],
    ['lapras', 131],
    ['ditto', 132],
    ['eevee', 133],
    ['vaporeon', 134],
    ['jolteon', 135],
    ['flareon', 136],
    ['porygon', 137],
    ['omanyte', 138],
    ['omastar', 139],
    ['kabuto', 140],
    ['kabutops', 141],
    ['aerodactyl', 142],
    ['snorlax', 143],
    ['articuno', 144],
    ['zapdos', 145],
    ['moltres', 146],
    ['dratini', 147],
    ['dragonair', 148],
    ['dragonite', 149],
    ['mewtwo', 150],
    ['mew', 151]
]);


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






