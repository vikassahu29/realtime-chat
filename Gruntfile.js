module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      all: ['public/src/js/**/*.js', 'public/src/js/*.js']
    },

    uglify: {
      build: {
        files: {
          'public/dist/js/app.min.js': ['public/src/js/**/*.js',
                                        'public/src/js/*.js']
        }
      }
    },

    cssmin: {
      build: {
        files: {
          'public/dist/css/style.min.css': 'public/dist/css/style.css'
        }
      }
    },

    watch: {
      css: {
        files: ['public/src/css/**/*.css'],
        tasks: ['cssmin']
      },
      js: {
        files: ['public/src/js/**/*.js', 'public/src/js/*.js'],
        tasks: ['jshint', 'uglify']
      },
      bower: {
        files: ['bower.json'],
        tasks: ['bower_concat']
      }
    },

    nodemon: {
      dev: {
        script: 'index.js'
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    },

    bower_concat: {
      all: {
        dest: 'public/dist/js/vendor.js',
        mainFiles: {
          'angular': 'angular.min.js',
          'angular-ui-router': 'release/angular-ui-router.min.js',
          'angular-socket-io': 'socket.min.js',
          'socket.io-client': 'socket.io.js'
        },
        dependencies: {
          'angular-ui-router': 'angular',
          'angular-socket-io': ['socket.io-client', 'angular']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-bower-concat');

  grunt.registerTask('default', ['cssmin', 'jshint', 'uglify', 'bower_concat',
  'concurrent']);

};
