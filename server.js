// server.js
const express = require('express');
const mongoose = require('mongoose');
const shortUrl = require('./models/shortUrl');

const app = express();

mongoose.connect('mongodb+srv://mailtoreshurr:Guvi123@cluster0.k6azamw.mongodb.net/urlshortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());

app.post('/api/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  try {
    const existingUrl = await shortUrl.findOne({ originalUrl });
    if (existingUrl) {
      res.json(existingUrl);
    } else {
      const newUrl = await shortUrl.create({ originalUrl });
      res.json(newUrl);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const url = await shortUrl.findOne({ shortUrl });
    if (url) {
      res.redirect(url.originalUrl);
    } else {
      res.status(404).json({ message: 'URL not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
