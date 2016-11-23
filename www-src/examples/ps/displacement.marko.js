function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<!doctype html> <html class="no-js" lang><head><meta charset="utf-8"><meta http-equiv="x-ua-compatible" content="ie=edge"><title>Displacement</title><meta name="description" content><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><link rel="apple-touch-icon" href="apple-touch-icon.png"><link rel="stylesheet" href="../../main.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/detectizr/2.2.0/detectizr.min.js"></script><script src="../../js/pixi.min.js"></script><script src="../../js/TweenMax.min.js"></script></head><body><!--[if lt IE 8]>\n\n        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>\n\n    <![endif]--><script src="../../sp-framework.js"></script><script>\n\n        var background;\n        var displacementFilter;\n        var displacementSprite;\n\n        SPF.set({\n\n            at:"back",\n            load: function(PIXI, input) \n            {\n                return [input.patterns.handdrawnanimal]; //handdrawnanimal\n            },\n\n            init: function(PIXI, input) \n            {\n                background = new PIXI.extras.TilingSprite(input.patterns.handdrawnanimal, 1, 1);\n                background.anchor.set(0);\n                input.container.addChild(background);\n\n                //var displacementTexture = PIXI.Texture.fromImage(\'http://i.imgur.com/2yYayZk.png\'); //TODO: Load from framework\n                var displacementTexture = PIXI.Texture.fromImage(\'../../assets/ps_temp/clouds.png\'); //TODO: Load from framework\n                \n                displacementTexture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT\n                \n                //Tiled\n                //displacementSprite = new PIXI.extras.TilingSprite(displacementTexture, 1, 1);\n                //displacementSprite.anchor.set(0);\n                \n                //Standard\n                displacementSprite = new PIXI.Sprite(displacementTexture);//PIXI.Sprite.fromImage(\'http://i.imgur.com/2yYayZk.png\'); \n\n                displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);\n                \n                input.container.addChild(displacementSprite);\n                background.filters = [displacementFilter];\n\n                var scale = 50;\n                displacementFilter.scale.x = scale;\n                displacementFilter.scale.y = scale;\n                displacementFilter.resolution = 1; //Lower values are faster, higher better quality\n\n            },\n\n            render:function(PIXI, input)\n            {\n                //background.tilePosition.x -= 1;\n                //background.tilePosition.y += 1;\n\n                //offset not working? Animate by moving sprite, which is stupid since it might move offscreen. USe tiling sprite\n                //displacementFilter.offset.x += 2;\n                //displacementFilter.offset.y += 2;\n\n                displacementSprite.x += (input.mouseTouchPosition.x * 0.02);\n                //displacementSprite.y += 0.5;\n                \n                //displacementSprite.tilePosition.x -= 2;\n                //displacementSprite.tilePosition.y += 1;\n            },\n\n            resize: function(PIXI, input) \n            {\n                background.width = input.width;\n                background.height = input.height;\n\n                displacementSprite.width = input.width;\n                displacementSprite.height = input.height;\n            }\n\n        });\n\n        SPF.info({\n            debug: false,\n            title: "Displacement Filter",\n            tip: "PIXI\'s displacement filter",\n            firstName: "Patrik",\n            lastName: "Svensson",\n            email: "ps@molamil.com"\n        });\n\n        SPF.start();\n\n    </script></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);