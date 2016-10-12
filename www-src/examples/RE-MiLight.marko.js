function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<!doctype html> <html class="no-js" lang><head><meta charset="utf-8"><meta http-equiv="x-ua-compatible" content="ie=edge"><title>RE MiLight</title><meta name="description" content><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><link rel="apple-touch-icon" href="apple-touch-icon.png"><link rel="stylesheet" href="../main.css"><script src="../js/pixi.min.js"></script><script src="../js/popcorn.js"></script><script src="../js/TweenMax.min.js"></script></head><body><script src="../sp-framework.js"></script><script src="../RE-milight.js"></script></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);