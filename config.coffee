module.exports =
  compass:
    style: 'compressed'
    comments: false
    relative: true
    sourcemap: true
  rjs:
    options:
      name: 'main'
      out: 'app.js'
      paths:
        jquery: '../bower/jquery/dist/jquery.min'
        underscore: '../bower/underscore/underscore-min'
        backbone: '../bower/backbone/backbone'
        i18n: '../bower/requirejs-i18n/i18n'
        text: '../bower/requirejs-text/text'
  docco:
    layout: 'linear'
  remarkable:
    remarkableOptions:
      html: true
  deploy:
    cacheDir: '.cache'
