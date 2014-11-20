module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['../upload/*.jpg', ' ../upload/*.png', ' ../upload/*.JPG', ' ../upload/*.jpeg'],
        dest: './app/public/img/'
      }
    }
    },
    watch: {
      files: ['../upload/*.jpg'],
      tasks: ['concat']
    }
  });

 // grunt.loadNpmTasks('grunt-contrigru b-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['qunit']);

  grunt.registerTask('default', ['concat']);

};