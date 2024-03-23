// Chen Einy:209533785
// Adir Mintz:316579549

/* imports */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const costRouter = require('./routes');
require('dotenv').config();


/* protection and port selection*/
const app = express();
const port = process.env.PORT || 3000;
const connectionString = process.env.MONGODB_CONNECTION_STRING;


/* uses */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(costRouter);
app.use(express.json());
app.use(cors());
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

/* Mongo Connection */

mongoose.connect(connectionString)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));
