//Gruntfile.js
//Chad A. Moore - Brian E. Moore
//May 27, 2014 - November 11, 2014
//Jan 9, 2015
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
        options: {
          targetDir: './client/bower_components',
          overrideBowerDirectory: true,
          install: true,
          copy: true
        }
      }
    },
    clean: {
      build: ['.tmp']
    },
    copy: {
      build: {
        nonull: true,
        src: '.tmp/<%= pkg.name %>.js',
        dest: 'client/dist/<%= pkg.name %>.js'
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      build: {
        src: [
          'client/app/Application.js',
          'client/app/Router.js',
          'client/app/**/*.js'
        ],
        dest: '.tmp/<%= pkg.name %>.js'
      }
    },
    emberTemplates: {
      compile: {
        options: {
          templateBasePath: /client\/app\/templates/
        },
        files: {
          'client/dist/templates.js': 'client/app/templates/**/*.hbs'
        }
      }
    },
    jshint: {
      options: {
        // options here to override JSHint defaults
        ignores: ['client/dist/*.js'],
        camelcase: true,
        curly: true,
        eqeqeq: true,
        latedef: true,
        quotmark: 'single',
        undef: true,
        unused: true,
        strict: true,
        trailing: true,
        browser: true,
        devel: true,
        jquery:true,
        node: true,
        predef: ['TS', 'DS'],
        globals: {
          Ember: true,
          Bootstrap: true,
          console: true,
          module: true, 
          document: true
        }
      },
      all: {
        src: ['client/**/*.js', 'server/**/*.js']
      },
      client: {
        src: ['client/**/*.js']
      }
    },
    less: {
      development: {
        options: {
          paths: ['client/css'],
          syncImports: true,
          relativeUrls: true
        },
        files: {
          "client/dist/main.css" : "client/css/styles.less"
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'client/dist/<%= pkg.name %>.min.js': ['client/dist/<%= pkg.name %>.js']
        }
      }
    },    
    watch: {
      scripts: {
        files: ['client/**/*.js', 'server/**/*.js', 'client/app/templates/**/*.hbs'],
        tasks: ['jshint'],
        options: {
          spawn: false,
          debounceDelay: 500
        }
      },
      emberTemplates: {
        files: 'client/app/templates/**/*.hbs',
        tasks: ['emberTemplates']
      },
      client: {
        files: ['client/**/*.js'],
        tasks: ['concat:build', 'copy:build', 'clean:build']
      },
      less: {
        files: 'client/css/**/*.less',
        tasks: ['less']
      }
    }
  });

  /*
    Note: for compiling Handlebars templates, when going live, we need to 
    turn on the precompile process and preprocess tasks for grunt-ember-templates
  */

  grunt.event.on('watch', function (action, filepath) {
    grunt.config('jshint.all.src', filepath);
  });

  grunt.loadNpmTasks('grunt-bower-installer');
  grunt.loadNpmTasks('grunt-contrib-clean');  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ember-templates');

  grunt.registerTask('build-dev', ['emberTemplates', 'less', 'concat:build', 'copy:build', 'clean:build']);
  grunt.registerTask('build', ['emberTemplates', 'less', 'concat:build', 'copy:build', 'uglify', 'clean:build']);
  grunt.registerTask('install', ['bower:install', 'build']);
  grunt.registerTask('lint', ['jshint']);

  grunt.registerTask('default', ['watch']);
  
};