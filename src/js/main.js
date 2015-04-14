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

  // chapter dom
  var $chapter = {},
      $output = $(document.createDocumentFragment());

  function formatStyle(obj) {
    var ret = '';
    _.each(obj.style, function(value, key) {
      ret = ret + (key + ':' + value + ';')
    })
    return ret;
  }

  function formatChapter(obj, key) {
    if (! _.has($chapter[key], obj.group)) {
      if ($chapter[key] === null) {
        $chapter[key] = new Object()
      }

      var frag = $('<div>');
      frag.attr('class', obj.group).prepend('<h2>' + obj.group + '</h2>');
      $chapter[key][obj.group] = frag;
      $output.find('#' + key).append(frag);
    }
  }

  $.get('/data').done(function(res) {

    _.mapObject(res, function(value, key) {
      var frag = $('<div>');
      frag.attr('id', key).prepend('<h1>' + key + '</h1>');
      $output.append(frag)
      $chapter[key] = null;
    });

    // Grid
    if (_.has($chapter, 'Grid')) {
      var frag = $('<ul>');
      _.each(res.Grid, function(css, key) {
        frag.append('<li>'+ key + ':' + css +'</li>');
      })
      $output.find('#Grid').append(frag);
    }

    // Typography

    if (_.has($chapter, 'Typography')) {
      _.each(res.Typography.output, function(item, key) {
        var frag = $('<span>'),
            group = item.group;
        frag.html(key).attr('style', formatStyle(item));

        if (group && group.length) {
          formatChapter(item, 'Typography');
          $chapter['Typography'][group].append(frag);
        } else {
          $output.find('#' + group).append(frag);
        }
      })
    }


    $('body').append($output);

  })

  Backbone.history.start();
});
