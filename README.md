# Tiple Aced


## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm start` | Build project and open web server running project |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |

## Idea

Juego Roguelike, en donde se podrá controlar una party de hasta 3 personajes, pudiendo manejar directamente a uno mientras los otros 2 lo siguen. El PJ controlado puede ser cambiado en cualquier momento.

### Personajes

Cada personaje tendrá stats, traits, 3 tipos de ataques, 1 ultimate y una habilidad de movimeinto mejorado.

#### Stats

Todos los stats tendrán alguna influiencia en elecciones que e darán en el escenario o al interactuar con personajes.
Se diviirán en:
* STR: Fuerza física. Afecta a daño físico, HP
* AGI: Agilidad. Afecta la velocidad de ataque, velocidad de movimiento, evasión.
* INT: Inteligencia. Afecta el daño mágico, maná.
* DEX: Todo, junto a prob critico y daño crítico.

### Traits

Cada personaje tendrá acceso a hasta 3 traits de un pool, los cuales se irán obteniendo a medida de que se vayan completando ciertos requisitos, los cuales AUMENTARÁN la probabilidad de ganarlos cada cierto tiempo.
Cada trait influirá en las elecciones y posibles elecciones que se darán en cada escenario. La mayoría tendrá buffs y debuffs de stats (ej: trait Musculoso = +3 STR, +10% HP; trait avaro = +10% oro).

### Equip

* Cabeza.
* Cuerpo.
* Brazo.
* Brazo.
* Piernas.
* Talismán.