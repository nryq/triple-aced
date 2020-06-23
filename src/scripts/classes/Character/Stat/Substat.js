import Stat from './Stat.js';

// stats that is affected by other stats
export default class DerivedStat extends Stat{
  constructor(name, baseVal, abr, desc){
    super(name, baseVal, abr, desc)

    // dictionary of stats
    this.statDictionary = {};
  }
  get value(){
    return this.calculateDerivedStat();
  }
  addToDictionary( stat, calcMethod=()=>{return stat.value} ){
    this.hasToCalculate();
    this.statDictionary[ stat.abr ] = {
      stat,
      calcMethod
    }
  }
  calculateDerivedStat(){
    let calculatedDerivedStat = 0;
    for( let statItem in this.statDictionary ){
      let statEntry = this.statDictionary[statItem];
      calculatedDerivedStat += statEntry.hasOwnProperty('calcMethod')?
        statEntry.calcMethod(this.statDictionary, super.value):
        super.value;
    }
    return calculatedDerivedStat;
  }
}
