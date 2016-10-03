function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<!doctype html> <html class="no-js" lang><head><meta charset="utf-8"><meta http-equiv="x-ua-compatible" content="ie=edge"><title>Masking Video</title><meta name="description" content><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><link rel="apple-touch-icon" href="apple-touch-icon.png"><link rel="stylesheet" href="../main.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/detectizr/2.2.0/detectizr.min.js"></script><script src="../js/pixi.min.js"></script><script src="../js/TweenMax.min.js"></script></head><body><!--[if lt IE 8]>\n\n        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>\n\n    <![endif]--><script src="../sp-framework.js"></script><script>\n\n        var background;\n\n        var sprite;\n\n        var masker;\n\n        SPF.set({\n\n            at:"back",\n\n            init: function(PIXI, input) {\n                background = new PIXI.Graphics();\n                input.container.addChild(background);\n            },\n\n            resize: function(PIXI, input) {\n\n                var c = input.colors[Math.round(Math.random()*( input.colors.length-1))];\n                background.clear();\n                background.beginFill(c, 1);\n                background.drawRect(0,0,input.width,input.height);\n                background.endFill();\n            }\n\n        });\n\n        SPF.set({\n\n            at:"fore",\n\n            load: function(PIXI, input) {\n\n                return [input.patterns.botanicorganic2,input.maskers.botanicorganic2];\n\n            },\n\n            init: function(PIXI, input) {\n\n                sprite = new PIXI.extras.TilingSprite(input.patterns.botanicorganic2, 1, 1);\n                sprite.anchor.set(0);\n                input.container.addChild(sprite);\n\n                masker = SPF.fullscreenSprite(input.container, input.maskers.botanicorganic2);\n                input.container.addChild(masker);\n\n                sprite.mask = masker;\n            },\n\n            mouseDownTouchStart: function(PIXI, input) {\n                sprite.mask = null;\n            },\n\n            mouseUpTouchEnd: function(PIXI, input) {\n                sprite.mask = masker;\n\n            },\n\n\n            resize: function(PIXI, input) {\n\n                var w =  input.width;\n                var h =  input.height;\n\n                sprite.width = w;\n                sprite.height = h;\n\n                var c = input.colors[Math.round(Math.random()*( input.colors.length-1))];\n                background.clear();\n                background.beginFill(c, 1);\n                background.drawRect(0,0,w,h);\n                background.endFill();\n\n\n            }\n\n        });\n\n\n\n        SPF.info({\n            debug: false,\n            title: "Masking Video",\n            tip: "Click or Tap to reveal the mask",\n            firstName: "Ramiro",\n            lastName: "Espada",\n            email: "re@ramiroespada.com"\n        });\n\n        SPF.start();\n\n    </script></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);