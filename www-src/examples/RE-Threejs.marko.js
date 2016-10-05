function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<!doctype html> <html class="no-js" lang><head><meta charset="utf-8"><meta http-equiv="x-ua-compatible" content="ie=edge"><title>RE Threejs</title><meta name="description" content><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><link rel="apple-touch-icon" href="apple-touch-icon.png"><link rel="stylesheet" href="../main.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/detectizr/2.2.0/detectizr.min.js"></script><script src="../js/pixi.min.js"></script></head><body><canvas id="reThreejs" style="display: none"></canvas><!--[if lt IE 8]>\n\n        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>\n\n    <![endif]--><script src="../sp-framework.js"></script><script src="//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.11/require.min.js"></script><script>\n\n\n        require.config({\n            baseUrl: \'http://scarletpleasure.molamil.com/node_modules/\',\n            packages: [\n                {\n                    name: \'three\',\n                    main: \'build/three.min.js\'\n                }\n\n            ]\n        });\n\n        require(\n                [\'three\'],\n\n                function(THREE) {\n\n                    var reThreejsCanvas = document.getElementById("reThreejs");\n\n\n                    // THREEJS\n\n                    var scene = new THREE.Scene();\n\n                    var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);\n                    camera.position.z = 500;\n                    scene.add(camera);\n\n                    var geometry = new THREE.CubeGeometry(100, 100, 100);\n                    var material = new THREE.MeshNormalMaterial();\n\n                    var mesh = new THREE.Mesh(geometry, material);\n                    scene.add(mesh);\n\n\n\n                    var renderer = new THREE.WebGLRenderer({"canvas":reThreejsCanvas});\n                    renderer.setSize(window.innerWidth, window.innerHeight);\n\n\n                    // PIXI\n\n                    var sprite;\n\n                    var s, fs;\n\n                    function createSprite(PIXI, input){\n\n\n                        if(sprite != null){\n                            input.container.removeChild(sprite);\n                            sprite = null;\n                        }\n\n                        sprite = new PIXI.Sprite(PIXI.Texture.fromCanvas(reThreejsCanvas, PIXI.SCALE_MODES.DEFAULT));\n                        sprite.anchor.set(0);\n                        input.container.addChild(sprite);\n\n                        sprite.width = input.width;\n                        sprite.height = input.height;\n                    }\n\n                    SPF.set({\n\n                        at:"back",\n\n                        load: function(PIXI, input) {\n                            return [input.patterns.botanicorganic2];\n                        },\n\n                        init: function(PIXI, input) {\n\n                            createSprite(PIXI, input);\n                        },\n\n                        render:function(PIXI, input){\n\n                            //\n                            mesh.rotation.x += 0.07;\n                            mesh.rotation.y += 0.02;\n                            renderer.render(scene, camera);\n                            //\n\n\n                            if(input.audio != null){\n                                fs = input.audio.frequencies();\n                                s = 1 + (fs[0]/100);\n                                mesh.scale.set( s,s,s);\n                            }\n\n                            if(sprite != null)\n                                sprite.texture.update();\n\n                        },\n\n                        resize: function(PIXI, input) {\n\n                            var w =  input.width;\n                            var h =  input.height;\n\n                            camera.aspect = w / h;\n                            camera.updateProjectionMatrix();\n                            renderer.setSize( w, h);\n\n                            createSprite(PIXI, input);\n\n                        }\n\n                    });\n\n                    SPF.info({debug:false, title:"RE Threejs", tip:"", firstName:"Ramiro", lastName:"Espada", email:"re@ramiroespada.com"});\n\n                    SPF.start();\n\n              }\n\n        );\n\n    </script></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);