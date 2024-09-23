const express = require( "express" );
const task = require('../controllers/task.controllers')
const  security = require('../middleware/security');

module.exports =  (app) => {
    const router = express.Router();

    router.get('/getTask', [security.checkAndValidateToken(true)], task.getTasks)

    router.get('/getTask/:id', [security.checkAndValidateToken(true)], task.getTaskById)

    router.get('/getUsers', [security.checkAndValidateToken(true)], task.getUsers)

    router.post('/createTask', [security.checkAndValidateToken(true)], task.addTask)

    router.post('/deleteTask/:id', [security.checkAndValidateToken(true)], task.removeTask)

    router.post('/updateTask/:id',[security.checkAndValidateToken(true)], task.updateTask)

    app.use("/task", router)

}
