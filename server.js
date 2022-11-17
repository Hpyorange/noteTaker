const express = require('express');
const path = require('path');

// const api = require('./router/api.js');
const app = express();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;

//use public folder
app.use(express.static('public'));


//Post method (required)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use('/api/notes',api)

//get method '/motes
app.get('/notes',(req,res)=>{
  res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
})


app.get('/api/notes', (req, res) => {

  fs.readFile(path.join(__dirname, './db/db.json')),'utf8', (err, data) => {

    res.json(JSON.parse(data));
}

  // res.sendFile(path.join(__dirname, './db/db.json'));
});


app.post('/api/notes', (req, res) => {
let db = fs.readFileSync('db/db.json');
db = JSON.parse(db);

let input = {
  title: req.body.title,
  text: req.body.text,
  id: uuidv4(),
  };

  db.push(input);
  fs.writeFileSync('db/db.json', JSON.stringify(db));
  res.json(db);
});

app.delete('/api/notes/:id', (req, res) => {

  let db = JSON.parse(fs.readFileSync('db/db.json'))

  let deleteNotes = db.filter(item => item.id !== req.params.id);

  fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
  res.json(deleteNotes);
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);