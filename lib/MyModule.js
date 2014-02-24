export class MyModule {
	constructor() {
		console.log('this is an es6 class!');
	}

	doThing(array) {
		array.map( (a) => { console.log("hello" + a) } );
	}
}