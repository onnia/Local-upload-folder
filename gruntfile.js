module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /* Task for starting the express server */
        shell: {
            start: {
                command: 'node ./bin/www'
            },
            clear: {
                command: 'rm -rf ./public/img/upload/*'
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
            }
        },
        /* Defines all files to be hinted*/
        jshint: {
            all: ['Gruntfile.js', 'app.js', 'tests/*.js', 'lib/*.js', 'routes/*.js']
        },
        /* nodeunit tests*/
        qunit: {
            files: ['tests/*.js']
        },
        sync: {
            main: {
                files: [{
                        cwd: 'upload',
                        src: [
                            '**', '*.JPG', '*.jpg' /* Include everything */
                        ],
                        dest: 'public/img/upload/'
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
                src: 'upload/*',
                dest: 'public/img/'
            }
        },
        watch: {
            scripts: {
                /* Folder to watch */
                files: ['upload/*.*'],
                options: {
                    spawn: false,
                    reload: true
                }
            }
        },
        /* This task runs messages, express and file syncs at the same time */
        parallel: {
            assets: {
                options: {
                    grunt: true
                },
                tasks: ['server-message', 'shell:start', 'watch-message', 'watch']
            }
        }
    });

    // express port to use imported form package.json file
    var pjson = require('./package.json');

    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-sync');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-parallel');
    grunt.loadNpmTasks('grunt-istanbul');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-coveralls');

    // Registered tasks grunt tasks that can be used
    // For running express and watch at the same time
    grunt.registerTask('default', ['parallel']);
    // Testing the codes syntax
    grunt.registerTask('hint', ['jshint']);
    // Files will be copied to public folder
    grunt.registerTask('copy', ['sync:main', 'copy:main']);
    // removing files from public images folder
    grunt.registerTask('remove', ['shell:clear', 'remove-message']);
    // Code coverage
    grunt.registerTask('cover', ['env:coverage', 'instrument', 'storeCoverage', 'makeReport']);
    // Default test task
    grunt.registerTask('test', ['qunit', 'jshint'], function () {
        grunt.log.write('Testing and hinting...');
    });

    // Status messages
    grunt.registerTask('server-message', function () {
        grunt.log.writeln('Upload folder app running at http://localhost:' + pjson.port);
    });
    // Message after watch complete
    grunt.registerTask('watch-message', function () {
        grunt.log.write('Watching the /upload directory for changes');
    });
    // Message after deleting files from public folder
    grunt.registerTask('remove-message', function () {
        grunt.log.write('Images removed from public folder');
    });
};
    