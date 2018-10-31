module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		watch: {
			options: {
		        livereload: true,
		    },
		    scripts: {
		        files: [
		        	'docroot/assets/js/*.js',
		        	'docroot/assets/js/*/*.js',
		        	'docroot/assets/css/*.scss',
		        	'docroot/assets/css/*/*.scss',
		        	'docroot/*/*.php',
		        	'docroot/*.php',
		        	'docroot/*.html'
		        ],
		        tasks: ['sass'],
		        options: {
		            spawn: false,
		        },
		    },    
		},	
		sass: {
			options: {
				loadPath: require('node-bourbon').includePaths,
				style: 'compressed'
			},			
			dist: {
				files: {
					'docroot/assets/css/style.css': 'docroot/assets/css/style.scss',
				}
			}
		},
		uglify: {
		    base: {
		        src: 'docroot/assets/js/base.js',
		        dest: 'docroot/assets/js/base.min.js',
		    },
		    libs: {
		        src: [
		            'docroot/assets/js/vendor/jquery.js', 
					'docroot/assets/js/vendor/three.min.js',
					'docroot/assets/js/vendor/EffectComposer.js',
					'docroot/assets/js/vendor/ShaderPass.js',
					'docroot/assets/js/vendor/CopyShader.js',
					'docroot/assets/js/vendor/RenderPass.js',
		            //'docroot/assets/js/vendor/gsap.js', 
		            'docroot/assets/js/vendor/smooth-scrollbar.js',
					'docroot/assets/js/vendor/GlitchPass.js',
					'docroot/assets/js/vendor/MaskPass.js',
					'docroot/assets/js/vendor/AfterimagePass.js',
				],
		        dest: 'docroot/assets/js/libs.min.js',
		    }
		}
    });
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('work', ['watch','uglify:base','sass']);
    grunt.registerTask('build', ['sass','uglify']);
};