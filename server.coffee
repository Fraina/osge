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
    'Typography':
      'base':
        'font-size': '16px'
        'font-family': '"Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans","wenquanyi micro hei", "Hiragino Sans GB", "Hiragino Sans GB W3", Arial, sans-serif'
      'output':
        'Heading 1':
          'group': 'Heading'
          'style':
            "font-size": "180%"
            "font-weight": "800"
        'Heading 2':
          'group': 'Heading'
          'style':
            'font-size': '150%'
            'font-weight': '400'
        'Paragraph':
          'group': 'Paragraph'
          'style':
            'font-size': '100%'
    'ColorPalette':
      'VI_Black':
        'group': 'main'
        'hex': '#999999'
        'rgb':
          'r': '99'
          'g': '99'
          'b': '99'

  res.json data
  return

module.exports = router
