import Stat from './Stat.js';
import Substat from './Substat.js';
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

    this.primaryStats = {};
    this.subStat = {};
    this.loopTime = 1;

    // BASE STATS
    // name, baseVal, abr, desc
    this.primaryStats[__DEF.CON.abr] = new Stat( __DEF.CON.name, con, __DEF.CON.abr, __DEF.CON.def );
    this.primaryStats[__DEF.AGI.abr] = new Stat( __DEF.AGI.name, agi, __DEF.AGI.abr, __DEF.AGI.def );
    this.primaryStats[__DEF.INT.abr] = new Stat( __DEF.INT.name, int, __DEF.INT.abr, __DEF.INT.def );
    this.primaryStats[__DEF.DEX.abr] = new Stat( __DEF.DEX.name, dex, __DEF.DEX.abr, __DEF.DEX.def );

    // MAX HP (se calculara con CON)
    this.subStat[__DEF.HP.abr] = new Substat( __DEF.HP.name, 0, __DEF.HP.abr, __DEF.HP.def );
    this.subStat[__DEF.CHP.abr] = new Substat( __DEF.CHP.name, 0, __DEF.CHP.abr, __DEF.CHP.def );
    this.subStat[__DEF.MP.abr] = new Substat( __DEF.MP.name, 0, __DEF.MP.abr, __DEF.MP.def );
    // MAX  (se calculara con INT)
    this.subStat[__DEF.CMP.abr] = new Substat( __DEF.CMP.name, 0, __DEF.CMP.abr, __DEF.CMP.def );
    // COOLDOWN REDUCTION (depende de dex / int)
    this.subStat[__DEF.CDR.abr] = new Substat( __DEF.CDR.name, 0, __DEF.CDR.abr, __DEF.CDR.def );
    // daño fisico
    this.subStat[__DEF.DMG.abr] = new Substat( __DEF.DMG.name, 10, __DEF.DMG.abr, __DEF.DMG.def );
    // daño magico
    this.subStat[__DEF.MDMG.abr] = new Substat( __DEF.MDMG.name, 15, __DEF.MDMG.abr, __DEF.MDMG.def );
    // movement speed
    this.subStat[__DEF.MS.abr] = new Substat( __DEF.MS.name, 0, __DEF.MS.abr, __DEF.MS.def );
    // evasion
    this.subStat[__DEF.FLEE.abr] = new Substat( __DEF.FLEE.name, 0, __DEF.FLEE.abr, __DEF.FLEE.def );
    // velocidad de ataque
    this.subStat[__DEF.ATSP.abr] = new Substat( __DEF.ATSP.name, 0, __DEF.ATSP.abr, __DEF.ATSP.def );
    this.subStat[__DEF.CRIT.abr] = new Substat( __DEF.CRIT.name, 0, __DEF.CRIT.abr, __DEF.CRIT.def );

    this.subStat[__DEF.DMG.abr].addDependentStat( this.primaryStats[__DEF.CON.abr], function(statDictionary, statValue){
      return (this.stat.value * statValue)/2;
    } );

    this.subStat[__DEF.DMG.abr].addDependentStat( this.primaryStats[__DEF.INT.abr] );

    this.subStat[__DEF.DMG.abr].addDependentStat( this.primaryStats[__DEF.DEX.abr], function(){
      return this.stat.value/3;
    } );
    // diccionario de modificadores de stats que se le hayan agregado
    //
    Object.defineProperty(this, "_loopDictionary", {
      enumerable: false,
      writable: true
    });

    this._loopDictionary = {};
  };

  get statsDictionary(){
    return { ...this.primaryStats,  ...this.subStat };
  };

  addModifierToStat( stat, modifier ){
    let statName = typeof stat == 'string'?stat:stat.abr;
    console.log(this,this.statsDictionary )
    this.statsDictionary[statName].addModifier(modifier);

    if( modifier.timer !== false ){
      if( !this._loopDictionary.hasOwnProperty(statName) )
        this._loopDictionary[statName] = {};
      Object.assign(this._loopDictionary[statName][modifier.id], modifier);
    }
  };

  removeModifierFromStat( stat, modifier ){
    let statName = typeof stat == 'string'?stat:stat.abr;
    stat.removeModifier( modifier );
    if( modifier.timer !== false )
      delete this._loopDictionary[statName][modifier.id];
  }

  // TODO: MODIFICADORES pueden tener tiempo de expiracion.
  // TODO: modificadores expirados deben ser removidos
  // TODO: los modificadores tendrán el tiempo de vigencia en cada uno, pero el timer estará en esta classes
  // para disminuir el tiempo de procesamiento de los timers
  // sigue a los modificadores de stats que sean temporales.
  checkLoop(deltaTime){
    this.cicleTime-=deltaTime;
  }
}
