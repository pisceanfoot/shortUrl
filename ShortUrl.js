var util = require('util');
var DEFAULT_ALPHABET = 'mn6j2c4rv8bpygw95z7hsdaetxuk3fq'
var DEFAULT_BLOCK_SIZE = 24
var MIN_LENGTH = 6

function ShortEncoder (alphabet, block_size) {
	if(!alphabet){
		this.alphabet = DEFAULT_ALPHABET;
	}
	if(!block_size){
		this.block_size = DEFAULT_BLOCK_SIZE;
	}
	this.mask = (1 << this.block_size) - 1;

	var tmpMapping = [];
	for(var i=this.block_size-1;i>=0;i--){
		tmpMapping.push(i);
	}
    this.mapping = tmpMapping;
}


ShortEncoder.prototype.encode = function(n){
    return (n & ~this.mask) | this._encode(n & this.mask);
};

ShortEncoder.prototype._encode = function(n){
    var result = 0
    for(var i in this.mapping){
    	var b = this.mapping[i];

    	if (n & (1 << i))
            result |= (1 << b);
    }

    return result;
};

ShortEncoder.prototype.decode = function(n){
    return (n & ~this.mask) | this._decode(n & this.mask);
};

ShortEncoder.prototype._decode = function(n){
    var result = 0
    for(var i in this.mapping){
    	var b = this.mapping[i];

    	if (n & (1 << b))
            result |= (1 << i);
    }
        
    return result;
};

ShortEncoder.prototype.enbase = function(x, min_length){
	min_length = min_length || MIN_LENGTH;

    var result = this._enbase(x);
    var padding = '';
    var paddingTimes = (min_length - result.length);
    if(paddingTimes > 0){
    	var tmp = [];
    	for(var i=0;i<paddingTimes;i++){
    		tmp.push(this.alphabet[0]);
    	}

    	padding = tmp.join('');
    }
    
    return util.format('%s%s', padding, result);
};

ShortEncoder.prototype._enbase = function(x){
    var n = this.alphabet.length;
    if (x < n)
        return this.alphabet[x];

    return this._enbase((x / n) | 0) + this.alphabet[(x % n) | 0];
};

ShortEncoder.prototype.debase = function(x){
    var n = this.alphabet.length;
    var result = 0;
    var tmp = x.split('').reverse().join('');
    for(var i in tmp){
    	var c = tmp[i];
    	result += this.alphabet.indexOf(c) * (Math.pow(n, i));
    }
        
    return result;
};

/**
 * shorten encode
 * @param  {int} n 
 * @return {string}   
 */
ShortEncoder.prototype.shorten = function (n) {
	return this.enbase(this.encode(n));
};

// var shortEncoder = new ShortEncoder();

// for(var i=1;i<10;i++){
// 	var a = shortEncoder.encode(i);
// 	var b = shortEncoder.enbase(a);
// 	var c = shortEncoder.debase(b);
// 	var d = shortEncoder.decode(c);

// 	console.log('%s %s %s %s %s', i, a, b, shortEncoder.shorten(i), c, d);
// }
