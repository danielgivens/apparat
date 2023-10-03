module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		watch: {
			options: {
		        livereload: true,
		    },
		    scripts: {
		        files: [
		        	'assets/js/*.js',
		        	'assets/js/*/*.js',
		        	'assets/css/*.scss',
		        	'assets/css/*/*.scss',
		        	'*/*.php',
		        	'*.php',
		        	'*.html'
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
					'assets/css/style.css': 'assets/css/style.scss',
				}
			}
		},
		uglify: {
		    tour: {
		        src: [
					'assets/js/tour.js'
				],
		        dest: 'assets/js/tour.min.js',
		    },
		    libs: {
		        src: [
		            'assets/js/vendor/gsap.js', 
		            'assets/js/vendor/smooth-scrollbar.js',
		            'assets/js/vendor/jquery.js', 
		            'assets/js/vendor/marquee3k.js', 
					'assets/js/vendor/three-fix.js',
					'assets/js/vendor/threex.windowresize.js',
					'assets/js/vendor/simplex-noise.min.js',
					'assets/js/vendor/EffectComposer.js',
					'assets/js/vendor/RenderPass.js',
					'assets/js/vendor/ShaderPass.js',
					'assets/js/vendor/perlin.js',
					'assets/js/vendor/Fire.js',
					'assets/js/vendor/GlitchPass.js',
					'assets/js/vendor/MaskPass.js',
					'assets/js/vendor/HueSaturationShader.js',
					'assets/js/vendor/AfterimagePass.js',
					'assets/js/vendor/ShaderGodRays.js',
					'assets/js/vendor/RGBShiftShader.js',
					'assets/js/vendor/BadTVShader.js',
					'assets/js/vendor/ColorifyShader.js',
					'assets/js/vendor/custom.js',
					'assets/js/vendor/shaders.js',
				],
				dest: 'assets/js/libs.min.js',
		    },
		    countdown: {
		        src: [
					'assets/js/libs.min.js',
					'assets/js/countdown.js'
				],
				dest: 'assets/js/countdown.min.js',
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