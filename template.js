/*
 * grunt-init-zeix
 * https://www.zeix.com/
 * https://gruntjs.com/
 *
 * Copyright (c) 2013 Julien Silva, contributors
 * Licensed under the MIT license.
 */

 'use strict';

 // Basic template description.
 exports.description = 'This will scaffold a typical Zeix frontend project';

 // Template-specific notes to be displayed after question prompts.
 exports.after = 'You should now install project dependencies with _npm ' +
   'install_ and _bundle install_. After that, you may execute project tasks with _grunt_. ' +
   'For more information about installing and configuring Grunt, please see ' +
   'the Getting Started guide:' +
   '\n\n' +
   'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {
	init.process({type: 'jquery'}, [
		// Prompt for these values.
		init.prompt('name'),
		init.prompt('title', function(value, data, done) {
			// Fix jQuery capitalization.
			value = value.replace(/jquery/gi, 'jQuery');
			done(null, value);
		}),
		init.prompt('description', 'The best jQuery plugin ever.'),
		init.prompt('version'),
		init.prompt('repository'),
		init.prompt('homepage'),
		init.prompt('bugs'),
		init.prompt('licenses', 'MIT'),
		init.prompt('author_name'),
		init.prompt('author_email'),
		init.prompt('author_url'),
		init.prompt('jquery_version')
		], function(err, props) {

		props.keywords = [];

		// Files to copy (and process).
		var files = init.filesToCopy(props);

		// Add properly-named license files.
		init.addLicenseFiles(files, props.licenses);

		// Actually copy (and process) files.
		init.copyAndProcess(files, props, {noProcess: 'libs/**'});

		// Generate package.json file, used by npm and grunt.
		init.writePackageJSON('package.json', {
			name: 'jquery-plugin',
			version: '0.0.0-ignored',
			// TODO: pull from grunt's package.json
			node_version: '>= 0.8.0',
			devDependencies: {
				'grunt-contrib-jshint': '~0.6.0',
				'grunt-contrib-concat': '~0.3.0',
				'grunt-contrib-uglify': '~0.2.0',
				'grunt-contrib-watch': '~0.4.0',
				'grunt-contrib-clean': '~0.4.0',
			},
		});

		// All done!
		done();
	});
};