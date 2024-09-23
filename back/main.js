const express = require('express')
const app = express()
const port = 4000
const cors = require("cors")
require('dotenv').config()

app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/hello/:name', (req, res) => {
    res.send(`Bonjour ${req.params.name}`)
})
require('./routes/task.route.js')(app)
require('./routes/auth.route.js')(app)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
