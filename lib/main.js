import {MyModule} from './MyModule';

import {join} from 'path';

console.log(join("hello", "there", "everyone"));

export var start = function() {

	console.log('started');

	var a = new MyModule(); // -> 'this is an es6 class!'

	a.doThing([1, 2, 3]);

};