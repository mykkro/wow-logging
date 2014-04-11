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
        src: [ 'public/data/events.json' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  grunt.registerTask('default', [ 'jsonlint', 'connect:server:keepalive' ]);

};