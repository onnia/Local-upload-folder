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
        APP_DIR_FOR_CODE_COVERAGE: '../tests/coverage/instrument/app/'
      }
    },
    instrument: {
      files: 'tests/*.js',
      options: {
        lazy: true,
        basePath: 'tests/instrument/'
      }
    },
    storeCoverage: {
      options: {
        dir: 'tests/reports'
      }
    },
    makeReport: {
      src: 'tests/reports/**/*.json',
      options: {
        type: 'lcov',
        dir: 'tests/reports',
        print: 'detail'
      }
    },
    jshint: {
       all: ['Gruntfile.js', 'app.js', 'tests/*.js', 'lib/*.js', 'routes/*.js']
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

grunt.registerTask('test', ['qunit', 'jshint'], function() {
  grunt.log.write('Testing and hinting...');   
});

grunt.registerTask('default', ['concat'], function() {
  grunt.log.write('Logging some stuff...').ok();   
});

grunt.registerTask('cover', ['env:coverage','instrument', 'storeCoverage', 'makeReport']);
};
