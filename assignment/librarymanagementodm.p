// ===============================
// Task 1: Member & Profile (1-to-1)
// ===============================
const profileSchema = new mongoose.Schema({
  linkedMember: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    unique: true // ensures one profile belongs to only one member
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is mandatory'],
    unique: true,
    trim: true,
    minlength: [7, 'Number too short'],
    maxlength: [20, 'Number too long'],
    match: [/^[0-9+\-\s()]*$/, 'Invalid phone number format']
  }
});

// ===============================
// Task 2: Book Handling
// ===============================
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ISBN: {
    type: String,
    required: [true, 'ISBN must be provided'],
    unique: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be below zero']
  },
  availableCopies: {
    type: Number,
    required: true,
    min: [0, 'Copies cannot be negative']
  }
});

// Prevent deletion if borrowed
bookSchema.pre('findOneAndDelete', async function (next) {
  const bookDoc = await this.model.findOne(this.getQuery());
  const Borrow = mongoose.model('Borrow');
  const active = await Borrow.exists({
    bookRef: bookDoc._id,
    status: 'Borrowed'
  });
  if (active) {
    return next(new Error('Deletion blocked: Book still borrowed.'));
  }
  next();
});

// Document level validation
bookSchema.pre('validate', function (next) {
  if (this.availableCopies < 0) this.invalidate('availableCopies');
  if (this.price < 0) this.invalidate('price');
  next();
});

// Simple logger
bookSchema.post('save', function (doc, next) {
  console.log(`✔ Book stored: ${doc.title} / ISBN ${doc.ISBN}`);
  next();
});

// ===============================
// Task 3: Borrow Records (1-to-Many)
// ===============================
const borrowSchema = new mongoose.Schema(
  {
    memberRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
    bookRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    borrowedOn: { type: Date, default: Date.now },
    returnedOn: { type: Date },
    status: {
      type: String,
      enum: ['Borrowed', 'Returned', 'Overdue'],
      default: 'Borrowed'
    }
  },
  { timestamps: true }
);

// Middleware: update available copies on borrow
borrowSchema.pre('save', async function (next) {
  if (this.isNew && this.status === 'Borrowed') {
    const Book = mongoose.model('Book');
    const foundBook = await Book.findById(this.bookRef);
    if (!foundBook || foundBook.availableCopies <= 0) {
      return next(new Error('No copies left to borrow.'));
    }
    foundBook.availableCopies = foundBook.availableCopies - 1;
    await foundBook.save();
  }
  next();
});

// Middleware: check overdue or returned
borrowSchema.pre('save', function (next) {
  if (this.isModified('returnedOn') && this.returnedOn) {
    const elapsedDays =
      (this.returnedOn.getTime() - this.borrowedOn.getTime()) /
      (1000 * 60 * 60 * 24);

    this.status = elapsedDays > 14 ? 'Overdue' : 'Returned';
  }
  next();
});

// ===============================
// Task 4: Member Validations
// ===============================
const memberSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email cannot be empty'],
    lowercase: true,
    trim: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
      'Invalid email format'
    ]
  },
  membershipDate: { type: Date },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
});

// Auto-assign membership date
memberSchema.pre('save', function (next) {
  if (this.isNew && !this.membershipDate) {
    this.membershipDate = new Date();
  }
  next();
});

// ===============================
// Task 5: Extra Checks
// ===============================

// Borrow restriction: cannot borrow same book twice
async function preventDoubleBorrow(memberId, bookId) {
  const Borrow = mongoose.model('Borrow');
  const activeBorrow = await Borrow.findOne({
    memberRef: memberId,
    bookRef: bookId,
    status: 'Borrowed'
  });
  if (activeBorrow) {
    throw new Error('Return the previous copy before borrowing again.');
  }
}
