const { response } = require('express');
const express = require('express');
const app = express();

app.use(express.json());

const persons = [
    {
        id:1,
        name: "Arto Hellias",
        number: "040-123456",
    },
    {
        id:2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id:3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id:4,
        name: "Mary Poppendick",
        number: "39-23-6423122",
    },
];
let now= new Date();

app.get('/info',(req,res) => {
    res.send(`<h3>Phonebook has info for ${agenda.length} people</h3><h3>`+now+"</h3>");
});
app.get('/api/persons',(req,res) => {
    res.send(persons);
});
app.get('/api/persons/:id',(req,res) => {
    const person = persons.find(c => c.id === parseInt(req.params.id));
    if(!person)
        res.status(404).send(`No se ha encontrado el registro con el id ${req.params.id}.`);
    res.send(person);
});
app.delete('/api/persons/:id',(req,res) => {
    const person = persons.find(c => c.id === parseInt(req.params.id));
    if(!person)
        res.status(404).send(`No se ha encontrado el registro con el id ${req.params.id}.`);
    const index = persons.indexOf(person);
    persons.splice(index,1)
    res.send(person);
});
app.post('/api/persons',(req,res) => {
    const person = {
        id: Math.round(Math.random()*10000),
        name: req.body.name,
        number: req.body.number,
    };
    persons.push(person);
    res.send(person);
});

const port = process.env.PORT || 3001;
app.listen(port,()=>console.log(`Listening on port ${port}`));