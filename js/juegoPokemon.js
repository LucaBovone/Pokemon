let charmanderPokemon;
let bulbasaurPokemon;
let squirtlePokemon;

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
//
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
    agregarFila('N', pokemon.id, filaDiv);
    agregarFila('Tipo', pokemon.types.join(', '), filaDiv);

    pokemon.stats.forEach((stats) => {
        agregarFila(stats.stat.name, stats.base_stat, filaDiv);
    });

    tabla.appendChild(filaDiv);
}





