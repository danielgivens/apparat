function webglAvailable() {
    try {
        var canvas = document.createElement("canvas");
        return !!
            window.WebGLRenderingContext && 
            (canvas.getContext("webgl") || 
                canvas.getContext("experimental-webgl"));
    } catch(e) { 
        return false;
    } 
}
function webAudioAvailable() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
    return true;
  }
  catch(e) {
        return false;
  }
}
backgrounds = [
	$templateDirectory + '/promo/assets/images/test-4.jpg',
	$templateDirectory + '/promo/assets/images/app-textures-2.2.jpg',
	$templateDirectory + '/promo/assets/images/app-smudges-2.jpg',
	$templateDirectory + '/promo/assets/images/app-textures-2.5.jpg',
	$templateDirectory + '/promo/assets/images/app-textures-2.6.jpg',
	$templateDirectory + '/promo/assets/images/texture-tour-3.jpg',
	$templateDirectory + '/promo/assets/images/texture-tour-2.jpg',
	$templateDirectory + '/promo/assets/images/app-textures-2.10.jpg',
];
textTextures = [
	$templateDirectory + '/promo/assets/images/app-poem.png',
	$templateDirectory + '/promo/assets/images/app.jpg',
	$templateDirectory + '/promo/assets/images/type-texture.png',
];
maskTextures = [
	$templateDirectory + '/promo/assets/images/appn.jpg',
	$templateDirectory + '/promo/assets/images/app-mask-8.jpg',
	$templateDirectory + '/promo/assets/images/app-mask-7.jpg',
	$templateDirectory + '/promo/assets/images/app-mask-6.jpg',
	$templateDirectory + '/promo/assets/images/app-mask-5.jpg',
	$templateDirectory + '/promo/assets/images/app-mask-4.jpg',
	$templateDirectory + '/promo/assets/images/app-mask-3.jpg',
	$templateDirectory + '/promo/assets/images/app-mask-2.jpg',
	$templateDirectory + '/promo/assets/images/app-mask-1.jpg',
	$templateDirectory + '/promo/assets/images/app-flower-mask.png',	
];

snips = [
	$templateDirectory + '/promo/assets/audio/airo5.aac',
	$templateDirectory + '/promo/assets/audio/Branden.aac',
	$templateDirectory + '/promo/assets/audio/Cock_Intro.aac',
	$templateDirectory + '/promo/assets/audio/euca_chords.aac',
	$templateDirectory + '/promo/assets/audio/EQ_Break.aac',
	$templateDirectory + '/promo/assets/audio/Jam9.aac',
	$templateDirectory + '/promo/assets/audio/Heroist.aac',
	$templateDirectory + '/promo/assets/audio/Hokkaido.aac',
	$templateDirectory + '/promo/assets/audio/Laminar.aac',
	$templateDirectory + '/promo/assets/audio/Laminar2.aac',
	$templateDirectory + '/promo/assets/audio/LeierBird.aac',
	$templateDirectory + '/promo/assets/audio/MeansOf.aac',
	$templateDirectory + '/promo/assets/audio/Somechords.aac'
];
loadedSnips = [];
function preloadAudio(url) {
	console.log(url);
var audio = new Audio();
// once this file loads, it will call loadedAudio()
// the file will be kept by the browser as cache
audio.addEventListener('canplaythrough', function(){
	loadedAudio(url);
}, false);
audio.src = url;
}
var loaded = 0;
function loadedAudio(url) {
	// this will be called every time an audio file is loaded
	// we keep track of the loaded files vs the requested files
	loaded++;
	loadedSnips.push(url);
	if (loaded == snips.length){
		// all have loaded
		//console.log('loaded audio');
	}
}

$loopSequence = shuffle(snips.slice(0));
groups = [
	'group1',
	'group2',
	'group3',
	'group4',
	'group5',
	'group6',
	'group7',
	'group8',
	'group9',
	'group10',
];

colors = [
	0xffd064,
	0xfb248b,
	0x01d765,
	0xf7ec13,
	0x1d8e40,
	0xe27940,
	0x29a9fd,
	0x0040ff,
	
];

wW = $(document).width();
wH = $(document).height();
var scene, switcher, mouse, fire, upperAvgFr, sound, upperMaxFr, lowerAvgFr, lowerMaxFr, upperAvg, upperMax, lowerAvg, lowerMax, overallAvg, deadline, $buff, loopTimer, listener, $track, textureContext, sphere_mesh,ambientLight, volumetericLightShaderUniforms, audioLoader, videoTexture, occlusionComposer, occlusionRenderTarget, occlusionBox, lightSphere, dartaArray, pointLight, $pointLight, idleTimer, $portal, textMesh, mouseTimer, portalMesh, portalrenderer, sound, camera, material, composer, analyser, dataArray, glitchPass, afterimagePass, renderPass, copyPass, rgbParams, rgbPass, filmParams, filmPass, renderPass, copyPass;
var DEFAULT_LAYER = 0, OCCLUSION_LAYER = 1, objects = [], p = 0, loadedTexts = []; randomPlanes = [], textureIndex = 0, $loopDur = 0, $loopLength = 0, renderScale = 0.5, ready4 = false, angle = 0, audioData = [], shaderTime = 0, btime = 0, fftSize = 512, $drawMe = false, ready3 = false, playing = false, ready = false, ready2 = false, holding = false, font2 = undefined, startX = wW/2, startY = wH/2, backgroundsLoaded = false, loadedCubes=[], loadedBackgrounds = [], loadedMasks = [],removeableItems = [], loadedMasks = [], mX = 0, mY = 0, b = 0, d = 0, r= 0, $r = 0, $switch = true, oldMax = 0, shaderTime = 0, start = Date.now(), wifreframeBallColor = 0, switchBG = 0, switchColor = 0, rate = 0, time = 0, offset = { upper : 0,lower : 0}, showGroup = 'none', $g = 1, $first = true; timeOutput = '00:00:00:00';
var shaderUniforms, shaderAttributes;
textCreated = false;
$spin = false;
if(wH > wW){
	$portrait = true;
} else{
	$portrait = false;
}
if(wW < 1024){
	$mobile = true;
	$('.sticker').addClass('rotated');
} else{
	$mobile = false;
}
$done = false;
var particles = [];
var particleSystem;
var windowResize;
var imageWidth = 1024/2;
var imageHeight = 1024/2;
var imageData = null;
var animationTime = 0;
var animationDelta = 0.03;

