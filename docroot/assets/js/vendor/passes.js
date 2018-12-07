THREE.CopyShader = {

	uniforms: {

		"tDiffuse": { value: null },
		"opacity":  { value: .90 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

	fragmentShader: [

		"uniform float opacity;",

		"uniform sampler2D tDiffuse;",

		"varying vec2 vUv;",

		"void main() {",

			"vec4 texel = texture2D( tDiffuse, vUv );",
			"gl_FragColor = opacity * texel;",

		"}"

	].join( "\n" )

};
/**
 * @author alteredq / http://alteredqualia.com/
 */
/**
 * @author felixturner / http://airtight.cc/
 *
 * RGB Shift Shader
 * Shifts red and blue channels from center in opposite directions
 * Ported from http://kriss.cx/tom/2009/05/rgb-shift/
 * by Tom Butterworth / http://kriss.cx/tom/
 *
 * amount: shift distance (1 is width of input)
 * angle: shift angle in radians
 */

THREE.DigitalGlitch = {

	uniforms: {

		"tDiffuse":		{ value: null },//diffuse texture
		"tDisp":		{ value: null },//displacement texture for digital glitch squares
		"byp":			{ value: 0 },//apply the glitch ?
		"amount":		{ value: 0.0008 },
		"angle":		{ value: 0 },
		"seed":			{ value: 0.02 },
		"seed_x":		{ value: 0.02 },//-1,1
		"seed_y":		{ value: 0.02 },//-1,1
		"distortion_x":	{ value: 2.5 },
		"distortion_y":	{ value: 2.6 },
		"col_s":		{ value: 0.15 }
	},

	vertexShader: [

		"varying vec2 vUv;",
		"void main() {",
			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
		"}"
	].join( "\n" ),

	fragmentShader: [
		"uniform int byp;",//should we apply the glitch ?
		
		"uniform sampler2D tDiffuse;",
		"uniform sampler2D tDisp;",
		
		"uniform float amount;",
		"uniform float angle;",
		"uniform float seed;",
		"uniform float seed_x;",
		"uniform float seed_y;",
		"uniform float distortion_x;",
		"uniform float distortion_y;",
		"uniform float col_s;",
			
		"varying vec2 vUv;",
		
		
		"float rand(vec2 co){",
			"return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);",
		"}",
				
		"void main() {",
			"if(byp<1) {",
				"vec2 p = vUv;",
				"float xs = floor(gl_FragCoord.x / 0.25);",
				"float ys = floor(gl_FragCoord.y / 0.25);",
				//based on staffantans glitch shader for unity https://github.com/staffantan/unityglitch
				"vec4 normal = texture2D (tDisp, p*seed*seed);",
				"if(p.y<distortion_x+col_s && p.y>distortion_x-col_s*seed) {",
					"if(seed_x>0.){",
						"p.y = 1. - (p.y + distortion_y);",
					"}",
					"else {",
						"p.y = distortion_y;",
					"}",
				"}",
				"if(p.x<distortion_y+col_s && p.x>distortion_y-col_s*seed) {",
					"if(seed_y>0.){",
						"p.x=distortion_x;",
					"}",
					"else {",
						"p.x = 1. - (p.x + distortion_x);",
					"}",
				"}",
				"p.x+=normal.x*seed_x*(seed/5.);",
				"p.y+=normal.y*seed_y*(seed/5.);",
				//base from RGB shift shader
				"vec2 offset = amount * vec2( cos(angle), sin(angle));",
				"vec4 cr = texture2D(tDiffuse, p);",
				"vec4 cga = texture2D(tDiffuse, p);",
				"vec4 cb = texture2D(tDiffuse, p);",
				"gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);",
				//add noise
				"vec4 snow = 100.*amount*vec4(rand(vec2(xs * seed,ys * seed*5.))*0.0);",
				"gl_FragColor = gl_FragColor+ snow;",
			"}",
			"else {",
				"gl_FragColor=texture2D (tDiffuse, vUv);",
			"}",
		"}"

	].join( "\n" )

};

THREE.AfterimageShader = {

	uniforms: {

		"damp": { value: 0.96 },
		"tOld": { value: null },
		"tNew": { value: null }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

	fragmentShader: [

		"uniform float damp;",

		"uniform sampler2D tOld;",
		"uniform sampler2D tNew;",

		"varying vec2 vUv;",
		
		"vec4 when_gt( vec4 x, float y ) {",

			"return max( sign( x - y ), 0.0 );",

		"}",

		"void main() {",

			"vec4 texelOld = texture2D( tOld, vUv );",
			"vec4 texelNew = texture2D( tNew, vUv );",
			
			"texelOld *= damp * when_gt( texelOld, 0.05 );",

			"gl_FragColor = max(texelNew, texelOld);",

		"}"

	].join( "\n" )

};

  THREE.HorizontalBlurShader = {

    uniforms: {

      "tDiffuse": {
        value: null
      },
      "h": {
        value: 1.0 / 256.0
      },
      "mouse": {
        value: new THREE.Vector2()
      },
      "ratio": {
        value: window.innerWidth / window.innerHeight
      }
    },

 	vertexShader: [

		" varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

 	fragmentShader: [
		"uniform sampler2D tDiffuse;",
		"uniform float h;",
		"uniform vec2 mouse;",
		"uniform float ratio;",
		"varying vec2 vUv;",

	  "void main() {",
      "vec2 uv = vUv;",
      "uv = -1. + 2. * uv;",
      "uv -= mouse;",
      "uv.x *= ratio;",
      "if ( length(uv) > 0.2 ) {",
        "gl_FragColor = texture2D(tDiffuse, vUv);",
     " } ",
     " else{",

        "vec4 sum = vec4( 0.0 );",

        "sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;",
        "sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;",
        "sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;",
        "sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;",
        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;",
        "sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;",
        "sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;",
        "sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;",
        "sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;",

        "gl_FragColor = sum;",
      "}",

		"}"
	].join( "\n" )
		
  };
 
  THREE.VerticalBlurShader = {

    uniforms: {

      "tDiffuse": {
        value: null
      },
      "v": {
        value: 1.0 / 256.0
      },
      "mouse": {
        value: new THREE.Vector2()
      },
      "ratio": {
        value: window.innerWidth / window.innerHeight
      }

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
		"uniform float v;",
		"uniform vec2 mouse;",
		"uniform float ratio;",
		"varying vec2 vUv;",

	  "void main() {",
      "vec2 uv = vUv;",
      "uv = -1. + 2. * uv;",
      "uv -= mouse;",
      "uv.x *= ratio;",
      "if ( length(uv) > 0.2 ) {",
        "gl_FragColor = texture2D(tDiffuse, vUv);",
      "}",
      "else{",
        "vec4 sum = vec4( 0.0 );",

        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;",
        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;",
        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;",
        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;",
        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;",
        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;",
        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;",
        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;",
        "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;",

        "gl_FragColor = sum;",
      "}",

		"}"
	].join( "\n" )
  };
 THREE.VolumetericLightShader = {
  uniforms: {
    tDiffuse: {value:null},
    lightPosition: {value: new THREE.Vector2(0.5, 0.5)},
    exposure: {value: 0.18},
    decay: {value: 0.95},
    density: {value: 0.8},
    weight: {value: 0.4},
    samples: {value: 50}
  },

  vertexShader: [
    "varying vec2 vUv;",
    "void main() {",
      "vUv = uv;",
      "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
    "}"
  ].join("\n"),

  fragmentShader: [
    "varying vec2 vUv;",
    "uniform sampler2D tDiffuse;",
    "uniform vec2 lightPosition;",
    "uniform float exposure;",
    "uniform float decay;",
    "uniform float density;",
    "uniform float weight;",
    "uniform int samples;",
    "const int MAX_SAMPLES = 100;",
    "void main()",
    "{",
      "vec2 texCoord = vUv;",
      "vec2 deltaTextCoord = texCoord - lightPosition;",
      "deltaTextCoord *= 1.0 / float(samples) * density;",
      "vec4 color = texture2D(tDiffuse, texCoord);",
      "float illuminationDecay = 1.0;",
      "for(int i=0; i < MAX_SAMPLES; i++)",
      "{",
        "if(i == samples){",
          "break;",
        "}",
        "texCoord -= deltaTextCoord;",
        "vec4 sample = texture2D(tDiffuse, texCoord);",
        "sample *= illuminationDecay * weight;",
        "color += sample;",
        "illuminationDecay *= decay;",
      "}",
      "gl_FragColor = color * exposure;",
    "}"
  ].join("\n")
};

THREE.AdditiveBlendingShader = {
  uniforms: {
    tDiffuse: { value:null },
    tAdd: { value:null }
  },

  vertexShader: [
    "varying vec2 vUv;",
    "void main() {",
      "vUv = uv;",
      "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
    "}"
  ].join("\n"),

  fragmentShader: [
    "uniform sampler2D tDiffuse;",
    "uniform sampler2D tAdd;",
    "varying vec2 vUv;",
    "void main() {",
      "vec4 color = texture2D( tDiffuse, vUv );",
      "vec4 add = texture2D( tAdd, vUv );",
      "gl_FragColor = color + add;",
    "}"
  ].join("\n")
};

THREE.PassThroughShader = {
	uniforms: {
		tDiffuse: { value: null }
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
    "varying vec2 vUv;",
    "void main() {",
			"gl_FragColor = texture2D( tDiffuse, vec2( vUv.x, vUv.y ) );",
		"}"
	].join( "\n" )
};
