backgrounds = [
	'/assets/images/test-4.jpg',
	'/assets/images/app2.jpg',
	'/assets/images/app-flowers-pink.jpg',
	'/assets/images/app-smudges-2.jpg',
];
masks =[
	'/assets/images/appn.jpg',
	//'/assets/images/app-photobooth.jpg',	
	'/assets/images/type-texture.png',
	'/assets/images/app-flower-mask.png',	
];
textTextures = [
	'/assets/images/type-texture.png',
	'/assets/images/app-flower-mask.png',	
];
snips = [
	'/assets/audio/loop-1.aac',
	'/assets/audio/loop-3.aac',
	'/assets/audio/loop-4.aac',
	'/assets/audio/loop-6.aac',
	'/assets/audio/loop-8.aac',
	'/assets/audio/loop-10.aac'	

//'/assets/audio/dawan.mp3'
];
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
	//'group9',
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

wW = window.innerWidth;
wH = window.innerHeight;
var scene, switcher, mouse, fire, upperAvgFr, upperMaxFr, lowerAvgFr, lowerMaxFr, upperAvg, upperMax, lowerAvg, lowerMax, overallAvg, deadline, $buff, loopTimer, listener, $track, textureContext, sphere_mesh,ambientLight, volumetericLightShaderUniforms, audioLoader, videoTexture, occlusionComposer, occlusionRenderTarget, occlusionBox, lightSphere, dartaArray, pointLight, $pointLight, idleTimer, $portal, textMesh, mouseTimer, portalMesh, portalrenderer, sound, camera, material, composer, analyser, dataArray, glitchPass, afterimagePass, renderPass, copyPass, rgbParams, rgbPass, filmParams, filmPass, renderPass, copyPass;
var DEFAULT_LAYER = 0, OCCLUSION_LAYER = 1, objects = [], randomPlanes = [], textureIndex = 0, $loopDur = 0, $loopLength = 0, renderScale = 0.5, ready4 = false, angle = 0, audioData = [], shaderTime = 0, btime = 0, fftSize = 512, $drawMe = false, ready3 = false, playing = false, ready = false, ready2 = false, holding = false, font2 = undefined, startX = wW/2, startY = wH/2, backgroundsLoaded = false, loadedBackgrounds = [], loadedMasks = [],removeableItems = [], loadedText = [], mX = 0, mY = 0, b = 0, d = 0, r= 0, $r = 0, $switch = true, oldMax = 0, shaderTime = 0, start = Date.now(), wifreframeBallColor = 0, switchBG = 0, switchColor = 0, rate = 0, time = 0, offset = { upper : 0,lower : 0}, showGroup = 'none', $g = 1, $first = true; timeOutput = '00:00:00:00';
var noise2 = new SimplexNoise(), simplex = new SimplexNoise(), manager = new THREE.LoadingManager(), loader = new THREE.TextureLoader(manager);
var shaderUniforms, shaderAttributes;

var particles = [];
var particleSystem;

var imageWidth = 1024/2;
var imageHeight = 1024/2;
var imageData = null;

