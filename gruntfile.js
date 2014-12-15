module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /* Task for starting the express server */
        shell: {
            start: {
                /* Starting expression*/
                command: 'node ./bin/www'
            },
            clear: {
                /* Deleting the public folder content*/
                command: 'rm -rf ./public/img/upload/*'
            },
            helpMe: {
                /* Help text*/
                command: 'node app.js help'
            }
        },
        env: {
            coverage: {
                APP_DIR_FOR_CODE_COVERAGE: '../instrument/tests/'
            }
        },
        instrument: {
            files: 'tests/*.js',
            options: {
                lazy: true,
                basePath: 'instrument/'
            }
        },
        makeReport: {
            src: 'instrument/reports/**/*.json',
            options: {
                type: 'lcov',
                dir: 'instrument/reports',
                print: 'detail'
            }
        },
        /* code coveridge copied from docs*/
        coveralls: {
            options: {
                src: 'instrument/reports/lcov.info',
                force: true
            },
            your_target: {
                // Target-specific LCOV coverage file
                src: 'instrument/reports/*.info'
            }
        },
        cover: {
            compile: {
                files: {
                    'instrument/tests/*.js': ['tests/*.js'],
                    'instrument/*/*.js': [ 'tests/*/*.js']
                    }
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
                            '**'/* Include everything */
                        ],
                        dest: 'public/img/upload'
                    }],
                //tasks: ['watch'],
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
                files: ['upload/*'],
                tasks: ['sync:main', 'copy:main'],
                options: {
                    spawn: true,
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
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-coveralls');
    grunt.loadNpmTasks('grunt-coverjs');

    // Registered tasks grunt tasks that can be used
    // For running express and watch at the same time
    grunt.registerTask('default', ['parallel']);
    // Testing the codes syntax
    grunt.registerTask('hint', ['jshint']);
    // Files will be copied to public folder
    grunt.registerTask('files', ['sync:main', 'copy:main', 'watch-message', 'watch']);
    // removing files from public images folder
    grunt.registerTask('remove', ['remove-message', 'shell:clear',]);
    // Code coverage
    grunt.registerTask('server', ['server-message', 'shell:start']);
    // Help command
    grunt.registerTask('help', ['shell:helpMe']);
    grunt.registerTask('h', ['shell:helpMe']);
    // Code coverage
    grunt.registerTask('coverr', ['cover', 'env:coverage', 'instrument', 'makeReport']);
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