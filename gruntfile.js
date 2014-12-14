  // Load the plugin that provides the "uglify" task.
module.exports = function(grunt) {

  grunt.initConfig({      
    pkg: grunt.file.readJSON('package.json'),
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
    shell: {
        start: {
            command: 'node ./bin/www'
        }
    },
    /* code coveridge copied from docs*/
    coveralls: {
    options: {
      // LCOV coverage file relevant to every target
      src: 'coverage-results/lcov.info',

      // When true, grunt-coveralls will only print a warning rather than
      // an error, to prevent CI builds from failing unnecessarily (e.g. if
      // coveralls.io is down). Optional, defaults to false.
      force: false
    },
    your_target: {
      // Target-specific LCOV coverage file
      src: 'coverage-results/extra-results-*.info'
    },
  },
    /* Defines all files to be tested*/
    jshint: {
       all: ['Gruntfile.js', 'app.js', 'tests/*.js', 'lib/*.js', 'routes/*.js']
    },
    qunit: {
       files: ['tests/*.js']
    },
    sync: {
      main: {
        files: [{
          cwd: 'upload',
          src: [
            '**' /* Include everything */
          ],
          dest: 'public/img/'
        }],
        tasks: ['watch'],
        pretend: true, // Don't do any IO. Before you run the task with `updateAndDelete` PLEASE MAKE SURE it doesn't remove too much.
        verbose: true, // Display log messages when copying files
        updateAndDelete: true // Remove all files from dest that are not found in src
        }
    },
    /* Files to be copied */
    copy: {
        main: {
            src: 'upload/*.jpg',
            dest: 'public/img/'
        }
    },
    taskinterval: {
    dist: {
        options: {
            taskIntervals: [
            {
                interval: 1000 * 3, 
                tasks: ['shell:start', 'jshint']}
            ]
        }
    }
  },
    watch: {
        scripts: {
            /* Folder to watch */    
            files: ['upload/*'],
            tasks: ['sync:main', 'copy:main'],
            options: {
                spawn: false,
                reload: true
            }
        }
    },
    /* This task runs message connect and file syncs at the same time */
    parallel: {
    assets: {
      options: {
        grunt: true
      },
      tasks: ['alldone', 'shell:start', 'watch']
        }
    }
  });

grunt.loadNpmTasks('grunt-env');
grunt.loadNpmTasks('grunt-sync');
grunt.loadNpmTasks('grunt-shell');
grunt.loadNpmTasks('grunt-parallel');
grunt.loadNpmTasks('grunt-istanbul');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-task-interval');
grunt.loadNpmTasks('grunt-contrib-qunit');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-coveralls');

// Registered tasks grunt tasks

grunt.registerTask('inte', ['taskinterval']);
grunt.registerTask('hint', ['jshint']);
grunt.registerTask('default', ['alldone', 'watch', 'shell:start']);
grunt.registerTask('files', ['sync:main']);
grunt.registerTask('para', ['parallel']);
grunt.registerTask('test', ['qunit', 'jshint'], function() {
  grunt.log.write('Testing and hinting...');   
});

grunt.registerTask('alldone', function() {
  grunt.log.writeln('Upload folder app running at http://localhost:1030');
});
  

grunt.registerTask('cover', ['env:coverage','instrument', 'storeCoverage', 'makeReport']);
};
