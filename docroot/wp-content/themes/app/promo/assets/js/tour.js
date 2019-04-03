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
var composer;
var shaderTime = 0;
var glitchPass;
var afterimagePass;
var renderPass, copyPass;
var rgbParams, rgbPass;	
var filmParams, filmPass;	
var renderPass, copyPass;
var textMesh1;
var textMesh2;
var scrollTimeout;
$scrolling = false;
$speed = 0;
$extra = 106;
factor = 2;
var video;
var group1 = new THREE.Group();
var group2 = new THREE.Group();
var font;
var $dir = 'up';
var fontLoader = new THREE.FontLoader();
prevH = 0;
    var lastPos, newPos, timer, delta, 

prevW = 0;
var objects = [];
var vector = new THREE.Vector3();
var ww = $(document).width(),
    wh = $(document).height();
var ww2 = ww * 0.5,
    wh2 = wh * 0.5;
document.body.classList.add("loading");
var scrollbar = Scrollbar.init($(document).find('.scroll')[0], {
	speed:.8,
	damping: 0.1,
	renderByPixels: true,
	syncCallbacks: true,
	continuousScrolling: false,
	alwaysShowTracks: false,
	overscrollEffect: false
});
$scH = $('.scroll .scroll-content').height();
scrollbar.addListener(function (status) {
	$scrolled = status.offset.y;
	$('.fixed').css('top',$scrolled + 'px');
	scrollbar.limit.x = 0;
	$('.layer').each(function(){
		if($(this).offset().top < 0 && $(this).offset().top > $(this).outerHeight() * -1){
			$(this).addClass('current');
			$cta = $(this).find('.content').html();
			if($cta){
				$('.cta').html($cta);
				if($(this).find('.content').find('a').length > 0){
					$('.hit').removeClass('hide');
					$('.hit').attr('href',$(this).find('.content').find('a').attr('href'))
				} else{
					$('.hit').attr('href',$(this).find('.content').find('a').attr('href'))
					$('.hit').addClass('hide');
				}
			} else{
				$('.cta').html('');
			}
		} else{
			$(this).removeClass('current');
		}
	});
	if($scrolled >= $scH - wh*1.1){
		scrollbar.setPosition(0,0)
	}
	$dir = status.direction.y;
	//$extra++;
	$scrolling = true;
	newPos = $scrolled;
	if ( lastPos != null ){ // && newPos < maxScroll 
		delta = newPos -  lastPos;
	}
	lastPos = newPos;
	
	$speed = delta;
	if($speed < 0){
		$speed = $speed *-1;
	}
	clearTimeout(scrollTimeout);
	scrollTimeout = setTimeout( function(){
		$scrolling = false;
	},150);
	
});		
/*$('.hit').click(function(e){
	$link = $('.cta').find('a');
	if($link){
		window.open($link.attr('href'));
	}
	e.preventDefault();
});*/
$('.info-toggle').click(function(e){
	if($('body').hasClass('show-info')){
		$('body').removeClass('show-info')
	} else{
		if($('.info-panel .grid.dates *').length <= 0){
			$scrollInfo = true;
			$('.info-panel .grid.dates').html($('.scroll .vert .show').clone());
		} else{
			$scrollInfo = false;
		}
		if($('.info-panel .grid.social *').length <= 0){
			$scrollInfo = true;
			$('.info-panel .grid.social').html($('.scroll .vert .social').clone());
		} else{
			$scrollInfo = false;
		}
		if($scrollInfo){
			var infoScrollbar = Scrollbar.init($(document).find('.info-panel')[0], {
				speed:2,
				damping: 0.1,
				renderByPixels: true,
				syncCallbacks: true,
				continuousScrolling: false,
				alwaysShowTracks: false,
				overscrollEffect: false
			});			
			infoScrollbar.addListener(function(){
				infoScrollbar.limit.x = 0;
			})			
		}
		$('body').addClass('show-info');
	}
	e.preventDefault();
});
$jump = 0;
$('.vert .intro').click(function(e){
	//Scrollbar.get($('.scroll')[0]).scrollTo(0, $('.intro').height() + wh/4, 1000);
	e.preventDefault();
});
$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        break;

        case 38: // up
 		
		scrollbar.scrollIntoView($(document).find('.layer.current').prev('.layer')[0], {
		offsetLeft: 0,
		offsetTop: wh2 *-1,
		alignToTop: true,
		onlyScrollIfNeeded: true,
		});
        break;

        case 39: // right
        break;

        case 40: // down
        if($jump > $('.layer.show').length){
	        $jump = 0;
        }
		
		scrollbar.scrollIntoView($(document).find('.layer.current').next('.layer')[0], {
		offsetLeft: 0,
		offsetTop: wh2 *-1,
		alignToTop: true,
		onlyScrollIfNeeded: true,
		});
       // console.log($('.layer.show').eq($jump).offset().top +','+ $jump);
        //Scrollbar.get($('.scroll')[0]).scrollTo(0, $('.layer.show').eq($jump).offset().top + wh, 2000);
        //Scrollbar.get($('.scroll')[0]).scrollTo(0, $(document).find('.layer.current').next('.layer').offset().top + wh, 2000);
        $jump++;

        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});
