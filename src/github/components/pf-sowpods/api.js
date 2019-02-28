import request from 'request-promise-native'

const BASE_URL = window.location.origin + '/api/sowpods'
const wordCache = {}

export function random () {
  return request.get({
    uri: BASE_URL + '/random',
    json: true
  }).then(response => response.result)
}

export function verify (word) {
  word = word.toUpperCase()
  if (wordCache[word] !== undefined) {
    return Promise.resolve(wordCache[word])
  }
  return request.get({
    uri: BASE_URL + '/verify',
    qs: { w: word },
    json: true
  }).then(response => {
    return (wordCache[word] = response.result)
  })
}
export function anagram (word) {
  return request.get({
    uri: BASE_URL + '/anagram',
    qs: { w: word },
    json: true
  }).then(response => response.result)
}
export function suggest (word) {
  return request.get({
    uri: BASE_URL + '/suggest',
    qs: { w: word },
    json: true
  }).then(response => response.result)
}
