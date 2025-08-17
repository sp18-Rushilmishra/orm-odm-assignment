const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      required: true,
      unique: true, // One-to-one: ensure one profile per member
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
      minlength: [5, 'Address must be at least 5 characters'],
      maxlength: [500, 'Address cannot exceed 500 characters']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      trim: true,
      minlength: [7, 'Phone number seems too short'],
      maxlength: [20, 'Phone number seems too long'],
      match: [
        /^[0-9+\-\s()]*$/, // Simple phone number regex (digits, +, -, space, parentheses)
        'Please provide a valid phone number'
      ]
    }
  },
  {
    timestamps: true,
    collection: 'profile',
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

// Indexes for faster queries and uniqueness enforcement
profileSchema.index({ member: 1 }, { unique: true });  // One profile per member
profileSchema.index({ phone: 1 }, { unique: true });   // Unique phone across profiles

// Middleware/hooks if needed can be added here (e.g., pre-save validations)

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
