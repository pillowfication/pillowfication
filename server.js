const path = require('path')
const express = require('express')
const compression = require('compression')
const favicon = require('serve-favicon')

const PORT = process.argv[2] || process.env.PFN_PORT || 80
const INDEX_PATH = path.resolve(__dirname, './dist/index.html')
const GITHUB_PATH = path.resolve(__dirname, './dist/github.html')

const app = express()

if (process.env.NODE_ENV === 'production') {
  app.use(compression({ level: 9 }))
}

app.use(favicon(path.resolve(__dirname, './src/favicon.ico')))
app.use(express.static(path.resolve(__dirname, './dist')))

app.use('/~20198403', express.static(path.resolve(__dirname, './dist/cis89c')))

app.get('/github*', (_, response) => {
  response.sendFile(GITHUB_PATH)
})
app.get('*', (_, response) => {
  response.sendFile(INDEX_PATH)
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
