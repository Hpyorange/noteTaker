const express = require('express');

const app = express();

// In many environments (e.g. Heroku), and as a convention || 3001 port
const PORT = process.env.PORT || 3001;

//use public folder
app.use(express.static('public'));

//Post method
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);