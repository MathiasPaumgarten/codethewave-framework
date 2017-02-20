function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<!doctype html> <html class="no-js" lang><head><title>Cast</title><meta charset="utf-8"><meta http-equiv="x-ua-compatible" content="ie=edge"><meta name="description" content><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><link rel="apple-touch-icon" href="apple-touch-icon.png"><link rel="stylesheet" type="text/css" href="https://cloud.typography.com/7214534/7144972/css/fonts.css"><link rel="stylesheet" href="../main.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/detectizr/2.2.0/detectizr.min.js"></script><script src="../js/pixi.min.js"></script><script src="../js/TweenMax.min.js"></script><script id="fragment-shader" type="x-shader/x-fragment">\n            precision mediump float;\n\n            void main() {\n                gl_FragColor = vec4( 1, 0, 0, 1 );\n            }\n        </script></head><body><!--[if lt IE 8]>\r\n\r\n        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>\r\n\r\n    <![endif]--><script src="../sp-framework.js"></script><script type="text/javascript">\n\n        var fragmentShader = document.getElementById( "fragment-shader" ).innerText;\n        var background, backgroundColor;\n\n        SPF.set( {\n\n            at: "mid",\n\n            init: function (PIXI, input ) {\n\n                var kaleidoShader = new PIXI.AbstractFilter( "", fragmentShader );\n\n                background = new PIXI.Graphics();\n                background.filters = [ kaleidoShader ];\n                background.drawRect( 0, 0, input.width, input.height );\n\n                input.container.addChild( background );\n            },\n\n            resize: function( PIXI, input ) {\n                background.clear();\n                background.drawRect( 0, 0, input.width, input.height );\n            },\n\n            render: function( PIXI, input ) {}\n\n        } );\n\n\n        SPF.info( {\n            debug: false,\n            title: "Kaleido",\n            tip: "",\n            firstName: "Mathias",\n            lastName: "Paumgarten",\n            email: "mail@mathias-paumgarten.com"\n        } );\n\n        SPF.start();\n\n    </script></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);