'use strict';

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Configurable paths
	var config = {
		app: 'app',
		dist: 'dist'
	};
	var serveStatic = require('serve-static');
	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		config: config,

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			js: {
				files: ['<%= config.app %>/assets/scripts/{,*/}*.js'],
				tasks: ['newer:jshint:all'],
				options: {
					livereload: '<%= connect.options.livereload %>'
				}
			},
			compass: {
				files: ['<%= config.app %>/assets/styles/{,*/}*.{scss,sass}'],
				tasks: ['compass:server', 'autoprefixer']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= config.app %>/{,*/}*.html',
					'.tmp/assets/styles/{,*/}*.css',
					'<%= config.app %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9003,
				open: true,
				livereload: 35733,
				// Change this to '0.0.0.0' to access the server from outside
				hostname: '127.0.0.1'
			},
			livereload: {
				options: {
					open: true,
					middleware: function (connect) {
						return [
							serveStatic('.tmp'), connect().use('/app/assets/styles', serveStatic('./app/assets/styles')), serveStatic(config.app)
						];
					}
				}
			},
			dist: {
				options: {
					open: true,
					base: '<%= config.dist %>'
				}
			}
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js',
				'<%= config.app %>/assets/scripts/{,*/}*.js',
			]
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= config.dist %>/{,*/}*',
						'!<%= config.dist %>/.git{,*/}*'
					]
				}]
			},
			server: '.tmp'
		},

		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			},
			server: {
				options: {
					map: true,
				},
				files: [{
					expand: true,
					cwd: '.tmp/assets/styles/',
					src: '{,*/}*.css',
					dest: '.tmp/assets/styles/'
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/assets/styles/',
					src: '{,*/}*.css',
					dest: '.tmp/assets/styles/'
				}]
			}
		},

		// Renames files for browser caching purposes
		rev: {
			dist: {
				files: {
					src: [
						'<%= config.dist %>/assets/scripts/{,*/}*.js',
						'<%= config.dist %>/assets/styles/{,*/}*.css',
						'<%= config.dist %>/assets/images/{,*/}*.*',
						'<%= config.dist %>/assets/styles/fonts/{,*/}*.*',
						'<%= config.dist %>/*.{ico,png}'
					]
				}
			}
		},

		// Compiles Sass to CSS and generates necessary files if requested
		compass: {
			options: {
				sassDir: '<%= config.app %>/assets/styles',
				cssDir: '.tmp/assets/styles',
				generatedImagesDir: '.tmp/assets/images/generated',
				imagesDir: '<%= config.app %>/assets/images',
				javascriptsDir: '<%= config.app %>/assets/scripts',
				fontsDir: '<%= config.app %>/assets/styles/fonts',
				httpImagesPath: '/assets/images',
				httpGeneratedImagesPath: '/assets/images/generated',
				httpFontsPath: '/assets/styles/fonts',
				relativeAssets: false,
				assetCacheBuster: false,
				raw: 'Sass::Script::Number.precision = 10\n'
			},
			dist: {
				options: {
					generatedImagesDir: '<%= config.dist %>/assets/images/generated'
				}
			},
			server: {
				options: {
					sourcemap: true
				}
			}
		},

		// Renames files for browser caching purposes
		filerev: {
			dist: {
				src: [
					'<%= config.dist %>/assets/scripts/{,*/}*.js',
					'<%= config.dist %>/assets/styles/{,*/}*.css',
					'<%= config.dist %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
					'<%= config.dist %>/assets/styles/fonts/*'
				]
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html: '<%= config.app %>/index.html',
			options: {
				dest: '<%= config.dist %>',
				flow: {
					html: {
						steps: {
							js: ['concat', 'uglifyjs'], css: ['cssmin']
						},
						post: {}
					}
				}
			}
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			html: ['<%= config.dist %>/{,*/}*.html'],
			css: ['<%= config.dist %>/assets/styles/{,*/}*.css'],
			options: {
				assetsDirs: [
					'<%= config.dist %>',
					'<%= config.dist %>/assets/images',
					'<%= config.dist %>/assets/styles'
				]
			}
		},

		// The following *-min tasks will produce minified files in the dist folder
		// By default, your `index.html`'s <!-- Usemin block --> will take care of
		// minification. These next options are pre-configured if you do not wish
		// to use the Usemin blocks.
		cssmin: {
		  dist: {
		    files: {
		      '<%= config.dist %>/assets/styles/main.css': [
		        '.tmp/assets/styles/{,*/}*.css'
		      ]
		    }
		  }
		},
		// uglify: {
		//   dist: {
		//     files: {
		//       '<%= config.dist %>asset/scripts/scripts.js': [
		//         '<%= config.dist %>/scripts/scripts.js'
		//       ]
		//     }
		//   }
		// },
		// concat: {
		//   dist: {}
		// },


		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/assets/images',
					src: '{,*/}*.{png,jpg,jpeg,gif}',
					dest: '<%= config.dist %>/assets/images'
				}]
			}
		},

		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/assets/images',
					src: '{,*/}*.svg',
					dest: '<%= config.dist %>/assets/images'
				}]
			}
		},

		// ng-annotate tries to make the code safe for minification automatically
		// by using the Angular long form for dependency injection.
		ngAnnotate: {
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/concat/scripts',
					src: '*.js',
					dest: '.tmp/concat/scripts'
				}]
			}
		},

		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
					conservativeCollapse: true,
					collapseBooleanAttributes: true,
					removeCommentsFromCDATA: true,
					removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: '<%= config.dist %>',
					src: ['*.html', 'views/{,*/}*.html'],
					dest: '<%= config.dist %>'
				}]
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= config.app %>',
					dest: '<%= config.dist %>',
					src: [
						'*.{ico,png,txt}',
						'assets/images/{,*/}*.webp',
						'{,*/}*.html',
						'assets/styles/fonts/{,*/}*.*'
					]
				}, {
					expand: true,
					cwd: '.tmp/assets/images',
					dest: '<%= config.dist %>/assets/images',
					src: ['generated/*']
				}]
			},
			styles: {
				expand: true,
				cwd: '<%= config.app %>/assets/styles',
				dest: '.tmp/assets/styles/',
				src: '{,*/}*.css'
			}
		},

		// Run some tasks in parallel to speed up build process
		concurrent: {
			server: [
				'compass:server'
			],
			dist: [
				'compass:dist',
				'imagemin',
				'svgmin'
			]
		}
	});

	grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
		if (grunt.option('allow-remote')) {
			grunt.config.set('connect.options.hostname', '0.0.0.0');
		}
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'concurrent:server',
			'autoprefixer',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('build', [
		'clean:dist',
		'concurrent:dist',
		'autoprefixer',
		'copy:dist',
		'useminPrepare',
		'concat',
		'cssmin',
		'uglify',
		'usemin'
	]);

	grunt.registerTask('default', [
		'newer:jshint',
		'build'
	]);
};