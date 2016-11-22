function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<!doctype html> <html class="no-js" lang><head><meta charset="utf-8"><meta http-equiv="x-ua-compatible" content="ie=edge"><title>Hue</title><meta name="description" content><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><link rel="apple-touch-icon" href="apple-touch-icon.png"><link rel="stylesheet" href="../../main.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/detectizr/2.2.0/detectizr.min.js"></script><script src="../../js/pixi.min.js"></script><script src="../../js/TweenMax.min.js"></script></head><body><!--[if lt IE 8]>\n\n        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>\n\n    <![endif]--><script src="../../sp-framework.js"></script><script src="/js/ps-includes.js"></script><script>\n\n        var DEG2RAD = Math.PI / 180.0;\n\n        var backgroundContainer;\n        var leafTexture;\n        var hueFilter;\n        var maximumLeafCount = 50;\n        var lastSpawnPosition = new SPHelpers.Vector2(-1000, -1000);\n        var lastMousePosition = new SPHelpers.Vector2(-1000, -1000);\n        var currentMousePosition = new SPHelpers.Vector2(0,0);\n        var minimumSpawnDistance = 50;\n\n        //Wrap this in objects for easier updating\n        var leafs = [];\n        /*\n        var speeds = [];\n        var directions = [];\n        var rotationSpeed = [];\n        */\n        //\n        var leafSize = 250;\n        var leafDiagonalSize = leafSize * Math.sqrt(2);\n        var leafAspect = 1;\n        var leafMaximumSpeed = 5;\n        var leafAcceleration= 0.025;\n        var leafMaximumRotationSpeed = 2 * DEG2RAD;\n\n        var lastSpawnTime;\n        var spawnIntervalMillisStart = 1500;\n        var spawnIntervalMillisEnd = 250;\n        var spawnIntervalDecrease = 50; \n        var spawnIntervalMillis = spawnIntervalMillisStart;\n\n        var leafHueFilter;\n\n        print = console.log;//TEMP\n\n        function spawnLeaf(PIXI, input)\n        {\n            lastSpawnTime = new Date().getTime();\n            if(spawnIntervalMillis > spawnIntervalMillisEnd)\n            {\n                spawnIntervalMillis -= spawnIntervalDecrease;\n            }\n            \n            var params = {\n                size: leafSize, \n                container: backgroundContainer, \n                animate: true, \n                duration: -1,  \n                inDuration: 0.5, \n                //outDuration: 0.25, \n                startScale: 0.5,\n                easeIn: Back.easeOut.config(1.7)\n            };\n\n            if( input.mouseTouchPosition.x != 0 &&  input.mouseTouchPosition.y != 0)\n            {  \n                var mousePosition = new SPHelpers.Vector2(input.mouseTouchPosition.x, input.mouseTouchPosition.y); \n                if(lastSpawnPosition.distance(mousePosition) > minimumSpawnDistance && lastMousePosition.distance(mousePosition) > minimumSpawnDistance)\n                {\n                    params.x = input.mouseTouchPosition.x;\n                    params.y = input.mouseTouchPosition.y;\n                }\n            }\n\n            var leaf = SPHelpers.spawn(PIXI, input, leafTexture, params);\n            \n            lastSpawnPosition = new SPHelpers.Vector2(leaf.x, leaf.y);\n            lastMousePosition = new SPHelpers.Vector2(input.mouseTouchPosition.x, input.mouseTouchPosition.y);\n\n            var leafAnimator = new SPHelpers.SpriteAnimator(leaf);\n\n\n            leafAnimator.speed = 0.0;\n            leafAnimator.maxSpeed = leafMaximumSpeed;\n            leafAnimator.acceleration = leafAcceleration;\n            leafAnimator.rotationSpeed = (Math.random() * 2.0 - 1.0) * leafMaximumRotationSpeed;\n\n            var center = new SPHelpers.Vector2(input.width / 2, input.height / 2);\n            var direction = lastSpawnPosition.subtract(center);\n            direction.normalize();\n            leafAnimator.direction = direction;\n            //leafAnimator.update(0);\n\n            leafs.push(leafAnimator);\n\n            /*\n            //store vars for animation. TODO, wrap in animation object, including sprite reference?\n            leafs.push(leaf);\n            speeds.push(0.0);\n            rotationSpeed.push((Math.random() * 2.0 - 1.0) * leafMaximumRotationSpeed);\n            var center = new SPHelpers.Vector2(input.width / 2, input.height / 2);\n            var direction = lastSpawnPosition.subtract(center);\n            direction.normalize();\n            directions.push(direction);\n            */\n            while (backgroundContainer.children.length >= maximumLeafCount)\n            {\n                removeLeaf(0);\n            }\n        }\n\n        function removeLeaf(i)\n        {\n            if (i < 0)\n            {\n                return;\n            }\n\n            backgroundContainer.removeChildAt(i);\n            leafs.splice(i, 1);\n            /*\n            speeds.splice(i, 1);\n            directions.splice(i, 1);\n            rotationSpeed.splice(i, 1);\n            */\n        }\n\n        SPF.set({\n\n            at:"back",\n            load: function(PIXI, input) \n            {\n                //TODO: Preload textures. First move them into framework\n                return [];\n                //return [input.patterns.animaltech];\n            },\n\n            init: function(PIXI, input) \n            {\n                //TODO: Move textures into framework\n                leafTexture = PIXI.Texture.fromImage(\'/assets/ps_temp/SP_element_leaf_001.png\'); //TODO: Load from framework\n                leafTexture.baseTexture.wrapMode = PIXI.WRAP_MODES.CLAMP\n\n                backgroundContainer = new PIXI.Container();\n                input.container.addChild(backgroundContainer);\n\n\t            leafHueFilter = new PIXI.filters.ColorMatrixFilter();\n                backgroundContainer.filters = [leafHueFilter];\n                \n                leafHueFilter.hue(30);\n                leafHueFilter.brightness(0.5, true);\n                leafHueFilter.saturate(2, true);\n\n                lastSpawnTime = new Date().getTime();\n            },\n\n            //TODO: Animate framerate independent using delta time\n            render:function(PIXI, input)\n            {\n                //Auto spawn leafs (TODO: Use beat to spawn, for now timed)\n                var timeSinceSpawn = new Date().getTime() - lastSpawnTime;\n                if (timeSinceSpawn > spawnIntervalMillis)\n                {\n                    spawnLeaf(PIXI, input);\n                }\n                //Animate leafs\n                var removeIndices = [];\n                for (var i = 0;i < leafs.length; i++)\n                {\n                    leafs[i].update(0);\n                    \n                    //remove when outside view\n                    if(leafs[i].sprite.x < -leafDiagonalSize || leafs[i].sprite.x > leafDiagonalSize + input.width || leafs[i].sprite.y < -leafDiagonalSize || leafs[i].sprite.y > leafDiagonalSize + input.height)\n                    {   \n                        removeIndices.push(i);\n                    }\n                }\n                \n                while(removeIndices.length > 0)\n                {\n                    removeLeaf(removeIndices[0]);\n                    removeIndices.shift();\n                }\n                \n            },\n\n            mouseDownTouchStart: function(PIXI, input)\n            {\n                spawnLeaf(PIXI, input);\n            }\n        });\n\n        var leftFrontLeaf, rightFrontLeaf;\n        var leafEdgeInset = 250;\n\n        SPF.set({\n\n            at:"fore",\n            load: function(PIXI, input) \n            {\n                //return [input.patterns.animaltech];\n                return [];\n            },\n\n            init: function(PIXI, input) \n            {\n                frontLeafTexture = PIXI.Texture.fromImage(\'/assets/ps_temp/SP_element_leaf_palm_001.png\'); //TODO: Load from framework\n                frontLeafTexture.baseTexture.wrapMode = PIXI.WRAP_MODES.CLAMP\n\n                leftFrontLeaf = new PIXI.Sprite(frontLeafTexture);\n                leftFrontLeaf.anchor.set(0.5);\n                rightFrontLeaf = new PIXI.Sprite(frontLeafTexture);\n                rightFrontLeaf.anchor.set(0.5);\n                \n                input.container.addChild(leftFrontLeaf);\n                input.container.addChild(rightFrontLeaf);\n\n                leftFrontLeaf.tint = 0x000000;\n                rightFrontLeaf.tint = 0x000000;\n\n                leftFrontLeaf.alpha = 0;\n                rightFrontLeaf.alpha = 0;\n\n                var delay = 4.0;\n                TweenMax.to(leftFrontLeaf, 0.5, {alpha:1,delay: delay});\n                TweenMax.to(rightFrontLeaf, 0.5, {alpha:1,delay: delay});\n            },\n\n            render:function(PIXI, input)\n            {\n                //Rotate on beats\n                var rotationSpeed = 0.005;\n                leftFrontLeaf.rotation += rotationSpeed;\n                rightFrontLeaf.rotation -= rotationSpeed;\n            },\n\n            resize: function(PIXI, input) \n            {\n                leftFrontLeaf.scale.x = leftFrontLeaf.scale.y = rightFrontLeaf.scale.x = rightFrontLeaf.scale.y = input.height / 700;\n                leftFrontLeaf.x = -leafEdgeInset;\n                leftFrontLeaf.y = input.height / 1.75;\n                rightFrontLeaf.x = input.width + leafEdgeInset;\n                rightFrontLeaf.y = input.height / 1.75;\n            }\n        });\n\n        SPF.info({\n            debug: false,\n            title: "Intro",\n            tip: "Intro",\n            firstName: "Patrik",\n            lastName: "Svensson",\n            email: "ps@molamil.com"\n        });\n\n        SPF.start();\n\n    </script></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);