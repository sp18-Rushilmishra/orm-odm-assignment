const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please provide a valid email address'
      ]
    },
    membershipDate: {
      type: Date,
      default: Date.now // auto-set on creation
    },
    membershipStatus: {
      type: String,
      enum: ['Active', 'Expired', 'Suspended'],
      default: 'Active'
    }
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    collection: 'member',
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    },
    toObject: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

memberSchema.pre('save', function (next) {
  if (!this.membershipDate) {
    this.membershipDate = new Date();
  }
  next();
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;