'use strict'
Mock = require('mockjs')
router = require('express').Router()
router.get '/user/:id', (req, res) ->
  res.json req.params
  return

router.get '/hello', (req, res) ->
  res.json name: 'Lance'
  return

router.get '/data', (req, res) ->
  data =
    'Grid':
      'max-width': '1100px'
      'min-width': '880px'
    'ColorPalette':
      'VI Black':
        'group': 'Main'
        'hex': '#424242'
        'rgb':
          'r': '99'
          'g': '99'
          'b': '99'
      'VI Light-Blue':
        'group': 'Main'
        'hex': '#01579B'
        'rgb':
          'r': '99'
          'g': '99'
          'b': '99'
      'Link':
        'group': 'Second'
        'hex': '#0288D1'
        'rgb':
          'r': '99'
          'g': '99'
          'b': '99'
      'Highlight':
        'group': 'Second'
        'hex': '#FFEE58'
        'rgb':
          'r': '99'
          'g': '99'
          'b': '99'
      'Article Title':
        'group': 'Second'
        'hex': '#BDBDBD'
        'rgb':
          'r': '99'
          'g': '99'
          'b': '99'
      'Try':
        'group': 'Second'
        'hex': '#F5F5F5'
        'rgb':
          'r': '99'
          'g': '99'
          'b': '99'
      'Try Again':
        'group': 'Second'
        'hex': '#EFEBE9'
        'rgb':
          'r': '99'
          'g': '99'
          'b': '99'
    'Typography':
      'base':
        'font-size': '16px'
        'font-family': '"Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans","wenquanyi micro hei", "Hiragino Sans GB", "Hiragino Sans GB W3", Arial, sans-serif'
      'output':
        'Heading 1 a very very very long title':
          'group': 'Heading'
          'color': 'VI Black'
          'style':
            "font-size": "180%"
            "font-weight": "800"
        'Heading 2 another very very very long title':
          'group': 'Heading'
          'color': '#000000'
          'style':
            'font-size': '150%'
            'font-weight': '400'
        'Heading 3 The quick brown fox jumps over the lazy dog':
          'group': 'Heading'
          'color': 'Article Title'
          'style':
            'font-size': '130%'
            'font-weight': 'normal'
        'Paragraph':
          'group': 'Paragraph'
          'color': 'VI Black'
          'style':
            'font-size': '100%'
        'Link':
          'group': 'Paragraph'
          'color': 'Link'
          'style':
            'font-size': '100%'

  res.json data
  return

module.exports = router
