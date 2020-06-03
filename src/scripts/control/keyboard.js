function keyboardManager(){
	this.up = undefined;
	this.down = undefined;
	this.left = undefined;
	this.right = undefined;
}

keyboardManager.prototype.setKeys = function(up, down, left, right) {
	this.up = up;
	this.down = down;
	this.left = left;
	this.right = right;
};

keyboardManager.prototype.update = function() {
};

export default keyboardManager;