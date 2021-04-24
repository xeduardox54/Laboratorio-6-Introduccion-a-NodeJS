const express = require('express');
const app = express();

const agenda = [
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
]

app.get('/',(req,res) => {
    res.send('Hola Mundo');
});
app.get('/api/persons',(req,res) => {
    res.send(agenda);
});

app.listen(3001,()=>console.log('Listening on port 3001'))