var animationTime = 0;
var animationDelta = 0.03;
var loadChecker = setInterval(function(){
	if(backgroundsLoaded){
		clearInterval(loadChecker);
		ready4 = true;
	}
},100);
var $sequence = [];
init();
function init(){
	setupScene();
	loadBackgrounds(backgrounds[0]);
	setupTicker();
}
function randGroup(){
	ready3 = false;
	//rand = Math.floor(Math.random() * groups.length) + 1;
	//rand = 1;
	//showGroup = 'group'+rand;
	$scene = getUrlVars()["s"];
	if($scene){
	    if($scene <= groups.length){
			showGroup = 'group'+$scene;
			//console.log('target:'+ $scene);
		} else{
			showGroup = 'group1';
		}
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
		alpha: false 
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

	var hue = new THREE.ShaderPass(THREE.HueSaturationShader);
    //hue.enabled = true;
    //hue.uniforms.hue.value = 10;
	//hue.renderToScreen = false;
	//composer.addPass( hue );
	
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
	composer.addPass( staticPass );
		
	afterimagePass = new THREE.AfterimagePass();
	afterimagePass.renderToScreen = true;
	composer.addPass( afterimagePass );
	
	mouse = new THREE.Vector2();
	
	$('.scroll').append(renderer.domElement);

	
}
function loadBackgrounds(bg){
	var loader = new THREE.TextureLoader(manager)
	loader.load(bg, function (object) {
		loadedBackgrounds.push(object);
		//console.log('loaded background:'+object);
		if(loadedBackgrounds.length == backgrounds.length ){
			loadMasks(masks[0]);
		} else{
			b++
			if(b <= backgrounds.length){
				loadBackgrounds(backgrounds[b]);
			} else{
				loadMasks(masks[0]);
				
			}
		}
	});
}
function loadMasks(bg){
	var loader = new THREE.TextureLoader(manager)
	loader.load(bg, function (object) {
		loadedMasks.push(object);
		//console.log('loaded background:'+object);
		if(loadedMasks.length == masks.length ){
			loadTextTextures(textTextures[0]);
		} else{
			r++
			if(r <= masks.length){
				loadMasks(masks[r]);
			} else{
				loadTextTextures(textTextures[0]);
				
			}
		}
	});
}
function loadTextTextures(bg){
	var loader = new THREE.TextureLoader(manager)
	loader.load(bg, function (object) {
		loadedText.push(object);
		//console.log(textTextures.length + ' loaded text:'+object);
		if(loadedText.length == textTextures.length ){
			backgroundsLoaded = true;
		} else{
			d++
			if(d <= textTextures.length){
				loadTextTextures(textTextures[d]);
			} else{
				backgroundsLoaded = true;
			}
		}
	});
}
function setupTicker(){
	/* ticker stuff */
	ticker = new THREE.Group();
	var countDown = 'LP_5';
	deadline = "2019-03-22T12:00:00+00:00";
	var fontLoader = new THREE.FontLoader();
	var font = fontLoader.load( '/assets/fonts/Terminal Grotesque_Regular.json', function ( response ) {
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
textCreated = false;
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
	if(ready){
		countDown = 'LP_5.'+t.days+':' +''+ ('0' + t.hours).slice(-2) + ':' +''+ ('0' + t.minutes).slice(-2)+':' +''+ ('0' + t.seconds).slice(-2)+'';
	} else{
		countDown = '<!--loading-->';
	}
	timeOutput = t.days+':' +''+ ('0' + t.hours).slice(-2) + ':' +''+ ('0' + t.minutes).slice(-2)+':' +''+ ('0' + t.seconds).slice(-2);
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
	var textMaterial = new THREE.MeshStandardMaterial({color: 0xffffff});
	var textGeometry = new THREE.TextGeometry(countDown, {
		font: font2,
		size: wW/1000,
		height: .01,
		curveSegments: 4
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
		//console.log('theres a group');
		removeableItems.forEach(function(v,i) {
			if(v.material.length == 1){
				v.material.dispose();
			} else{
				for (var m = 0; m < v.material.length; m++) {
					v.material[m].dispose();
				}
			}
			v.geometry.dispose();
			//console.log('dispose: '+v);
			v = undefined;
		});
	    if(group.children.length > 0){
			//TweenMax.to(group.position, .2, {z: -100,onComplete: function(){
				for (var i = group.children.length - 1; i >= 0; i--) {
				    group.remove(group.children[i]);
					
				}
				//console.log('group removed, getting new group');
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
		sound.setVolume( 0);
		sound.offset = 0;
		
		$buff = buffer;
		$loopDur = $buff.duration; 
		$loopLength = $buff.length; 
		
		if(sound.isPlaying){
			//sound.pause();
		}
		
		//sound.context.resume();
		sound.playbackRate = .7;
		//sound.play();
		ready2 = true;
		playing = false;
		if($r > snips.length -1){
			$r = 0;
		}
	});		
}
function loadLoop(){
	if(playing){
		TweenMax.to(sound, .2, {setPlaybackRate:.7,setVolume:0, onComplete: function(){
			sound.pause();
			handleGroup();
		}});	
	} else{
		handleGroup();
	}
}
function createGroup(g){
	if(!$('#vidTexture')[0].paused){
		$('#vidTexture')[0].pause();
	}

	$drawMe = false;
	//console.log('creategroup:'+g);
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
		sizes = 8 * ratio;		
		//var box = new THREE.BoxBufferGeometry(sizes,sizes,sizes);
		var box = new THREE.SphereGeometry(sizes, 64, 64);
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
		var alphaMap = loadedText[Math.floor(Math.random() * loadedText.length)];
		var randColor1 = colors[Math.floor(Math.random() * colors.length)];
		pointLight = createLight( randColor1 , alphaMap);
		pointLight.name = 'innerLight';
		pointLight.position.z  = 3;
		group3.add( pointLight );		
		$pointLight = group3.getObjectByName('innerLight');
		var randColor = colors[Math.floor(Math.random() * colors.length)];
		colorify.uniforms['color'].value = new THREE.Color( randColor );

	}
	if(g === 'group4'){
		geometry = new THREE.SphereBufferGeometry( 3, 32, 32 );
		//geometry = new THREE.BoxBufferGeometry( 3, 3, 3 );
		material = new THREE.MeshBasicMaterial( { color: colors[0] } );
		var alphaMap = loadedText[Math.floor(Math.random() * loadedText.length)];
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
		group5.position.z = 100;
		if($('#vidTexture')[0].paused){
			$('#vidTexture')[0].play();
		}
		canvasTexture = document.createElement( 'canvas' );
		canvasTexture.id = 'drawingCanvas';
		canvasTexture.width = wW/2;
		canvasTexture.height = wH/2;
		//document.body.appendChild(canvasTexture);
		textureContext = canvasTexture.getContext( '2d' );
		textureContext.fillStyle = "black";
		textureContext.fillRect(0, 0, wW/2, wH/2);

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
		videoTexture = new THREE.VideoTexture( $('#vidTexture')[0] );
		videoTexture.minFilter = THREE.NearestFilter;
		videoTexture.wrapS = THREE.ClampToEdgeWrapping;
		videoTexture.wrapT = THREE.ClampToEdgeWrapping;
		var randColor = colors[Math.floor(Math.random() * colors.length)];

		var geometry = new THREE.PlaneBufferGeometry( planeWidthAtDistance, planeHeightAtDistance, 64, 64 );
		//var geometry = new THREE.SphereBufferGeometry( planeWidthAtDistance,64, 64 );
		var material = new THREE.MeshBasicMaterial( {color:  randColor, map: videoTexture, wireframe: false, transparent: true, opacity: 1 } );
		var alpha = new THREE.CanvasTexture( canvasTexture );
		alpha.minFilter = THREE.NearestFilter;
		//material.alphaMap.magFilter = THREE.NearestFilter;
		material.alphaTest = 0.25;
		alpha.wrapS = THREE.ClampToEdgeWrapping;
		alpha.wrapT = THREE.ClampToEdgeWrapping;
		alpha.repeat.y = 1;
		alpha.repeat.x = 1;
		//alpha.offset.y = -1;
		//alpha.offset.x = 1;
		material.alphaMap = alpha;
		alpha.needsUpdate = true;
		
		material.needsUpdate = true;
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
		//randBG2.repeat.set( 1, 1 );
		var geometry = new THREE.PlaneBufferGeometry( planeWidthAtDistance, planeWidthAtDistance, 64, 64 );
				//var geometry = new THREE.SphereBufferGeometry( planeWidthAtDistance,64, 64 );
		var randColor = colors[Math.floor(Math.random() * colors.length)];

var mat = new THREE.ShaderMaterial({
		  uniforms:{
			  col1 : {type:"c", value: new THREE.Color( randColor )},
		      tex0: {type:"t", value: randMask},
		      tex1: {type:"t", value: randBG1},
		      amt : {tyle:"f", value: .08}
		  },
		  //color: randColor,
		  vertexShader:`
precision highp float;
precision highp int;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);

}
`,
		  fragmentShader: `
precision mediump float;
varying vec2 vUv;
uniform vec3 col1;
varying vec4 color;
uniform sampler2D tex0;
uniform sampler2D tex1;
uniform float amt;
void main() {
  vec2 uv = vUv;
  vec4 cam = texture2D(tex0, uv);
  float avg = dot(cam.rgb, vec3(0.33333));
  avg = avg * 2.0 - 1.0;
  float disp = avg * amt;
  vec4 pup = texture2D(tex1, uv + disp);
  vec4 color = pup;
	float gray = dot(0.6 - color.rgb, vec3(0.299, 0.587, 0.114));
	//gl_FragColor = vec4(vec3(gray), 1.0) * 2.5;
  gl_FragColor = pup;
}
`
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
		var randMask = loadedMasks[Math.floor(Math.random() * loadedMasks.length)];

		var randBG1 = loadedBackgrounds[0];
		var randBG2 = loadedBackgrounds[0];
		randBG1.wrapS = THREE.RepeatWrapping;
		randBG1.wrapT = THREE.RepeatWrapping;
		randBG1.repeat.set( 1, 1 );		
		randBG2.wrapS = THREE.RepeatWrapping;
		randBG2.wrapT = THREE.RepeatWrapping;
		randBG2.repeat.set( 1, 1 );		
		ratio = wW / wH;
		size = 7 * ratio;
		var geo = new THREE.PlaneBufferGeometry(size, size);
		var mat = new THREE.ShaderMaterial({
		  uniforms:{
		      time: {value: 0},
					mx: {value: 0},
					my: {value: 0},
		      texture1: {value: randMask},
					texture2: {value: randBG2}
		  },
		  vertexShader:`precision highp float;
		  precision highp int;
		    varying vec2 vUv;
		    void main() {
		      vUv = uv;
		      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
		    }
		  `,
		  fragmentShader: `
		    uniform float time;
		uniform float mx;
		uniform float my;
		    uniform sampler2D texture1;
		uniform sampler2D texture2;
		    varying vec2 vUv;
		    void main() {
		      vec3 c = vec3(texture2D(texture1, vUv));
		      //float v = time + (vUv.x*0.5 + vUv.y*0.5);
		      float v = time;
		      vec2 Uv2 = vec2(c.r + c.b+v + mx, c.g + c.b + v + my);
		      vec3 outcolor = vec3(texture2D(texture2, Uv2));
			  //vec3 outcolor = vec3( mod(c.r+v,1.0), mod(c.g+v,1.0), mod(c.b+v,1.0));
   		
		      gl_FragColor = vec4( outcolor, 1.0 );
		    }
		  `
		});
		var plane = new THREE.Mesh(geo, mat);
		plane.name = 'feedback';
		group6.add(plane);		
		removeableItems.push(plane);		
		$feedback = group6.getObjectByName('feedback');
	}
	if(g === 'group7'){
		var randBG = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];

		var cameraZ = camera.position.z;
		var planeZ = 0;
		var distance = cameraZ - planeZ;
		var aspect = wW / wH;
		var vFov = camera.fov * Math.PI / 180;
		var planeHeightAtDistance = 2 * Math.tan(vFov / 2) * distance;
		var planeWidthAtDistance = planeHeightAtDistance * aspect;	
		var geometry = new THREE.PlaneBufferGeometry( planeWidthAtDistance, planeWidthAtDistance, 64, 64 );
				//var geometry = new THREE.SphereBufferGeometry( planeWidthAtDistance,64, 64 );

		var mat = new THREE.ShaderMaterial({
		  uniforms:{
			  mouseX: {type: 'f', value: [0.5] }  ,
			  mouseY: {type: 'f', value: [0.5] }  ,
			  amount: {type: 'f', value: [0.3] }  ,
			  count: {type: 'f', value: [10.0] }  ,
			  resolution : {type: "v2", value: new THREE.Vector2( wW, wW )},
		      tex0: {type:"t", value: randBG},
		  },
		  vertexShader:`
			precision highp float;
			precision highp int;
		    varying vec2 vUv;
		    void main() {
		      vUv = uv;
		      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
		    }
		  `,
		  fragmentShader: `
			precision mediump float;
			varying vec2 vUv;
			uniform sampler2D tex0;
			uniform vec2 resolution;
			uniform float amount;
			uniform float count;
			uniform float mouseX;
			uniform float mouseY;
			
			
			void main() {
				float amt = amount; // the amount of displacement, higher is more
				float squares = count; // the number of squares to render vertically
			
			  float aspect = resolution.x / resolution.y;
			  float offset = amt * mouseY;
			  vec2 uv = vUv;
			  uv.y =  uv.y + mouseY;
			  vec2 tc = uv;
			  uv -= 0.5;
			  uv.x *= aspect ;
			  vec2 tile = fract(uv * squares + 0.5) * amt;
			  vec4 tex = texture2D(tex0, tc + tile - offset - mouseX);
			  gl_FragColor = tex;
			}
			`
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
		objects = [];
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
		}
	}
	if(g === 'group10'){
		var cameraZ = camera.position.z;
		var planeZ = 0;
		var distance = cameraZ - planeZ;
		var aspect = wW / wH;
		var vFov = camera.fov * Math.PI / 180;
		var planeHeightAtDistance = 2 * Math.tan(vFov / 2) * distance;
		var planeWidthAtDistance = planeHeightAtDistance * aspect;	
		var plane = new THREE.PlaneBufferGeometry( planeWidthAtDistance, planeWidthAtDistance );
		var randBG = loadedText[Math.floor(Math.random() * loadedText.length)];
		var randColor1 = colors[Math.floor(Math.random() * colors.length)];
		var randColor2 = colors[Math.floor(Math.random() * colors.length)];
		var randColor3 = colors[Math.floor(Math.random() * colors.length)];
		fire = new THREE.Fire( plane, {
			textureWidth: 1024,
			textureHeight: 1024,
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
		fire.windVector.x = 0;
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

		var randBG = loadedText[Math.floor(Math.random() * loadedText.length)];
*/
geometry = new THREE.Geometry();
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
    vertexShader:` 
  uniform float amplitude;

  uniform vec3 vertexColor;

  varying vec4 varColor;

  void main()
  {
  varColor = vec4(vertexColor, 1.0);

  vec4 pos = vec4(position, 1.0);
  pos.z *= amplitude;

  vec4 mvPosition = modelViewMatrix * pos;

  gl_PointSize = 1.0;
  gl_Position = projectionMatrix * mvPosition;
  } `   ,
    fragmentShader: ` 
  varying vec4 varColor;

  void main()
  {
  gl_FragColor = varColor;
  }` 
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
	pointLight.shadow.mapSize.height = 2048;
	pointLight.shadow.mapSize.width = 2048;
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
		randBG.repeat.set( 1, 1 );

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
function draw() {
	requestAnimationFrame(draw);
	shaderTime += .01
	staticPass.uniforms[ 'time' ].value =  shaderTime;	
	if(!holding){
		TweenMax.to(badTVPass.uniforms[ 'distortion' ], 1, {value: 0});
		TweenMax.to(badTVPass.uniforms[ 'speed' ], 1, {value: 0});
		TweenMax.to(badTVPass.uniforms[ 'distortion2' ], 1, {value: 0});
		TweenMax.to(ticker.position, 0, {delay: 1, z: 0});
		TweenMax.to($mainSpot, .25, {delay: 0.5, intensity: 1});
		afterimagePass.uniforms.damp.value = 0.92;
		staticPass.uniforms[ 'amount' ].value = 0.2;
		$switch = true;
		oldMax = 0;
		if (switcher) window.clearTimeout(switcher);
		volumetericLightShaderUniforms.exposure.value = 0;
	}
	if(ready && ready3 && ready2){
		if(holding){
			playing = true;
			analyser.getFrequencyData(dataArray);
			lowerHalfArray = dataArray.slice(0, (dataArray.length/2) - 1);
			upperHalfArray = dataArray.slice((dataArray.length/2) - 1, dataArray.length - 1);
			overallAvg = avg(dataArray);
			lowerAvg = avg(lowerHalfArray);
			upperMax = max(upperHalfArray);
			upperMaxFr = upperMax / upperHalfArray.length;
			//TweenMax.to(ticker.position, .5, {delay: 0, z: 10});

			TweenMax.to(ticker.position, 0, {z: 100});
			if(!sound.isPlaying){
				sound.play();
			}
			
			TweenMax.to(sound, .2, { setPlaybackRate:1, setVolume:1});
			$('.output#time').html(timeOutput);
			$('.output#data').html(parseFloat(overallAvg).toFixed(4)+'<br />'+parseFloat(lowerAvg).toFixed(4))
			$('.output#coords').html('['+mX+','+ mY+']')
			$('.output#loop').html(parseFloat($loopLength)+'<br />'+parseFloat($loopDur).toFixed(2));
			staticPass.uniforms[ 'amount' ].value = 0.09;
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
				$portal.material.map.offset.x = (mX - (wW/2))/wW;
				$portal.material.map.offset.y = (mY - (wH/2))/wH;
				//TweenMax.to($portal.position, 1, {z: overallAvg/30 * -.5, x: 0, y: 0});
				//switchBG += overallAvg;
				if(upperMaxFr !== oldMax && $switch){
					switchBG = 0;
					var randBG = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
					randBG.repeat.set( 1, 1 );

					$portal.material.map = randBG;
					$switch = false;
					oldMax = upperMaxFr;
					if (switcher) window.clearTimeout(switcher);
					switcher = window.setTimeout(function(){
						$switch = true;
					},500);
				}				
			    

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
					var randBG = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
					randBG.wrapS = THREE.RepeatWrapping;
					randBG.wrapT = THREE.RepeatWrapping;
					randBG.repeat.set( 1, 1 );

					$plane1.material.map = randBG;
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
				if(upperMaxFr !== oldMax && $switch){
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
				}				
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
				TweenMax.to(volumetericLightShaderUniforms.samples, .8, {value: Math.max(0,90 - overallAvg)});
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
				//volumetericLightShaderUniforms.exposure.value = 0;
				//colorify.uniforms['opacity'].value = 0;

			}

		}
		if(showGroup === 'group5'){
			if(holding){
				//afterimagePass.uniforms.damp.value = 0;
				videoTexture.needsUpdate = true;

				TweenMax.to($plane2.material.uniforms.amt, 2, {value: overallAvg/800});
				group5.position.z = 0;
				if(upperMaxFr !== oldMax && $switch){
					switchBG = 0;
					var randBG = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
						randBG.repeat.set( 1, 1 );

					$plane2.material.uniforms.tex1.value = randBG;
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
				//afterimagePass.uniforms.damp.value = 0.96;
				group5.position.z = 100;

			}		
		} 
		if(showGroup === 'group6'){
			if(holding){
				TweenMax.to(badTVPass.uniforms[ 'distortion' ], 1, {value: overallAvg/100});
				TweenMax.to(badTVPass.uniforms[ 'speed' ], 3, {value: overallAvg/200 * -.025});
				TweenMax.to(badTVPass.uniforms[ 'distortion2' ], 2, {value: overallAvg/150});
				group6.position.z = 0;
				btime += overallAvg/100;
				badTVPass.uniforms[ 'time' ].value = btime;
				$feedback.material.uniforms.mx.value = (mX / wW)*2 -1;
				TweenMax.to($feedback.position, 2, {z: -5 - lowerAvg/20});
				$feedback.material.uniforms.my.value = -(mY / wH)*2 +1;
				TweenMax.to($feedback.material.uniforms.time, 2, {value: overallAvg/100});
				group6.rotation.y = (mX - (wW/2))/wW;
				group6.rotation.x = (mY - (wH/2))/wH;

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

					$plane2.material.uniforms.tex0.value = randBG;
					$switch = false;
					oldMax = upperMaxFr;
					console.log('switch');
					if (switcher) window.clearTimeout(switcher);
					switcher = window.setTimeout(function(){
						$switch = true;
					},600);
				}	
			} else{
				group7.position.z=100;	
			}
		}
		if(showGroup === 'group8'){
			if(holding){
				//afterimagePass.uniforms.damp.value = 1;
				group8.position.z = -800 - ((mY - (wH/2))/wH)*-800;
				//group8.position.z = 0;
				group8.rotation.x = Math.PI * -.45 + ((mY - (wH/2))/wH)*5;
				//group8.rotation.z = Math.PI * -.25;
				//group8.rotation.y = Math.PI * -.35;
				group8.rotation.z =  ((mX - (wW/2))/wW)*5;
				//group8.rotation.y = ((mY - (wH/2))/wH)*5;
				TweenMax.to(shaderUniforms.amplitude, 1, {value:  (upperMax - overallAvg - lowerAvg)});
				
				//animationTime += animationDelta;
				
				//ampl = Math.min(90,(overallAvg) + 255-lowerMax);
				//makeWireframe($wireframeBall, modulate(overallAvg, .3, 6, 4, .4), modulate((overallAvg/2)/5, 0, 5, .3, 2), ampl);
				//makeWireframe($wireframeBall, modulate(overallAvg, .3, 6, 4, .4), modulate((overallAvg), 0, 5, .3, .2), ampl);
				  	//$wireframeBall.rotation.y -= ((mX - (wW/2))/wW * 1.5)*.005;
				  	//$wireframeBall.rotation.x += ((mY - (wH/2))/wH * 1.5)*.005;	

					/*if(overallAvg !== oldMax && $switch){
						switchBG = 0;
						for (var m = 0; m < randomPlanes.length; m++) {
							randomPlanes[m].material.opacity = 0;
							randomPlanes[m].position.x = Math.random() * 9 - 4.5;
							randomPlanes[m].position.y = Math.random() * 9 - 4.5;
							randomPlanes[m].position.z = Math.random() * 9 - 4.5;
						}
						
						randP = randomPlanes[Math.floor(Math.random() * randomPlanes.length)];
						randP.material.opacity = 1;
						oldMax = overallAvg;
						console.log('switch');
						$switch = false;
						if (switcher) window.clearTimeout(switcher);
						switcher = window.setTimeout(function(){
							$switch = true;
						},200);
					}*/
					//shaderUniforms.amplitude.value = Math.sin(animationTime);						
			} else{
				group8.position.z = 900;
			}
		}
		if(showGroup === 'group9'){
			if(holding){
				time = Date.now() * 0.00005;
				for ( i = 0; i < nobjects; i ++ ) {
					TweenMax.to(objects[ i ].scale, 1, {x: 0.05 + overallAvg/50,y: 0.05 + overallAvg/50,z: 0.05 + overallAvg/50});
					objects[i].updateMatrix();
					//console.log(h);
					
				}
				group9.rotation.y = (mX - (wW/2))/wW;
				group9.rotation.x = (mY - (wH/2))/wH;

				group9.position.z = 0;
			} else{
				group9.position.z = 400;
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

					fire.setSourceMap( randBG );

					oldMax = overallAvg;
					console.log('switch');
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
	wW = window.innerWidth;
	wH = window.innerHeight;

	camera.aspect = wW / wH;
	camera.updateProjectionMatrix();

	composer.setSize(wW, wH);
	renderer.setSize(wW, wH);
}
function mouseDown(e) { 
    //mouseUp();
	 if($first && ready4){
		loadLoop();	  
    }
	if(ready4){
	    holding = true;
	}
    if(!playing && ready && ready2 && ready3){
		//$switch = true;

	    if(!sound.isPlaying){
			sound.play();
	    }
		playing = true;
		idleMouse();
    }
    if (loopTimer) window.clearTimeout(loopTimer); 
    if (idleTimer) window.clearTimeout(idleTimer);
	if(holding && ready2 && $drawMe){
		startX = e.pageX ;
		startY = e.pageY ;
		drawMask(startX, startY,15,0,255,0, 1);
	}
    idleTimer = window.setTimeout(idleMouse,500);
}
function mouseMove(event) {
	if(!holding){
		movingMouse();
		event.preventDefault();
	}
	mX = event.pageX;
	mY =  event.pageY;
	if(holding && $drawMe){
		var dis = Math.sqrt(Math.pow(startX-mX, 2)+Math.pow(startY-mY, 2));
		for (i=0;i<dis;i+=1) {
			var s = i/dis;
			drawMask(startX*s + mX*(1-s), startY*s + mY*(1-s),15,0,255,0,1);
		}
		startX = mX;
		startY = mY;  
	}
}
function drawMask(x,y,w,r,g,b,a){
    var gradient = textureContext.createRadialGradient(x/2, y/2, 0, x/2, y/2, w/4);
    gradient.addColorStop(0, 'rgba('+r+', '+g+', '+b+', '+a+')');
    //gradient.addColorStop(.5, 'rgba(0,100,0,1)');
    
	//gradient.addColorStop(.6, 'rgba('+r+', '+g+', '+b+', 0)');
    textureContext.beginPath();
    textureContext.arc(x/2, y/2, w/4, 0, 2 * Math.PI);
    textureContext.fillStyle = gradient;
    textureContext.fill();
    textureContext.closePath();
    //textureContext.filter = "blur(4px)";
    $plane1.material.alphaMap.needsUpdate = true;
};
function mouseUp() { 
    holding = false;
	movingMouse();
    ready2 = false;
    ready3 = false;
    if(!playing && ready && ready2 && ready3){
		console.log('play it');
	    if(!sound.isPlaying){
			sound.play();
	    }
		playing = true;
	}    
    if (loopTimer) window.clearTimeout(loopTimer); 
	if(!$first){
   		loopTimer = window.setTimeout(loadLoop,400);
	}
    if (idleTimer) window.clearTimeout(idleTimer); 
    idleTimer = window.setTimeout(movingMouse,600);
}
function movingMouse(){
	$('body').removeClass('idle');
}
function idleMouse(){
	$('body').addClass('idle');
}
$(document).on('mousemove touchmove', function(event) {
  event.preventDefault();
 });
$('#scene')[0].addEventListener("mousedown", mouseDown);
document.body.addEventListener("mousemove", mouseMove);
document.body.addEventListener("mouseup", mouseUp); 
document.body.addEventListener("touchstart", mouseDown);
document.body.addEventListener("touchend", mouseUp); 
window.addEventListener("resize", onWindowResize);
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