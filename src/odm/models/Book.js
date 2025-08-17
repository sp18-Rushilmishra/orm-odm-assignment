const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [1, 'Title cannot be empty'],
      maxlength: [255, 'Title cannot exceed 255 characters']
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
      minlength: [1, 'Author cannot be empty'],
      maxlength: [255, 'Author cannot exceed 255 characters']
    },
    ISBN: {
      type: String,
      required: [true, 'ISBN is required'],
      unique: true,
      trim: true,
      validate: {
        validator: function(v) {
          // Basic ISBN-10 or ISBN-13 validation regex (simple)
          return /^(?:\d{10}|\d{13})$/.test(v.replace(/-/g, ''));
        },
        message: props => `${props.value} is not a valid ISBN number!`
      }
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    availableCopies: {
      type: Number,
      required: [true, 'Available copies is required'],
      min: [0, 'Available copies cannot be negative']
    }
  },
  {
    timestamps: true,
    collection: 'book',
    toJSON: {
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    },
    toObject: {
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

// Indexes for uniqueness and performance
bookSchema.index({ ISBN: 1 }, { unique: true });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;