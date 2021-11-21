const express = require('express')
const app = express()
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerJsDocs = YAML.load('./api.yaml')

app.use(express.json())
const fileUpload = require('express-fileUpload')
app.use(fileUpload());

// swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
const port = 9000

const users = [
    { id: 1, name: 'ashik1', role: 'user' },
    { id: 2, name: 'ashik2', role: 'user' },
    { id: 3, name: 'ashik3', role: 'admin' },
    { id: 4, name: 'ashik4', role: 'admin' },
]

app.get('/string', (req, res) => {
    res.status(200).send('this is a string')
})
app.get('/user', (req, res) => {
    res.status(200).send(
        {
            id: 1,
            name: 'ashik',
            role: 'user'
        }
    )
})
app.get('/users', (req, res) => {
    res.status(200).send(users)
})

app.get('/users/:id', (req, res) => {
    const obj = users.find(user => user.id === parseInt(req.params.id))
    obj ? res.status(200).send(obj) : res.status(404).send({
        message: 'not found'
    })

})


app.post("/create", (req, res) => {

    if (req.body) {
        console.log(req.body)
        const id = users.find(user => user.id === parseInt(req.body.id))
        console.log(id)
        if (!id) {
            user = [req.body, ...users]
            res.send(user)
        } else {
            res.send({ message: "already exists" })
        }


    }
    else {
        // console.log("error", error)
        res.status(405).send({ message: "Validation exception" })
    }



})



app.get('/userQuery', (req, res) => {
    const obj = users.find(user => user.id === parseInt(req.query.id))
    obj ? res.status(200).send(obj) : res.status(404).send({
        message: 'not found'
    })

})


app.post('/upload', (req, res) => {
    const file = req.files.file
    let path = __dirname + "/upload/" + "file" + Date.now() + ".jpg"
    file.mv(path, (err) => {
        res.send("ok")
    })


})

app.listen(port, () => console.log(`Example app listening on port port!`))