function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<!doctype html> <html class="no-js" lang><head><meta charset="utf-8"><meta http-equiv="x-ua-compatible" content="ie=edge"><title>Verse</title><meta name="description" content><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><link rel="apple-touch-icon" href="apple-touch-icon.png"><link rel="stylesheet" href="../../main.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/detectizr/2.2.0/detectizr.min.js"></script><script src="../../js/pixi.min.js"></script><script src="../../js/TweenMax.min.js"></script></head><body><!--[if lt IE 8]>\n\n        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>\n\n    <![endif]--><script src="../../sp-framework.js"></script><script>\n\n        var DEG2RAD = Math.PI / 180.0;\n\n        var background;\n        var backgroundColorFilter;\n        var frontRotatingSprite;\n        var frontPatternSprite;\n        //var text; \n        //var textFadeDuration = 0;\n        var frontContainer;\n        //var didShowText = false;\n        //var didHideText = false;\n        var currentCast = "";\n\n        var beatInterval = 1000;//millis\n        var lastBeatTime;\n        var beatRotationSpeed = 0;\n\n        var rockContainer;\n        var rockDuration = 3.0;\n        var rockSize = 300;\n        var touching = false;\n        var lastSpawnTime;\n        var spawnIntervalTouching = 75; \n        var spawnIntervalMillis = 1500;\n        var rockAnimators = [];\n\n        /*\n        function showText(show)\n        {\n            if(show)\n            {\n                if(didShowText)\n                {\n                    return;\n                }\n                didShowText = true;\n                frontContainer.addChild(text);\n                text.alpha = 0;\n                TweenMax.to(text, textFadeDuration, {alpha: 1});\n            }\n            else\n            {\n                if(!didShowText || didHideText)\n                {\n                    return;\n                }\n                didHideText = true;\n                TweenMax.to(text, textFadeDuration, {alpha: 0, onComplete: function()\n                    {\n                        frontContainer.removeChild(text);\n                        showFrontElement();\n                    }});\n            }\n        }\n        */\n\n        function showFrontElement()\n        {\n            frontContainer.addChild(frontRotatingSprite);\n            beatRotationSpeed = 15 * DEG2RAD;\n            lastBeatTime = new Date().getTime();\n            frontRotatingSprite.alpha = 0;\n            TweenMax.to(frontRotatingSprite, 0.5, {alpha: 1});\n        }\n\n        function spawnRock(PIXI, input, mirrored)\n        {\n            lastSpawnTime = new Date().getTime();\n\n            var rock = new PIXI.Sprite(rockTexture);\n            rock.anchor.set(0.5);\n            rock.rotation = Math.random() * 2 * Math.PI;\n            rock.x = touching == true ? input.mouseTouchPosition.x : Math.random() * input.width;\n            rock.y = touching == true ? input.mouseTouchPosition.y : Math.random() * input.height;\n            var w = rockSize;\n            var h = w * (1046.0/1024.0);\n            rock.width = w;\n            rock.height = h;\n            rockContainer.addChild(rock);\n\n            var rockMirrored = null;\n            if (mirrored == true)\n            {\n                var xMirrored = input.width * 0.5 - (rock.x - input.width * 0.5);\n                if (xMirrored < 0)\n                {\n                    xMirrored = input.width - xMirrored;\n                }\n\n                rockMirrored = new PIXI.Sprite(rockTexture);\n                rockMirrored.anchor.set(0.5);\n                rockMirrored.rotation = rock.rotation;\n                rockMirrored.x = xMirrored;\n                rockMirrored.y = input.mouseTouchPosition.y;\n                rockMirrored.width = w;\n                rockMirrored.height = w;\n                rockMirrored.scale.x *= -1;\n                rockContainer.addChild(rockMirrored);\n                rockMirrored.alpha = 0;\n            }\n\n            //animate\n            rock.alpha = 0;\n            var destroyRock = function(r)\n            {\n                rockContainer.removeChild(r);\n\n                //TODO: cleanup animators?\n            }\n\n            var fadeOutDelay = 6.0;\n            var tl = new TimelineMax({onComplete:destroyRock, onCompleteParams:[rock]});\n            tl.to(rock, 0.5,{alpha:1})\n            tl.to(rock, 0.5, {delay:fadeOutDelay, alpha:0})\n            tl.duration(rockDuration);\n\n            if(rockMirrored != null)\n            {\n                var tl2 = new TimelineMax({onComplete:destroyRock, onCompleteParams:[rockMirrored]});\n                tl2.to(rockMirrored, 0.5,{alpha:1})\n                tl2.to(rockMirrored, 0.5, {delay:fadeOutDelay, alpha:0})\n                tl2.duration(rockDuration);\n            }\n            var minScale = 0.1;\n            var targetScale = rock.scale.x;// * (1 + (Math.random() * 2 - 1) * 0.2);\n            rock.scale.x = rock.scale.y = targetScale * minScale;\n\n            var scaleOutDelay = 0.0;\n            var tl3 = new TimelineMax({onComplete:destroyRock, onCompleteParams:[rock]});\n            tl3.to(rock.scale, 0.5,{x:targetScale, y:targetScale, ease: Power2.easeOut})\n            tl3.to(rock.scale, 1, {delay:scaleOutDelay, x:targetScale * minScale, y:targetScale * minScale, ease: Power2.easeIn})\n            tl3.duration(rockDuration);\n\n            if(rockMirrored != null)\n            {\n                rockMirrored.scale.x = rockMirrored.scale.y = targetScale * minScale;\n                var tl4 = new TimelineMax({onComplete:destroyRock, onCompleteParams:[rockMirrored]});\n                tl4.to(rockMirrored.scale, 0.5,{x:-targetScale, y:-targetScale, ease: Power2.easeOut})\n                tl4.to(rockMirrored.scale, 1, {delay:scaleOutDelay, x:-targetScale * minScale, y:-targetScale * minScale, ease: Power2.easeIn})\n                tl4.duration(rockDuration);\n            }\n\n            //Add animators for none mirrored rocks\n            if(!mirrored)\n            {\n                var rockAnimator = new SpriteAnimator(rock);\n                rockAnimator.speed = 0.0;\n                rockAnimator.maxSpeed = 5;\n                rockAnimator.acceleration = 0.025;\n                rockAnimator.rotationSpeed = (Math.random() * 2.0 - 1.0) * 2 * DEG2RAD;\n                var position = new Vector2(rock.x, rock.y);\n                var center = new Vector2(input.width / 2, input.height / 2);\n                var direction = position.subtract(center);\n                direction.normalize();\n                rockAnimator.direction = direction;\n                rockAnimators.push(rockAnimator);\n            }\n        }\n\n        SPF.set({\n\n            at:"back",\n            load: function(PIXI, input) \n            {\n                return [\n                    input.patterns.botanicorganic4,\n                    input.graphics.stone\n                ];\n            },\n\n            init: function(PIXI, input) \n            {\n                //TODO: Move textures into framework\n                var backgroundTexture = input.patterns.botanicorganic4;\n                background = SPF.fullscreenSprite(input.container,  backgroundTexture );\n                \n\t            backgroundColorFilter = new PIXI.filters.ColorMatrixFilter();\n                background.filters = [backgroundColorFilter];\n                backgroundColorFilter.reset();\n                backgroundColorFilter.brightness(0.5, true);\n                //backgroundColorFilter.saturate(1, true);\n                backgroundColorFilter.hue(30, true);\n                input.container.addChild(background);\n\n                rockContainer = new PIXI.Container();\n                input.container.addChild(rockContainer);\n\t            rockColorFilter = new PIXI.filters.ColorMatrixFilter();\n                rockContainer.filters = [rockColorFilter];\n                rockColorFilter.reset();\n                rockColorFilter.hue(-110, true);\n                input.container.addChild(rockContainer);\n\n                rockTexture = input.graphics.stone;\n                rockTexture.baseTexture.wrapMode = PIXI.WRAP_MODES.CLAMP\n                \n                lastSpawnTime = new Date().getTime();\n            },\n\n            //TODO: Animate framerate independent using delta time\n            render:function(PIXI, input)\n            {\n                //Different interval when touching..\n                var timeSinceSpawn = new Date().getTime() - lastSpawnTime;\n                if (timeSinceSpawn > (touching == true ? spawnIntervalTouching : spawnIntervalMillis))\n                {\n                    spawnRock(PIXI, input, touching);\n                }\n\n                for (var i = rockAnimators.length - 1; i >= 0; i--)\n                {\n                    rockAnimators[i].update(0);\n                    \n                    //cleanup animators\n                    if(null == rockAnimators[i].sprite.parent)\n                    {\n                        rockAnimators.splice(i, 1);\n                    }\n                }\n\n            },\n\n            mouseDownTouchStart: function(PIXI, input) \n            {\n                touching = true;\n            },\n\n            mouseUpTouchEnd: function(PIXI, input) \n            {\n                touching = false;\n            },\n        });\n\n        SPF.set({\n\n            at:"fore",\n            load: function(PIXI, input) \n            {\n                return [\n                    input.graphics.crazyflower1,\n                    input.patterns.botanicorganic5\n                ];\n            },\n\n            init: function(PIXI, input) \n            {\n                frontContainer = input.container;\n\n                var frontSpriteTexture = input.graphics.crazyflower1\n                frontRotatingSprite = new PIXI.Sprite(frontSpriteTexture);\n                frontRotatingSprite.anchor.set(0.5);\n                frontRotatingSprite.rotation = Math.random() * 2 * Math.PI;\n\n                var frontPatternTexture = input.patterns.botanicorganic5;\n                frontPatternSprite = SPF.fullscreenSprite(input.container,  frontPatternTexture );\n                frontPatternSprite.visible = false;\n                \n                showFrontElement();\n            },\n\n            //TODO: Animate framerate independent using delta time\n            render:function(PIXI, input)\n            {\n                //Fake beat\n                //TODO: Replace by beat detection\n                var timeSinceBeat = new Date().getTime() - lastBeatTime;\n                if (timeSinceBeat > beatInterval)\n                {\n                    lastBeatTime = new Date().getTime();\n                    beatRotationSpeed = 15 * DEG2RAD;\n\n                    //beat faking for pattern\n                    frontPatternSprite.alpha = 1;\n                }\n\n                beatRotationSpeed *= 0.85;\n                frontRotatingSprite.rotation += beatRotationSpeed;\n\n                //Changes on cast\n                if(input.cast != null && input.cast.id != currentCast)\n                {\n                    currentCast = input.cast.id\n                    \n                    //Hues\n                    switch(input.cast.id)\n                    {\n                        case "singer":\n                            backgroundColorFilter.reset();\n                            backgroundColorFilter.brightness(0.5, true);\n                            backgroundColorFilter.saturate(2, true);\n                            backgroundColorFilter.hue(120, true);\n                            rockColorFilter.reset();\n                            rockColorFilter.hue(0, true);\n                            break;\n                        case "bass":\n                        case "drums":\n                            backgroundColorFilter.reset();\n                            backgroundColorFilter.brightness(0.5, true);\n                            backgroundColorFilter.saturate(1, true);\n                            backgroundColorFilter.hue(-20, true);\n                            rockColorFilter.reset();\n                            rockColorFilter.brightness(0.5, true);\n                            rockColorFilter.saturate(0.5, true);\n                            rockColorFilter.hue(120, true);\n                            break;\n                        case "all":\n                        case "none":\n                        default:\n                            backgroundColorFilter.reset();\n                            backgroundColorFilter.brightness(0.5, true);\n                            //backgroundColorFilter.saturate(1, true);\n                            backgroundColorFilter.hue(30, true);\n                            rockColorFilter.reset();\n                            rockColorFilter.hue(-110, true);\n                            break;\n                    }\n\n                    //front element\n                    frontPatternSprite.visible = input.cast.id == "drums";\n                    frontPatternSprite.alpha = 1;\n                    frontRotatingSprite.visible = input.cast.id != "drums";\n                }\n\n                //Fade pattern outdated\n                frontPatternSprite.alpha *= 0.85;\n            },\n\n            resize: function(PIXI, input) \n            {\n                frontRotatingSprite.scale.x = frontRotatingSprite.scale.y = input.width / 1200.0;\n                frontRotatingSprite.position.set(input.width/2, input.height*1.1);\n            }\n\n        });\n\n        SPF.info({\n            debug: false,\n            title: "Verse",\n            tip: "Move the mouse around and click&drag the screen",\n            firstName: "Patrik",\n            lastName: "Svensson",\n            email: "ps@molamil.com"\n        });\n\n        SPF.start();\n\n        //Vector2 \n        function Vector2(x, y)\n        {\n            this.x = x || 0;\n            this.y = y || 0;\n        };\n\n        Vector2.prototype.x = null;\n        Vector2.prototype.y = null;\n        Vector2.prototype.add = function (v) {\n            return new Vector2(this.x + v.x, this.y + v.y);\n        };\n        Vector2.prototype.clone = function () {\n            return new Vector2(this.x, this.y);\n        };\n        Vector2.prototype.distance = function (v) {\n            var x = this.x - v.x;\n            var y = this.y - v.y;\n            return Math.sqrt(x * x + y * y);\n        };\n        Vector2.prototype.equals = function (toCompare) {\n            return this.x == toCompare.x && this.y == toCompare.y;\n        };\n        Vector2.prototype.interpolate = function (v, f) {\n            return new Vector2((this.x + v.x) * f, (this.y + v.y) * f);\n        };\n        Vector2.prototype.length = function () {\n            return Math.sqrt(this.x * this.x + this.y * this.y);\n        };\n        Vector2.prototype.sqrLength = function () {\n            return this.x * this.x + this.y * this.y;\n        };\n        Vector2.prototype.normalize = function (thickness = 1) {\n            var l = this.length();\n            this.x = this.x / l * thickness;\n            this.y = this.y / l * thickness;\n        };\n        Vector2.prototype.offset = function (dx, dy) {\n            this.x += dx;\n            this.y += dy;\n        };\n        Vector2.prototype.subtract = function (v) {\n            return new Vector2(this.x - v.x, this.y - v.y);\n        };\n        Vector2.prototype.toString = function () {\n            return "(x=" + this.x + ", y=" + this.y + ")";\n        };\n\n        Vector2.interpolate = function (pt1, pt2, f) {\n            return new Vector2((pt1.x + pt2.x) * f, (pt1.y + pt2.y) * f);\n        };\n        Vector2.distance = function (pt1, pt2) {\n            var x = pt1.x - pt2.x;\n            var y = pt1.y - pt2.y;\n            return Math.sqrt(x * x + y * y);\n        };\n\n        SpriteAnimator = function(sprite)\n        {\n            this.sprite = sprite || null;\n        };\n\n        SpriteAnimator.prototype.sprite = null;\n        SpriteAnimator.prototype.speed = 0;\n        SpriteAnimator.prototype.maxSpeed = 0;\n        SpriteAnimator.prototype.acceleration = 0;\n        SpriteAnimator.prototype.rotationSpeed = 0;\n        SpriteAnimator.prototype.direction = new Vector2(0,0);\n        SpriteAnimator.prototype.update = function(deltaTime)\n        {\n            this.speed = Math.min(this.speed + this.acceleration, this.maxSpeed);\n            this.sprite.x += this.direction.x * this.speed;\n            this.sprite.y += this.direction.y * this.speed;\n            this.sprite.rotation += this.rotationSpeed;\n        };\n    </script></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);