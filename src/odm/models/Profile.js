const mongoose = require('mongoose');

/**
 * Profile Mongoose Model
 * Collection: profile
 * Generated: 2025-08-17T07:21:30.476Z
 */

const profileSchema = new mongoose.Schema(
  {
    // TODO: Add your schema fields here
    // Example fields:
    /*
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
    
    age: {
      type: Number,
      min: [0, 'Age cannot be negative'],
      max: [150, 'Age cannot exceed 150'],
      validate: {
        validator: Number.isInteger,
        message: 'Age must be an integer'
      }
    },
    
    isActive: {
      type: Boolean,
      default: true
    },
    
    tags: {
      type: [String],
      default: []
    },
    
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    
    // Reference to another model
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true
    // }
    */
  },
  {
    // Schema options
    timestamps: true, // Automatically adds createdAt and updatedAt
    collection: 'profile', // Explicit collection name
    
    // JSON transformation
    toJSON: {
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    },
    
    // Object transformation
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

// Indexes
// Add your indexes here for better query performance
// Example:
// profileSchema.index({ email: 1 }, { unique: true });
// profileSchema.index({ createdAt: -1 });
// profileSchema.index({ name: 'text', description: 'text' }); // Text search

// Instance methods
profileSchema.methods = {
  /**
   * Get the full name or display name
   */
  getDisplayName() {
    return this.name || this.email || this._id.toString();
  },

  /**
   * Convert to a safe object (remove sensitive fields)
   */
  toSafeObject() {
    const obj = this.toObject();
    // Remove sensitive fields
    // delete obj.password;
    // delete obj.secretKey;
    return obj;
  },

  /**
   * Check if document is recently created (within last 24 hours)
   */
  isRecentlyCreated() {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return this.createdAt > oneDayAgo;
  }
};

// Static methods
profileSchema.statics = {
  /**
   * Find active documents
   */
  findActive() {
    return this.find({ isActive: true });
  },

  /**
   * Find by name (case-insensitive)
   */
  findByName(name) {
    return this.findOne({ 
      name: new RegExp(name, 'i') 
    });
  },

  /**
   * Get documents created in the last N days
   */
  findRecentlyCreated(days = 7) {
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    return this.find({ 
      createdAt: { $gte: cutoffDate } 
    }).sort({ createdAt: -1 });
  }
};

// Virtuals
// Example virtual field
profileSchema.virtual('url').get(function() {
  return `/api/profile/${this._id}`;
});

// Middleware (hooks)
// Pre-save middleware
profileSchema.pre('save', function(next) {
  // Example: Auto-generate slug, hash passwords, etc.
  // if (this.isModified('name')) {
  //   this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
  // }
  next();
});

// Post-save middleware
profileSchema.post('save', function(doc) {
  console.log(`Profile document saved: ${doc._id}`);
});

// Pre-remove middleware
profileSchema.pre('deleteOne', { document: true }, function(next) {
  console.log(`Removing Profile: ${this._id}`);
  // Cleanup related documents here
  next();
});

// Export the model
const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;

/*
MONGOOSE FIELD TYPES:
====================
String          // Text
Number          // Integer or decimal
Boolean         // true/false
Date            // Date/timestamp
ObjectId        // MongoDB ObjectId
Array           // Array of values
Mixed           // Any type
Buffer          // Binary data
Decimal128      // High precision decimals
Map             // Key-value pairs

COMMON VALIDATORS:
=================
required: true                    // Field is required
unique: true                      // Must be unique
default: 'value'                  // Default value
min: 0, max: 100                 // Number range
minlength: 2, maxlength: 50      // String length
lowercase: true, uppercase: true  // String transformation
trim: true                       // Remove whitespace
match: /regex/                   // Regex validation
enum: ['opt1', 'opt2']          // Allowed values
validate: { validator: fn }      // Custom validation

SCHEMA OPTIONS:
==============
timestamps: true        // Auto createdAt/updatedAt
collection: 'name'     // Collection name
strict: true           // Strict schema
versionKey: false      // Disable __v field
*/