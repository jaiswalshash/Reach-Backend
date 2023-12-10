// booksController.js
const express = require('express');
const { getClient } = require('./db');

const calculateDifference = (vector1, vector2) => {
  return Math.sqrt(Math.pow(vector1[0] - vector2[0], 2) + Math.pow(vector1[1] - vector2[1], 2));
};

const router = express.Router();

router.post('/match_books', async (req, res) => {
  const userAnswers = [req.body.mood, req.body.personality];

  try {
    // Fetch books from the database
    const client = getClient();
    const database = client.db('book_matching');
    const collection = database.collection('books');

    const query = {};

    // Fetch all documents from the collection
    const books = await collection.find(query).toArray();

    // Calculate the difference of vectors and find the best match
    let bestMatch = null;
    let minDifference = Infinity;

    books.forEach((book) => {
      const bookVector = [book.mood, book.personality];
      const difference = calculateDifference(userAnswers, bookVector);

      if (difference < minDifference) {
        minDifference = difference;
        bestMatch = book;
      }
    });

    res.json({ bestMatch });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
