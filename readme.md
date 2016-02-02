Short Url Algorithm
================================

this algorithm is original from [Michael Fogleman](http://code.activestate.com/recipes/576918/), which can use unique number like database primary key.

Implement
--------------------

Python ShortUrl.py
NodeJs ShortUrl.js
C#     ShortUrl.cs



Usage
----------------------

````
var shortEncoder = new ShortEncoder();

for(var i=1;i<10;i++){
	var a = shortEncoder.encode(i);
	var b = shortEncoder.enbase(a);
	var c = shortEncoder.debase(b);
	var d = shortEncoder.decode(c);

	console.log('%s %s %s %s %s', i, a, b, shortEncoder.shorten(i), c, d);
}
```

```
1 8388608 m867nv m867nv 8388608 1
2 4194304 m25t52 m25t52 4194304 2
3 12582912 mghpzy mghpzy 12582912 3
4 2097152 m6vyv6 m6vyv6 2097152 4
5 10485760 mpbq8b mpbq8b 10485760 5
6 6291456 m4xct4 m4xct4 6291456 6
7 14680064 m9kexw m9kexw 14680064 7
8 1048576 mn242n mn242n 1048576 8
9 9437184 mb4tc8 mb4tc8 9437184 9
```
