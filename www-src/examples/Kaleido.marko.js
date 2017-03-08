function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<!doctype html> <html class="no-js" lang><head><title>Cast</title><meta charset="utf-8"><meta http-equiv="x-ua-compatible" content="ie=edge"><meta name="description" content><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><link rel="apple-touch-icon" href="apple-touch-icon.png"><link rel="stylesheet" type="text/css" href="https://cloud.typography.com/7214534/7144972/css/fonts.css"><link rel="stylesheet" href="../main.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/detectizr/2.2.0/detectizr.min.js"></script><script src="../js/pixi.min.js"></script><script src="../js/TweenMax.min.js"></script><script id="kaleido-shader" type="x-shader/x-fragment">\n            #ifdef GL_OES_standard_derivatives\n            #extension GL_OES_standard_derivatives : enable\n            #endif\n\n            #define PI 3.141592653589793\n            #define TAU 6.283185307\n\n            varying vec2 vTextureCoord;\n\n            uniform sampler2D uSampler;\n            uniform vec2 resolution;\n            uniform float maxSize;\n            uniform float radius;\n            uniform float hyper;\n            uniform vec2 mouse;\n\n            const float slices = 32.0;\n            const float frequency = 60.0;\n\n            const vec4 white = vec4( 1 );\n            const vec4 black = vec4( 0, 0, 0, 1 );\n            const vec4 BASE = vec4( 171. / 255., 197. / 255., 198. / 255., 1 );\n\n            float aastep( float threshold, float value ) {\n                #ifdef GL_OES_standard_derivatives\n                    float afwidth = 0.7 * length( vec2( dFdx( value ), dFdy( value ) ) );\n                #else\n                    float afwidth = frequency * ( 1.0 / 200.0 ) / cos( 0.0 );\n                #endif\n\n                return smoothstep( threshold - afwidth, threshold + afwidth, value );\n            }\n\n            vec4 halftone( vec4 color, vec2 uv ) {\n                vec2 st2 = mat2( 0.707, -0.707, 0.707, 0.707 ) * ( gl_FragCoord.xy / max( resolution.x, resolution.y ) );\n                vec2 nearest = 2.0 * fract( frequency * st2 ) - 1.0;\n                float dist = length( nearest );\n                float radius = sqrt( 1.0 - color.g );\n\n                vec4 antiMouse = vec4( 1.0 - mouse.x, 1.0 - mouse.y, 0, 1 );\n\n                return mix( black, white, aastep( radius, dist ) );\n            }\n\n            vec4 grayscale( vec4 color ) {\n                float gray = dot( color.rgb, vec3( 0.299, 0.587, 0.114 ) );\n\n                return vec4( gray, gray, gray, color.a );\n            }\n\n            vec2 polarToCartesian( float angle, float r ) {\n                return vec2(\n                    r * cos( angle ),\n                    r * sin( angle )\n                );\n            }\n\n            vec3 drawCircle( vec2 center ) {\n\n                vec2 positionFromCenter = gl_FragCoord.xy - center;\n                float distancePercent = length( positionFromCenter ) / radius;\n\n                distancePercent = min( distancePercent, 1.0 );\n\n                float piece = 1.0 / slices;\n\n                vec2 positionDirection = normalize( positionFromCenter );\n\n                float angle = atan( positionDirection.y, positionDirection.x );\n                float anglePercent = ( 1.0 + ( angle / PI ) ) / 2.0;\n\n                float leftover = mod( anglePercent, piece );\n                float sectionPercent = leftover / piece;\n\n                float index = floor( anglePercent / piece );\n\n                if ( mod( index, 2.0 ) == 0.0 ) {\n                    sectionPercent = 1.0 - sectionPercent;\n                    leftover = piece - leftover;\n                }\n\n                vec2 uv = polarToCartesian( leftover * TAU, distancePercent * radius );\n\n                uv /= vec2( radius, maxSize );\n\n                vec2 triangleBox = vec2( radius, maxSize );\n\n                vec2 scaleVector = triangleBox / resolution;\n                float scale = max( scaleVector.x, scaleVector.y );\n\n                vec2 scaleBox = resolution * scale;\n                vec2 startingPoints = scaleBox / 2.0 - triangleBox / 2.0;\n\n                vec2 coord = startingPoints + uv * triangleBox;\n\n                uv = coord / scaleBox;\n\n                return texture2D( uSampler, uv ).rgb;\n            }\n\n\n            void main() {\n\n                vec2 center = resolution / 2.0;\n                vec2 uv = gl_FragCoord.xy / resolution;\n\n                float seperation = radius;\n\n                vec2 upperLeft = center - vec2( seperation );\n                vec2 upperRight = center + vec2( seperation, - seperation );\n                vec2 lowerRight = center + vec2( seperation );\n                vec2 lowerLeft = center + vec2( - seperation, seperation );\n\n                vec2 xy = gl_FragCoord.xy;\n\n                float centerDistance = distance( xy, center );\n                float upperLeftDistance = distance( xy, upperLeft );\n                float upperRightDistance = distance( xy, upperRight );\n                float lowerRightDistance = distance( xy, lowerRight );\n                float lowerLeftDistance = distance( xy, lowerLeft );\n\n                vec2 points[ 5 ];\n                points[ 0 ] = center;\n                points[ 1 ] = upperLeft;\n                points[ 2 ] = upperRight;\n                points[ 3 ] = lowerRight;\n                points[ 4 ] = lowerLeft;\n\n                float distances[ 5 ];\n                distances[ 0 ] = centerDistance;\n                distances[ 1 ] = upperLeftDistance;\n                distances[ 2 ] = upperRightDistance;\n                distances[ 3 ] = lowerRightDistance;\n                distances[ 4 ] = lowerLeftDistance;\n\n                float smallest = max( resolution.x, resolution.y );\n                vec3 pixel;\n\n                gl_FragColor = BASE;\n\n                for ( int i = 0; i < 5; i++ ) {\n                    if ( distances[ i ] < smallest ) {\n                        smallest = distances[ i ];\n\n                        vec4 color = vec4( drawCircle( points[ i ] ), 1.0 );\n\n                        gl_FragColor = mix(\n                            color,\n                            halftone( color, uv ),\n                            hyper\n                        );\n                    }\n                }\n            }\n        </script><script id="stripe-shader" type="x-shader/x-fragment">\n            #define PI 3.141592653589793\n            #define TAU 6.283185307\n\n            uniform float time;\n            uniform float hyper;\n            uniform vec2 mouse;\n\n            const vec4 black = vec4( 0, 0, 0, 1 );\n            const vec4 white = vec4( 1 );\n\n            void main() {\n\n                float offset = mod( time, 40.0 ) / 40.0;\n                offset = ( sin( TAU * offset ) * 0.5 + 0.5 ) * 20.0;\n\n                float value = mod( gl_FragCoord.y + ( gl_FragCoord.x / 20.0 ) * offset,  20.0 );\n\n                float lowerEdge = ( 1.0 - smoothstep( 0.0, 1.0, value ) ) * ( 1.0 - step( 1.0, value ) );\n                float middleEdge = smoothstep( 9.0, 11.0, value );\n\n                gl_FragColor =\n                    mix(\n                        black,\n                        vec4( mouse.x, mouse.y, 0, 1 ),\n                        lowerEdge + middleEdge\n                    );\n            }\n        </script></head><body><!--[if lt IE 8]>\n\n        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>\n\n    <![endif]--><script src="../sp-framework.js"></script><script type="text/javascript">\n\n        // Constants\n        var TAU = Math.PI * 2;\n        var PI_HALF = Math.PI * 0.5;\n\n        // Variables\n        var fragmentShader = document.getElementById( "kaleido-shader" ).innerText;\n        var stripeShader = document.getElementById( "stripe-shader" ).innerText;\n        var isMouseDown = false;\n        var background, mask;\n        var stripeLayer;\n        var kaleidoFilter, stripeFilter;\n        var elements = [];\n        var graphics;\n        var radiusTarget, radius;\n\n        // Helpers\n        function getSide( value ) {\n            return 2 * value * Math.cos( PI_HALF - ( ( TAU / 12 ) / 2 ) );\n        }\n\n        function randomItem( array ) {\n            return array[ Math.floor( Math.random() * array.length ) ];\n        }\n\n        // Background\n        SPF.set( {\n\n            at: "back",\n\n            load: function( PIXI, input ) {\n                graphics = [\n                    input.graphics.animaltech,\n                    input.graphics.bbbbird1,\n                    input.graphics.botanicorganic,\n                    input.graphics.handdrawnanimal1,\n                    input.graphics.crazyflower1,\n                    input.graphics.leaf1,\n                    input.graphics.flower1,\n                    input.graphics.stone,\n                    input.graphics.wingwave\n                ];\n\n                return graphics;\n            },\n\n            init: function( PIXI, input ) {\n                try {\n\n                var holder = new PIXI.Sprite();\n\n                background = new PIXI.Graphics();\n                background.clear();\n                background.beginFill( 0 );\n                background.drawRect( 0, 0, 1024, 512 );\n                background.endFill();\n\n                holder.addChild( background );\n\n                for ( var i = 0; i < 5; i++ ) {\n                    var sprite = new PIXI.extras.TilingSprite( randomItem( graphics ), 1, 1 );\n                    sprite.rotation = Math.PI * Math.random() * 2;\n                    sprite.width = 500;\n                    sprite.height = 500;\n                    sprite.anchor.set( 0.5, 0.5 )\n                    sprite.x = Math.random() * window.innerWidth;\n                    sprite.y = Math.random() * window.innerHeight;\n                    sprite.rotationSpeed = -0.03 + Math.random() * 0.06;\n\n                    holder.addChild( sprite );\n\n                    elements.push( sprite );\n                }\n\n                radius = radiusTarget = Math.sqrt( window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight );\n\n                kaleidoFilter = new PIXI.AbstractFilter( "", fragmentShader, {\n                    resolution: { type: "vec2", value: { x: window.innerWidth, y: window.innerHeight } },\n                    maxSize: { type: "float", value: getSide( radiusTarget ) },\n                    radius: { type: "float", value: radiusTarget },\n                    hyper: { type: "float", value: 0 },\n                    mouse: { type: "vec2", value: { x: 0, y: 0 } }\n                } );\n\n                mask = new PIXI.Graphics();\n                mask.beginFill( 0 );\n                mask.drawRect( 0, 0, input.width, input.height );\n                mask.endFill();\n\n                holder.mask = mask;\n\n                input.container.addChild( holder );\n                input.container.filters = [ kaleidoFilter ];\n\n                } catch( e ) {\n                    console.error( e )\n                }\n            },\n\n            resize: function( PIXI, input ) {\n                [ background, mask ].forEach( function( graphic ) {\n                    graphic.clear();\n                    graphic.beginFill( parseInt( "C9953B", 16 ) );\n                    graphic.drawRect( 0, 0, input.width, input.height );\n                    graphic.endFill();\n                } );\n\n                radius = radiusTarget = Math.sqrt( window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight );\n\n                kaleidoFilter.uniforms.resolution.x = window.innerWidth;\n                kaleidoFilter.uniforms.resolution.y = window.innerHeight;\n            },\n\n            render: function( PIXI, input ) {\n\n                try {\n\n                elements.forEach( function( sprite ) {\n                    sprite.rotation += sprite.rotationSpeed;\n                } );\n\n                if ( input.beat ) radius = radiusTarget + 300;\n\n                radius -= 5;\n                radius = Math.max( radiusTarget, radius );\n\n                kaleidoFilter.uniforms.radius = radius;\n                kaleidoFilter.uniforms.maxSize = getSide( radius );\n                kaleidoFilter.uniforms.hyper = isMouseDown ? 1 : 0;\n\n                kaleidoFilter.uniforms.mouse.x = input.mouseTouchPosition.x / input.width;\n                kaleidoFilter.uniforms.mouse.y = input.mouseTouchPosition.y / input.height;\n\n                } catch( e ) {\n                    console.warn( e );\n                }\n            }\n\n        } );\n\n        var time = 0;\n\n        // Video\n        SPF.set( {\n\n            at: "mid",\n\n            init: function( PIXI, input ) {\n\n                try {\n\n                stripeFilter = new PIXI.AbstractFilter( "", stripeShader, {\n                    time: { type: "float", value: time },\n                    mouse: { type: "vec2", value: { x: 0.5, y: 0.5 } }\n                    // hyper: { type: "float", value: 0 }\n                } );\n\n                stripeLayer = new PIXI.Graphics();\n                stripeLayer.filters = [ stripeFilter ];\n\n                input.container.addChild( stripeLayer );\n\n                } catch( e ) {\n                    console.warn( e );\n                }\n            },\n\n            mouseDownTouchStart: function( PIXI, input ) {\n                stripeLayer.clear();\n                stripeLayer.beginFill( 0x00ff00 );\n                stripeLayer.drawRect( 0, 0, input.width, input.height );\n                stripeLayer.endFill();\n\n                SPF.midgroundMask( true );\n\n                isMouseDown = true;\n                // spriteFilters.uniforms.hyper = 1;\n            },\n\n            mouseUpTouchEnd: function() {\n                SPF.midgroundMask( false );\n\n                stripeLayer.clear();\n\n                isMouseDown = false;\n                // spriteFilters.uniforms.hyper = 0;\n            },\n\n            render: function( PIXI, input ) {\n                try {\n\n                    stripeFilter.uniforms.time = ( time += 0.1 );\n                    stripeFilter.uniforms.mouse.x = input.mouseTouchPosition.x / input.width;\n                    stripeFilter.uniforms.mouse.y = input.mouseTouchPosition.y / input.height;\n\n                } catch( e ) {\n                    console.warn( e );\n                }\n            }\n\n        } );\n\n\n        SPF.info( {\n            debug: false,\n            title: "Kaleido",\n            tip: "Press or hold mouse down for crazy mode",\n            firstName: "Mathias",\n            lastName: "Paumgarten",\n            email: "mail@mathias-paumgarten.com"\n        } );\n\n        SPF.start();\n\n    </script></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);