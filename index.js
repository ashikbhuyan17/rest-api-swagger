const express = require('express')
const app = express()
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerJsDocs = YAML.load('./api.yaml')
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
const port = 3000

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

app.listen(port, () => console.log(`Example app listening on port port!`))