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
      $wrapper = $('#wrapper'),
      $body = $('body'),
      $output = $(document.createDocumentFragment());

  // color retrieval
  var colorMap = {};

  function formatStyle(obj, option) {
    var ret = '';
    if (obj && obj !== undefined) {
      _.each(obj, function(value, key) {
        if (option) {
          ret = ret + (key + ': ' + value + '; ') + '<br >'
        } else {
          ret = ret + (key + ': ' + value + '; ')
        }
      })
    }
    return ret;
  }

  function formatChapter(obj, key) {
    if (! _.has($chapter[key], obj.group)) {
      if ($chapter[key] === null) {
        $chapter[key] = new Object()
      }

      var frag = $('<div>');
      frag
        .attr('class', obj.group)
        .addClass('chapter-content')
        .prepend('<h2>' + obj.group + '</h2><div class="chapter-subContent"></div>');
      $chapter[key][obj.group] = frag;
      $output.find('#' + key).append(frag);
    }
  }

  function formatGroup(frag, item, group, parentChapter) {
    if (group && group.length) {
      formatChapter(item, parentChapter);
      $chapter[parentChapter][group].find('.chapter-subContent').append(frag);
    } else {
      $output.find('#' + parentChapter).append(frag);
    }
  }

  function formatColor(property, color) {
    if (color && color.length) {
      if (color.match(/^(#.*)/g)) {
        return property + ': ' + color + ';';
      } else {
        return property + ': ' + colorMap[color] + ';';
      }
    }
  }

  $.get('/data').done(function(res) {

    _.mapObject(res, function(value, key) {
      var frag = $('<div>');
      frag.attr('id', key).addClass('chapter').prepend('<h1>' + key + '</h1>');
      $output.append(frag)
      $chapter[key] = null;
    });


    // Grid

    if (_.has($chapter, 'Grid')) {
      var frag = $('<ul>');
      _.each(res.Grid, function(css, key) {
        frag.append('<li>'+ key + ': ' + css +'</li>');
      })
      console.log(formatStyle(res.Grid))
      $wrapper.attr('style', formatStyle(res.Grid));
      $output.find('#Grid').append(frag).hover(function() {
        $wrapper.toggleClass('show-grid');
      });
    }


    // Color Palette
    if (_.has($chapter, 'ColorPalette')) {
      _.each(res.ColorPalette, function(item, key) {
        var frag = $('<div class="ColorPalette">'),
            color = $('<div class="ColorPalette-color">'),
            colorName = $('<span class="ColorPalette-colorName">'),
            colorHex = $('<span class="ColorPalette-colorHex">'),
            colorRGB = $('<span class="ColorPalette-colorRGB">'),
            group = item.group || null;
        color.attr('style', 'background-color: '+ item.hex);
        colorName.html(key.replace('_', ' '));
        colorHex.html(item.hex);

        var RGBret = '';
        _.mapObject(item.rgb, function(value, key) {
          RGBret = RGBret + '<span>' + key.toUpperCase() + ': ' + value + '</span>'
        })
        colorRGB.html(RGBret);

        frag.append(color, colorName, colorHex, colorRGB);
        formatGroup(frag, item, group, 'ColorPalette');

        colorMap[key] = item.hex;
      })
    }


    // Typography

    if (_.has($chapter, 'Typography')) {
      $body.attr('style', formatStyle(res.Typography.base))
      _.each(res.Typography.output, function(item, key) {
        var frag = $('<dl>'),
            styleName = $('<dt>'),
            styleCss = $('<dd>'),
            colorName = $('<dd>'),
            group = item.group || null,
            color = item.color;

        styleName.html(key).attr('style', formatStyle(item.style) + formatColor('color', color));
        styleCss.html(formatStyle(item.style));
        colorName.html('Color: ' + color);
        frag.append(styleName, colorName, styleCss);

        formatGroup(frag, item, group, 'Typography')
      })
    }


    // Button

    if (_.has($chapter, 'Buttons')) {
      var baseStyle = formatStyle(res.Buttons.base);
      _.each(res.Buttons.output, function(item, key) {
        var frag = $('<div class="buttons">'),
            btn = $('<span class="buttons-btns">'),
            colorName = $('<span>').html('Color: ' + item.color),
            bgColorName = $('<span>').html('BgColor: ' + item.bgcolor),
            styleCss = $('<span>'),
            group = item.group || null,
            color = item.color,
            style = item.style,
            bgcolor = item.bgcolor,
            colorSetting = formatColor('color', color) + formatColor('background-color', bgcolor);

        if (style) {
          styleCss.html('Style <br >' + formatStyle(style, 1))
        }
        btn.html(key).attr('style', baseStyle + formatStyle(style) + colorSetting)
        frag.append(btn, colorName, bgColorName, styleCss)
        formatGroup(frag, item, group, 'Buttons')
      })
    }


    $wrapper.append($output);

  })

  Backbone.history.start();
});