var $sequence = [];
if(webglAvailable() && webAudioAvailable()){
	var noise2 = new SimplexNoise(), simplex = new SimplexNoise(), manager = new THREE.LoadingManager(), loader = new THREE.TextureLoader(manager);

	$fallback = false;
	setTimeout(function(){
		init();
		loadBackgrounds(backgrounds[0]);
		loadTextTextures(textTextures[0]);
		loadMaskTextures(maskTextures[0]);
		/*var sn;
		for (sn = 0; sn < snips.length; sn++) { 
		 preloadAudio(snips[sn]);
		}*/
		Marquee3k.init({
		selector: 'marquee'	
		})
		var loadChecker = setInterval(function(){
		if(loadedBackgrounds.length >= 2 && loadedMasks.length >= 1 && loadedTexts.length >= 1){
			ready4 = true;
			$spin = false;
			$('body').addClass('started');
			clearInterval(loadChecker);
			
		} else{
			//console.log('something isnt right');
		}
		/*if(backgroundsLoaded){
			clearInterval(loadChecker);
			ready4 = true;
			$('body').addClass('started');
		}*/
		},100);	
		
	},400);
	$('.instruction.fallback').remove();

} else{
	$fallback = true;
	$('body').addClass('fallback');
	$('body').addClass('started');
	$('.sticker .fallback').remove();
	$('.instruction.primary').remove();
	Marquee3k.init({
	 selector: 'marquee'	
	});
	deadline = "2019-03-22T00:00:00+00:00";
	function getTimeRemaining(endtime) {
	  var t = Date.parse(endtime) - Date.parse(new Date());
	  var seconds = Math.floor((t / 1000) % 60);
	  var minutes = Math.floor((t / 1000 / 60) % 60);
	  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	  var days = Math.floor(t / (1000 * 60 * 60 * 24));
	  return {
	    'total': t,
	    'days': days,
	    'hours': hours,
	    'minutes': minutes,
	    'seconds': seconds
	  };
	}
	function updateClock() {
		var t = getTimeRemaining(deadline);	
		timeOutput = t.days+':' +''+ ('0' + t.hours).slice(-2) + ':' +''+ ('0' + t.minutes).slice(-2)+':' +''+ ('0' + t.seconds).slice(-2);
		$('.output#time').html('LP5_'+timeOutput);
		if (t.total <= 0) {
			clearInterval(timeinterval);
		}
	}
	var timeinterval = setInterval(updateClock, 1000);
	$(window).resize(function(){
		onWindowResize();		
	});
}
function init(){

	setupScene();
	setupTicker();
	
}
function randGroup(){
	ready3 = false;
	//rand = Math.floor(Math.random() * groups.length) + 1;
	//rand = 1;
	//showGroup = 'group'+rand;
	$scene = getUrlVars()["s"];
	if($scene){
	   	showGroup = groups[$scene];
	} else if($first){
		$sequence = shuffle(groups.slice(0));
		showGroup = $sequence[0];
		$sequence.shift();	
	} else{
		showGroup = $sequence[0];
		$sequence.shift();
	}
	if($sequence.length === 0){
		$sequence = shuffle(groups.slice(0));
	}
	createGroup(showGroup);
	$first = false;
		
}
function setupScene(){
	scene = new THREE.Scene();	
	fogColor = new THREE.Color(0x000000);
	scene.background = fogColor;
	scene.fog = new THREE.Fog(fogColor, 0.0025, 60);
	res = wW / wH;
	camera = new THREE.PerspectiveCamera(45, res, 0.1, 2000);
	camera.position.x = 0;
	camera.position.y = 0;
	camera.layers.set(DEFAULT_LAYER);
	camera.position.z = 10;
	camera.lookAt( scene.position);
	ambientLight = new THREE.AmbientLight(0xffffff);
	ambientLight.intensity = .6;
	
	scene.add(ambientLight);
	spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.position.set( 0, 0, 10 );
	
	spotLight.castShadow = true;
	spotLight.intensity = 1;
	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;
	
	spotLight.shadow.camera.near = 1;
	spotLight.shadow.camera.far = 2000;
	spotLight.shadow.camera.fov = 45;
	spotLight.name = 'mainSpot';
	scene.add( spotLight );
	$mainSpot = scene.getObjectByName('mainSpot');
	group1 = new THREE.Group();
	group2 = new THREE.Group();
	group3 = new THREE.Group();
	group4 = new THREE.Group();
	group5 = new THREE.Group();
	group6 = new THREE.Group();
	group7 = new THREE.Group();
	group8 = new THREE.Group();
	group9 = new THREE.Group();
	group10 = new THREE.Group();
	scene.add(group1);		
	scene.add(group2);		
	scene.add(group3);		
	scene.add(group4);		
	scene.add(group5);		
	scene.add(group6);
	scene.add(group7);
	scene.add(group8);
	scene.add(group9);
	scene.add(group10);
	
	renderer = new THREE.WebGLRenderer({ 
	    antialias: true,
		alpha: false,
		 //precision: "lowp", 
	});
	wW = $(document).width();
	wH = $(document).height();
	 windowResize = new THREEx.WindowResize(renderer, camera, {
	    width     : function() { return wW; },
	    height    : function() { return wH; },
	    maxWidth  : 1280,
	    maxHeight : 1280,
		after     : onWindowResize,
	   // scale     : '3d'
	});
    
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFShadowMap;
	renderer.setSize(wW, wH);
	pixelRatio = 1;

	occlusionRenderTarget = new THREE.WebGLRenderTarget( wW, wH);
	occlusionComposer = new THREE.EffectComposer( renderer, occlusionRenderTarget);
	occlusionComposer.addPass( new THREE.RenderPass( scene, camera ) );
	
	pass = new THREE.ShaderPass( THREE.VolumetericLightShader );
	pass.needsSwap = false;
	occlusionComposer.addPass( pass );
	
	volumetericLightShaderUniforms = pass.uniforms;
	volumetericLightShaderUniforms.exposure.value = 0;
	volumetericLightShaderUniforms.decay.value = 0.9;
	volumetericLightShaderUniforms.density.value = 0.8;
	volumetericLightShaderUniforms.weight.value = 0.9;
	volumetericLightShaderUniforms.samples.value = 100;
	
	composer = new THREE.EffectComposer(this.renderer);
	composer.setSize( wW, wH);
	composer.addPass( new THREE.RenderPass( scene, camera ) );

	//var hue = new THREE.ShaderPass(THREE.HueSaturationShader);
    //hue.enabled = true;
    //hue.uniforms.hue.value = 10;
	//hue.renderToScreen = false;
	//composer.addPass( hue );
THREE.ColorCorrectionShader = {

	uniforms: {

		"tDiffuse": { value: null },
		"powRGB":   { value: new THREE.Vector3( 2, 2, 2 ) },
		"mulRGB":   { value: new THREE.Vector3( 1, 1, 1 ) },
		"addRGB":   { value: new THREE.Vector3( 0, 0, 0 ) }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",

			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
		"uniform vec3 powRGB;",
		"uniform vec3 mulRGB;",
		"uniform vec3 addRGB;",

		"varying vec2 vUv;",

		"void main() {",

			"gl_FragColor = texture2D( tDiffuse, vUv );",
			"gl_FragColor.rgb = mulRGB * pow( ( gl_FragColor.rgb + addRGB ), powRGB );",

		"}"

	].join( "\n" )

};

	
	colorify = new THREE.ShaderPass(THREE.ColorifyShader)
	colorify.uniforms['opacity'].value = 0;
	colorify.uniforms['color'].value.setRGB(1, 1, 1);
	colorify.renderToScreen = false;
	composer.addPass( colorify );
	
	badTVPass = new THREE.ShaderPass( THREE.BadTVShader );
	badTVPass.renderToScreen = false;
	
	badTVPass.uniforms[ 'distortion' ].value = 0;
	badTVPass.uniforms[ 'distortion2' ].value = 0;
	badTVPass.uniforms[ 'speed' ].value = 0;
	badTVPass.uniforms[ 'rollSpeed' ].value = 0;
	
	composer.addPass( badTVPass );
	
	pass = new THREE.ShaderPass( THREE.AdditiveBlendingShader );
	pass.uniforms.tAdd.value = occlusionRenderTarget.texture;
	composer.addPass( pass );
	glitchPass = new THREE.GlitchPass();
	glitchPass.renderToScreen = false;
	composer.addPass( glitchPass );

	pass.renderToScreen = false;
	
	staticPass = new THREE.ShaderPass( THREE.StaticShader );
	
	staticPass.uniforms[ 'amount' ].value = .2;
	staticPass.uniforms[ 'size' ].value = 1;		
	staticPass.renderToScreen = false;
	//composer.addPass( staticPass );

	hueSat = new THREE.ShaderPass(THREE.HueSaturationShader)
	hueSat.enabled = true;
	hueSat.renderToScreen = false;
	hueSat.uniforms['hue'].value = 0;
	hueSat.uniforms['saturation'].value = 0;
	composer.addPass( hueSat );

		
	afterimagePass = new THREE.AfterimagePass();
	afterimagePass.renderToScreen = true;
	composer.addPass( afterimagePass );
	
	mouse = new THREE.Vector2();
	
	$('.scroll .scroll-content').append(renderer.domElement);
	setTimeout( function(){
		wW = $(document).width();
		wH = $(document).height();
windowResize.destroy();   
		 windowResize = new THREEx.WindowResize(renderer, camera, {
		    width     : function() { return wW; },
		    height    : function() { return wH; },
		    maxWidth  : 1280,
		    maxHeight : 1280,
			after     : onWindowResize,
		   // scale     : '3d'
		});
		windowResize.trigger();
	},500);
	
}
function loadBackgrounds(bg){
	var loader = new THREE.TextureLoader(manager)
	loader.load(bg, function (object) {
		loadedBackgrounds.push(object);
		var urls = [
			bg,
			bg,
			bg,
			bg,
			bg,
			bg
		];
			
		var textureCube = new THREE.CubeTextureLoader().load( urls );	
		loadedCubes.push(textureCube)	
		if(loadedBackgrounds.length == backgrounds.length ){
			
		} else{
			b++
			if(b <= backgrounds.length){
				loadBackgrounds(backgrounds[b]);
			} else{
				//loadMaskTextures(maskTextures[0]);
				
			}
		}
	});
}
function loadMaskTextures(bg){
	var loader = new THREE.TextureLoader(manager)
	loader.load(bg, function (object) {
		loadedMasks.push(object);
		if(loadedMasks.length == maskTextures.length ){
			
		} else{
			d++
			if(d <= maskTextures.length){
				loadMaskTextures(maskTextures[d]);
			} else{
				
				//loadTextTextures(textTextures[0]);
			}
		}
	});
}
function loadTextTextures(bg){
	var loader = new THREE.TextureLoader(manager)
	loader.load(bg, function (object) {
		loadedTexts.push(object);
		if(loadedTexts.length == textTextures.length ){
			backgroundsLoaded = true;
			windowResize.trigger();

		} else{
			p++
			if(p <= textTextures.length){
				loadTextTextures(textTextures[p]);
			} else{
				backgroundsLoaded = true;
				windowResize.trigger();

			}
		}
	});
}
function setupTicker(){
	/* ticker stuff */
	ticker = new THREE.Group();
	var countDown = 'LP5_';
	deadline = "2019-03-22T00:00:00+00:00";
	var fontLoader = new THREE.FontLoader();
	var font = fontLoader.load( $templateDirectory + '/promo/assets/fonts/Terminal Grotesque_Regular.json', function ( response ) {
	    font2 = response;
		updateClock();
		var timeinterval = setInterval(updateClock, 1000);
		ready = true;
	    draw();
	});	
	
	/*$('.message span').lettering();
	$o = 0;
	$('.message span').each(function(){
		$(this).find('span').each(function(){
			if($(this).html() != ' '){
				$(this).attr('data-original',$(this).html());
			} else{
				$(this).addClass('space');
			}
		});
	});*/
	var textMesh;
	scene.add(ticker);	
}
function getTimeRemaining(endtime) {
	$current = new Date();
	//$start = new Date("January 22, 2019 04:45:00 GMT");
	$start = new Date("January 22, 2019 04:20:00 GMT");
	if($current.getTime()>$start.getTime()){
		$('.announcement').removeClass('hidden');
	}
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}
function updateClock() {
	var t = getTimeRemaining(deadline);	
	if(ready4){
		countDown = 'LP_5.'+t.days+':' +''+ ('0' + t.hours).slice(-2) + ':' +''+ ('0' + t.minutes).slice(-2)+':' +''+ ('0' + t.seconds).slice(-2)+'';
	} else{
		countDown = '<!--loading-->';
		$spin = true;
	}
	
	timeOutput = t.days+':' +''+ ('0' + t.hours).slice(-2) + ':' +''+ ('0' + t.minutes).slice(-2)+':' +''+ ('0' + t.seconds).slice(-2);
	document.title = countDown;
	if(!holding){

		refreshText();
    }
	if (t.total <= 0) {
		clearInterval(timeinterval);
	}
}
function refreshText(){
	if(textCreated){
		ticker.getObjectByName('textMesh').material.dispose();
		ticker.getObjectByName('textMesh').geometry.dispose();
		ticker.remove(ticker.getObjectByName('textMesh'));
	}


	createText();  
}
function createText(){
	textCreated = true;
	if($portrait){
		tSize = wH/700;
	} else{
		tSize = wW/700;
		if($mobile){
			tSize = wW/400;
		}
	}
	var textMaterial = new THREE.MeshStandardMaterial({color: 0xffffff});
	var textGeometry = new THREE.TextGeometry(countDown, {
		font: font2,
		size: tSize,
		height: .1,
		curveSegments: 3
	});
	textGeometry.center();
	textMesh = new THREE.Mesh(textGeometry, textMaterial);
	textMesh.scale.set(.25,.25,.25);
	textMesh.name = 'textMesh';
	ticker.add(textMesh);	

	
}
function handleGroup(){
	ready2 = false;
	if(showGroup != 'none'){
	    if(showGroup === 'group1'){
		    group = group1;
	    } else if(showGroup === 'group2'){
		    group = group2;
	    } else if(showGroup === 'group3'){
		    group = group3;
	    } else if(showGroup === 'group4'){
		    group = group4;
	    } else if(showGroup === 'group5'){
		    group = group5;
	    } else if(showGroup === 'group6'){
		    group = group6;
	    } else if(showGroup === 'group7'){
		    group = group7;
	    } else if(showGroup === 'group8'){
		    group = group8;
	    } else if(showGroup === 'group9'){
		    group = group9;
	    } else if(showGroup === 'group10'){
		    group = group10;
	    }
		removeableItems.forEach(function(v,i) {
			if(v.material.length == 1){
				v.material.dispose();
			} else{
				for (var m = 0; m < v.material.length; m++) {
					v.material[m].dispose();
				}
			}
			v.geometry.dispose();
			v = undefined;
		});
	    if(group.children.length > 0){
			//TweenMax.to(group.position, .2, {z: -100,onComplete: function(){
				for (var i = group.children.length - 1; i >= 0; i--) {
				    group.remove(group.children[i]);
					
				}
				randGroup();
			//}}); 
				
			playing = false;
	    }
		
	} else{
		playing = false;
		listener = new THREE.AudioListener();
		camera.add( listener );
		sound = new THREE.Audio( listener );
		audioLoader = new THREE.AudioLoader();
		analyser = new THREE.AudioAnalyser( sound, fftSize );
		dataArray = analyser.data;
		/*hpfilter = sound.context.createBiquadFilter();
		hpfilter.type = "highpass";
		hpfilter.frequency.value = .0001;
		sound.setFilters([hpfilter]);*/
		getAudioData(dataArray);
		randGroup();
	}
    $track = getUrlVars()["t"];
    if($track){
	    if($track <= snips.length){
		    $r = parseInt($track)-1;
		    $loop = snips[$r];
	    } else{
		   $loop = snips[0];
	    }
    } else{
		$loop = $loopSequence[0];
		$loopSequence.shift();	
		if($loopSequence.length === 1){
			$loopSequence = shuffle(snips.slice(0));
		}
	} 
	//sound.context.suspend();
	audioLoader.load( $loop, function( buffer ) {
		sound.setBuffer( buffer );
		sound.setLoop( true );
		//sound.setVolume( 0);
		sound.offset = 0;
		
		$buff = buffer;
		$loopDur = $buff.duration; 
		$loopLength = $buff.length; 
		

		//console.log('test:'+$loopLength);
		//sound.context.resume();
		//sound.playbackRate = .7;
		
		ready2 = true;
		playing = false;
		if($r > snips.length -1){
			$r = 0;
		}
		
	});		
}
function loadLoop(){
	if(playing){
		//TweenMax.to(sound, .2, {setVolume:0, onComplete: function(){
			//sound.pause();
			handleGroup();
		//}});	
	} else{
		handleGroup();
	}
}
function createGroup(g){
	$drawMe = false;
	if(g === 'group1'){
		var randColor1 = colors[Math.floor(Math.random() * colors.length)];
		material = new THREE.ShaderMaterial( {
			wireframe: true,
			transparent: true,
			opacity: 0,
			side: THREE.DoubleSide,
			uniforms: {
				//tShine: { type: "t", value: panoTexture },
				black: { type: "c", value: new THREE.Color( 0x000000 ) },
				colors: { type: "c", value: new THREE.Color( 0xffffff ) },
				time: { type: "f", value: 0 },
				weight: { type: "f", value: 0.2 }
			},
			vertexShader: noiseVertex,
			fragmentShader: noiseFragment
	
		} );
	
		mesh = new THREE.Mesh( new THREE.IcosahedronBufferGeometry( 8, 6 ), material );
		group1.add(mesh);
		group1.position.z = 100;
		
		removeableItems.push(mesh);
		mesh.name = 'wireframeBall';
		$wireframeBall = group1.getObjectByName('wireframeBall');

		addPortal();		
	}

	if(g === 'group2'){
		ratio = wW / wH;
		var cameraZ = camera.position.z;
		var planeZ =0;
		var distance = cameraZ - planeZ;
		var aspect = wW / wH;
		var vFov = camera.fov * Math.PI / 180;
		var planeHeightAtDistance = 2 * Math.tan(vFov / 2) * distance;
		var planeWidthAtDistance = planeHeightAtDistance * aspect;	

		sizes = planeWidthAtDistance * 1.2;
		group2.position.z = 100;
		var randColor1 = colors[Math.floor(Math.random() * colors.length)];
		var randColor2 = colors[Math.floor(Math.random() * colors.length)];
		var randColor3 = colors[Math.floor(Math.random() * colors.length)];
		var randBG1 = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
		var randBG2 = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
		var randBG3 = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
		if($portrait){
			sizes = planeHeightAtDistance * 1.2;
		} else{
			sizes = planeWidthAtDistance * 1.2;
		}
		var geometry1 = new THREE.PlaneGeometry( sizes, sizes, 112, 112 );
		var material1 = new THREE.MeshBasicMaterial( {color:  0xffffff, map: randBG1, wireframe: false, transparent: true, opacity: 1} );
		randBG1.magFilter = THREE.NearestFilter;
		randBG1.wrapT = THREE.RepeatWrapping;
		randBG1.wrapS = THREE.RepeatWrapping;
		randBG1.repeat.set( 1, 1 );		

		var plane1 = new THREE.Mesh( geometry1, material1 );
		plane1.name = 'plane1';
		group2.add(plane1);
		$plane1 = group2.getObjectByName('plane1');
		var geometry2 = new THREE.PlaneGeometry( sizes, sizes, 112, 112 );
		var material2 = new THREE.MeshBasicMaterial( {color:   randColor2, wireframe: true, transparent: true, opacity: 1} );
		randBG2.magFilter = THREE.NearestFilter;
		randBG2.wrapT = THREE.RepeatWrapping;
		randBG2.wrapS = THREE.RepeatWrapping;
		randBG2.repeat.set( 1, 1 );		


		var plane2 = new THREE.Mesh( geometry2, material2 );
		plane2.name = 'plane2';
		group2.add(plane2);
		$plane2 = group2.getObjectByName('plane2');
		var geometry3 = new THREE.PlaneGeometry( sizes, sizes, 112, 112 );
		var material3 = new THREE.MeshBasicMaterial( {color:   randColor1, map: randBG3, wireframe: false, transparent: true, opacity: 1} );
		var plane3 = new THREE.Mesh( geometry3, material3 );
		randBG3.magFilter = THREE.NearestFilter;
		randBG3.wrapT = THREE.RepeatWrapping;
		randBG3.wrapS = THREE.RepeatWrapping;
		randBG3.repeat.set( 1, 1 );		

		plane3.name = 'plane3';
		group2.add(plane3);
		$plane3 = group2.getObjectByName('plane3');
		
		removeableItems.push(plane1);
		removeableItems.push(plane2);
		removeableItems.push(plane3);

		
	}
	if(g === 'group3'){
		group3.position.z = 100;
		ratio = wW / wH;
		if($portrait){
			sizes = 12 * ratio;	
		} else{
			sizes = 8 * ratio;	
		}
			
		//var box = new THREE.BoxBufferGeometry(sizes,sizes,sizes);
		var box = new THREE.SphereGeometry(sizes, 32, 32);
		var randBG = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
		randBG.magFilter = THREE.NearestFilter;
		randBG.wrapT = THREE.RepeatWrapping;
		randBG.wrapS = THREE.RepeatWrapping;
		randBG.repeat.set( 1, 1 );

		var material = new THREE.MeshStandardMaterial( {
			color: 0xffffff,
			roughness: 1,
			metalness: 1,
			map: randBG,
			side: THREE.BackSide,
			transparent: true,
			opacity: 1
		} );
		var boxMesh = new THREE.Mesh( box, material);
		//boxMesh.position.y = 5;
		//boxMesh.rotation.y = Math.PI * .5;
		boxMesh.receiveShadow = true;
		boxMesh.name = 'room';
		group3.add(boxMesh);
		removeableItems.push(boxMesh);
		$room = group3.getObjectByName('room');
		$ra = Math.floor(Math.random() * loadedMasks.length);
		if($ra === 0){
			$ra = 1;
		}
		var alphaMap = loadedMasks[$ra];
		var randColor1 = colors[Math.floor(Math.random() * colors.length)];
		pointLight = createLight( randColor1 , alphaMap);
		pointLight.name = 'innerLight';
		pointLight.position.z  = 3;
		group3.add( pointLight );		
		$pointLight = group3.getObjectByName('innerLight');


	}
	if(g === 'group4'){
		geometry = new THREE.SphereBufferGeometry( 3, 32, 32 );
		//geometry = new THREE.BoxBufferGeometry( 3, 3, 3 );
		material = new THREE.MeshBasicMaterial( { color: colors[0] } );
		$am = Math.floor(Math.random() * loadedMasks.length)
		if($am === 0){
			$am = 1;
		}
		var alphaMap = loadedMasks[$am];
		group4.position.z = 100;
		lightSphere = new THREE.Mesh( geometry, material );
		lightSphere.layers.set( OCCLUSION_LAYER );
		lightSphere.name = 'lightSphere';
		removeableItems.push(lightSphere);
		group4.add( lightSphere );
		$lightSphere = group4.getObjectByName('lightSphere');
		var geometry = new THREE.SphereBufferGeometry( 3, 200, 200 );
		var material = new THREE.MeshPhongMaterial({
			color: 0xffffff,
			specular: colors[0],
			shininess: 1,
			polygonOffset: true,
			polygonOffsetFactor: 1,
			wireframe:true,
			transparent: true,
			opacity: 0
		
		});
		mesh = new THREE.Mesh(geometry, material);
		removeableItems.push(mesh);
		mesh.name = 'god';
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		group4.add(mesh);
		$god = group4.getObjectByName('god');
		var texture = alphaMap;
		texture.magFilter = THREE.NearestFilter;
		texture.wrapT = THREE.RepeatWrapping;
		texture.wrapS = THREE.RepeatWrapping;
		texture.repeat.set( 1, 1 );		
		var sphere_material = [
		  new THREE.MeshLambertMaterial( { color: 'pink', side: THREE.DoubleSide } ),
		  new THREE.MeshBasicMaterial( { transparent: true, opacity: 0 } )
		];
		var sphere_material = new THREE.MeshPhongMaterial( {
			//side: THREE.DoubleSide,
			alphaMap: texture,
			shininess: 20,
			color: 0xffffff,
			specular: 0xffffff,
			alphaTest: 0.5,
			transparent: true,
			opacity: 1
		} );		
		var sphere_geometry = new THREE.SphereBufferGeometry(3, 32, 32 );
		sphere_mesh = new THREE.Mesh( sphere_geometry, sphere_material );
		sphere_mesh.position.set(0, 0, 0);
		removeableItems.push(sphere_mesh);
		sphere_mesh.name = 'spheremesh';
		mesh.add(sphere_mesh);
		sphere_mesh.layers.set( OCCLUSION_LAYER );   
		var randBG = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
		randBG.wrapS = THREE.RepeatWrapping;
		randBG.blending = THREE.SubtractiveBlending;
		randBG.wrapT = THREE.RepeatWrapping;
		randBG.repeat.set( 20, 10 );		

var randColor = colors[Math.floor(Math.random() * colors.length)];
		var sphere_geometry = new THREE.SphereBufferGeometry(2.99, 32, 32 );
		sphere_material = new THREE.MeshStandardMaterial( { roughness: .8, metalness: .5, map: randBG, color: randColor } ),
		sphere_mesh = new THREE.Mesh( sphere_geometry, sphere_material );
		sphere_mesh.position.set(0, 0, 0);
		sphere_mesh.name = 'orblayer';
		group4.add(sphere_mesh);
		$orbLayer = group4.getObjectByName('orblayer');
		removeableItems.push(sphere_mesh);
	
	}
	if(g === 'group5'){
		ratio = wW / wH;
		sizes = 10 * ratio;
		//var size = 20;
		//var divisions = size*12;
		if($portrait){
			sizes = wH;
		} else{
			sizes = wW;
		}
		group5.position.z = 100;

		canvasTexture = document.createElement( 'canvas' );
		canvasTexture.id = 'drawingCanvas';
		canvasTexture.width = sizes;
		canvasTexture.height = sizes;
		//document.body.appendChild(canvasTexture);
		textureContext = canvasTexture.getContext( '2d' );
		textureContext.fillStyle = "black";
		textureContext.fillRect(0, 0, sizes, sizes);



        $drawMe = true;
		
		var randBG1 = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
		$rand2 = Math.floor(Math.random() * loadedBackgrounds.length);
		var randBG2 = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
		var randMask = loadedMasks[Math.floor(Math.random() * loadedMasks.length)];

		var cameraZ = camera.position.z;
		var planeZ = 1.1;
		var distance = cameraZ - planeZ;
		var aspect = wW / wH;
		var vFov = camera.fov * Math.PI / 180;
		var planeHeightAtDistance = 2 * Math.tan(vFov / 2) * distance;
		var planeWidthAtDistance = planeHeightAtDistance * aspect;	
		if($portrait){
			size = planeHeightAtDistance;
		} else{
			size = planeWidthAtDistance;
		}		
		var randText = loadedTexts[Math.floor(Math.random() * loadedTexts.length)];
		randText.wrapS = THREE.RepeatWrapping;
		randText.wrapT = THREE.RepeatWrapping;
		randText.repeat.set( 1, 1 );

		var randColor = colors[Math.floor(Math.random() * colors.length)];

		var geometry = new THREE.PlaneBufferGeometry( size, size, 12, 12 );
		//var geometry = new THREE.SphereBufferGeometry( planeWidthAtDistance,64, 64 );
		var material = new THREE.MeshBasicMaterial( {color:  randColor, map: randText, wireframe: false, transparent: true, opacity: 1 } );
		var alpha = new THREE.CanvasTexture( canvasTexture );
		alpha.minFilter = THREE.NearestFilter;
		//material.alphaMap.magFilter = THREE.NearestFilter;
		material.alphaTest = 0.25;
		//alpha.wrapS = THREE.RepeatWrapping;
		//alpha.wrapT = THREE.RepeatWrapping;
		//alpha.repeat.y = 1;
		//alpha.repeat.x = 1;
		//alpha.offset.y = -1;
		//alpha.offset.x = 1;
		material.alphaMap = alpha;
		alpha.needsUpdate = true;
		
		//material.needsUpdate = true;
		//material.side = THREE.BackSide;

		var plane1 = new THREE.Mesh( geometry, material );
		plane1.name = 'plane1';
		//plane1.scale.x = -1;
		plane1.position.z =planeZ;
		plane1.castShadow = true;
		plane1.receiveShadow = false;
		var customDepthMaterial = new THREE.MeshDepthMaterial( {
		
		    depthPacking: THREE.RGBADepthPacking,
		
		    map: alpha, // or, alphaMap: myAlphaMap
		
		    alphaTest: 0.8
		
		} );
		
		plane1.customDepthMaterial = customDepthMaterial;
		group5.add(plane1);
		$plane1 = group5.getObjectByName('plane1');

		var cameraZ = camera.position.z;
		var planeZ = -5;
		var distance = cameraZ - planeZ;
		var aspect = wW / wH;
		var vFov = camera.fov * Math.PI / 180;
		var planeHeightAtDistance = 2 * Math.tan(vFov / 2) * distance;
		var planeWidthAtDistance = planeHeightAtDistance * aspect;	
		randBG2.wrapS = THREE.RepeatWrapping;
		randBG2.wrapT = THREE.RepeatWrapping;
		randBG2.repeat.set( 1, 1 );
				if($portrait){
			size = planeHeightAtDistance;
		} else{
			size = planeWidthAtDistance;
		}	
		var geometry = new THREE.PlaneBufferGeometry( size, size, 12, 12 );
				//var geometry = new THREE.SphereBufferGeometry( planeWidthAtDistance,64, 64 );
		var randColor = colors[Math.floor(Math.random() * colors.length)];

var mat = new THREE.ShaderMaterial({
		  uniforms:{
			  col1 : {type:"c", value: new THREE.Color( randColor )},
		      tex0: {type:"t", value: randMask},
		      tex1: {type:"t", value: randBG1},
		      amt : {tyle:"f", value: .08},
		       delta: {type: 'f', value: 0.0},
		      scale : {tyle:"f", value: 1.5}
		  },
		  //color: randColor,
		  vertexShader:[
"precision highp float;",
"precision highp int;",
"varying vec2 vUv;",
"uniform float delta;",

"uniform float scale;",

"void main() {",
  "vUv = uv;",
    "vec3 p = position;",
    "vec4 mvPosition = modelViewMatrix * vec4(scale * p, 1.0 );",
  "gl_Position = projectionMatrix * mvPosition;",

"}"
].join( "\n" ),
		  fragmentShader: [
"precision mediump float;",
"varying vec2 vUv;",
"uniform vec3 col1;",
"varying vec4 color;",
"uniform sampler2D tex0;",
"uniform sampler2D tex1;",
"uniform float amt;",
"void main() {",
"  vec2 uv = vUv;",
"  vec4 cam = texture2D(tex0, uv + amt);",
"  float avg = dot(cam.rgb, vec3(0.33333));",
"  avg = avg * 2.0 - 1.0;",
"  float disp = avg * amt;",
"  vec4 pup = texture2D(tex1, uv + disp);",
"  vec4 color = pup;",
"	float gray = dot(0.6 - color.rgb, vec3(0.299, 0.587, 0.114));",
"  gl_FragColor = pup;",
"}"
].join( "\n" )
		});


		//var material = new THREE.MeshBasicMaterial( {color:  0xffffff, map: randBG2, wireframe: false, transparent: true, opacity: 1} );
		//material.needsUpdate = true;
		//material.side = THREE.DoubleSide;
		//var data = getHeightData(backgrounds[$rand2], 1);
		//console.log(randBG2);
		var plane2 = new THREE.Mesh( geometry, mat );
		plane2.name = 'plane2';
		/*for ( var i = 0; i<plane2.geometry.vertices.length; i++ ) {
		     plane2.geometry.vertices[i].z = data[i];
		}*/
		plane2.position.z = planeZ;
		plane2.castShadow = false;
		plane2.receiveShadow = true;
		group5.add(plane2);
		$plane2 = group5.getObjectByName('plane2');

		removeableItems.push(plane1);
		removeableItems.push(plane2);		
		
	} else{
		
	}
	if(g === 'group6'){
		group6.position.z = 100;
		var randMask = loadedBackgrounds[0];
		var randBG2 = loadedBackgrounds[0];
		//var randBG2 = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
		randMask.wrapS = THREE.RepeatWrapping;
		randMask.wrapT = THREE.RepeatWrapping;
		randMask.repeat.set( 1, 1 );		
	
		randBG2.wrapS = THREE.RepeatWrapping;
		randBG2.wrapT = THREE.RepeatWrapping;
		randBG2.repeat.set( 1, 1 );		
		var cameraZ = camera.position.z;
		var planeZ = 0;
		var distance = cameraZ - planeZ;
		var aspect = wW / wH;
		var vFov = camera.fov * Math.PI / 180;
		var planeHeightAtDistance = 2 * Math.tan(vFov / 2) * distance;
		var planeWidthAtDistance = planeHeightAtDistance * aspect;	

		var geo = new THREE.PlaneBufferGeometry(planeWidthAtDistance, planeHeightAtDistance);
		var mat = new THREE.ShaderMaterial({
		  uniforms:{
		      time: {value: 0},
					mx: {value: 0},
					my: {value: 0},
		      texture1: {value: randBG2},
					texture2: {value: randMask}
		  },
		  vertexShader:[
"precision highp float;",
"precision highp int;",
"varying vec2 vUv;",
"void main() {",
"  vUv = uv;",
"  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);",
"}"

].join( "\n" ),
		  fragmentShader: [
		  "precision highp float;",
"uniform float time;",
"uniform float mx;",
"uniform float my;",
"uniform sampler2D texture1;",
"uniform sampler2D texture2;",
"varying vec2 vUv;",
"void main() {",
"  vec3 c = vec3(texture2D(texture1, vUv));",
"  //float v = time + (vUv.x*0.5 + vUv.y*0.5);",
"  float v = time;",
"  vec2 Uv2 = vec2(c.r + c.g + v+ mx, c.r + c.b + v + mx);",
"  vec3 outcolor = vec3(texture2D(texture2, Uv2));",
"  //vec3 outcolor = vec3( mod(c.r+v,1.0), mod(c.g+v,1.0), mod(c.b+v,1.0));",
"  gl_FragColor = vec4( outcolor, 1.0 );",
"}"

].join( "\n" )
		});
		var plane = new THREE.Mesh(geo, mat);
		plane.name = 'feedback';
		group6.add(plane);		
		removeableItems.push(plane);		
		$feedback = group6.getObjectByName('feedback');
	}
	if(g === 'group7'){
		var randBG = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
randBG.wrapT = THREE.RepeatWrapping;
randBG.wrapS = THREE.RepeatWrapping;
randBG.repeat.set( 1, 1 );
		var cameraZ = camera.position.z;
		var planeZ = 0;
		var distance = cameraZ - planeZ;
		var aspect = wW / wH;
		var vFov = camera.fov * Math.PI / 180;
		var planeHeightAtDistance = 2 * Math.tan(vFov / 2) * distance;
		var planeWidthAtDistance = planeHeightAtDistance * aspect;	
		if($portrait){
			size = planeHeightAtDistance;
			res = wH;
		} else{
			size = planeWidthAtDistance;
			res = wW;
		}
		var geometry = new THREE.PlaneBufferGeometry( size, size, 12, 12 );
				//var geometry = new THREE.SphereBufferGeometry( planeWidthAtDistance,64, 64 );

		var mat = new THREE.ShaderMaterial({
		  uniforms:{
			  mouseX: {type: 'f', value: [0.5] }  ,
			  mouseY: {type: 'f', value: [0.5] }  ,
			  amount: {type: 'f', value: [0.3] }  ,
			  count: {type: 'f', value: [10.0] }  ,
			  resolution : {type: "v2", value: new THREE.Vector2( res, res )},
		      tex0: {type:"t", value: randBG},
		  },
		  vertexShader:[
"precision highp float;",
"precision highp int;",
"varying vec2 vUv;",
"void main() {",
"  vUv = uv;",
"  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);",
"}"			  
		  
].join( "\n" ),
		  fragmentShader: [
"precision mediump float;",
"varying vec2 vUv;",
"uniform sampler2D tex0;",
"uniform vec2 resolution;",
"uniform float amount;",
"uniform float count;",
"uniform float mouseX;",
"uniform float mouseY;",
"void main() {",
"	float amt = amount; // the amount of displacement, higher is more",
"	float squares = count; // the number of squares to render vertically",
"  float aspect = resolution.x / resolution.y;",
"  float offset = amt * mouseY;",
"  vec2 uv = vUv;",
"  uv.y =  uv.y + mouseY;",
"  vec2 tc = uv;",
"  uv -= 0.5;",
"  uv.x *= aspect ;",
"  vec2 tile = fract(uv * squares + 0.5) * amt;",
"  vec4 tex = texture2D(tex0, tc + tile - offset - mouseX);",
"  gl_FragColor = tex;",
"}"			  
		  ].join( "\n" ),
		});
		var plane2 = new THREE.Mesh( geometry, mat );
		plane2.name = 'plane2';
		plane2.position.z = planeZ;
		plane2.castShadow = false;
		plane2.receiveShadow = true;
		group7.add(plane2);
		removeableItems.push(plane2);
		group7.position.z=100;
		$plane2 = group7.getObjectByName('plane2');
		
	}
	if(g === 'group8'){
		group8.position.z = 900;
		textureIndex = Math.floor(Math.random() * backgrounds.length);
		if(textureIndex === 1){
			textureIndex = 0;
		}
		imageSource = backgrounds[textureIndex];
		createPixelData(imageSource);
		
		/*var geometry = new THREE.PlaneBufferGeometry( 2, 2, 16 );
		for ( var i = 0; i < loadedBackgrounds.length; i ++ ) {
			var material = new THREE.MeshBasicMaterial( { color: 0xffffff, map: loadedBackgrounds[i] ,refractionRatio: 0.95, transparent: true, opacity: 0 } );
			material.side = THREE.DoubleSide;
		
			var mesh = new THREE.Mesh( geometry, material);
		
			mesh.position.x = Math.random() * 15 - 7.6;
			mesh.position.y = Math.random() * 15 - 7.6;
			mesh.position.y = Math.random() * 10 - 5;
			mesh.scale.x = mesh.scale.y = mesh.scale.z = 1;
			randomPlanes.push(mesh);
			group8.add( mesh );
			removeableItems.push(mesh);
		
		}*/
		//wireframeBall2.position.set(0, 0,3);
		//group8.add(wireframeBall2);
		//removeableItems.push(wireframeBall2);
		//wireframeBall2.name = 'wireframeBall2';
		//$wireframeBall2 = group8.getObjectByName('wireframeBall2');
		
		
	}
	if(g === 'group9'){
		group9.position.z = 400;
		/*objects = [];
		var geo = new THREE.SphereBufferGeometry( 1, 60, 60 );
		var xgrid = 8,
			ygrid = 8,
			zgrid = 8;
		nobjects = xgrid * ygrid * zgrid;
		var randBG = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
		var material = new THREE.MeshBasicMaterial( {map: randBG, wireframe: false, transparent: true, opacity: 1} );

		var s = 1;
		var count = 0;
		for ( i = 0; i < xgrid; i ++ ){
			for ( j = 0; j < ygrid; j ++ ){
				for ( k = 0; k < zgrid; k ++ ) {
					var mesh;
					mesh = new THREE.Mesh( geo, material );

					x = 6 * ( i - xgrid / 2 );
					y = 6 * ( j - ygrid / 2 );
					z = 6 * ( k - zgrid / 2 );
					mesh.position.set( x, y, z );
					mesh.scale.set( s, s, s );
					mesh.matrixAutoUpdate = false;
					mesh.updateMatrix();
					removeableItems.push(mesh);
					group9.add( mesh );
					objects.push( mesh );
					count ++;
				}
			}
		}*/
		var randCube = loadedCubes[Math.floor(Math.random() * loadedCubes.length)];
		var randColor = colors[Math.floor(Math.random() * colors.length)];

		var skyshader = THREE.ShaderLib[ "cube" ];
		skyshader.uniforms[ "tCube" ].value = randCube;
		
		var skymaterial = new THREE.ShaderMaterial( {
		
		  fragmentShader: skyshader.fragmentShader,
		  vertexShader: skyshader.vertexShader,
		  uniforms: skyshader.uniforms,
		  depthWrite: false,
		  side: THREE.BackSide
		
		} );
		

		var uniforms = {
		    color: {
		      type: "c",
		      value: new THREE.Color(randColor),
		    },
		    envMap: {
		      type: "t",
		      value: randCube
		    },
		    fresnelBias: {
		      type: "f",
		      value: 0.5,
		      min: 0.0, // only used for dat.gui, not needed for production
		      max: 1.0 // only used for dat.gui, not needed for production
		    },
		    fresnelScale: {
		      type: "f",
		      value: 0.5,
		      min: 0.0, // only used for dat.gui, not needed for production
		      max: 10.0 // only used for dat.gui, not needed for production
		    },
		    fresnelPower: {
		      type: 'f',
		      value: 0.5,
		      min: 0.0, // only used for dat.gui, not needed for production
		      max: 10.0 // only used for dat.gui, not needed for production
		    }
		};

		material = new THREE.ShaderMaterial(
		    {
		      uniforms : uniforms,
		      vertexShader : [
"uniform float fresnelBias;",
"uniform float fresnelScale;",
"uniform float fresnelPower;",
"varying float vReflectionFactor;",
"varying vec3 vI;",
"varying vec3 vWorldNormal;",
"void main() {",
"  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
"  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",
"  vWorldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );",
"  vI = worldPosition.xyz - cameraPosition;",
"  vReflectionFactor = fresnelBias + fresnelScale * pow( 1.0 + dot( normalize( vI ), vWorldNormal ), fresnelPower );",
"  gl_Position = projectionMatrix * mvPosition;",
"}"			
		 ].join( "\n" ),
		      fragmentShader : [
			      "uniform vec3 color;",
"uniform samplerCube envMap;",
"varying float vReflectionFactor;",
"varying vec3 vI;",
"varying vec3 vWorldNormal;",
"void main() {",
"  vec3 reflection = reflect( vI, vWorldNormal );",
"  vec4 envColor = textureCube( envMap, vec3( -reflection.x, reflection.yz ) );",
"  gl_FragColor = vec4(mix(color, envColor.xyz, vec3(clamp( vReflectionFactor, 0.0, 1.0 ))), 1.0);",
"}"
		       ].join( "\n" )
		    });
		
		var geometry = new THREE.BoxGeometry(4, 4, 4);
		// material = new THREE.MeshBasicMaterial();
		mesh = new THREE.Mesh(geometry, material);
		group9.add(mesh);	
		removeableItems.push(mesh);
		mesh.name = 'mirror';
		$mirror = group9.getObjectByName('mirror');

		mesh2 = new THREE.Mesh(geometry, material);
		group9.add(mesh2);	
		removeableItems.push(mesh2);
		mesh2.name = 'mirror2';
		$mirror2 = group9.getObjectByName('mirror2');
			

		mesh3 = new THREE.Mesh(geometry, material);
		group9.add(mesh3);	
		removeableItems.push(mesh3);
		mesh3.name = 'mirror3';
		$mirror3 = group9.getObjectByName('mirror3');


		mesh4 = new THREE.Mesh(geometry, material);
		group9.add(mesh4);	
		removeableItems.push(mesh4);
		mesh4.name = 'mirror4';
		$mirror4 = group9.getObjectByName('mirror4');			
	}
	if(g === 'group10'){
		var cameraZ = camera.position.z;
		var planeZ = 0;
		var distance = cameraZ - planeZ;
		var aspect = wW / wH;
		var vFov = camera.fov * Math.PI / 180;
		var planeHeightAtDistance = 2 * Math.tan(vFov / 2) * distance;
		var planeWidthAtDistance = planeHeightAtDistance * aspect;	
		if($portrait){
			size = planeHeightAtDistance;
			tWidth = wH;
		} else{
			size = planeWidthAtDistance;
			tWidth = wW;
		}
		var plane = new THREE.PlaneBufferGeometry( size, size );
		var randBG = loadedMasks[Math.floor(Math.random() * loadedMasks.length)];
		randBG.wrapS = THREE.RepeatWrapping;
		randBG.wrapT = THREE.RepeatWrapping;
		randBG.repeat.set( 1, 1 );		
		var randColor1 = colors[Math.floor(Math.random() * colors.length)];
		var randColor2 = colors[Math.floor(Math.random() * colors.length)];
		var randColor3 = colors[Math.floor(Math.random() * colors.length)];
		
		fire = new THREE.Fire( plane, {
			textureWidth: tWidth,
			textureHeight: tWidth,
			debug: false
		} );
		fire.color1.set( 0x000000 );
		fire.color2.set( randColor2 );
		fire.color3.set( randColor3 );
		fire.colorBias = 0.5;
		fire.burnRate = 10.0;
		fire.diffuse = 1.0;
		fire.viscosity = 0.0;
		fire.expansion = -1.0;
		fire.swirl = 0.0;
		fire.drag = 0.0;
		fire.airSpeed = 0.0;	
		fire.oneOverWidth = 0;
		fire.windVector.y = 0;

		fire.speed = 40.0;
		
		fire.setSourceMap( randBG );
		group10.position.z = 100;
		group10.add( fire );		
	}
	ready3 = true;
}
function createPixelData(source) {
  var image = document.createElement("img");
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  
  image.crossOrigin = "Anonymous";
  image.onload = function() {
    image.width = canvas.width = imageWidth;
    image.height = canvas.height = imageHeight;
    
    //context.fillStyle = context.createPattern(image, 'no-repeat');
    //context.fillRect(0, 0, imageWidth, imageHeight);
    context.drawImage(image, 0, 0, imageWidth, imageHeight);
    
    imageData = context.getImageData(0, 0, imageWidth, imageHeight).data;

    createPaticles(source);
    //tick();
  };

  image.src = source;
}
function createPaticles() {
  var colors = [];
  var weights = [0.2126, 0.7152, 0.0722];
  var c = 0;

  var geometry, material;
  var x, y;
  var zRange = 30;

  /*geometry = new THREE.BufferGeometry();
  geometry.dynamic = false;
  //geometry.position.needsUpdate = true;;

  x = imageWidth * -0.5;
  y = imageHeight * 0.5;

		var randBG = loadedMasks[Math.floor(Math.random() * loadedMasks.length)];
*/
var geometry = new THREE.Geometry();
 //geometry.addAttribute( 'position', new THREE.BufferAttribute( colors, 3 ) );
// geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
  x = imageWidth * -0.5;
  y = imageHeight * 0.5;
var randColor = colors[Math.floor(Math.random() * colors.length)];
  var tloader = new THREE.TextureLoader();
   shaderAttributes = {
	  vertexColor: {
      type: "c",
      value: []
    },	      
  };
  shaderUniforms = {
   vertexColor: {
      type: "c",
      value: new THREE.Color(randColor)
    },	   
    amplitude: {
      type: "f",
      value: 0.5
    },
   tex0: {type:"t", value: loadedBackgrounds[textureIndex]},
  };

  var shaderMaterial = new THREE.ShaderMaterial({
    uniforms: shaderUniforms,
    vertexShader:[
"uniform float amplitude;",
"uniform vec3 vertexColor;",
"varying vec4 varColor;",
"void main(){",
"varColor = vec4(vertexColor, 1.0);",
"vec4 pos = vec4(position, 1.0);",
"pos.z *= amplitude;",
"vec4 mvPosition = modelViewMatrix * pos;",
"gl_PointSize = 1.0;",
"gl_Position = projectionMatrix * mvPosition;",
"}"	    
    ].join( "\n" )   ,
    fragmentShader: [
    "varying vec4 varColor;",
"void main(){",
"gl_FragColor = varColor;",
"}"
 ].join( "\n" ) 
  })

  for (var i = 0; i < imageHeight; i++) {
    for (var j = 0; j < imageWidth; j++) {
      var color = new THREE.Color();

      color.setRGB(imageData[c] / 255, imageData[c + 1] / 255, imageData[c + 2] / 255);
      //var randColor = colors[Math.floor(Math.random() * colors.length)];
					//$plane2.material.color = new THREE.Color(randColor);
     //shaderUniforms.vertexColor.value = new THREE.Color(randColor);
     // console.log(color);

      var weight = color.r * weights[0] +
        color.g * weights[1] +
        color.b * weights[2];

      var vertex = new THREE.Vector3();

      vertex.x = x;
      vertex.y = y;
      //vertex.color = randColor;
      vertex.z = (zRange * -0.5) + (zRange * weight);
	  //geometry.addAttribute('color', new THREE.BufferAttribute(vertex, 3));
	 
      geometry.vertices.push(vertex);

      c += 4;
      x++;
    }

    x = imageWidth * -0.5;
    y--;
  }
 // geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
//geometry.computeVertexNormals() 
  particleSystem = new THREE.Points(geometry, shaderMaterial);
  particleSystem.material.uniforms.tex0.value.needsUpdate = true;
  group8.add(particleSystem);
  removeableItems.push(particleSystem);
}
function getHeightData(img,scale) {
  
 if (scale == undefined) scale=1;
  
    var canvas = document.createElement( 'canvas' );
    canvas.width = wW;
    canvas.height = wW;
    var context = canvas.getContext( '2d' );
 
    var size = wW * wW;
    var data = new Float32Array( size );
 
    context.drawImage(img,0,0);
 
    for ( var i = 0; i < size; i ++ ) {
        data[i] = 0
    }
 
    var imgd = context.getImageData(0, 0, wW, wW);
    var pix = imgd.data;
 
    var j=0;
    for (var i = 0; i<pix.length; i +=4) {
        var all = pix[i]+pix[i+1]+pix[i+2];
        data[j++] = all/(12*scale);
    }
     
    return data;
}
function generateTexture() {
	var canvas = document.createElement( 'canvas' );
	canvas.width = 2048;
	canvas.height = 2048;
	var context = canvas.getContext( '2d' );
	var color1 = "white",color2="black";
	var numberOfStripes = 2048/3;		
	for (var i=0;i<numberOfStripes;i++){
	  var thickness = 2048 / numberOfStripes;
	  context.beginPath();
	  context.strokeStyle = i % 2?color1:color2;
	  context.lineWidth =thickness;  
	  
	   context.moveTo(i*thickness + thickness/2,0);
	  context.lineTo(i*thickness+thickness/2, 2048);
	  context.stroke();
	}
	return canvas;
}
function generateTexture3() {
	var canvas = document.createElement( 'canvas' );
	canvas.width = 2048;
	canvas.height = 2048;
	var context = canvas.getContext( '2d' );
	var color1 = "white",color2="black";
	var numberOfStripes = 2048/2;		
	for (var i=0;i<numberOfStripes;i++){
	  var thickness = 2048 / numberOfStripes;
	  context.beginPath();
	  context.strokeStyle = i % 2?color1:color2;
	  context.lineWidth =thickness;  
	  
	   context.moveTo(0,i*thickness + thickness/2);
	  context.lineTo(2048,i*thickness+thickness/2);
	  context.stroke();
	}
	return canvas;
}
function generateTexture2() {
	var canvas = document.createElement( 'canvas' );
	canvas.width = 2048;
	canvas.height = 2048;
	var context = canvas.getContext( '2d' );
	for ( i=2048 ; i > 10; i=i-10 ) {
	    context.beginPath();
	    context.arc(2048/2, 2048/2, i, 0,2 * Math.PI, false);
	    context.fillStyle = 'white';
	    context.fill()
	    context.lineWidth = 8;
	    context.strokeStyle = 'black';
	    context.stroke();
	}
	return canvas;
}
function createLight( color, alphaMap ) {
	var intensity = 5;
	var pointLight = new THREE.PointLight( color, intensity, 100 );
	pointLight.castShadow = true;
	pointLight.shadow.camera.near = .1;
	pointLight.shadow.camera.far = 100;
	pointLight.shadow.mapSize.height = 1024;
	pointLight.shadow.mapSize.width = 1024;
	pointLight.shadow.bias = - 0.00; // reduces self-shadowing on double-sided objects
	var texture = alphaMap;
	//texture.magFilter = THREE.NearestFilter;
	//texture.minFilter = THREE.NearestFilter;
	texture.repeat.x = - 1;
	texture.wrapT = THREE.RepeatWrapping;
	texture.wrapS = THREE.RepeatWrapping;
	//texture.repeat.set( 1, 1 );
	var geometry = new THREE.SphereBufferGeometry( .8, 32, 32 );
	var material = new THREE.MeshPhongMaterial( {
		side: THREE.DoubleSide,
		alphaMap: texture,
		shininess: 1,
		color: 0x000000,
		specular: 0xffffff,
		alphaTest: 0.5,
		transparent: true,
		opacity: 0
	} );
	var sphere = new THREE.Mesh( geometry, material );
	removeableItems.push(sphere);
	sphere.castShadow = true;
	sphere.receiveShadow = false;
	sphere.name = 'amap 2';
	pointLight.add( sphere );
	var distanceMaterial = new THREE.MeshDistanceMaterial( {
		alphaMap: material.alphaMap,
		alphaTest: material.alphaTest
	} );
	sphere.customDistanceMaterial = distanceMaterial;
	return pointLight;
}
function addPortal(){
	var randBG = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
	randBG.wrapT = THREE.RepeatWrapping;
	randBG.wrapS = THREE.RepeatWrapping;
		randBG.repeat.set(1,1 );

	//console.log('adding portal:'+randBG);
	var geometry = new THREE.SphereBufferGeometry( 1, 128, 128);
	//var geometry = new THREE.CircleGeometry( 1, 64);
	var material = new THREE.MeshStandardMaterial( { color: 0xffffff ,map:randBG,  refractionRatio: 0.1, transparent: true, roughness: 1, alphaTest: 0.5, opacity: 0 } );
	material.side = THREE.DoubleSide;
	material.wrapS = material.wrapT = THREE.MirroredRepeatWrapping;
	var portalMesh = new THREE.Mesh( geometry, material);
	removeableItems.push(portalMesh);
	portalMesh.position.z = -2;
	portalMesh.geometry.needsUpdate = true;
	portalMesh.material.needsUpdate = true;
	portalMesh.name = 'portalMesh';
	group1.add(portalMesh);		
	$portal = group1.getObjectByName('portalMesh');
}
function makeWireframe(mesh,  bassFr, treFr, ampl) {
    mesh.geometry.vertices.forEach(function (vertex, i) {
        var offset = mesh.geometry.parameters.radius;
        var amp = ampl/40;
        var time = window.performance.now();
        vertex.normalize();
        var rf = 0.0001;
        var distance = (offset + bassFr ) + noise2.noise3D(vertex.x + time *rf*7, vertex.y +  time*rf*8, vertex.z + time*rf*9) * amp * treFr;
        vertex.multiplyScalar(distance);
    });
   mesh.geometry.verticesNeedUpdate = true;
   mesh.geometry.normalsNeedUpdate = true;
    mesh.geometry.computeVertexNormals();
    mesh.geometry.computeFaceNormals();


}
function makeWaveform(data){
 // Draw the time domain chart.
  for (var i = 0; i < this.analyser.frequencyBinCount; i++) {
    var value = this.times[i];
    var percent = value / 256;
    var height = HEIGHT * percent;
    var offset = HEIGHT - height - 1;
    var barWidth = WIDTH/this.analyser.frequencyBinCount;
    drawContext.fillStyle = 'white';
    drawContext.fillRect(i * barWidth, offset, 1, 2);
  }
}
function draw() {
	requestAnimationFrame(draw);
	shaderTime += .01
	//staticPass.uniforms[ 'time' ].value =  shaderTime;	
	if(!holding){
		$done = false;
		colorify.uniforms['opacity'].value = 0;	
		TweenMax.to(badTVPass.uniforms[ 'distortion' ], 1, {value: 0});
		TweenMax.to(badTVPass.uniforms[ 'speed' ], 1, {value: 0});
		TweenMax.to(badTVPass.uniforms[ 'time' ], 1, {value: 0});
		TweenMax.to(badTVPass.uniforms[ 'distortion2' ], 1, {value: 0});

		badTVPass.uniforms[ 'speed' ].value = 0;
		badTVPass.uniforms[ 'rollSpeed' ].value = 0;

		TweenMax.to(ticker.position, 0, {delay: 1, z: 0});
		TweenMax.to($mainSpot, .25, {delay: 0.5, intensity: 1});
		afterimagePass.uniforms.damp.value = 0.92;
		//staticPass.uniforms[ 'amount' ].value = 0.2;
		$switch = true;
		oldMax = 0;
		if (switcher) window.clearTimeout(switcher);
		volumetericLightShaderUniforms.exposure.value = 0;

	}
		if($spin){
			ticker.rotation.x += .15;
			//ticker.rotation.y += .05;
			//ticker.position.z += .01;
		} else{
			ticker.rotation.x = 0;
			ticker.rotation.y = 0;
		}	
	if(ready && ready3 && ready2){
		if(holding){
			$spin = false;
			playing = true;
			analyser.getFrequencyData(dataArray);
			makeWaveform(dataArray)
			lowerHalfArray = dataArray.slice(0, (dataArray.length/2) - 1);
			upperHalfArray = dataArray.slice((dataArray.length/2) - 1, dataArray.length - 1);
			overallAvg = avg(dataArray);
			lowerAvg = avg(lowerHalfArray);
			upperMax = max(upperHalfArray);
			upperMaxFr = upperMax / upperHalfArray.length;
			TweenMax.to(hueSat.uniforms['hue'], 5, { value:overallAvg/10});
			//TweenMax.to(ticker.position, .5, {delay: 0, z: 10});
			TweenMax.to(ticker.position, 0, {z: 100});
			if(!sound.isPlaying){
				sound.play();
			}
			//sound.setVolume(1);
			//TweenMax.to(sound, .2, { setPlaybackRate:1, setVolume:1, onComplete: function(){
			//	console.log('sound should be playing');
			//}});
			$('.output#time').html(timeOutput);
			$('.output#data').html(parseFloat(overallAvg).toFixed(4)+'<br />'+parseFloat(lowerAvg).toFixed(4))
			$('.output#coords').html('['+mX+','+ mY+']')
			$('.output#loop').html(parseFloat($loopLength)+'<br />'+parseFloat($loopDur).toFixed(2));
			//staticPass.uniforms[ 'amount' ].value = 0.09;
		} 
		if(showGroup === 'group1'){
			if(holding){
				group1.position.z = 6;
				$portal.material.opacity = 1;
				
				$wireframeBall.material.uniforms[ 'time' ].value = .0006 * ( Date.now() - start );
				//$wireframeBall.rotation.y += 0.001;
				TweenMax.to($wireframeBall.material.uniforms[ 'weight' ], 1, {value: Math.min(8,overallAvg/1.5)});
				$wireframeBall.rotation.y = (mX - (wW/2))/wW;
				$wireframeBall.rotation.x = (mY - (wH/2))/wH;
				$portal.rotation.y += ((mX - (wW/2))/wW)* .05;
				$portal.rotation.x += ((mY - (wH/2))/wH)* .05;
				//$portal.material.map.offset.x = (mX - (wW/2))/wW;
				//$portal.material.map.offset.y = (mY - (wH/2))/wH;
				//TweenMax.to($portal.position, 1, {z: overallAvg/30 * -.5, x: 0, y: 0});
				//switchBG += overallAvg;
				/*if(upperMaxFr !== oldMax && $switch){
					switchBG = 0;
					var randBG = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
					randBG.wrapT = THREE.RepeatWrapping;
					randBG.wrapS = THREE.RepeatWrapping;
					randBG.repeat.set( 10, 5 );

					$portal.material.map = randBG;
					$switch = false;
					oldMax = upperMaxFr;
					if (switcher) window.clearTimeout(switcher);
					switcher = window.setTimeout(function(){
						$switch = true;
					},500);
				}	*/			
			    

			} else{
				group1.position.z = 100;

			}
		} 
		if(showGroup === 'group2'){
			if(holding){
				//afterimagePass.uniforms.damp.value = .9 - overallAvg/500;

				group2.position.z=0;
				//TweenMax.to(group2.position, .2, {z: 0});
				//$plane1.rotation.z += ((mX - (wW/2))/wW * 1.5)*.015;
				$plane2.rotation.z += ((mX - (wW/2))/wW * 1.5)*-.005;
				$plane3.rotation.z -= ((mX - (wW/2))/wW * 1.5)*.005;
 				TweenMax.to($plane3.position, .6, {z:  overallAvg/500});
 				TweenMax.to($plane2.position, .5, {z:   overallAvg/400});
 				TweenMax.to($plane1.position, 1, {z:  overallAvg/300});
 				TweenMax.to(offset, .6, {upper: overallAvg/10, lower: lowerAvg/10});
				rate += overallAvg/5000;
				if(upperMaxFr !== oldMax && $switch){
					switchBG = 0;
					/*var randBG = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
					randBG.wrapS = THREE.RepeatWrapping;
					randBG.wrapT = THREE.RepeatWrapping;
					randBG.repeat.set( 1, 1 );*/

					//$plane1.material.map = randBG;
					$switch = false;
					var randColor = colors[Math.floor(Math.random() * colors.length)];
					$plane2.material.color = new THREE.Color(randColor);
					var randColor = colors[Math.floor(Math.random() * colors.length)];
					$plane3.material.color = new THREE.Color(randColor);

					oldMax = upperMaxFr;
					if (switcher) window.clearTimeout(switcher);
					switcher = window.setTimeout(function(){
						$switch = true;
					},500);
				}	
				adjustMeshPlaneVertices(Math.max(1, offset['upper']), Math.max(1, offset['lower']), rate);
			} else{
				group2.position.z=100;


			}
		} 
		if(showGroup === 'group3'){
			if(holding){
				//afterimagePass.uniforms.damp.value = 1 - overallAvg/100;
				$mainSpot.intensity = 0.05;
				group3.position.z = 0;
				TweenMax.to(group3.position, .2, {z: 0});
				$pointLight.traverse(function(obj) {
				  if (obj.name && obj.name.includes('amap')) {
				   	obj.material.alphaMap.offset.y += 0.0003;
				    obj.material.opacity = 1;
				    
				  }
				});
			  	$pointLight.rotation.y -= ((mX - (wW/2))/wW * 1.5)*-.025;
			  	$pointLight.rotation.x += ((mY - (wH/2))/wH * 1.5)*.015;
				/*if(upperMaxFr !== oldMax && $switch){
					switchBG = 0;
					var randBG = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
					randBG.wrapS = THREE.RepeatWrapping;
					randBG.wrapT = THREE.RepeatWrapping;
					randBG.repeat.set( 1, 1 );

					$room.material.map = randBG;
					$switch = false;
					oldMax = upperMaxFr;
					if (switcher) window.clearTimeout(switcher);
					switcher = window.setTimeout(function(){
						$switch = true;
					},500);
				}	*/			
				//$room.rotation.y = ((mX - (wW/2))/wW * 1.5)*-2;				
				//$room.rotation.x = ((mY - (wH/2))/wH * 1.5)*2;
				//$pointLight.position.z = 5 + ((mY - (wH/2))/wH * 1.5)*10;			
				//$room.position.z = 3 + ((mY - (wH/2))/wH * 1.5)*10;			
				//$room.material.opacity = 1;
				TweenMax.to($pointLight, .8, {intensity: overallAvg/9});
			} else{
				group3.position.z = 100;
				$pointLight.intensity = 0;

			}
		} 
		if(showGroup === 'group4'){
			if(holding){
				//$mainSpot.position.y = 20;
				//$mainSpot.position.x = 20;
				group4.position.z = -10;
				//afterimagePass.uniforms.damp.value = 0;
				//$god.rotation.x += 0.001;
				volumetericLightShaderUniforms.exposure.value = .9;
				TweenMax.to(volumetericLightShaderUniforms.samples, .8, {value: Math.max(0,120 - overallAvg)});
				//volumetericLightShaderUniforms.decay.value = upperAvgFr/6;

				if(upperMaxFr !== oldMax && $switch){
					switchBG = 0;
					var randColor = colors[Math.floor(Math.random() * colors.length)];
					$god.material.specular = new THREE.Color(randColor);
					//$god.material.needsUpdate = true;
					group4.traverse(function(obj) {
					  if (obj.name && obj.name.includes('lightSphere')) {
					  	obj.material.color = new THREE.Color(randColor);
						obj.material.needsUpdate = true;
					  	
					  }
					 });
					var randBG = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
					randBG.wrapS = THREE.RepeatWrapping;
					randBG.wrapT = THREE.RepeatWrapping;
					randBG.blending = THREE.SubtractiveBlending;

					randBG.repeat.set( 20, 10 );		
					var randColor = colors[Math.floor(Math.random() * colors.length)];
					$orbLayer.material.color = new THREE.Color(randColor);
					$orbLayer.material.map = randBG;
					$orbLayer.material.needsUpdate = true;
					$switch = false;
					oldMax = upperMaxFr;
					if (switcher) window.clearTimeout(switcher);
					switcher = window.setTimeout(function(){
						$switch = true;
					},500);
				}				
				//var time = performance.now() * 0.001;
				  	$orbLayer.material.map.offset.x -= ((mX - (wW/2))/wW * 1.5)*.09;
				  	$orbLayer.material.map.offset.y += ((mY - (wH/2))/wH * 1.5)*.05;
				  	//orbScale = 1 - overallAvg/1000;
				  	//$orbLayer.scale.set(orbScale,orbScale,orbScale);
				  	//$god.scale.set(orbScale,orbScale,orbScale);

				$god.traverse(function(obj) {
				  if (obj.name && obj.name.includes('spheremesh')) {
				  	obj.material.alphaMap.offset.x -= ((mX - (wW/2))/wW * 1.5)*.005;
				  	obj.material.alphaMap.offset.y += ((mY - (wH/2))/wH * 1.5)*.005;
				    //obj.material.alphaMap.offset.y = mY * 0.001;
				    //obj.material.alphaMap.offset.x = mX * 0.001;
				    //obj.material.alphaMap.offset.x = Math.sin( time * 0.002 ) * 7 + 5;
				  }
				});			
			} else{
				group4.position.z = 100;
				$orbLayer.material.map.offset.x = 0;
			  	$orbLayer.material.map.offset.y = 0;
				//volumetericLightShaderUniforms.exposure.value = 0;
				
				//colorify.uniforms['opacity'].value = 0;

			}

		}
		if(showGroup === 'group5'){
			if(holding){
				TweenMax.to($plane2.material.uniforms.amt, 2, {value: overallAvg/800});
				group5.position.z = 0;
				if(upperMaxFr !== oldMax && $switch){
					switchBG = 0;
					/*var randBG = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
					randBG.wrapT = THREE.RepeatWrapping;
					randBG.wrapS = THREE.RepeatWrapping;
					randBG.repeat.set( 1, 1 );*/

					//$plane2.material.uniforms.tex1.value = randBG;
					var randMask = loadedMasks[Math.floor(Math.random() * loadedMasks.length)];
					randMask.wrapT = THREE.RepeatWrapping;
					randMask.wrapS = THREE.RepeatWrapping;
					randMask.repeat.set( 1, 1 );

					$plane2.material.uniforms.tex0.value = randMask;
					$switch = false;

					var randColor = colors[Math.floor(Math.random() * colors.length)];
					$plane1.material.color = new THREE.Color(randColor);
					oldMax = upperMaxFr;
					if (switcher) window.clearTimeout(switcher);
					switcher = window.setTimeout(function(){
						$switch = true;
					},500);
				}		
			} else{
				group5.position.z = 100;

			}		
		} 
		if(showGroup === 'group6'){
			if(holding){
				TweenMax.to(badTVPass.uniforms[ 'distortion' ], 2, {value: overallAvg/60});
				TweenMax.to(badTVPass.uniforms[ 'speed' ], 3, {value: overallAvg/100 * -.25});
				TweenMax.to(badTVPass.uniforms[ 'distortion2' ], 2, {value: overallAvg/150});
				//TweenMax.to(badTVPass.uniforms[ 'time' ], 4, {value: overallAvg});
				btime += overallAvg/5000;
				//badTVPass.uniforms[ 'time' ].value = .8;
				//badTVPass.uniforms[ 'rollSpeed' ].value = ((mY - (wH/2))/wH)*1;
				group6.position.z = 0;
				badTVPass.uniforms[ 'time' ].value = btime;
				$feedback.material.uniforms.mx.value = (mX / wW)*2 -.5;
				//TweenMax.to($feedback.position, 2, {z: -5 - lowerAvg/20});
				$feedback.material.uniforms.time.value = btime/2;
				TweenMax.to($feedback.material.uniforms.my, 2, {value: overallAvg/300});
				//group6.rotation.y = (mX - (wW/2))/wW;
				//group6.rotation.x = (mY - (wH/2))/wH;
				if(upperMaxFr !== oldMax && $switch){
					switchBG = 0;
					var randBG = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
					randBG.wrapT = THREE.RepeatWrapping;
					randBG.wrapS = THREE.RepeatWrapping;
					randBG.repeat.set( 1, 1 );
					$feedback.material.uniforms.texture1.value = randBG;

					$switch = false;
					oldMax = upperMaxFr;
					if (switcher) window.clearTimeout(switcher);
					switcher = window.setTimeout(function(){
						$switch = true;
					},1000);
				}	
			} else{
				btime = 0;
				group6.position.z = 100;
				
			}
		}	
		if(showGroup === 'group7'){
			if(holding){
				group7.position.z=0;
				$plane2.material.uniforms.mouseX.value = ((mX - (wW/2))/wW)*.5;
				$plane2.material.uniforms.mouseY.value = ((mY - (wH/2))/wH)*.5;
				TweenMax.to($plane2.material.uniforms.amount, 2, {value: .4 - overallAvg/100});
				TweenMax.to($plane2.material.uniforms.count, 4, {value: overallAvg/2});				
				if(upperMaxFr !== oldMax && $switch){
					switchBG = 0;
					var randBG = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
					randBG.wrapT = THREE.RepeatWrapping;
					randBG.wrapS = THREE.RepeatWrapping;
					randBG.repeat.set( 1, 1 );
					$plane2.material.uniforms.tex0.value = randBG;
					$switch = false;
					oldMax = upperMaxFr;
					if (switcher) window.clearTimeout(switcher);
					switcher = window.setTimeout(function(){
						$switch = true;
					},800);
				}	
			} else{
				group7.position.z=100;	
			}
		}
		if(showGroup === 'group8'){
			if(holding){
				//afterimagePass.uniforms.damp.value = 1;
				group8.position.z = -800 - ((mY - (wH/2))/wH)*-800;
				//group8.position.z = -800 - overallAvg;
				//TweenMax.to(group8.position, 1, {z:  (-800 - overallAvg)});
	
				//group8.position.z = 0;
				group8.rotation.x = Math.PI * -.45 + ((mY - (wH/2))/wH)*5;
				//group8.rotation.x +=overallAvg/1800;
				//group8.rotation.x = Math.PI * .5;
				//group8.rotation.z = Math.PI * -.25;
				//group8.rotation.y = Math.PI * -.35;
				group8.rotation.z =  ((mX - (wW/2))/wW)*5;
				//group8.rotation.z +=overallAvg/2200;
				//group8.rotation.y = ((mY - (wH/2))/wH)*5;
				TweenMax.to(shaderUniforms.amplitude, .8, {value:  (upperMax - overallAvg/2 - lowerAvg)});
							
				//animationTime += animationDelta;
				colorify.uniforms['opacity'].value = 1;	
				//ampl = Math.min(90,(overallAvg) + 255-lowerMax);
				//makeWireframe($wireframeBall, modulate(overallAvg, .3, 6, 4, .4), modulate((overallAvg/2)/5, 0, 5, .3, 2), ampl);
				//makeWireframe($wireframeBall, modulate(overallAvg, .3, 6, 4, .4), modulate((overallAvg), 0, 5, .3, .2), ampl);
				  	//$wireframeBall.rotation.y -= ((mX - (wW/2))/wW * 1.5)*.005;
				  	//$wireframeBall.rotation.x += ((mY - (wH/2))/wH * 1.5)*.005;	

					if(overallAvg !== oldMax && $switch){
						switchBG = 0;
						var randColor = colors[Math.floor(Math.random() * colors.length)];
						colorify.uniforms['color'].value = new THREE.Color( randColor );
					
						

						//textureIndex = Math.floor(Math.random() * backgrounds.length);
						//imageSource = backgrounds[textureIndex];
						//createPixelData(imageSource);
							
						oldMax = overallAvg;
						//console.log('switch');
						$switch = false;
						if (switcher) window.clearTimeout(switcher);
						switcher = window.setTimeout(function(){
							$switch = true;
						},800);
					}
					//shaderUniforms.amplitude.value = Math.sin(animationTime);						
			} else{
				
				group8.position.z = 900;
			}
		}
		if(showGroup === 'group9'){
			if(holding){
				group9.position.z = 0;
				/*time = Date.now() * 0.00005;
				for ( i = 0; i < nobjects; i ++ ) {
					TweenMax.to(objects[ i ].scale, 1, {x: 0.05 + overallAvg/50,y: 0.05 + overallAvg/50,z: 0.05 + overallAvg/50});
					objects[i].updateMatrix();
					//console.log(h);
					
				}
				group9.rotation.y = (mX - (wW/2))/wW;
				group9.rotation.x = (mY - (wH/2))/wH;
				group9.position.z = 0;*/
				//TweenMax.to(group9.position, 1.5, {z: overallAvg/4});
				TweenMax.to($mirror.scale, 2, {x: overallAvg/100, y: overallAvg/40, z: overallAvg/50});
				//TweenMax.to($mirror.position, 1.5, {z: overallAvg/10});
				$mirror.rotation.y -= .01 - ((mX - (wW/2))/wW * 1.5)*-.015;
			  	$mirror.rotation.x += .01 + ((mY - (wH/2))/wH * 1.5)*.005;	  	
			  	$mirror.rotation.z -= overallAvg/5000;
			
				TweenMax.to($mirror2.scale, 1, {x: overallAvg/40, y: overallAvg/60, z: overallAvg/80});
				//TweenMax.to($mirror2.position, 1.5, {z: overallAvg/15});
				$mirror2.rotation.y -= .005 - ((mX - (wW/2))/wW * 1.5)*.015;
			  	$mirror2.rotation.x += .005 + ((mY - (wH/2))/wH * 1.5)*-.005;	  	
			  	$mirror2.rotation.z += overallAvg/3000;

				TweenMax.to($mirror3.scale, 1.5, {x: overallAvg/100, y: overallAvg/50, z: overallAvg/70});
				//TweenMax.to($mirror3.position, 1.5, {z: overallAvg/20});
				$mirror3.rotation.y -= ((mX - (wW/2))/wW * 1.5)*.02;
			  	$mirror3.rotation.x += ((mY - (wH/2))/wH * 1.5)*.008;	  	
			  	$mirror3.rotation.z += overallAvg/5000;

				TweenMax.to($mirror4.scale, 2, {x: overallAvg/100, y: overallAvg/30, z: overallAvg/100});
				//TweenMax.to($mirror4.position, 1.5, {z: overallAvg/12});
				$mirror4.rotation.y -= ((mX - (wW/2))/wW * 2)*-.02;
			  	$mirror4.rotation.x += ((mY - (wH/2))/wH * 2)*-.008;	  	
			  	$mirror4.rotation.z -= overallAvg/4000;

			} else{
				group9.position.z = 900;
			}
		}
		if(showGroup === 'group10'){
			if(holding){
				group10.position.z = 0;

				fire.windVector.x = (mX - (wW/2))/wW * 5;
				fire.windVector.y = (mY - (wH/2))/wH * -5;
				fire.airSpeed = overallAvg/3;
				fire.viscosity = overallAvg/100;
				fire.expansion = -1 + lowerAvg/50;
				fire.swirl = overallAvg/20;
				fire.drag = overallAvg/200;
				//fire.colorBias = overallAvg/100;
				if(overallAvg !== oldMax && $switch){
					switchBG = 0;
					var randColor1 = colors[Math.floor(Math.random() * colors.length)];
					var randColor2 = colors[Math.floor(Math.random() * colors.length)];
					var randColor3 = colors[Math.floor(Math.random() * colors.length)];
					//fire.color1.set( randColor1 );
					fire.color2.set( randColor2 );
					fire.color3.set( randColor3 );
					var randBG = loadedMasks[Math.floor(Math.random() * loadedMasks.length)];
					randBG.wrapT = THREE.RepeatWrapping;
					randBG.wrapS = THREE.RepeatWrapping;
					randBG.repeat.set( 1, 1 );
					fire.setSourceMap( randBG );

					oldMax = overallAvg;
					$switch = false;
					if (switcher) window.clearTimeout(switcher);
					switcher = window.setTimeout(function(){
						$switch = true;
					},2000);
				}

			} else{
				group10.position.z = 100;
				oldMax = overallAvg
			}
		}
	}
	
	camera.layers.set(OCCLUSION_LAYER);
    renderer.setClearColor(0x000000);	
    //renderer.autoClear = false;
    occlusionComposer.render();
    camera.layers.set(DEFAULT_LAYER);
	composer.render( this.renderer );
}
function adjustMeshPlaneVertices(offset1, offset2, rate) {
	for (var i = 0; i < $plane1.geometry.vertices.length; i++) {
		var vertex = $plane1.geometry.vertices[i];
		var x1 = vertex.x / offset1*.25;
		var y1 = vertex.y / offset1*.25;
		var noise3 =  simplex.noise2D(x1 + rate, y1) * 2; 
		vertex.z = noise3;
	}
	$plane1.geometry.verticesNeedUpdate = true;
	//$plane1.geometry.normalsNeedUpdate = true;
	$plane1.geometry.computeVertexNormals();
	$plane1.geometry.computeFaceNormals();
	for (var i = 0; i < $plane2.geometry.vertices.length; i++) {
		var vertex = $plane2.geometry.vertices[i];
		var x1 = vertex.x / offset1*-.3;
		var y1 = vertex.y / offset1*-.3;
		var noise3 =  simplex.noise2D(x1 + rate, y1) * -2.4; 
		vertex.z = noise3;
	}
	$plane2.geometry.verticesNeedUpdate = true;
	//$plane2.geometry.normalsNeedUpdate = true;
	$plane2.geometry.computeVertexNormals();
	$plane2.geometry.computeFaceNormals();
	for (var i = 0; i < $plane3.geometry.vertices.length; i++) {
		var vertex = $plane3.geometry.vertices[i];
		var x1 = vertex.x / offset1*.43;
		var y1 = vertex.y / offset1*.43;
		var noise3 =  simplex.noise2D(x1 + rate, y1 + rate) * -2.4; 
		vertex.z = noise3;
	}
	$plane3.geometry.verticesNeedUpdate = true;
	//$plane3.geometry.normalsNeedUpdate = true;
	$plane3.geometry.computeVertexNormals();
	$plane3.geometry.computeFaceNormals();	
}
function onWindowResize() {
	//console.log('resizing');
	wW = $(document).width();
	wH = $(document).height();
	if(wH > wW){
		$portrait = true;
	} else{
		$portrait = false;
	}
	if(wW < 1024){
		$mobile = true;
	} else{
		$mobile = false;
	}
	if(!$fallback){
		
		camera.updateProjectionMatrix();
		composer.setSize(wW, wH);
		renderer.setSize(wW, wH);
		
		if($drawMe){
			if($portrait){
				sizes = wH;
			} else{
				sizes = wW;
			}
			canvasTexture.width = sizes;
			canvasTexture.height = sizes;		
			textureContext = canvasTexture.getContext( '2d' );
			textureContext.fillStyle = "black";
			textureContext.fillRect(0, 0, sizes, sizes);
	
		}
	}
	
}
function mouseDown(mousex, mousey) { 
    //mouseUp();
	 if($first && ready4){
		loadLoop();	  
    }
	if(ready4){
	    $spin = true;
	    holding = true;
	   
	} 

    if(!playing && ready && ready2 && ready3){
		//$switch = true;

		playing = true;
		
		idleMouse();
	} 
    if (loopTimer) window.clearTimeout(loopTimer); 
    if (idleTimer) window.clearTimeout(idleTimer);
	if(holding && ready2 && $drawMe){
		startX = mousex;
		startY = mousey;
		drawMask(startX, startY,15,0,255,0, 1);
	}
    idleTimer = window.setTimeout(idleMouse,500);
}
function mouseMove(mousex, mousey) {
	if(!holding){
		movingMouse();
		
	} else{
	    if(!playing && ready && ready2 && ready3){
			//$switch = true;
			//console.log('test');
		    if(!sound.isPlaying){
				sound.play();
		    }
			playing = true;
			//idleMouse();
		} 		
	}
	mX = mousex;
	mY =  mousey;
	if(holding && $drawMe){
		var dis = Math.sqrt(Math.pow(startX-mX, 2)+Math.pow(startY-mY, 2));
		for (i=0;i<dis;i+=1) {
			var s = i/dis;
			drawMask(startX*s + mX*(1-s), startY*s + mY*(1-s),15,0,255,0,1);
		}
		startX = mX;
		startY = mY;  
	}
	if(!$mobile){
		$('.instruction').css({
			'top':mY,
			'left': mX
		})		
	} else{
		$('.instruction').css({
			'top':'50%',
			'left': '50%'
		})			
	}

}
function drawMask(x,y,w,r,g,b,a){
	if($portrait){
		y =  y;
		x =  (wH - wW)/2 + x;
	} else{
		x = x;
		y = (wW - wH)/2 + y;
	}	
	//y = (wW - wH)/2 + y;
    var gradient = textureContext.createRadialGradient(x, y, 0, x, y, w/4);
    gradient.addColorStop(0, 'rgba('+r+', '+g+', '+b+', '+a+')');
    //gradient.addColorStop(.5, 'rgba(0,100,0,1)');
    
	//gradient.addColorStop(.6, 'rgba('+r+', '+g+', '+b+', 0)');
    textureContext.beginPath();
    textureContext.arc(x, y, w/4, 0, 2 * Math.PI);
    textureContext.fillStyle = gradient;
    textureContext.fill();
    textureContext.closePath();
    //textureContext.filter = "blur(4px)";
    $plane1.material.alphaMap.needsUpdate = true;
};
function mouseUp() { 
    holding = false;

    if(playing && ready && ready2 && ready3){
	    if(sound.isPlaying){
			sound.pause();
	    }
		playing = true;
	} 
	movingMouse();
    ready2 = false;
    ready3 = false;
    $spin = false;
 
  
    if (loopTimer) window.clearTimeout(loopTimer); 
	if(!$first){
   		loopTimer = window.setTimeout(loadLoop,400);
	}
    if (idleTimer) window.clearTimeout(idleTimer); 
    idleTimer = window.setTimeout(movingMouse,600);
}
var scrollbar = Scrollbar.init($(document).find('.scroll')[0], {
	speed:.8,
	damping: 0.1,
	renderByPixels: true,
	syncCallbacks: true,
	continuousScrolling: false,
	alwaysShowTracks: false,
	overscrollEffect: false
});