function Tunnel(font) {
	this.init();
	this.createMesh();
	pixelRatio = window.devicePixelRatio || 1;
	composer = new THREE.EffectComposer(this.renderer);
	composer.setSize( $('#scene').width() * pixelRatio, $('#scene').height() * pixelRatio );
	composer.addPass( new THREE.RenderPass( this.scene, this.camera ) );
	
	glitchPass = new THREE.GlitchPass();
	glitchPass.renderToScreen = false;
	composer.addPass( glitchPass );
	afterimagePass = new THREE.AfterimagePass();
	afterimagePass.renderToScreen = true;
	composer.addPass( afterimagePass );
	var index, len;
	var textMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
	len = $('.layer').length;
	index = 0;
	$('.layer').each(function(){
		string1 = $(this).find('h1').find('.line-1').html();
		string2 = $(this).find('h1').find('.line-2').html();
		//console.log(string1);
		/*var pos = string.lastIndexOf(' - ');
			
		string = string.substring(0,pos)+'\n'+string.substring(pos+1);
		var str   = $(this).find('h1').html();
		var regex = /<span>(.*?)<\/span>/;
		console.log(str.substr(str.lastIndexOf(regex) + 1));
		string = str.replace(regex, "\n@ ");*/
		//console.log(string);
		if(string1 && string2){
		var textGeometry1 = new THREE.TextGeometry(string1, {
			font: font,
			size: 3,
			height: .0001,
			curveSegments: 6
		});
		textGeometry1.center();
		var textMesh1 = new THREE.Mesh(textGeometry1, textMaterial);
		i = index;
			textMesh1.position
			.setX(0)
			.setY((ww*.000018))
			.setZ(-i);	
		textMesh1.scale.set(-1 * (ww*.00001),ww*.00001,ww*.00001);
		var textGeometry2 = new THREE.TextGeometry(string2, {
			font: font,
			size: 3,
			height: .0001,
			curveSegments: 6
		});
		textGeometry2.center();
		var textMesh2 = new THREE.Mesh(textGeometry2, textMaterial);
		i = index;
			textMesh2.position
			.setX(0)
			.setY(-(ww*.000018))
			.setZ(-i);	
		textMesh2.scale.set(-1 * (ww*.00001),ww*.00001,ww*.00001);
		group1.add(textMesh1);
		group2.add(textMesh2);
		}	
		index++;
	});
	Scrollbar.get($('.scroll')[0]).scrollTo(0, $('.layer').eq(0).outerHeight()/4, 2000);
	new THREE.Box3().setFromObject( group1 ).getCenter( group1.position ).multiplyScalar( - 1 );
	group1.position.set(0,0,0);
	new THREE.Box3().setFromObject( group1 ).getCenter( group2.position ).multiplyScalar( - 1 );
	group2.position.set(0,0,0);
	
	this.scene.add(group1);
	this.scene.add(group2);
	//camera.lookAt( scene.position );
	this.handleEvents();
	document.body.classList.remove("loading");
	window.requestAnimationFrame(this.render.bind(this));
}
Tunnel.prototype.init = function() {
	this.speed = 0.005;
	this.mouse = {
		position: new THREE.Vector2(0, 0),
		target: new THREE.Vector2(0, 0)
	};
	this.renderer = new THREE.WebGLRenderer({
		antialias:true,
		canvas: document.querySelector("#scene")
	});
	this.renderer.setSize(ww, wh);
	this.renderer.setClearColor(0x000000);
	this.camera = new THREE.PerspectiveCamera(100, ww / wh, 0.01, wh);
	this.camera.position.z = 0;
	this.scene = new THREE.Scene();
	this.scene.fog = new THREE.Fog(0x000000, .01, 3);
};
	
