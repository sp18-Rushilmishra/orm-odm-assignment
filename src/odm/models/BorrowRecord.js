const mongoose = require('mongoose');

const borrowRecordSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      required: true
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true
    },
    borrowDate: {
      type: Date,
      required: true,
      default: Date.now // auto-set on creation
    },
    returnDate: {
      type: Date,
      required: false
    },
    status: {
      type: String,
      enum: ['Borrowed', 'Returned', 'Overdue'],
      default: 'Borrowed',
      required: true
    }
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    collection: 'borrowRecord',
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    },
    toObject: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

// Optionally create indexes for performance
borrowRecordSchema.index({ member: 1, book: 1, status: 1 });

// Pre-save hook: you can add custom logic if needed (e.g., check overdue)
// Example placeholder:
borrowRecordSchema.pre('save', function(next) {
  // Example: auto set status to overdue if returnDate more than 14 days after borrowDate
  if (this.returnDate && this.status === 'Borrowed') {
    const diff = this.returnDate - this.borrowDate;
    const daysDiff = diff / (1000 * 3600 * 24);
    if (daysDiff > 14) {
      this.status = 'Overdue';
    }
  }
  next();
});

const BorrowRecord = mongoose.model('BorrowRecord', borrowRecordSchema);
module.exports = BorrowRecord;
