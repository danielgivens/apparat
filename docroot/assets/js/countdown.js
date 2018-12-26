backgrounds = [
	'/assets/images/app.jpg',
	'/assets/images/test-4.jpg',
	'/assets/images/texture-tour-1.jpg',
	'/assets/images/texture-tour-2.jpg',
	'/assets/images/texture-tour-3.jpg',
	'/assets/images/texture-tour-4.jpg',
	'/assets/images/texture-tour-6.jpg',
	'/assets/images/texture-tour-8.jpg',
	'/assets/images/texture-tour-10.jpg',
];
textTextures = [
	'/assets/images/type-texture.png'
];
snips = [
	'/assets/audio/loop-1.mp3',
	'/assets/audio/loop-3.mp3',
	'/assets/audio/loop-4.mp3',
	'/assets/audio/loop-6.mp3',
	'/assets/audio/loop-8.mp3',
	'/assets/audio/loop-10.mp3'	
];
groups = [
	'group1',
	'group2',
	'group3',
	'group4',
	'group5',
	'group6',
	'group7',
];
group1 = new THREE.Group();
group2 = new THREE.Group();
group3 = new THREE.Group();
group4 = new THREE.Group();
group5 = new THREE.Group();
group6 = new THREE.Group();
group7 = new THREE.Group();
colors = [
	0xffd064,
	0xfb248b,
	0x01d765
];
var scene, switcher, mouse, upperAvgFr, upperMaxFr, lowerAvgFr, lowerMaxFr, upperAvg, upperMax, lowerAvg, lowerMax, overallAvg, deadline, $buff, loopTimer, listener, $track, textureContext, sphere_mesh,ambientLight, volumetericLightShaderUniforms, audioLoader, videoTexture, occlusionComposer, occlusionRenderTarget, occlusionBox, lightSphere, dartaArray, pointLight, $pointLight, idleTimer, $portal, textMesh, mouseTimer, portalMesh, portalrenderer, sound, camera, material, composer, analyser, dataArray, glitchPass, afterimagePass, renderPass, copyPass, rgbParams, rgbPass, filmParams, filmPass, renderPass, copyPass;
var DEFAULT_LAYER = 0, OCCLUSION_LAYER = 1, renderScale = 0.5, angle = 0, audioData = [], shaderTime = 0, fftSize = 512, $drawMe = false, ready3 = false, playing = false, ready = false, ready2 = false, holding = false, font2 = undefined, startX = window.innerWidth/2, startY = window.innerHeight/2, backgroundsLoaded = false, loadedBackgrounds = [],removeableItems = [], loadedText = [], mX = 0, mY = 0, b = 0, d = 0, $r = 0, $switch = true, oldMax = 0, shaderTime = 0, start = Date.now(), wifreframeBallColor = 0, switchBG = 0, switchColor = 0, rate = 0, time = 0, offset = { upper : 0,lower : 0}, showGroup = 'none', $g = 1, $first = true; timeOutput = '00:00:00:00';
var noise2 = new SimplexNoise(), simplex = new SimplexNoise(), manager = new THREE.LoadingManager(), loader = new THREE.TextureLoader(manager);
var loadChecker = setInterval(function(){
	if(backgroundsLoaded){clearInterval(loadChecker);}
},100);

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
	rand = $g;
	showGroup = 'group'+rand;
	$scene = getUrlVars()["s"];
	if($first && $scene){
	    if($scene <= groups.length){
			showGroup = 'group'+$scene;
			//console.log('target:'+ $scene);
		} else{
			showGroup = 'group1';
		}
		$g = $scene;
	}
	createGroup(showGroup);
	$g++;
	if($g > groups.length){
		$g = 1;
	}
	$first = false;
		
}
function setupScene(){
	scene = new THREE.Scene();	
	fogColor = new THREE.Color(0x000000);
	scene.background = fogColor;
	scene.fog = new THREE.Fog(fogColor, 0.0025, 60);
	res = window.innerWidth / window.innerHeight;
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
	scene.add(group1);		
	scene.add(group2);		
	scene.add(group3);		
	scene.add(group4);		
	scene.add(group5);		
	scene.add(group6);
	scene.add(group7);
	
	renderer = new THREE.WebGLRenderer({ 
	    antialias: true,
		alpha: false 
	});
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFShadowMap;
	renderer.setSize(window.innerWidth, window.innerHeight);
	pixelRatio = 1;
	
	
	occlusionRenderTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight);
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
	composer.setSize( window.innerWidth * pixelRatio, window.innerHeight * pixelRatio );
	composer.addPass( new THREE.RenderPass( this.scene, this.camera ) );
	
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
	
	document.body.appendChild(renderer.domElement);
}
function loadBackgrounds(bg){
	var loader = new THREE.TextureLoader(manager)
	loader.load(bg, function (object) {
		loadedBackgrounds.push(object);
		//console.log('loaded background:'+object);
		if(loadedBackgrounds.length == backgrounds.length ){
			loadTextTextures(textTextures[0]);
		} else{
			b++
			if(b <= backgrounds.length){
				loadBackgrounds(backgrounds[b]);
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
	deadline = "2019-03-12T12:00:00+00:00";
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
	ticker.remove(ticker.getObjectByName('textMesh'));
	textMesh = undefined;
	createText();  
}
function createText(){
	var textMaterial = new THREE.MeshStandardMaterial({color: 0xffffff});
	var textGeometry = new THREE.TextGeometry(countDown, {
		font: font2,
		size: window.innerWidth/1000,
		height: .1,
		curveSegments: 4
	});
	textGeometry.center();
	textMesh = new THREE.Mesh(textGeometry, textMaterial);
	textMesh.scale.set(.25,.25,.25);
	ticker.add(textMesh);	
	textMesh.name = 'textMesh';
	
}
function handleGroup(){
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
	    }
		//console.log('theres a group');
		removeableItems.forEach(function(v,i) {
		  v.material.dispose();
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
		console.log('theres not a group, getting a random group and setting up audio context');
		listener = new THREE.AudioListener();
		camera.add( listener );
		sound = new THREE.Audio( listener );
		audioLoader = new THREE.AudioLoader();
		analyser = new THREE.AudioAnalyser( sound, fftSize );
		dataArray = analyser.data;
		hpfilter = sound.context.createBiquadFilter();
		hpfilter.type = "highpass";
		hpfilter.frequency.value = .0001;
		sound.setFilters([hpfilter]);
		getAudioData(dataArray);
		randGroup();
	    $track = getUrlVars()["t"];
	    if($track){
		    if($track <= snips.length){
			    $r = parseInt($track)-1;
		    } else{
			    $r = 0;
		    }
	    }

	    
	}
	//sound.context.suspend();
	console.log(sound.context.state);
	audioLoader.load( snips[$r], function( buffer ) {
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
		console.log(sound.context.state);
		ready2 = true;
		playing = false;
		console.log('loaded loop: '+snips[$r]);
		$r++;
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
	//console.log('creategroup:'+g);
	if(g === 'group1'){
		/*var icosahedronGeometry = new THREE.IcosahedronGeometry(1, 5);
		var randColor1 = colors[Math.floor(Math.random() * colors.length)];
		var lambertMaterial = new THREE.MeshLambertMaterial({
		    color: randColor1,
		    wireframe: true,
		    transparent: true,
		    opacity:0
		});
		var wireframeBall = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
		wireframeBall.position.set(0, 0,3);
		group1.add(wireframeBall);
		removeableItems.push(wireframeBall);
		wireframeBall.name = 'wireframeBall';
		$wireframeBall = group1.getObjectByName('wireframeBall');*/
		var randColor1 = colors[Math.floor(Math.random() * colors.length)];
		material = new THREE.ShaderMaterial( {
			//wireframe: true,
			transparent: true,
			opacity: 0,
			side: THREE.DoubleSide,
			uniforms: {
				//tShine: { type: "t", value: panoTexture },
				black: { type: "c", value: new THREE.Color( 0x000000 ) },
				colors: { type: "c", value: new THREE.Color( randColor1 ) },
				time: { type: "f", value: 0 },
				weight: { type: "f", value: 0.2 }
			},
			vertexShader: noiseVertex,
			fragmentShader: noiseFragment
	
		} );
	
		mesh = new THREE.Mesh( new THREE.IcosahedronBufferGeometry( 7, 6 ), material );
		group1.add(mesh);
		group1.position.z = 100;
		
		removeableItems.push(mesh);
		mesh.name = 'wireframeBall';
		$wireframeBall = group1.getObjectByName('wireframeBall');

		addPortal();		
	}

	if(g === 'group2'){
		ratio = window.innerWidth / window.innerHeight;
		sizes = 9 * ratio;
		group2 = new THREE.Group();
		var randColor1 = colors[Math.floor(Math.random() * colors.length)];
		var randColor2 = colors[Math.floor(Math.random() * colors.length)];
		var randColor3 = colors[Math.floor(Math.random() * colors.length)];
		var randBG1 = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
		var randBG2 = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
		var randBG3 = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
		var geometry1 = new THREE.PlaneGeometry( sizes, sizes, 112, 112 );
		var material1 = new THREE.MeshBasicMaterial( {color:  0xffffff, map: randBG1, wireframe: false, transparent: true, opacity: 0} );
		randBG1.magFilter = THREE.NearestFilter;
		randBG1.wrapT = THREE.RepeatWrapping;
		randBG1.wrapS = THREE.RepeatWrapping;
		randBG1.repeat.set( 1, 1 );		

		var plane1 = new THREE.Mesh( geometry1, material1 );
		plane1.name = 'plane1';
		group2.add(plane1);
		$plane1 = group2.getObjectByName('plane1');
		var geometry2 = new THREE.PlaneGeometry( sizes, sizes, 112, 112 );
		var material2 = new THREE.MeshBasicMaterial( {color:   0xffffff, map: randBG2, wireframe: false, transparent: true, opacity: 0} );
		randBG2.magFilter = THREE.NearestFilter;
		randBG2.wrapT = THREE.RepeatWrapping;
		randBG2.wrapS = THREE.RepeatWrapping;
		randBG2.repeat.set( 1, 1 );		

		var plane2 = new THREE.Mesh( geometry2, material2 );
		plane2.name = 'plane2';
		group2.add(plane2);
		$plane2 = group2.getObjectByName('plane2');
		var geometry3 = new THREE.PlaneGeometry( sizes, sizes, 112, 112 );
		var material3 = new THREE.MeshBasicMaterial( {color:   0xffffff, map: randBG3, wireframe: false, transparent: true, opacity: 0} );
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

		scene.add( group2 );
		
	}
	if(g === 'group3'){
		ratio = window.innerWidth / window.innerHeight;
		sizes = 8 * ratio;		
		var box = new THREE.BoxBufferGeometry(sizes,sizes,sizes);
		//var box = new THREE.SphereGeometry(sizes, 64, 64);
		var randBG = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
	
		var material = new THREE.MeshStandardMaterial( {
			color: 0xffffff,
			roughness: 1,
			metalness: 1,
			map: randBG,
			specular: 0xffffff,
			side: THREE.BackSide,
			transparent: true,
			opacity: 0
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

		scene.add(group3);
	}
	if(g === 'group4'){
		geometry = new THREE.SphereBufferGeometry( 3, 32, 32 );
		//geometry = new THREE.BoxBufferGeometry( 3, 3, 3 );
		material = new THREE.MeshBasicMaterial( { color: colors[0] } );
		var alphaMap = loadedText[Math.floor(Math.random() * loadedText.length)];

		lightSphere = new THREE.Mesh( geometry, material );
		lightSphere.layers.set( OCCLUSION_LAYER );
		lightSphere.name = 'lightSphere';
		removeableItems.push(lightSphere);
		group4.add( lightSphere );
		$lightSphere = group4.getObjectByName('lightSphere');
		var geometry = new THREE.SphereBufferGeometry( 3, 32, 32 );
		var material = new THREE.MeshPhongMaterial({
			color: 0x000000,
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
			side: THREE.DoubleSide,
			alphaMap: texture,
			shininess: 10,
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
	}
	if(g === 'group5'){
		ratio = window.innerWidth / window.innerHeight;
		sizes = 10 * ratio;
		//var size = 20;
		//var divisions = size*12;
		group5.position.z = 100;

		canvasTexture = document.createElement( 'canvas' );
		canvasTexture.id = 'drawingCanvas';
		canvasTexture.width = window.innerWidth/2;
		canvasTexture.height = window.innerHeight/2;
		document.body.appendChild(canvasTexture);
		textureContext = canvasTexture.getContext( '2d' );
		 textureContext.fillStyle = "black";
textureContext.fillRect(0, 0, window.innerWidth/2, window.innerHeight/2);

		/*var color1 = "white",color2="black";
		var numberOfStripes = 2048/3;		
		for (var i=0;i<numberOfStripes;i++){
		  var thickness = 2048 / numberOfStripes;
		  context.beginPath();
		  context.strokeStyle = i % 2?color1:color2;
		  context.lineWidth =thickness;  
		  
		   context.moveTo(i*thickness + thickness/2,0);
		  context.lineTo(i*thickness+thickness/2, 2048);
		  context.stroke();
		}	*/

       // context.clearTo();
        $drawMe = true;
		
		var randBG1 = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
		$rand2 = Math.floor(Math.random() * loadedBackgrounds.length);
		var randBG2 = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
		var randBG3 = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];

		var cameraZ = camera.position.z;
		var planeZ = 1.1;
		var distance = cameraZ - planeZ;
		var aspect = window.innerWidth / window.innerHeight;
		var vFov = camera.fov * Math.PI / 180;
		var planeHeightAtDistance = 2 * Math.tan(vFov / 2) * distance;
		var planeWidthAtDistance = planeHeightAtDistance * aspect;	
		videoTexture = new THREE.VideoTexture( $('#vidTexture')[0] );
		videoTexture.minFilter = THREE.NearestFilter;
		videoTexture.wrapS = THREE.ClampToEdgeWrapping;
		videoTexture.wrapT = THREE.ClampToEdgeWrapping;

		var geometry = new THREE.PlaneBufferGeometry( planeWidthAtDistance, planeHeightAtDistance, 64, 64 );
		//var geometry = new THREE.SphereBufferGeometry( planeWidthAtDistance,64, 64 );
		var material = new THREE.MeshBasicMaterial( {color:  0xffffff, map: videoTexture, wireframe: false, transparent: true, opacity: 1 } );
		var alpha = new THREE.CanvasTexture( canvasTexture );
		alpha.minFilter = THREE.NearestFilter;
		//material.alphaMap.magFilter = THREE.NearestFilter;
		material.alphaTest = 0.8;
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
		var aspect = window.innerWidth / window.innerHeight;
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
		      tex0: {type:"t", value: randBG2},
		      tex1: {type:"t", value: randBG1},
		      amt : {tyle:"f", value: .08}
		  },
		  color: randColor,
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
  gl_FragColor = pup ;
}
`
		});


		var material = new THREE.MeshBasicMaterial( {color:  0xffffff, map: randBG2, wireframe: false, transparent: true, opacity: 1} );
		material.needsUpdate = true;
		//material.side = THREE.DoubleSide;
		//var data = getHeightData(backgrounds[$rand2], 1);
		console.log(randBG2);
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
		
	}
	if(g === 'group6'){
		group6.position.z = 100;
		var randBG1 = loadedBackgrounds[0];
		var randBG2 = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
		if(randBG2 === loadedBackgrounds[0]){
			var randBG2 = loadedBackgrounds[3];
			
		}
		randBG1.wrapS = THREE.RepeatWrapping;
		randBG1.wrapT = THREE.RepeatWrapping;
		randBG1.repeat.set( 1, 1 );		
		randBG2.wrapS = THREE.RepeatWrapping;
		randBG2.wrapT = THREE.RepeatWrapping;
		randBG2.repeat.set( 1, 1 );		
		ratio = window.innerWidth / window.innerHeight;
		size = 7 * ratio;
		var geo = new THREE.PlaneBufferGeometry(size, size);
		var mat = new THREE.ShaderMaterial({
		  uniforms:{
		      time: {value: 0},
					mx: {value: 0},
					my: {value: 0},
		      texture1: {value: randBG1},
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
		var randBG1 = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
		var cameraZ = camera.position.z;
		var planeZ = 0;
		var distance = cameraZ - planeZ;
		var aspect = window.innerWidth / window.innerHeight;
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
			  resolution : {type: "v2", value: new THREE.Vector2( window.innerWidth, window.innerWidth )},
		      tex0: {type:"t", value: randBG1},
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
		console.log(randBG2);
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
	ready3 = true;
}
function getHeightData(img,scale) {
  
 if (scale == undefined) scale=1;
  
    var canvas = document.createElement( 'canvas' );
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
    var context = canvas.getContext( '2d' );
 
    var size = window.innerWidth * window.innerWidth;
    var data = new Float32Array( size );
 
    context.drawImage(img,0,0);
 
    for ( var i = 0; i < size; i ++ ) {
        data[i] = 0
    }
 
    var imgd = context.getImageData(0, 0, window.innerWidth, window.innerWidth);
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
	var geometry = new THREE.SphereBufferGeometry( 1, 32, 32 );
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
	//console.log('adding portal:'+randBG);
	var geometry = new THREE.SphereGeometry( 1, 64, 64);
	var material = new THREE.MeshStandardMaterial( { color: 0xffffff ,map:randBG,  refractionRatio: 0.1, transparent: true, roughness: 1, alphaTest: 0.5, opacity: 0 } );
	material.side = THREE.DoubleSide;
	material.wrapS = material.wrapT = THREE.MirroredRepeatWrapping;
	var portalMesh = new THREE.Mesh( geometry, material);
	removeableItems.push(portalMesh);
	portalMesh.position.z = 0;
	portalMesh.geometry.needsUpdate = true;
	portalMesh.material.needsUpdate = true;
	portalMesh.name = 'portalMesh';
	group1.add(portalMesh);		
	$portal = group1.getObjectByName('portalMesh');
}
function makeWireframe(mesh, bassFr, treFr, ampl) {
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
	//mesh.material.needsUpdate = true;

}
function draw() {
	requestAnimationFrame(draw);
	shaderTime += .01
	staticPass.uniforms[ 'time' ].value =  shaderTime;	
	if(!holding){
		TweenMax.to(badTVPass.uniforms[ 'distortion' ], .5, {value: 0});
		TweenMax.to(badTVPass.uniforms[ 'speed' ], .5, {value: 0});
		TweenMax.to(badTVPass.uniforms[ 'distortion2' ], .5, {value: 0});
		TweenMax.to(ticker.position, .01, {delay: .5, z: 1});
		staticPass.uniforms[ 'amount' ].value = 0.2
		$switch = true;
		oldMax = 0;
	}
	if(ready2){
		if(holding && ready3){
			playing = true;
			analyser.getFrequencyData(dataArray);
			lowerHalfArray = dataArray.slice(0, (dataArray.length/2) - 1);
			upperHalfArray = dataArray.slice((dataArray.length/2) - 1, dataArray.length - 1);
			overallAvg = avg(dataArray);
			lowerMax = max(lowerHalfArray);
			lowerAvg = avg(lowerHalfArray);
			upperMax = max(upperHalfArray);
			upperAvg = avg(upperHalfArray);
			lowerMaxFr = lowerMax / lowerHalfArray.length;
			lowerAvgFr = lowerAvg / lowerHalfArray.length;
			upperMaxFr = upperMax / upperHalfArray.length;
			upperAvgFr = upperAvg / upperHalfArray.length;
			TweenMax.to(ticker.position, 0, {z: 10});
			if(!sound.isPlaying){
				sound.play();
			}
			
			TweenMax.to(sound, .2, { setPlaybackRate:1, setVolume:1});
			$('.output#time').html(timeOutput);
			$('.output#data').html(parseFloat(overallAvg).toFixed(4)+'<br />'+parseFloat(lowerAvg).toFixed(4))
			$('.output#coords').html('['+mX+','+ mY+']')
			$('.output#loop').html(parseFloat($loopLength)+'<br />'+parseFloat($loopDur).toFixed(2));
			staticPass.uniforms[ 'amount' ].value = 0.05;
		} 
		if(showGroup === 'group1'){
			if(holding && ready3){
				group1.position.z = 6;
				$portal.material.opacity = 1;
				//ampl = Math.min(90,(overallAvg) + 255-lowerMax);
				$wireframeBall.material.uniforms[ 'time' ].value = .0006 * ( Date.now() - start );
				$wireframeBall.rotation.y += 0.001;
				TweenMax.to($wireframeBall.material.uniforms[ 'weight' ], 1, {value: Math.min(7,overallAvg/2)});
				//makeWireframe($wireframeBall, modulate(lowerAvgFr, .3, 6, 4, .4), modulate((lowerAvg - overallAvg)/5, 0, 5, .3, 2), ampl);
				group1.rotation.y = (mX - (window.innerWidth/2))/window.innerWidth;
				group1.rotation.x = (mY - (window.innerHeight/2))/window.innerHeight;
				$portal.material.map.offset.x = (mX - (window.innerWidth/2))/window.innerWidth;
				$portal.material.map.offset.y = (mY - (window.innerHeight/2))/window.innerHeight;
				TweenMax.to($portal.position, 1, {z: overallAvg/30 * -.5, x: 0, y: 0});
				//switchBG += overallAvg;
				if(upperMaxFr !== oldMax && $switch){
					switchBG = 0;
					var randBG = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
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
			if(holding && ready3){
				TweenMax.to(group2.position, .2, {z: 0});
				$plane1.rotation.z += ((mX - (window.innerWidth/2))/window.innerWidth * 1.5)*.015;
				$plane2.rotation.z += ((mX - (window.innerWidth/2))/window.innerWidth * 1.5)*-.025;
				$plane3.rotation.z -= ((mX - (window.innerWidth/2))/window.innerWidth * 1.5)*.025;
				$plane1.material.opacity = 1;
				$plane2.material.opacity = 1;
				$plane3.material.opacity = 1;
 				TweenMax.to($plane3.position, .6, {z:  overallAvg/50});
 				TweenMax.to($plane2.position, .5, {z:  overallAvg/40});
 				TweenMax.to($plane1.position, 1, {z:  overallAvg/30});
 				TweenMax.to(offset, .6, {upper: overallAvg, lower: lowerAvg});
				rate += 0.005;
				adjustMeshPlaneVertices(Math.max(1, 2-offset['upper']), Math.max(1, offset['lower']), rate);
			} else{

			}
		} 
		if(showGroup === 'group3'){
			if(holding && ready3){
				$mainSpot.intensity = 0.5;
				TweenMax.to(group3.position, .2, {z: 0});
				$pointLight.traverse(function(obj) {
				  if (obj.name && obj.name.includes('amap')) {
				   	obj.material.alphaMap.offset.y += 0.0003;
				    obj.material.opacity = 1;
				    
				  }
				});
				
				$pointLight.rotation.y = ((mX - (window.innerWidth/2))/window.innerWidth * 1.5)*-2;				
				$pointLight.rotation.x = ((mY - (window.innerHeight/2))/window.innerHeight * 1.5)*2;
				$pointLight.position.z = 3 + ((mY - (window.innerHeight/2))/window.innerHeight * 1.5)*10	;			
				$room.material.opacity = 1;
				TweenMax.to($pointLight, .8, {intensity: overallAvg/10});
			} else{
				$mainSpot.intensity = 1;
				ambientLight.intensity = .6;
				$room.material.opacity = 0;
				$pointLight.intensity = 0;
				$pointLight.traverse(function(obj) {
					if (obj.name && obj.name.includes('amap')) {
						obj.material.opacity = 0;
					}
				})
			}
		} 
		if(showGroup === 'group4'){
			if(holding && ready3){
				//afterimagePass.uniforms.damp.value = 0;
				//$god.rotation.x += 0.001;
				volumetericLightShaderUniforms.exposure.value = .6;
				//volumetericLightShaderUniforms.decay.value = upperAvgFr/6;
				volumetericLightShaderUniforms.samples.value = 120 - overallAvg;
				switchColor += overallAvg;
				if(parseInt(switchColor) > 700){
					switchColor = 0;
					var randColor = colors[Math.floor(Math.random() * colors.length)];
					$god.material.specular = new THREE.Color(randColor);
					//$god.material.needsUpdate = true;
					group4.traverse(function(obj) {
					  if (obj.name && obj.name.includes('lightSphere')) {
					  	obj.material.color = new THREE.Color(randColor);
						obj.material.needsUpdate = true;
					  	
					  }
					 });
				}
				var time = performance.now() * 0.001;
				//group4.position.x = Math.sin( time * 0.3 ) * 1.2 -.5;
				//group4.position.y = Math.sin( time * 0.4 ) * 3 -.5;
				//group4.position.z = Math.sin( time * 0.6 ) * 2;
				//$god.rotation.x = mX/10;
				var time = performance.now() * 0.001;
				//pointLight.position.x = Math.sin( time * 0.6 ) * 9;
				//pointLight.position.y = Math.sin( time * 0.7 ) * 9 + 5;				
				//$god.rotation.Y = mY/10;
				$god.traverse(function(obj) {
				  if (obj.name && obj.name.includes('spheremesh')) {
				  	obj.material.alphaMap.offset.x -= ((mX - (window.innerWidth/2))/window.innerWidth * 1.5)*.005;
				  	obj.material.alphaMap.offset.y += ((mY - (window.innerHeight/2))/window.innerHeight * 1.5)*.005;
				    //obj.material.alphaMap.offset.y = mY * 0.001;
				    //obj.material.alphaMap.offset.x = mX * 0.001;
				    //obj.material.alphaMap.offset.x = Math.sin( time * 0.002 ) * 7 + 5;
				  }
				});			
			} else{
				volumetericLightShaderUniforms.exposure.value = 0;
				colorify.uniforms['opacity'].value = 0;

			}

		}
		if(showGroup === 'group5'){
			if(holding && ready3){
				videoTexture.needsUpdate = true;
				if($('#vidTexture')[0].paused){
					$('#vidTexture')[0].play();
				}
				TweenMax.to($plane2.material.uniforms.amt, 2, {value: overallAvg/800});
				group5.position.z = 0;
				if(upperMaxFr !== oldMax && $switch){
					switchBG = 0;
					var randBG = loadedBackgrounds[Math.floor(Math.random() * loadedBackgrounds.length)];
					$plane2.material.uniforms.tex1.value = randBG;
					$switch = false;
					oldMax = upperMaxFr;
					if (switcher) window.clearTimeout(switcher);
					switcher = window.setTimeout(function(){
						$switch = true;
					},500);
				}		
			} else{
				group5.position.z = 100;
				if(!$('#vidTexture')[0].paused){
					$('#vidTexture')[0].pause();
				}
			}		
		} 
		if(showGroup === 'group6'){
			if(holding && ready3){
				TweenMax.to(badTVPass.uniforms[ 'distortion' ], 1, {value: overallAvg/100});
				TweenMax.to(badTVPass.uniforms[ 'speed' ], 3, {value: overallAvg/200 * -.025});
				TweenMax.to(badTVPass.uniforms[ 'distortion2' ], 2, {value: overallAvg/150});
				group6.position.z = 0;
				var time = performance.now() * 0.009;
				badTVPass.uniforms[ 'time' ].value = time;
				$feedback.material.uniforms.mx.value = (mX / window.innerWidth)*2 -1;
				TweenMax.to($feedback.position, 2, {z: -5 - lowerAvg/20});
				$feedback.material.uniforms.my.value = -(mY / window.innerHeight)*2 +1;
				TweenMax.to($feedback.material.uniforms.time, 2, {value: overallAvg/20});
				group6.rotation.y = (mX - (window.innerWidth/2))/window.innerWidth;
				group6.rotation.x = (mY - (window.innerHeight/2))/window.innerHeight;

			} else{
				group6.position.z = 100;
				TweenMax.to(badTVPass.uniforms[ 'distortion' ], .5, {value: 0});
				TweenMax.to(badTVPass.uniforms[ 'speed' ], .5, {value: 0});
				TweenMax.to(badTVPass.uniforms[ 'distortion2' ], .5, {value: 0});
				
			}
		}	
		if(showGroup === 'group7'){
			if(holding && ready3){
				group7.position.z=0;
				$plane2.material.uniforms.mouseX.value = ((mX - (window.innerWidth/2))/window.innerWidth);
				$plane2.material.uniforms.mouseY.value = ((mY - (window.innerHeight/2))/window.innerHeight);
				TweenMax.to($plane2.material.uniforms.amount, 1, {value: .4 - overallAvg/100});
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
					},1000);
				}	
			} else{
				group7.position.z=100;	
			}
		}
	}
	camera.layers.set(OCCLUSION_LAYER);
    renderer.setClearColor(0x000000);
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
	$plane1.geometry.normalsNeedUpdate = true;
	$plane1.geometry.computeVertexNormals();
	$plane1.geometry.computeFaceNormals();
	for (var i = 0; i < $plane2.geometry.vertices.length; i++) {
		var vertex = $plane2.geometry.vertices[i];
		var x1 = vertex.x / offset1*.3;
		var y1 = vertex.y / offset1*.3;
		var noise3 =  simplex.noise2D(x1 + rate, y1) * 2.4; 
		vertex.z = noise3;
	}
	$plane2.geometry.verticesNeedUpdate = true;
	$plane2.geometry.normalsNeedUpdate = true;
	$plane2.geometry.computeVertexNormals();
	$plane2.geometry.computeFaceNormals();
	for (var i = 0; i < $plane3.geometry.vertices.length; i++) {
		var vertex = $plane3.geometry.vertices[i];
		var x1 = vertex.x / offset1*.3;
		var y1 = vertex.y / offset1*.3;
		var noise3 =  simplex.noise2D(x1 + rate, y1 + rate) * 2.4; 
		vertex.z = noise3;
	}
	$plane3.geometry.verticesNeedUpdate = true;
	$plane3.geometry.normalsNeedUpdate = true;
	$plane3.geometry.computeVertexNormals();
	$plane3.geometry.computeFaceNormals();	
}
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
function mouseDown(e) { 
    //mouseUp();
	 if($first){
		loadLoop();	  
		console.log('load');  
    }
    holding = true;
    if(!playing && ready && ready2 && ready3){
		$switch = true;

	    if(!sound.isPlaying){
			sound.play();
	    }
	    console.log('play');
		playing = true;
		idleMouse();
    }
    if (loopTimer) window.clearTimeout(loopTimer); 
    if (idleTimer) window.clearTimeout(idleTimer);
	if($drawMe){
		startX = e.pageX ;
		startY = e.pageY ;
		drawMask(startX, startY,20,0,255,0, 1);
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
	if($drawMe){
		var dis = Math.sqrt(Math.pow(startX-mX, 2)+Math.pow(startY-mY, 2));
		for (i=0;i<dis;i+=1) {
			var s = i/dis;
			drawMask(startX*s + mX*(1-s), startY*s + mY*(1-s),20,0,255,0, 1);
		}
		startX = mX;
		startY = mY;  
	}
}
function drawMask(x,y,w,r,g,b,a){
    var gradient = textureContext.createRadialGradient(x/2, y/2, 0, x/2, y/2, w/2);
    gradient.addColorStop(0, 'rgba('+r+', '+g+', '+b+', '+a+')');
    //gradient.addColorStop(1, 'rgba(0,100,0,)');
    
	gradient.addColorStop(.6, 'rgba('+r+', '+g+', '+b+', 0)');
    textureContext.beginPath();
    textureContext.arc(x/2, y/2, w/2, 0, 2 * Math.PI);
    textureContext.fillStyle = gradient;
    textureContext.fill();
    textureContext.closePath();
    textureContext.filter = "blur(10px)";
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