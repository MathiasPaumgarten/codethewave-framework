function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<!doctype html> <html class="no-js" lang><head><meta charset="utf-8"><meta http-equiv="x-ua-compatible" content="ie=edge"><title>RE1</title><meta name="description" content><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><link rel="apple-touch-icon" href="apple-touch-icon.png"><link rel="stylesheet" href="main.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/detectizr/2.2.0/detectizr.min.js"></script><script src="./js/pixi.min.js"></script></head><body><!--[if lt IE 8]>\n\n        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>\n\n    <![endif]--><script src="sp-framework.js"></script><script src="//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.11/require.min.js"></script><script>\n\n\n        require.config({\n            baseUrl: \'http://scarletpleasure.molamil.com/node_modules/\',\n            packages: [\n                {\n                    name: \'boid\',\n                    main: \'dist/boid.min.js\'\n                }\n\n            ]\n        });\n\n        require(\n                [\'boid\'],\n\n                function(Boid) {\n\n\n                    var background;\n\n                    SPF.set({\n\n                        at:"back",\n\n\n                        init: function(PIXI, input) {\n\n                            var w =  input.width;\n                            var h =  input.height;\n\n                            background = new PIXI.Graphics();\n\n                            var c = input.colors[Math.round(Math.random()*( input.colors.length-1))];\n                            background.clear();\n                            background.beginFill(c, 1);\n                            background.drawRect(0,0,w,h);\n                            background.endFill();\n\n                            input.container.addChild(background);\n\n                        }\n\n\n                    });\n\n\n\n\n                    var tilingSpriteBack;\n\n                    var total = 22;\n                    var boids = new Array(); // of b and g\n                    var b, g;\n\n\n                    function createBoids(input, w,h){\n\n\n                        if(boids != null){\n                            for(var i=0;i<boids.length; i++){\n                                input.container.removeChild(boids[i]["g"]);\n                            }\n                        }\n\n                        boids = new Array();\n\n                        for(var i=0;i<total; i++){\n\n                            b = new Boid();\n                            b.position.x = w / 2;\n                            b.position.y = h / 2;\n\n                            b.setBounds(w, h, 0,0);\n\n                            b.edgeBehavior = Boid.EDGE_WRAP;\n\n                            var ts = [input.graphics.handdrawnanimal1, input.graphics.handdrawnanimal2];\n\n                            var t = ts[Math.round(Math.random()*(ts.length-1))];\n\n                            g = new PIXI.Sprite(t);\n                            g.scale.set(0.8);\n                            g.rotation = (Math.random()*90)*4;\n                            g.position.set(b.position.x, b.position.y);\n                            input.container.addChild(g);\n\n                            boids.push({"b":b, "g":g});\n                        }\n\n                    };\n\n\n                    SPF.set({\n\n                        at: \'mid\', // "fore" "mid" or "back"\n\n                        load: function(PIXI, input) {\n                            return [input.patterns.botanicorganic2, input.graphics.handdrawnanimal2, input.graphics.handdrawnanimal1];\n                        },\n\n                        init: function(PIXI, input) {\n\n                            var w =  input.width;\n                            var h =  input.height;\n\n                            tilingSpriteBack = new PIXI.extras.TilingSprite(input.patterns.botanicorganic2, 1, 1);\n                            tilingSpriteBack.anchor.set(0);\n                            input.container.addChild(tilingSpriteBack);\n\n                            createBoids(input,w,h);\n\n                            SPF.midgroundMask(true);\n\n                        },\n\n                        render: function(PIXI, input) {\n\n                            var w =  input.width;\n                            var h =  input.height;\n\n\n                            for (var i = 0; i < boids.length; i++) {\n\n                                b = boids[i]["b"];\n                                g = boids[i]["g"];\n\n                                b.wander().update();\n\n                                g.position.set(b.position.x, b.position.y);\n\n                            }\n\n                            var fs = input.audio.frequencies();\n\n                            var f = 0;\n                            var fAvailable= 0;\n\n                            if(fs) {\n\n                                for(var i=0;i<fs.length; i++){\n                                    if(fs[i] > 0){\n                                        f += fs[i];\n                                        fAvailable++;\n                                    }\n                                }\n\n                                f = (f/(255*fAvailable));\n\n\n                                if(f>0.4){\n                                    SPF.midgroundMask(false);\n\n                                    var c = input.colors[Math.round(Math.random()*( input.colors.length-1))];\n                                    background.clear();\n                                    background.beginFill(c, 1);\n                                    background.drawRect(0,0,w,h);\n                                    background.endFill();\n\n                                } else {\n                                    SPF.midgroundMask(true);\n                                }\n\n\n                            };\n\n                        },\n\n                        resize: function(PIXI, input) {\n\n                            var w =  input.width;\n                            var h =  input.height;\n\n                            createBoids(input, w, h);\n\n                            tilingSpriteBack.width = w*2;\n                            tilingSpriteBack.height = h*2;\n\n                        }\n\n                    });\n\n\n                    SPF.info({debug:false, title:"RE BOIDS 01", tip:"", firstName:"Ramiro", lastName:"Espada", email:"re@ramiroespada.com"});\n\n                    SPF.start("chorus1");\n\n\n                }\n\n        );\n\n\n    </script></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);