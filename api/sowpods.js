const express = require('express')
const sowpods = require('pf-sowpods')
const router = express.Router()

router.get('/random', (_, response) => {
  const word = sowpods.random()
  response.json({
    result: word
  })
})

router.get('/verify', (request, response) => {
  const word = request.query.w
  response.json({
    result: sowpods.verify(word)
  })
})

router.get('/anagram', (request, response) => {
  const word = request.query.w
  const anagrams = sowpods.anagram(word)
  response.json({
    result: anagrams.sort((a, b) => b.length - a.length || a.localeCompare(b))
      .slice(0, 100)
  })
})

router.get('/suggest', (request, response) => {
  const word = request.query.w
  const suggestions = sowpods.suggest(word)
  response.json({
    result: suggestions.slice(0, 100)
  })
})

module.exports = router
