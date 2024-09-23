const db = require('../database/index.js');
const { ObjectId } = require( "mongodb" );
const jwt = require("jsonwebtoken")
const bcrypt = require( "bcrypt" );

async function getJWT(pseudo) {

    const connection = await db.connect()
    const Users = await connection.db('Task').collection('Users')

    const query = {pseudo : pseudo }

    const user = await Users.findOne(query)

    if (!user)
        return false

    return new Promise(async (resolve, reject) => {
        jwt.sign({user}, process.env.SECRET_KEY, {noTimestamp : true}, function (err, token) {
            err ? reject(err) : resolve(token)
        })
    })

}

exports.login = async (req, res) => {

    if(!req.body.pseudo || !req.body.password){
        res.sendStatus(400);
    }

    const connection = await db.connect()
    const Users = await connection.db('Task').collection('Users')

    const query = {pseudo : req.body.pseudo }
    Users.findOne(query).then(async (user) =>{
        if (!user)
            return res.status(400).send({
                status: 400,
                status_message: "Il n'existe pas de compte pour ce pseudo",
            })

        const result = await bcrypt.compareSync(req.body.password, user.password.replace('$2y$', '$2a$'))
        if (!result)
            return res.status(403).send({
                status: 403,
                status_message: "Adresse mail ou mot de passe incorrect.",
            })

        user['jwt'] = await getJWT(req.body.pseudo)

        res.status(200).json({
            status: 200,
            status_message: "Success",
            user
        })
    })

}

exports.register = async (req, res) => {

    if(!req.body.pseudo || !req.body.password){
        res.sendStatus(400);
    }

    const connection = await db.connect()
    const Users = await connection.db('Task').collection('Users')

    const query = {pseudo : req.body.pseudo }
    const user = await Users.findOne(query)
    if (user)
        return res.status(400).send({
            status: 400,
            status_message: "Cet email possède déjà un compte.",
        })

    await Users.insertOne( {
        pseudo : req.body.pseudo,
        password : await bcrypt.hash(req.body.password, 10)
    }).then(() => {
        return res.status(200).send({
            status: 200,
            status_message: "Success",
        })
    })
}