Tunnel.prototype.createMesh = function() {
	var points = [];
	for (var i = 0; i < 15; i += 1) {
		points.push(new THREE.Vector3(0, 0, 2.5 * (i / 4)));
	}
	points[4].y = 0;
	this.curve = new THREE.CatmullRomCurve3(points);
	var geometry = new THREE.Geometry();
	geometry.vertices = this.curve.getPoints(70);
	this.splineMesh = new THREE.Line(geometry, new THREE.LineBasicMaterial());
	this.tubeMaterial = new THREE.MeshBasicMaterial({
		side: THREE.BackSide,
		map: tunnelTexture,
		wireframe:false
	});
	this.tubeMaterial.map.wrapS = THREE.RepeatWrapping;
	this.tubeMaterial.map.wrapT = THREE.RepeatWrapping;
	this.tubeMaterial.map.repeat.set(1, 1);
	this.tubeGeometry = new THREE.TubeGeometry(this.curve, 70, .9, 30, false);
	this.tubeMaterial.map.needsUpdate = true;
	this.tubeMesh = new THREE.Mesh(this.tubeGeometry, this.tubeMaterial);
	this.scene.add(this.tubeMesh);
	/*this.tubeMesh.traverse ( function (child) {
		if (child instanceof THREE.Mesh) {
		    child.visible = false;
		}
	});*/
	this.tubeGeometry_o = this.tubeGeometry.clone();
};
Tunnel.prototype.handleEvents = function() {
	window.addEventListener('resize', this.onResize.bind(this), false);
	//document.body.addEventListener('mousemove', this.onMouseMove.bind(this), false);
};

Tunnel.prototype.onResize = function() {
	ww = $(document).width();
	wh = $(document).height();
	ww2 = ww * 0.5;
	wh2 = wh * 0.5;
	$scH = $('.scroll .scroll-content').height();
	group1.traverse( function( node ) {
	
	    if ( node instanceof THREE.Mesh ) {
			node.scale.set(-1 * (ww*.00001),ww*.00001,ww*.00001);
			node.position
			.setY((ww*.000018))
	    }
	
	} );
	group2.traverse( function( node ) {
	
	    if ( node instanceof THREE.Mesh ) {
			node.scale.set(-1 * (ww*.00001),ww*.00001,ww*.00001);
			node.position
			.setY(-(ww*.000018))
	    }
	
	} );
	factor = $('.layer').eq(0).outerHeight()/wh;
	this.camera.aspect = ww / wh;
	this.camera.updateProjectionMatrix();
	this.renderer.setSize(ww, wh);
};

Tunnel.prototype.onMouseMove = function(e) {
	this.mouse.target.x = (e.clientX - ww2) / ww2;
	this.mouse.target.y = (wh2 - e.clientY) / wh2;
};

Tunnel.prototype.onDeviceOrientationChange = function() {
	var euler = this.deviceOrientation.getScreenAdjustedEuler();
	if(euler.alpha > 0 && euler.beta < 90){
		this.mouse.target.y = (Math.max(-1, Math.min(1, ((euler.beta - 20) / 30))));
		this.mouse.target.x = -(Math.max(-1, Math.min(1, ((euler.gamma) / 30))));
	}
};

