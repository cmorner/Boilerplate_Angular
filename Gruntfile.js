var grunt = {
	registerTask: function (name, tasks) {
		
	}
}

module.exports = function (grunt) {

	//Configure Project

	grunt.initConfig({
		less: {
			options: {
				paths: '/',
				compress: true,
			},
			files: {
				'css/main.css': 'less/main.less' 
			}
		}
	});

	//Load tasks
	grunt.loadNpmTasks('grunt-contrib-less');

	//Register tasks
	grunt.registerTask('default', ['less']);

	grunt.registerTask

};

