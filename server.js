const path = require('path')
const express = require('express')

const PORT = process.argv[2] || process.env.PFN_PORT || 80
const INDEX_PATH = path.resolve(__dirname, './dist/index.html')

const app = express()

app.use(express.static(path.resolve(__dirname, './dist')))

app.get('*', (_, response) => {
  response.sendFile(INDEX_PATH)
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