function movingMouse(){
	$('body').removeClass('idle');
}
function idleMouse(){
	$('body').addClass('idle');
}
//$('body')[0].addEventListener("mousedown", mouseDown);
$(document).bind('mousemove', function(e){
    mouseMove(e.pageX, e.pageY);
});
$(document).bind('touchmove', function(e){
    var touch = e.originalEvent.touches[0];
    mouseMove(touch.pageX, touch.pageY);
});
$(document).bind('mousedown', function(e){
    mouseDown(e.pageX, e.pageY);
    e.preventDefault();
    //console.log('fuck you firefox');

});
$(document).bind('touchstart', function(e){
    var touch = e.originalEvent.touches[0];
    mouseDown(touch.pageX, touch.pageY);
});
$(document).bind('mouseup', function(e){
    mouseUp(e.pageX, e.pageY);
});
$(document).bind('touchend', function(e){
    var touch = e.originalEvent.changedTouches[0];
    mouseUp(touch.pageX, touch.pageY);
});
//document.body.addEventListener("mousemove", mouseMove);
//document.body.addEventListener("mouseup", mouseUp); 
//document.body.addEventListener("touchstart", mouseDown);
//document.body.addEventListener("touchend", mouseUp); 
$(window).resize(function(){
	if(!$fallback){
		windowResize.trigger();
	
	}
});
function fractionate(val, minVal, maxVal) {
    return (val - minVal)/(maxVal - minVal);
}
function modulate(val, minVal, maxVal, outMin, outMax) {
    var fr = fractionate(val, minVal, maxVal);
    var delta = outMax - outMin;
    return outMin + (fr * delta);
}
function avg(arr){
    var total = arr.reduce(function(sum, b) { return sum + b; });
    return (total / arr.length);
}
function max(arr){
    return arr.reduce(function(a, b){ return Math.max(a, b); })
}
function getAudioData(data) {
	var frequencyArray = splitFrenquencyArray(data, 3);
	for (var i = 0; i < frequencyArray.length; i++) {
		var average = 0;

		for (var j = 0; j < frequencyArray[i].length; j++) {
			average += frequencyArray[i][j];
		}
		audioData[i] = average / frequencyArray[i].length;
	}
	return audioData;
}
function splitFrenquencyArray(arr, n) {
	var tab = Object.keys(arr).map(function(key) {
		return arr[key];
	});
	var len = tab.length,
		result = [],
		i = 0;

	while (i < len) {
		var size = Math.ceil((len - i) / n--);
		result.push(tab.slice(i, i + size));
		i += size;
	}

	return result;
}
function randomString(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~!#$%&*_+-=?¿£€¥≠¢§ĦǼØÞßøł°Œ©Ⓟ';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
function shuffle(arr) {
    for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
}