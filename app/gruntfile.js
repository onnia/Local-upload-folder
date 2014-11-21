  // Load the plugin that provides the "uglify" task.
module.exports = function(grunt) {

  grunt.initConfig({      
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['../upload/*.jpg', ' ../upload/*.png', ' ../upload/*.JPG', ' ../upload/*.jpeg'],
        dest: '/public/img/'
      }
    },
    env: {
      coverage: {
        APP_DIR_FOR_CODE_COVERAGE: '../test/coverage/instrument/app/'
      }
    },
    instrument: {
      files: 'app/tests/*.js',
      options: {
        lazy: true,
        basePath: 'test/instrument/'
      }
    },
    storeCoverage: {
      options: {
        dir: 'test/reports'
      }
    },
    makeReport: {
      src: 'test/reports/**/*.json',
      options: {
        type: 'lcov',
        dir: 'test/reports',
        print: 'detail'
      }
    },
    jshint: {
       all: ['Gruntfile.js', 'app.js', 'tests/*.js', 'lib/*.js']
    },
    qunit: {
       files: ['tests/*.js']
    },
    watch: {
      files: ['../upload/*.jpg'],
      tasks: ['concat', 'qunit']
    }
  });

// grunt.loadNpmTasks('grunt-contrigru b-jshint');
grunt.loadNpmTasks('grunt-env');
grunt.loadNpmTasks('grunt-istanbul');
grunt.loadNpmTasks('grunt-contrib-qunit');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-jshint');

// Register tasks use them with grunt 'taskname'
grunt.registerTask('hint', ['jshint']);
grunt.registerTask('test', ['qunit']);
grunt.registerTask('default', ['concat']);
grunt.registerTask('cover', ['env:coverage','instrument', 'storeCoverage', 'makeReport']);
};
