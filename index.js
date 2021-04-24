import express from 'express';
import persons from './persons.js';
const app = express();

app.use(express.json());

let now= new Date();

app.get('/info',(req,res) => {
    res.send(`<h3>Phonebook has info for ${persons.length} people</h3><h3>`+now+"</h3>");
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
    //Validando espacios llenados
    if(!req.body.name){
        res.status(400).send({error:'name must be required'});
        return;
    } else if (!req.body.number){
        res.status(400).send({error:'number must be required'});
        return;
    }
    //Validando nombre no repetido
    const names = persons.map((item)=>{return item['name']})
    if(names.includes(req.body.name)){
        res.status(400).send({error:'name is already added to list'});
        return;
    }

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