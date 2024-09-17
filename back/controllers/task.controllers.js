let tasks = []
const db = require('../database/index.js');
const { ObjectId } = require( "mongodb" );

exports.addTask = async (req, res) => {

    const task = req.body

    const connection = await db.connect()
    const collection = await connection.db('Task').collection('tasks')
    console.log(task)
    const result = await collection.insertOne({
        name : task.nom,
        creator : task.creator,
        description : task.description,
        endDate : task.date
    })

    res.status(200).send(JSON.stringify({result: 'ok', id: result.insertedId}))

}
exports.removeTask = (req, res) => {
    tasks = tasks.filter(task => task.id !== parseInt(req.params.id))

    res.status(200).send(JSON.stringify({result: 'ok'}))

}
exports.updateTask = async (req, res) => {
    let json_data = req.body
    const connection = await db.connect()
    const collection = await connection.db('Task').collection('tasks')
    const filter = {_id : new ObjectId(req.params.id) }

    const updateDoc = {
        $set: {
            name : json_data.nom,
            creator : json_data.creator,
            description : json_data.description,
            endDate : json_data.date
        },
    };
    const result = await collection.updateOne(filter, updateDoc);

    res.status(200).send(JSON.stringify({result: 'ok'}))

}

exports.getTasks = async (req, res) => {
    const connection = await db.connect()
    const collection = await connection.db('Task').collection('tasks')
    const result = await collection.find({}).toArray()

    res.status(200).send(JSON.stringify({result: 'ok', data: JSON.stringify(result)}))
}

exports.getUsers = async (req, res) => {
    const connection = await db.connect()
    const collection = await connection.db('Task').collection('Users')
    const result = await collection.find({}).toArray()

    res.status(200).send(JSON.stringify({result: 'ok', data: JSON.stringify(result)}))
}

exports.getTaskById = async (req, res) => {
    const connection = await db.connect()
    const collection = await connection.db('Task').collection('tasks')
    const query = {_id : new ObjectId(req.params.id) }
    const result = await collection.findOne(query)

    res.status(200).send(JSON.stringify({result: 'ok', data: JSON.stringify(result)}))
}
