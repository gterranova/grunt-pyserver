/*
 * grunt-pyserver
 * https://github.com/gterranova/grunt-pyserver
 *
 * Copyright (c) 2013 Gianpaolo Terranova
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    var spawn = require('child_process').spawn;
    var pyserver = require('node-pyserver-bin');
    var async = require('async');
    
    var start_server = function(port, root, done)  {
        grunt.log.writeln('Starting server...');
        var pyserverArgs = [pyserver.path, port].concat(root);
        grunt.verbose.writeflags(pyserverArgs, 'Options');

        async.forever(function(){
            spawn('python.exe', pyserverArgs, {stdio: 'inherit'});
        }, function(){});
    };
  
    grunt.registerTask('pyserver', 'Start pyserver', function () {            
        var options = this.options({
            port: 8000,
            documentRoot: ''
        });
                
        start_server(options.port, options.documentRoot);
    });
};