Tunnel.prototype.updateCameraPosition = function() {
	this.mouse.position.x += (this.mouse.target.x - this.mouse.position.x) / 30;
	this.mouse.position.y += (this.mouse.target.y - this.mouse.position.y) / 30;
	this.camera.rotation.z = this.mouse.position.x * 0.2;
	this.camera.rotation.y = Math.PI - (this.mouse.position.x * 0.06);
	this.camera.position.x = this.mouse.position.x * 0.015;
	this.camera.position.y = -this.mouse.position.y * 0.015;
};
Tunnel.prototype.updateMaterialOffset = function() {
	if($dir === 'down'){
	this.tubeMaterial.map.offset.x += $speed/1000;	
	this.tubeMaterial.map.offset.y += $speed/3000;		
		
	} else{
	this.tubeMaterial.map.offset.x -= $speed/1000;	
	this.tubeMaterial.map.offset.y -= $speed/3000;		
		
	}
};
Tunnel.prototype.updateCurve = function() {
	var index = 0,
	vertice_o = null,
	vertice = null;
	for (var i = 0, j = this.tubeGeometry.vertices.length; i < j; i += 1) {
		vertice_o = this.tubeGeometry_o.vertices[i];
		vertice = this.tubeGeometry.vertices[i];
		index = Math.floor(i / 30);
		vertice.x += ((vertice_o.x + this.splineMesh.geometry.vertices[index].x) - vertice.x) / 10;
		vertice.y += ((vertice_o.y + this.splineMesh.geometry.vertices[index].y) - vertice.y) / 5;
	}
	this.tubeGeometry.verticesNeedUpdate = true;
	this.curve.points[2].x = -this.mouse.position.x * 0.1;
	this.curve.points[4].x = -this.mouse.position.x * 0.1;
	this.curve.points[2].y = this.mouse.position.y * 0.1;
	this.splineMesh.geometry.verticesNeedUpdate = true;
	this.splineMesh.geometry.vertices = this.curve.getPoints(70);
};
Tunnel.prototype.render = function() {
	this.updateMaterialOffset();
	this.updateCameraPosition();
	group1.position.setZ(($scrolled/factor)/wh);
	group2.position.setZ(($scrolled/factor)/wh);
	this.updateCurve();
	composer.render( this.renderer );
	window.requestAnimationFrame(this.render.bind(this));
};
backgrounds = [
	$templateDirectory + '/promo/assets/images/texture-tour-1.jpg',
	$templateDirectory + '/promo/assets/images/texture-tour-2.jpg',
	$templateDirectory + '/promo/assets/images/texture-tour-3.jpg',
	$templateDirectory + '/promo/assets/images/texture-tour-4.jpg',
	$templateDirectory + '/promo/assets/images/texture-tour-5.jpg',
	$templateDirectory + '/promo/assets/images/texture-tour-6.jpg',
	$templateDirectory + '/promo/assets/images/texture-tour-7.jpg',
	$templateDirectory + '/promo/assets/images/texture-tour-8.jpg',
	$templateDirectory + '/promo/assets/images/texture-tour-9.jpg',
	$templateDirectory + '/promo/assets/images/texture-tour-10.jpg',
	$templateDirectory + '/promo/assets/images/texture-tour-11.jpg',
	$templateDirectory + '/promo/assets/images/texture-tour-12.jpg'
]
var randbg = backgrounds[Math.floor(Math.random() * backgrounds.length)];

//video = document.getElementById( 'video' );
if(webglAvailable()){
	var loader = new THREE.TextureLoader();
	loader.crossOrigin = "Anonymous";
	texture = new THREE.VideoTexture( video );
	/*texture.minFilter = THREE.LinearFilter;
	texture.magFilter = THREE.LinearFilter;
	texture.format = THREE.RGBFormat;*/
	loader.load(randbg, function(texture){
		var font = fontLoader.load( $templateDirectory + '/promo/assets/fonts/Terminal%20Grotesque_Regular.json', function ( font ) {
			window.tunnelTexture = texture;
			ww = $(document).width();
			wh = $(document).height();
			ww2 = ww * 0.5;
			wh2 = wh * 0.5;
			$scH = $('.scroll .scroll-content').height();
			factor = $('.layer').eq(0).outerHeight()/wh;
			setTimeout(function(){
				window.tunnel = new Tunnel(font);	
				this.onResize;	
				
			},300);
		},
		function ( xhr ) {
			//console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
		},
		function ( err ) {
			//console.log( 'An error happened' );
		});	
	});
} else{
	$('body').addClass('no-webgl');
}