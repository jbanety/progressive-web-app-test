/*!
 * ETD Solutions's Gruntfile
 * http://etd-solutions.com
 * Copyright 2018 ETD Solutions
 * Licensed under Apache-2.0
 */

module.exports = function(grunt) {

    // Configuration du projet
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                mangle: true,
                compress: true,
                beautify: false,
                sourceMap: false,
                preserveComments: false,
                banner: '/**!\n\t* @package     <%= pkg.name %>\n\t*\n\t* @version     <%= pkg.version %>\n\t* @copyright   Copyright (C) <%= grunt.template.today("yyyy") %> ETD Solutions. Tous droits réservés.\n\t* @license     Apache-2.0 \n\t* @author      ETD Solutions http://etd-solutions.com\n*/\n',
                screwIE8: true,
                quoteStyle: 0
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'js/dist',
                        src: ['**/*.js', '!**/*.min.js'],
                        dest: 'js/dist',
                        ext: '.min.js'q
                    }
                ]
            }
        },
        sass: {
            options: {
                precision: 6,
                sourceComments: false,
                sourceMap: false,
                outputStyle: 'expanded'
            },
            back: {
                options: {
                    includePaths: [
                        'scss'
                    ]
                },
                files: {
                    'css/app.css': 'scss/app.scss'
                }
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: false,
                sourceMap: false,
                advanced: true
            },
            back: {
                options: {
                    compatibility: 'ie11'
                },
                files: {
                    'css/app.min.css': 'css/app.css'
                }
            }
        },
        dot: {
            options: {
                defs: 'js/src/defs',
                requirejs: true
            },
            views: {
                files: [
                    {
                        expand: true,
                        cwd: 'js/src/views',
                        src: ['**/tmpl'],
                        dest: 'js/dist/views/tmpl',
                        filter: 'isDirectory',
                        rename: function(dest) {
                            return dest;
                        }
                    }
                ]
            }
        },
        watch: {
            dot: {
                files: ['js/src/defs/*.def', 'js/src/views/**/*.dot', 'js/src/views/**/*.def'],
                tasks: ['dot', 'uglify']
            },
            js: {
                files: ['www_admin/js/src/**/*.es6'],
                tasks: ['babel', 'uglify']
            },
            sass: {
                files: ['www_admin/scss/**/*.scss'],
                tasks: ['css']
            }
        }
    });

    // On charge le plugin qui donne la tâche "uglify".
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // On charge le plugin qui donne la tâche "babel".
    grunt.loadNpmTasks('grunt-babel');

    // On charge le plugin qui donne la tâche "sass".
    grunt.loadNpmTasks('grunt-sass');

    // On charge le plugin qui donne la tâche "postcss".
    grunt.loadNpmTasks('grunt-postcss');

    // On charge le plugin qui donne la tâche "cssmin".
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // On charge le plugin qui donne la tâche "sync".
    grunt.loadNpmTasks('grunt-sync');

    // On charge le plugin qui donne la tâche "watch".
    grunt.loadNpmTasks('grunt-contrib-watch');

    // On charge le plugin qui donne la tâche "dot".
    grunt.loadNpmTasks('grunt-etd-dot-compiler');

    // Construit le JS
    grunt.registerTask('js', ['babel', 'dot', 'uglify']);

    // Construit le CSS
    grunt.registerTask('css', ['sass', 'postcss', 'cssmin']);

    // Copie les fichiers vendor de Composer
    grunt.registerTask('vendor', ['sync:back_vendor']);

    // Les tâches par défaut.
    grunt.registerTask('default', ['js', 'css']);

};