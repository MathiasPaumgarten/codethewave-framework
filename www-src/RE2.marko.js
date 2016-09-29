function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<!doctype html> <html class="no-js" lang><head><meta charset="utf-8"><meta http-equiv="x-ua-compatible" content="ie=edge"><title>RE2</title><meta name="description" content><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><link rel="apple-touch-icon" href="apple-touch-icon.png"><link rel="stylesheet" href="main.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/detectizr/2.2.0/detectizr.min.js"></script><script src="./js/pixi.min.js"></script></head><body><!--[if lt IE 8]>\n\n        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>\n\n    <![endif]--><script src="sp-framework.js"></script><script>\n\n\n        var background;\n\n        SPF.set({\n\n            at:"back",\n\n\n            init: function(PIXI, input) {\n\n                var w =  input.width;\n                var h =  input.height;\n\n                background = new PIXI.Graphics();\n\n                var c = input.colors[Math.round(Math.random()*( input.colors.length-1))];\n                background.clear();\n                background.beginFill(c, 1);\n                background.drawRect(0,0,w,h);\n                background.endFill();\n\n                input.container.addChild(background);\n\n            },\n\n            resize :function(PIXI, input) {\n\n                var w =  input.width;\n                var h =  input.height;\n\n                var c = input.colors[Math.round(Math.random()*( input.colors.length-1))];\n                background.clear();\n                background.beginFill(c, 1);\n                background.drawRect(0,0,w,h);\n                background.endFill();\n\n\n            }\n\n        });\n\n\n\n        var mid;\n\n        SPF.set({\n\n            at: \'mid\', // "fore" "mid" or "back"\n\n\n            init: function(PIXI, input) {\n\n                var w =  input.width;\n                var h =  input.height;\n\n                mid = new PIXI.Graphics();\n\n                mid.clear();\n                mid.beginFill(0x000000, 1);\n                mid.drawRect(0,0,w,h);\n                mid.endFill();\n\n                input.container.addChild(mid);\n\n                mid.visible = false;\n                SPF.midgroundMask(false);\n            },\n\n            render :function(PIXI, input) {\n                console.log("x: "+input.mouseTouchPosition.x+" y: "+input.mouseTouchPosition.y);\n                console.log();\n            },\n\n            resize :function(PIXI, input) {\n\n                var w =  input.width;\n                var h =  input.height;\n\n                mid.clear();\n                mid.beginFill(0x000000, 1);\n                mid.drawRect(0,0,w,h);\n                mid.endFill();\n\n            }\n        });\n\n\n        SPF.set({\n\n            at: \'fore\', // "fore" "mid" or "back"\n\n            mouseOver:function(PIXI, input) {\n                mid.visible = true;\n                SPF.midgroundMask(true);\n            },\n\n            mouseOut:function(PIXI, input) {\n                mid.visible = false;\n                SPF.midgroundMask(false);\n            }\n\n        });\n\n\n        SPF.info({debug:false, title:"RE MOUSE ENTERS/EXITS", tip:"", firstName:"Ramiro", lastName:"Espada", email:"re@ramiroespada.com"});\n\n        SPF.start("chorus1");\n\n\n    </script></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);