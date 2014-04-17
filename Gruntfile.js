module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 9990,
          base: 'public'
        }
      }
    },
    jsonlint: {
      events: {
        src: [ 'public/data/wow-logging-spec.json' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-jsbeautifier');

  // Default task(s).
  grunt.registerTask('default', [ 'jsonlint', 'connect:server:keepalive' ]);

};