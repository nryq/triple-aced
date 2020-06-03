import Race from './Race';

function Elf(){
	Race.call(this, 'Elfo', 'Putos amantes de los arboles', []);
}

Elf.prototype = Object.create(Race.prototype);
Elf.prototype.constructor = Elf;

export default Elf;