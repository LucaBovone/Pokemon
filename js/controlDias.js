let diaActual = 1;
let opcionesElegidas = 0;


const diaGuardado = localStorage.getItem('diaActual');

if (diaGuardado !== null) {
    diaActual = parseInt(diaGuardado);
} else {

    diaActual = 1;
}

localStorage.setItem('diaActual', diaActual.toString());

document.getElementById('acciones-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const seleccion = document.getElementById('accion').value;

    if (opcionesElegidas < 3) {
        switch (seleccion) {
            case 'buscar-pokemon':
                mostrarNotificacion(`Día ${diaActual}: Buscando un nuevo Pokémon...`,0);
                mostrarNotificacion(`Día ${diaActual}: Pokemon encontrado`, 1000);
                mostrarPokemonesEnemigos()


                
                break;
            case 'buscar-objeto':
                mostrarNotificacion(`Día ${diaActual}: Buscando un objeto...`);
                break;
            case 'curar-pokemones':
                mostrarNotificacion(`Día ${diaActual}: Curando a tus Pokémon...`);
                break;
            default:
                mostrarNotificacion('Opción no válida. Por favor, elige una de las opciones del formulario.');
        }

        opcionesElegidas++;
    } else {
        console.log(`Día ${diaActual}: Ya has elegido tus 3 opciones para hoy.`);
    }

    if (opcionesElegidas === 3) {
        avanzarDia();
    }
});

function avanzarDia() {
    diaActual++;
    opcionesElegidas = 0;
    mostrarNotificacion(`Día ${diaActual}: Comienza un nuevo día.`);
    localStorage.setItem('diaActual', diaActual);

}

function mostrarNotificacion(mensaje, delay) {
    setTimeout(function() {
        Toastify({
            text: mensaje,
            duration: 3000,
        }).showToast();
    }, delay);
}
// localStorage.setItem('diaActual', '1');
// diaActual = 1;
