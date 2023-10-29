class Revivir {
    constructor() {
    }

    use(pokemon) {
        if (pokemon.health <= 0) {
            const maxHealth = pokemon.maxHealth;
            pokemon.health = maxHealth / 2;
            return `Has revivido a ${pokemon.name} y su salud se ha restaurado a la mitad de sus puntos de salud máxima.`;
        } else {
            return `${pokemon.name} no está fainted y no se puede revivir.`;
        }
    }
}

class Pocion {
    constructor() {
        this.healingPower = 20;
    }

    use(pokemon) {
        const currentHealth = pokemon.health; 
        const maxHealth = pokemon.maxHealth; 

        if (currentHealth > 0) {
            const amountToHeal = Math.min(this.healingPower, maxHealth - currentHealth);
            pokemon.health += amountToHeal;
            return `Has curado a ${pokemon.name} en ${amountToHeal} puntos de salud.`;
        } else {
            return `${pokemon.name} está fainted y no se puede curar.`;
        }
    }
}

