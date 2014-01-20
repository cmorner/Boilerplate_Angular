module.exports = function(grunt) {
	require('time-grunt')(grunt);
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		distdir: 'dist',
		copy: {
			assets: {
				processContentExclude: 'bower_components',
				files: [{
					expand: true,
					dest: '<%= distdir %>',
					src: [
						'*.{ico,txt,html}',
						'images/{,*/}*.{webp,gif,jpg,png}',
						'images/**/*.{webp,gif,jpg,JPG,png}',
						'css/*.css',
						'views/**/*',
						'sound/*.{wav,mp3}',
						'sound/**/*.{wav,mp3}',
						'fonts/*'
					]
				}]
			}
		},
 		connect: {
			server: {
				options: {
					keepalive: true,
					port: 4000,
					base: '.',
					hostname: '*'
				}
			}
		},
		compass: {
			dist: {
				options: {
					config: 'config.rb',
					cssDir: '<%= distdir %>/css',
					trace: true,
					debugInfo: false,
					outputStyle: 'compressed'
				}
			},
			server: {
				options: {
					trace: true,
					debugInfo: false,
					config: 'config.rb',
					cssDir: 'css',
					sassDir: 'scss'
				}
			}
		},
		jshint: {
			options: {
				eqeqeq: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true,
					angular: true,
					console: true,
					$: true
				}
			},
			files: ['Gruntfile.js', 'js/**/*.js', 'js/*.js']
		},
		watch: {
			files: ['js/*.js', 'js/**/*.js', '*.html', 'views/*.html', 'views/**/*.html'],
			compass: {
				files: ['scss/**/*.scss', 'scss/*.scss'],
				tasks: ['compass:server']
			},
			options: {
				livereload: true
			}
		},
		concurrent: {
			target: {
				tasks: ['connect', 'watch', 'compass:server', 'browser_sync'],
				options: {
					logConcurrentOutput: true
				}
			}
		},
		imagemin: {
			static: {
				options: {
					optimizationLevel: 3
				},
				files: {
					'<%= distdir %>/img/*.png': 'images/*.png',
					'<%= distdir %>/img/*.jpg': 'images/*.jpg',
					'<%= distdir %>/img/*.gif': 'images/*.gif'
				}
			},
		},
		useminPrepare: {
			html: ['index.html', 'exercise.html', 'test.html', 'student-loggedin-exercises.html', 'student-loggedin.html', 'student-loggedin.html', 'student-login.html', 'teacher-loggedin.html', 'teacher-login.html', 'test.html', 'testChoose.html', 'testWrite.html', 'exerciseSoundsplit.html', 'testSort.html', 'exerciseWrite.html', 'testSpoon.html', 'exerciseChoose.html'],
			options: {
					dest: '<%= distdir %>'
			}
		},
		usemin: {
			html: ['<%= distdir %>/index.html', '<%= distdir %>/exercise.html', '<%= distdir %>/test.html', '<%= distdir %>/student-loggedin-exercises.html', '<%= distdir %>/student-loggedin.html', '<%= distdir %>/student-loggedin.html', '<%= distdir %>/student-login.html', '<%= distdir %>/teacher-loggedin.html', '<%= distdir %>/teacher-login.html', '<%= distdir %>/test.html', '<%= distdir %>/testChoose.html', '<%= distdir %>/testWrite.html','<%= distdir %>/exerciseSoundsplit.html', '<%= distdir %>/testSort.html', '<%= distdir %>/exerciseWrite.html', '<%= distdir %>/testSpoon.html', '<%= distdir %>/exerciseChoose.html'],
			css: ['<%= distdir %>/css/*.css'],
			options: {
					dirs: ['<%= distdir %>']
			}
		},
		clean: {
			dist: {
				files: [{
					dot: true,
					src: ['.tmp', '<%= distdir %>/*', '!<%= distdir %>/.git*']
				}]
			}
		},
		uglify: {
			dist: {
				files: {
					'<%= distdir %>/js/main.js': ['<%= distdir %>/js/main.js'],
				}
			}
		},
		cssmin: {
			minify: {
				expand: true,
				cwd: '<%= distdir %>/css',
				src: ['<%= distdir %>/css/*.css', '!*.min.css']
			}
		},
		concat: {
			options: {
				dirs: ['<%= distdir %>'],
				separator: ';'
			}
		},
		browser_sync: {
			files: {
				src : 'css/*.css'
			},
			options: {
				watchTask: true
			}
		}
	});

	// Load npm-tasks
	require('load-grunt-tasks')(grunt);

	// Register tasks
	grunt.registerTask('default', ['build']);
	grunt.registerTask('server', ['concurrent:target']);
	grunt.registerTask('dev', ['watch']);
	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('build', [
		'clean:dist',
		'useminPrepare',
		'concat',
		'uglify',
		'copy:assets',
		'compass:dist',
		'cssmin',
		'usemin'
	]);
};
