import Stat from './Stat.js';

/**
  2020-04-20
  sistema de stats funcionará con 4 stats:
  CON -> Fuerzsa fisica, daño, HP, defesa fisica y carring capacity
  AGI -> MOV SPEED, ASPD, flee
  INT -> Daño magico, mana, defensa magica
  DEX -> daño critica, DMG, ASPD, CDR

*/

export default class CharacterStats {
  constructor( con = 0, agi=0, int=0, dex=0 ) {
    // BASE STATS
    // name, baseVal, abr, desc
    this.con = new Stat( 'Constitución', con, 'CON', 'Constitución física' );
    this.agi = new Stat( 'Agilidad', agi, 'AGI', 'Agilidad' );
    this.int = new Stat( 'Inteligencia', int, 'INT', 'Inteligencia' );
    this.dex = new Stat( 'Destreza', dex, 'DEX', 'Destreza' );

    // MAX HP (se calculara con CON)
    this.maxHp = new Stat( 'HP', 0, 'HP', '' );
    // MAX  (se calculara con INT)
    this.maxMana = new Stat( 'Mana', 0, 'MP', '' );

    // COOLDOWN REDUCTION (depende de dex / int)
    this.cdr = new Stat( 'Cooldown Reduction', 0, 'CDR', '' );

    // daño fisico
    this.dmg = new Stat( 'Daño', 0, 'DMG', '' );
    // daño magico
    this.mDmg = new Stat( 'Daño Mágico', 0, 'MDMG', '' );

    // movement speed
    this.ms = new Stat( 'Velocidad', 0, 'MS', '' );

    // evasion
    this.flee = new Stat( 'Evasión', 0, 'FLEE', '' );

    // velocidad de ataque
    this.atsp =new Stat( 'Velocidad de Ataque', 0, 'ATSP', '' );

    this.crit = new Stat( 'Probabilidad de Golpe Crítico', 0, 'CRIT', '' );
  }
}
