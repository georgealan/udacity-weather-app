projectData = {}

require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('website'))

const port = process.env.PORT || 3000

const server = app.listen(port, () => {
  console.log(`Server running at localhost ${port}`)
})

app.get('/all', (req, res) => {
  console.log(req)
  res.send(projectData)
})

app.post('/add', (req, res) => {
  console.log('POST Request Successful')
  console.log(req.body)

  projectData = {
    date: req.body.date,
    temp: req.body.temp,
    description: req.body.description,
    icon: req.body.icon,
    content: req.body.content
  }

  res.send(projectData)
  console.log(projectData)
})
