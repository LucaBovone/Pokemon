const accionesForm = document.getElementById("acciones-form");
accionesForm.addEventListener("submit", realizarAccion);

function realizarAccion(event) {
    event.preventDefault();

    const accionSelect = document.getElementById("accion");
    const accionElegida = accionSelect.value;

    switch (accionElegida) {
        case "buscar-pokemon":
            buscarPokemon();
            break;
        case "buscar-objeto":
            buscarObjeto();
            break;
        case "curar-pokemones":
            curarPokemones();
            break;
        default:
            console.log("Acción no reconocida.");
    }
}

function buscarPokemon() {

    console.log("Has elegido la acción 'Buscar Pokémon'.");
}

// Función para la acción "Buscar Objeto"
function buscarObjeto() {

    console.log("Has elegido la acción 'Buscar Objeto'.");
}

// Función para la acción "Curar Pokémon"
function curarPokemones() {

    console.log("Has elegido la acción 'Curar Pokémones'.");
}