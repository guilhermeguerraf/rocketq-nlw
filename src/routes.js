const express = require('express')

const questionController = require('./controllers/questionController')
const roomController = require('./controllers/roomController')

const routes = express.Router()

routes.get('/', (req, res) => res.render("index", {page: "enter-room"}))
routes.get('/create-room', (req, res) => res.render("index", {page: "create-room"}))

routes.post('/room/create', roomController.create)
routes.post('/room/enter', roomController.enter)
routes.get('/room/:room', roomController.open)

routes.post('/:room/:question/:action', questionController.index)
routes.post('/room/:room/question/create', questionController.create)


module.exports = routes