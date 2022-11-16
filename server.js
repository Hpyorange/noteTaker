const express = require('express');

const path = require('path');

const app = express();


// In many environments (e.g. Heroku), and as a convention || 3001 port
const PORT = process.env.PORT || 3001;

//use public folder
app.use(express.static('public'));


//Post method (required)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//get method '/motes
app.get('/notes',(req,res)=>{
  res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);