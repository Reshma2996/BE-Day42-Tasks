const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');

// Connect to MongoDB
mongoose.connect('mongodb+srv://mailtoreshurr:Guvi123@cluster0.k6azamw.mongodb.net/urlshortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Create a new ShortUrl document
ShortUrl.create({
  originalUrl: 'https://example.com',
  shortUrl: 'abc123'
})
.then(shortUrl => {
  console.log('ShortUrl created:', shortUrl);
})
.catch(err => {
  console.error('Error creating ShortUrl:', err);
});

// Find all ShortUrl documents
ShortUrl.find()
.then(shortUrls => {
  console.log('All ShortUrls:', shortUrls);
})
.catch(err => {
  console.error('Error finding ShortUrls:', err);
});
