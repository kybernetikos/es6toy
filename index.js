var es6loader = require('es6-module-loader');
var System = es6loader.System;
var Module = es6loader.Module;

function patchLoader(descriptor) {
	for (var key in descriptor) {
		var original = System[key].bind(System);
		System[key] = descriptor[key].bind(System, original);
	}
}

patchLoader({
	normalize: function(supa, name, parentName, parentAddress) {
		return supa(name, parentName, parentAddress);
	},
	locate: function(supa, data) {
		// { name, metadata } -> Promise<ModuleAddress>
		return supa(data);
	},
	fetch: function(supa, data) {
		// { name, address, metadata } -> Promise<ModuleSource>
		if (data.name === 'path') {
			data.metadata.nodeModule = require('path');
			return Promise.resolve("");
		}
		return supa(data);
	},
	translate: function(supa, data) {
		// { name, address, source, metadata } -> Promise<string>
		return supa(data);
	},
	instantiate: function(supa, data) {
		// { name, address, source, metadata } -> Promise<ModuleFactory?>
		if (data.metadata.nodeModule) {
			return Promise.resolve({
				deps: [],
				execute: function() {
					return new Module(data.metadata.nodeModule);
				}
			});
		}
		return supa(data);
	}
});


System.import("./lib/main").then(function(main) {
	console.log('starting');
	main.start();
}).catch(function(e) {
	console.log(e);
});