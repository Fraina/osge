/*global requirejs*/
requirejs.config({

  paths: {
    jquery: '../bower/jquery/dist/jquery.min',
    underscore: '../bower/underscore/underscore-min',
    backbone: '../bower/backbone/backbone',
    i18n: '../bower/requirejs-i18n/i18n',
    text: '../bower/requirejs-text/text',
    mock: '../bower/mockjs/dist/mock'
  },

  shim: {
    underscore: {
      exports: '_'
    },

    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});

require([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {

  'use strict';

  $.get('/data').done(function(res) {
    _.each(res.Typography.output, function(item, key) {
      console.log(item, key)
      var inlineStyle = '',
          el = $('<span>');
      _.each(item.style, function(value, key) {
        inlineStyle = inlineStyle + (key + ':' + value + ';')
      })

      el.html(key).attr('style', inlineStyle);
      $('body').append(el);
    })
  })

  Backbone.history.start();
});
