/**
 * My compiler
 */

'use strict';

var fs = require('fs'),
	path = require('path'),
	FileManager = global.getFileManager(),
    Compiler    = require(FileManager.appScriptsDir + '/Compiler');

/**
 * My Compiler
 * @param {object} config compiler config
 */
function HAMLCompiler(config) {
   Compiler.call(this, config);
}
require('util').inherits(HAMLCompiler, Compiler);

module.exports = HAMLCompiler;

/**
 * compile file
 * @param  {Object} file    compile file object
 * @param  {Object} emitter  compile event emitter
 */
HAMLCompiler.prototype.compile = function (file, emitter) {
		var exec = 	require('child_process').exec,
								self = this,
								filePath = file.src,
								output = file.output,
								settings = file.settings || {},
								argv = [filePath, output];



		exec(["haml"].concat(argv).join(" "), {cwd: path.dirname(filePath), timeout: 5000}, function(error, stdout, stderr) {
				if(error !== null) {
				emitter.emit("fail");
				self.throwError(stderr, filePath);
			} else {
				emitter.emit("done")
			}
		});

    emitter.emit('always');
}
