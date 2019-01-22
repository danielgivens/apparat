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
		    tour: {
		        src: [
					'docroot/assets/js/tour.js'
				],
		        dest: 'docroot/assets/js/tour.min.js',
		    },
		    libs: {
		        src: [
		            'docroot/assets/js/vendor/gsap.js', 
		            'docroot/assets/js/vendor/smooth-scrollbar.js',
		            'docroot/assets/js/vendor/jquery.js', 
		            'docroot/assets/js/vendor/marquee3k.js', 
					'docroot/assets/js/vendor/three-fix.js',
					'docroot/assets/js/vendor/threex.windowresize.js',
					'docroot/assets/js/vendor/simplex-noise.min.js',
					'docroot/assets/js/vendor/EffectComposer.js',
					'docroot/assets/js/vendor/RenderPass.js',
					'docroot/assets/js/vendor/ShaderPass.js',
					'docroot/assets/js/vendor/perlin.js',
					'docroot/assets/js/vendor/Fire.js',
					'docroot/assets/js/vendor/GlitchPass.js',
					'docroot/assets/js/vendor/MaskPass.js',
					'docroot/assets/js/vendor/HueSaturationShader.js',
					'docroot/assets/js/vendor/AfterimagePass.js',
					'docroot/assets/js/vendor/ShaderGodRays.js',
					'docroot/assets/js/vendor/RGBShiftShader.js',
					'docroot/assets/js/vendor/BadTVShader.js',
					'docroot/assets/js/vendor/ColorifyShader.js',
					'docroot/assets/js/vendor/custom.js',
					'docroot/assets/js/vendor/shaders.js',
				],
				dest: 'docroot/assets/js/libs.min.js',
		    },
		    countdown: {
		        src: [
					'docroot/assets/js/libs.min.js',
					'docroot/assets/js/countdown.js'
				],
				dest: 'docroot/assets/js/countdown.min.js',
		    }
		}
    });
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('work', ['watch']);
    grunt.registerTask('libs', ['uglify:libs']);
    grunt.registerTask('build', ['sass','uglify:countdown']);
};