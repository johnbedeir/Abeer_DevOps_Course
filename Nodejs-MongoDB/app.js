const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB (replace the URI with your MongoDB connection string)
mongoose.connect('mongodb://mongo:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define a schema and model for messages
const messageSchema = new mongoose.Schema({
  content: String
});
const Message = mongoose.model('Message', messageSchema);

// Define a route for '/'
app.get('/', async (req, res) => {
  try {
    const message = await Message.findOne(); // Get the first message from the database
    if (message) {
      res.send(`Message from DB: ${message.content}`);
    } else {
      res.send('No message found in the database');
    }
  } catch (err) {
    res.status(500).send('Error querying the database');
  }
});

// Define a route to insert a message
app.get('/insert', async (req, res) => {
  const newMessage = new Message({ content: 'Hello, Docker with Node.js and MongoDB!' });
  try {
    await newMessage.save(); // Save the message to the database
    res.send('Message inserted into the database');
  } catch (err) {
    res.status(500).send('Error inserting into the database');
  }
});

// Start the server
const port = 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`App running on http://0.0.0.0:${port}`);
});
