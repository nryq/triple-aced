import Stat from './Stat.js';
import DerivedStat from './DerivedStat.js';
import * as __DEF from './StatDEF.js';

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
    this.con = new Stat( __DEF.CON.name, con, __DEF.CON.abr, __DEF.CON.def );
    this.agi = new Stat( __DEF.AGI.name, agi, __DEF.AGI.abr, __DEF.AGI.def );
    this.int = new Stat( __DEF.INT.name, int, __DEF.INT.abr, __DEF.INT.def );
    this.dex = new Stat( __DEF.DEX.name, dex, __DEF.DEX.abr, __DEF.DEX.def );

    // MAX HP (se calculara con CON)
    this.maxHp = new DerivedStat( __DEF.HP.name, 0, __DEF.HP.abr, __DEF.HP.def );
    // MAX  (se calculara con INT)
    this.maxMana = new DerivedStat( __DEF.MP.name, 0, __DEF.MP.abr, __DEF.MP.def );

    // COOLDOWN REDUCTION (depende de dex / int)
    this.cdr = new DerivedStat( __DEF.CDR.name, 0, __DEF.CDR.abr, __DEF.CDR.def );

    // daño fisico
    this.dmg = new DerivedStat( __DEF.DMG.name, 10, __DEF.DMG.abr, __DEF.DMG.def );
    this.dmg.addToDictionary( this.con, function(statDictionary, statValue){
      console.log( 'this', this )
      return (this.stat.value * statValue)/2;
    } )
    // daño magico
    this.mDmg = new DerivedStat( __DEF.MDMG.name, 15, __DEF.MDMG.abr, __DEF.MDMG.def );
    this.mDmg.addToDictionary( this.int )
    // movement speed
    this.ms = new DerivedStat( __DEF.MS.name, 0, __DEF.MS.abr, __DEF.MS.def );

    // evasion
    this.flee = new DerivedStat( __DEF.FLEE.name, 0, __DEF.FLEE.abr, __DEF.FLEE.def );

    // velocidad de ataque
    this.atsp =new DerivedStat( __DEF.ATSP.name, 0, __DEF.ATSP.abr, __DEF.ATSP.def );

    this.crit = new DerivedStat( __DEF.CRIT.name, 0, __DEF.CRIT.abr, __DEF.CRIT.def );
  }
}
