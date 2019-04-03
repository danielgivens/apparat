module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		watch: {
			options: {
		        livereload: true,
		    },
		    scripts: {
		        files: [
		        	'docroot/wp-content/themes/app/assets/js/*.js',
		        	'docroot/wp-content/themes/app/assets/js/*/*.js',
		        	'docroot/wp-content/themes/app/assets/css/*.scss',
		        	'docroot/wp-content/themes/app/assets/css/*/*.scss',
		        	'docroot/wp-content/themes/app/promo/assets/js/*.js',
		        	'docroot/wp-content/themes/app/promo/assets/js/*/*.js',
		        	'docroot/wp-content/themes/app/promo/assets/css/*.scss',
		        	'docroot/wp-content/themes/app/promo/assets/css/*/*.scss',
		        	'docroot/wp-content/themes/app/*/*.php',
		        	'docroot/wp-content/themes/app/*.php',
		        	'docroot/wp-content/themes/app/*.html'
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
					'docroot/wp-content/themes/app/assets/css/style.css': 'docroot/wp-content/themes/app/assets/css/style.scss',
					'docroot/wp-content/themes/app/promo/assets/css/style.css': 'docroot/wp-content/themes/app/promo/assets/css/style.scss',
				}
			}
		},
		uglify: {
		    tour: {
		        src: [
					'docroot/wp-content/themes/app/promo/assets/js/tour.js'
				],
		        dest: 'docroot/wp-content/themes/app/promo/assets/js/tour.min.js',
		    },
		    promolibs: {
		        src: [
		            'docroot/wp-content/themes/app/promo/assets/js/vendor/gsap.js', 
		            'docroot/wp-content/themes/app/promo/assets/js/vendor/smooth-scrollbar.js',
		            'docroot/wp-content/themes/app/promo/assets/js/vendor/jquery.js', 
		            'docroot/wp-content/themes/app/promo/assets/js/vendor/marquee3k.js', 
					'docroot/wp-content/themes/app/promo/assets/js/vendor/three-fix.js',
					'docroot/wp-content/themes/app/promo/assets/js/vendor/threex.windowresize.js',
					'docroot/wp-content/themes/app/promo/assets/js/vendor/simplex-noise.min.js',
					'docroot/wp-content/themes/app/promo/assets/js/vendor/EffectComposer.js',
					'docroot/wp-content/themes/app/promo/assets/js/vendor/RenderPass.js',
					'docroot/wp-content/themes/app/promo/assets/js/vendor/ShaderPass.js',
					'docroot/wp-content/themes/app/promo/assets/js/vendor/perlin.js',
					'docroot/wp-content/themes/app/promo/assets/js/vendor/Fire.js',
					'docroot/wp-content/themes/app/promo/assets/js/vendor/GlitchPass.js',
					'docroot/wp-content/themes/app/promo/assets/js/vendor/MaskPass.js',
					'docroot/wp-content/themes/app/promo/assets/js/vendor/HueSaturationShader.js',
					'docroot/wp-content/themes/app/promo/assets/js/vendor/AfterimagePass.js',
					'docroot/wp-content/themes/app/promo/assets/js/vendor/ShaderGodRays.js',
					'docroot/wp-content/themes/app/promo/assets/js/vendor/RGBShiftShader.js',
					'docroot/wp-content/themes/app/promo/assets/js/vendor/BadTVShader.js',
					'docroot/wp-content/themes/app/promo/assets/js/vendor/ColorifyShader.js',
					'docroot/wp-content/themes/app/promo/assets/js/vendor/custom.js',
					'docroot/wp-content/themes/app/promo/assets/js/vendor/shaders.js',
				],
				dest: 'docroot/wp-content/themes/app/promo/assets/js/libs.min.js',
		    },
		    applibs: {
		        src: [
		            'docroot/wp-content/themes/app/assets/js/vendor/smooth-scrollbar.js',
		            'docroot/wp-content/themes/app/assets/js/vendor/jquery.js', 
		            'docroot/wp-content/themes/app/assets/js/vendor/marquee3k.js', 
				],
				dest: 'docroot/wp-content/themes/app/assets/js/app.libs.min.js',
		    },
		    app: {
		        src: [
					//'docroot/wp-content/themes/app/promo/assets/js/app.libs.min.js',
					'docroot/wp-content/themes/app/assets/js/app.js'
				],
				dest: 'docroot/wp-content/themes/app/assets/js/app.min.js',
		    },
		    countdown: {
		        src: [
					'docroot/wp-content/themes/app/promo/assets/js/libs.min.js',
					'docroot/wp-content/themes/app/promo/assets/js/countdown.js'
				],
				dest: 'docroot/wp-content/themes/app/promo/assets/js/countdown.min.js',
		    }
		}
    });
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('work', ['watch']);
    grunt.registerTask('libs', ['uglify:applibs']);
    grunt.registerTask('build', ['sass','uglify:app']);
};