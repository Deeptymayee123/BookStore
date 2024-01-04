const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema(
  {
    bookTitle: {
      type: String,
    },
    authorName: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    category: {
      type: String,
    },
    bookDescription: {
      type: String,
    },
    bookPdfUrl: {
      type: String,
    },
    price: {
      type: String,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    rating: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Books', BookSchema);

module.exports = Book;
