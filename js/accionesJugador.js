// Después de mostrar los detalles del Pokémon enemigo
const battleOptions = document.querySelector('.battle-options');
const attackButton = document.getElementById('attack-button');
const specialAttackButton = document.getElementById('special-attack-button');
const runButton = document.getElementById('run-button');
const itemButton = document.getElementById('item-button');

// Función para manejar la elección del usuario y ocultar los botones
battleOptions.style.display = 'block';
function elegirAccion() {
    battleOptions.style.display = 'block';

    attackButton.addEventListener('click', () => {

        battleOptions.style.display = 'none';
    });

    specialAttackButton.addEventListener('click', () => {

        battleOptions.style.display = 'none';
    });

    runButton.addEventListener('click', () => {

        battleOptions.style.display = 'none';
    });

    itemButton.addEventListener('click', () => {

        battleOptions.style.display = 'none';
    });
}

elegirAccion();