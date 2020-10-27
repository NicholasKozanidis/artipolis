const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

//connect
connectDB();
app.use(bodyParser.json());

app.use(express.json({ extended: false }));
// Create storage engine

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
