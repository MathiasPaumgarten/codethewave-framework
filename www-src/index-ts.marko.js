function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<!doctype html> <html class="no-js" lang><head><meta charset="utf-8"><meta http-equiv="x-ua-compatible" content="ie=edge"><title>sp-framework</title><meta name="description" content><meta name="viewport" content="user-scalable=no, width=device-width"><link rel="apple-touch-icon" href="apple-touch-icon.png"><link rel="stylesheet" href="main.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/detectizr/2.2.0/detectizr.min.js"></script><script src="http://work.molamil.com/trouble/spxboplay/sp-framework/js/pixi.js"></script><script src="./js/popcorn.js"></script></head><body><!--[if lt IE 8]>\n\n        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>\n\n    <![endif]--><script src="sp-framework.js"></script><script id="fragShader" type="shader-code">\n    precision mediump float;\n    uniform vec2      resolution;\n    uniform float     time;\n    uniform float     alpha;\n    uniform vec2      speed;\n    uniform float     shift;\n    uniform float     packing;\n\n\n    float rand(vec2 n) {\n      //This is just a compounded expression to simulate a random number based on a seed given as n\n        return fract(cos(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);\n    }\n\n    float noise(vec2 n) {\n      //Uses the rand function to generate noise\n          const vec2 d = vec2(0.0, 1.0);\n          vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));\n          return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);\n    }\n\n    float fbm(vec2 n) {\n      //fbm stands for "Fractal Brownian Motion" https://en.wikipedia.org/wiki/Fractional_Brownian_motion\n          float total = 0.0, amplitude = 1.0;\n          for (int i = 0; i < 4; i++) {\n           total += noise(n) * amplitude;\n            n += n;\n            amplitude *= 0.8;\n          }\n          return total;\n    }\n\n    void main() {\n        //This is where our shader comes together\n        const vec3 c1 = vec3(126.0/255.0, 0.0/255.0, 47.0/255.0);\n        const vec3 c2 = vec3(173.0/255.0, 0.0/255.0, 1.4/255.0);\n        const vec3 c3 = vec3(0.2, 0.7, 0.0);\n        const vec3 c4 = vec3(164.0/255.0, 1.0/255.0, 214.4/255.0);\n        const vec3 c5 = vec3(1.0);\n        const vec3 c6 = vec3(1.0);\n\n        \n        vec2 p = gl_FragCoord.xy * packing / resolution.xx;\n        //The fbm function takes p as its seed (so each pixel looks different) and time (so it shifts over time)\n        float q = fbm(p - time * 0.1);\n        vec2 r = vec2(fbm(p + q + time * speed.x - p.x - p.y), fbm(p + q - time * speed.y));\n        vec3 c = mix(c1, c2, fbm(p + r)) + mix(c3, c4, r.x) - mix(c5, c6, r.y);\n        float grad = gl_FragCoord.y / resolution.y;\n        gl_FragColor = vec4(c * cos(shift * gl_FragCoord.y / resolution.y), 1.0);\n        gl_FragColor.xyz *= 1.0-grad;\n    }\n    </script><script>\n        var width = window.innerWidth;\n        var height = window.innerHeight;\n        // shader\n        var uniforms = {};\n        uniforms.resolution = { type: \'v2\', value: { x: width, y: height*2}};\n        uniforms.alpha = { type: \'1f\', value: 1.0};\n        uniforms.shift = { type: \'1f\', value: 1.0};\n        uniforms.time = {type: \'1f\',value: 0};\n        uniforms.speed = {type: \'v2\', value: {x: 0.7, y: 0.4}};\n        uniforms.packing = {type: \'1f\', value: 0.0};\n\n\n        \n        var shader;\n        var deltaTime = 0\n        var theta = 0.003\n        var lastFreq;\n        var f1 = 0;\n        var f2 = 0;\n        var f3 = 0;\n        var f4 = 0;\n        function lerp(start, end, amt){\n            return (1-amt)*start+amt*end\n        }\n        SPF.set({\n\n            at: \'back\',\n\n            debug:true,\n\n            load: function(PIXI, input){\n                return [];\n            },\n\n            init: function(PIXI, input) {\n                //add stuff to input.container to have it drawn\n                var shaderCode = document.getElementById( \'fragShader\' ).innerHTML\n                shader = new PIXI.AbstractFilter(\'\',shaderCode, uniforms);\n\n                var bg = new PIXI.Sprite()\n                bg.width = width;\n                bg.height = height;\n                bg.filters = [shader]\n                input.container.addChild(bg);\n            },\n\n            render: function(PIXI, input) {\n                deltaTime+=0.01\n                if(input.audio != null && input.audio.frequencies != null){\n\n                    var freqs = input.audio.frequencies()\n                    if(lastFreq != null){\n                        SPF.log("freqs[0]", freqs[0])\n                        var nf1 = lerp(freqs[0], lastFreq[0], theta);\n                        var xSpeed = (nf1-f1)*0.002\n                        SPF.log("xSpeed", xSpeed)\n                        f1 = nf1\n                        \n                        var nf2 = lerp(freqs[1], lastFreq[1], theta);\n                        var ySpeed = (nf2-f2)*0.002\n                        SPF.log("ySpeed", xSpeed)\n                        f2 = nf2\n\n                        shader.uniforms.speed.value = {\n                            x:xSpeed,\n                            y:ySpeed\n                        }\n                        // shader.uniforms.speed.value = {\n                        //     x:0,\n                        //     y:0\n                        // }\n\n                        \n                        var nf3 = lerp(freqs[2], lastFreq[2], theta);\n                        deltaTime+=(nf3-f3)*0.0000002\n                        SPF.log("deltaTime", deltaTime)\n\n                        \n                        var n = 8*lerp(freqs[4]/255, lastFreq[4]/255, 0.3)\n                        f4 = lerp(f4,n,0.03)\n                        shader.uniforms.packing.value = f4;\n                        SPF.log("packing", f4)\n                    }\n                    lastFreq = freqs\n                }\n                shader.uniforms.time.value = deltaTime;\n                \n            },\n\n\n            resize: function(PIXI, input, w, h) {\n\n                // w += w*0.5;\n                // h += h*0.5;\n\n                // sprite.scale = new PIXI.Point(1,1);\n\n                // ratio = w/h;\n\n                // var width = w;\n                // var height = h*ratio;\n\n                // if(w <h){\n                //     ratio = h/w;\n                //     height = h;\n                //     width = w*ratio;\n                // };\n\n                // sprite.width = width;\n                // sprite.height = height;\n\n                // sprite.position.x = w/3;\n                // sprite.position.y = h/3;\n\n            }\n\n        });\n\n\n\n    </script></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);