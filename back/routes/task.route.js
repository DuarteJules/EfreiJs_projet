const express = require( "express" );
const task = require('../controllers/task.controllers')

module.exports =  (app) => {

    const router = express.Router();

    router.get('/', (req, res) => {
        res.send('yo')
    })

    router.get('/hello', (req, res) => {
        res.send('Bonjour')
    })

    router.get('/return-json', (req, res) => {
        res.send(JSON.stringify({
            name : "JD"
        }))
    })

    router.get('/getTask', [], task.getTasks)

    router.get('/getTask/:id', [], task.getTaskById)

    router.get('/getUsers', [], task.getUsers)

    router.post('/createTask', [], task.addTask)

    router.post('/deleteTask/:id', [], task.removeTask)

    router.post('/updateTask/:id',[], task.updateTask)

    app.use("/task", router)

}
