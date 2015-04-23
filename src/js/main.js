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
  'underscore'
], function ($, _) {

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

  function formatChapter(obj, parentChapter) {
    if (! _.has($chapter[parentChapter], obj.group)) {
      if ($chapter[parentChapter] === null) {
        $chapter[parentChapter] = new Object()
      }

      var frag = $('<div>');
      frag
        .attr('class', obj.group)
        .addClass('chapter-content')
        .prepend('<h2>' + obj.group + '</h2><div class="chapter-subContent"></div>');
      $chapter[parentChapter][obj.group] = frag;
      $output.find('#' + parentChapter).append(frag);
    }
  }

  function formatChapterName(chapterName) {
    return chapterName.replace(/_/, ' ');
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

    _.mapObject(res, function(value, mapKey) {
      var frag = $('<div>');
      frag.attr('id', mapKey).addClass('chapter').prepend('<h1>' + formatChapterName(mapKey) + '</h1>');
      $output.append(frag)
      $chapter[mapKey] = null;

      switch(mapKey) {

        case 'Grid':
          var frag = $('<ul>');
          _.each(value, function(css, key) {
            frag.append('<li>'+ key + ': ' + css +'</li>');
          })
          $wrapper.attr('style', formatStyle(value));
          $output.find('#Grid').append(frag).hover(function() {
            $wrapper.toggleClass('show-grid');
          });
          break;


        case 'Color_Palette':
          _.each(value, function(item, key) {
            var frag = $('<div class="ColorPalette">'),
                color = $('<div class="ColorPalette-color">').attr('style', 'background-color: '+ item.hex),
                colorName = $('<span class="ColorPalette-colorName">').html(formatChapterName(key)),
                colorHex = $('<span class="ColorPalette-colorHex">').html(item.hex),
                colorRGB = $('<span class="ColorPalette-colorRGB">'),
                group = item.group;

            var RGBret = '';
            _.mapObject(item.rgb, function(value, key) {
              RGBret = RGBret + '<span>' + key.toUpperCase() + ': ' + value + '</span>'
            })
            colorRGB.html(RGBret);
            colorMap[key] = item.hex;

            frag.append(color, colorName, colorHex, colorRGB);
            formatGroup(frag, item, group, mapKey);
          })
          break;


        case 'Typography':
          $body.attr('style', formatStyle(res.Typography.base))
          _.each(value.output, function(item, key) {
            var frag = $('<dl>'),
                styleName = $('<dt>').html(formatChapterName(key)).attr('style', formatStyle(item.style) + formatColor('color', color)),
                styleCss = $('<dd>').html(formatStyle(item.style)),
                colorName = $('<dd>').html('Color: ' + color),
                group = item.group,
                color = item.color;

            frag.append(styleName, colorName, styleCss);
            formatGroup(frag, item, group, mapKey)
          })
          break;


        case 'Buttons':
          var baseStyle = formatStyle(res.Buttons.base);
          _.each(value.output, function(item, key) {
            var frag = $('<div class="buttons">'),
                colorName = $('<span>').html('Color: ' + item.color),
                bgColorName = $('<span>').html('BgColor: ' + item.bgcolor),
                styleCss = $('<span>'),
                group = item.group,
                color = item.color,
                style = item.style,
                bgcolor = item.bgcolor,
                colorSetting = formatColor('color', color) + formatColor('background-color', bgcolor),
                btn = $('<span class="buttons-btns">').html(key).attr('style', baseStyle + formatStyle(style) + colorSetting);

            if (style) {
              styleCss.html('Style <br >' + formatStyle(style, 1))
            }

            frag.append(btn, colorName, bgColorName, styleCss)
            formatGroup(frag, item, group, mapKey)
          })
          break;


        case 'Space':
          var baseSpace = res.Space.base;
          _.each(value.output, function(item, key) {
            var frag = $('<div class="space">'),
                spaceRange = $('<div class="space-range">').append('<span class="space-marking">'),
                spaceName = $('<span class="space-name">').html(key),
                spacePX = $('<span class="space-px">'),
                group = item.group;

            if (! item.odds.match(/px/g)) {
              spaceRange.css('width', baseSpace * item.odds - 2 + 'px');
              spacePX.html('x' + item.odds + ' (' + baseSpace * item.odds + 'px)');
            } else {
              spaceRange.css('width', item.odds);
              spacePX.html(item.odds);
            }

            frag.append(spaceRange, spacePX, spaceName);
            formatGroup(frag, item, group, mapKey);
          })
          break;


        case 'Icon':
          $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', res.Icon.cssUrl))
          _.each(value.output, function(item, key) {
            var frag = $('<div class="icons">'),
                icon = $('<i>').addClass(item.className),
                iconName = $('<span class="icons-name">').html(key),
                iconClass = $('<span class="icons-class">').html('.' + item.className),
                iconContent = $('<span class="icons-content">'),
                group = item.group;

            if (item.content) {
              iconContent.html('content: \\' + item.content)
            }

            frag.append(icon, iconName, iconClass, iconContent)
            formatGroup(frag, item, group, mapKey)
          })
          break;

        default:
          _.each(value, function(item, key) {
            var frag = $('<div class="' + mapKey + '">'),
                img = $('<img>').attr('src', item.imgSrc),
                group = item.group;

            frag.append(img);
            formatGroup(frag, item, group, mapKey);
          })
      }
    });

    $wrapper.append($output);

  })

});
