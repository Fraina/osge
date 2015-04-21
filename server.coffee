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
      # Main
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
      # Second
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
      'UCCU':
        'group': 'Second'
        'hex': '#FB8C00'
        'rgb':
          'r': '99'
          'g': '99'
          'b': '99'
      'Outside groups':
        'hex': '#AD1457'
        'rgb':
          'r': '99'
          'g': '99'
          'b': '99'
      'I do not have any friend':
        'hex': 'black'
        'rgb':
          'r': '00'
          'g': '00'
          'b': '00'

    'Typography':
      'base':
        'font-size': '16px'
        'font-family': '"Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans","wenquanyi micro hei", "Hiragino Sans GB", "Hiragino Sans GB W3", Arial, sans-serif'
      'output':
        # Heading
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
        # Paragraph
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
        'I do not have any friend either':
          'color': 'I do not have any friend'
          'style':
            'font-size': '110%'
            'border-left': '8px black solid'
            'padding-left': '12px'

    'Buttons':
      'base':
        'border-radius': '5px'
        'padding': '4px 12px'
      'output':
        # Submit btn
        'Submit':
          'group': 'Submit'
          'bgcolor': 'VI Black'
          'color': '#ffffff'
          'style':
            'box-shadow': '0 1px 2px rgba(0, 0, 0, .3)'
        'Submit :hover':
          'group': 'Submit'
          'bgcolor': 'Article Title'
          'color': '#ffffff'
          'style':
            'box-shadow': '0 1px 2px rgba(0, 0, 0, .3)'
            'text-shadow': '0 -1px 1px rgba(0, 0, 0, .2)'
        'Submit :active':
          'group': 'Submit'
          'bgcolor': '#000000'
          'color': '#ffffff'
          'style':
            'box-shadow': '0 1px 2px rgba(0, 0, 0, .3)'
        'Submit :disabled':
          'group': 'Submit'
          'bgcolor': 'Try'
          'color': 'Article Title'
          'style':
            'box-shadow': '0 -1px 2px rgba(0, 0, 0, .2)'
        # Cancel btn
        'Cancel':
          'group': 'Cancel'
          'bgcolor': 'Try'
          'color': 'VI Black'
        'Cancel :hover':
          'group': 'Cancel'
          'bgcolor': '#ffffff'
          'color': 'VI Black'
          'style':
            'box-shadow': '0 1px 2px rgba(0, 0, 0, .3)'
        'Cancel :active':
          'group': 'Cancel'
          'bgcolor': 'Try'
          'color': 'VI Black'
          'style':
            'box-shadow': 'inset 0 1px 2px rgba(0, 0, 0, .3)'

    'Space':
      'base': '18'
      'output':
        'b-space-xs':
          'group': 'MVCSS'
          'odds': '0.25'
        'b-space-s':
          'group': 'MVCSS'
          'odds': '0.5'
        'b-space':
          'group': 'MVCSS'
          'odds': '1'
        'b-space-l':
          'group': 'MVCSS'
          'odds': '2'
        'b-space-xl':
          'group': 'MVCSS'
          'odds': '4'
        'TestRange':
          'group': 'Test'
          'odds': '180px'
        'Bad guy':
          'odds': '275px'
        'Does not help':
          'odds': '500px'

    'Test':
      'have group':
        'group': 'Pic'
        'imgSrc': 'img/test.png'
      'does not':
        'imgSrc': 'img/test.png'

  res.json data
  return

module.exports = router
