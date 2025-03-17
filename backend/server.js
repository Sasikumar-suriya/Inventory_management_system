const express = require('express');
const path = require('path');
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config();  

const app = express();

// Enable CORS for all origins
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  


app.use('/', routes);

//Default route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});


const port = process.env.PORT || 8000;
    
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



