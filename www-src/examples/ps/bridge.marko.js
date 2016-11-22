function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<!doctype html> <html class="no-js" lang><head><meta charset="utf-8"><meta http-equiv="x-ua-compatible" content="ie=edge"><title>Hue</title><meta name="description" content><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><link rel="apple-touch-icon" href="apple-touch-icon.png"><link rel="stylesheet" href="../../main.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/detectizr/2.2.0/detectizr.min.js"></script><script src="../../js/pixi.min.js"></script><script src="../../js/TweenMax.min.js"></script></head><body><!--[if lt IE 8]>\n\n        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>\n\n    <![endif]--><script src="../../sp-framework.js"></script><script>\n\n        var background;\n        var colorFilter;\t\t\t\t\n        var angle = 0;\n        var touching;\n                            \n        SPF.set({\n\n            at:"back",\n            load: function(PIXI, input) \n            {\n                return [input.patterns.animaltech];\n            },\n\n            init: function(PIXI, input) \n            {\n                background = new PIXI.extras.TilingSprite(input.patterns.handdrawnanimal, 1, 1);\n                background.anchor.set(0);\n                input.container.addChild(background);\n\n\t            colorFilter = new PIXI.filters.ColorMatrixFilter();\n                background.filters = [colorFilter];\n            },\n\n            render:function(PIXI, input)\n            {\n                if (touching)\n                {\n                    colorFilter.hue((input.mouseTouchPosition.x / input.width)*360);\n                }\n                else\n                {\n                    var speed = 5;\n                    angle = (angle + speed) % 360;\n                    colorFilter.hue(angle);\n                }\n            },\n\n            resize: function(PIXI, input) \n            {\n                background.width = input.width;\n                background.height = input.height;\n            },\n            mouseDownTouchStart: function(PIXI, input) \n            {\n                touching = true;\n            },\n\n            mouseUpTouchEnd: function(PIXI, input) \n            {\n                touching = false;\n            }\n\n        });\n\nSPF.set({\n\n            at:"fore",\n            load: function(PIXI, input) \n            {\n                //return [input.patterns.animaltech];\n                return [];\n            },\n\n            init: function(PIXI, input) \n            {\n                frontLeafTexture = PIXI.Texture.fromImage(\'/assets/ps_temp/SP_element_leaf_palm_001.png\'); //TODO: Load from framework\n                frontLeafTexture.baseTexture.wrapMode = PIXI.WRAP_MODES.CLAMP\n\n                /*\n                leftFrontLeaf = new PIXI.Sprite(frontLeafTexture);\n                leftFrontLeaf.anchor.set(0.5);\n                rightFrontLeaf = new PIXI.Sprite(frontLeafTexture);\n                rightFrontLeaf.anchor.set(0.5);\n                \n                input.container.addChild(leftFrontLeaf);\n                input.container.addChild(rightFrontLeaf);\n\n                leftFrontLeaf.tint = 0x000000;\n                rightFrontLeaf.tint = 0x000000;\n\n                leftFrontLeaf.alpha = 0;\n                rightFrontLeaf.alpha = 0;\n\n                var delay = 4.0;\n                TweenMax.to(leftFrontLeaf, 0.5, {alpha:1,delay: delay});\n                TweenMax.to(rightFrontLeaf, 0.5, {alpha:1,delay: delay});\n                */\n                \n                lastBeatTime = new Date().getTime();\n            },\n\n            render:function(PIXI, input)\n            {\n                //TODO: Replace by beat detection\n                var timeSinceBeat = new Date().getTime() - lastBeatTime;\n                if (timeSinceBeat > beatInterval)\n                {\n                    lastBeatTime = new Date().getTime();\n                    edgeLeafRotationSpeed = 15 * DEG2RAD;\n                }\n\n                edgeLeafRotationSpeed *= 0.75;\n                //leftFrontLeaf.rotation += edgeLeafRotationSpeed;\n                //rightFrontLeaf.rotation -= edgeLeafRotationSpeed;\n            },\n\n            resize: function(PIXI, input) \n            {\n                /*\n                leftFrontLeaf.scale.x = leftFrontLeaf.scale.y = rightFrontLeaf.scale.x = rightFrontLeaf.scale.y = input.height / 700;\n                leftFrontLeaf.x = -leafEdgeInset;\n                leftFrontLeaf.y = input.height / 1.75;\n                rightFrontLeaf.x = input.width + leafEdgeInset;\n                rightFrontLeaf.y = input.height / 1.75;\n                */\n            }\n        });\n\n        SPF.info({\n            debug: false,\n            title: "Bridge",\n            tip: "",\n            firstName: "Patrik",\n            lastName: "Svensson",\n            email: "ps@molamil.com"\n        });\n\n        SPF.start();\n\n    </script></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);