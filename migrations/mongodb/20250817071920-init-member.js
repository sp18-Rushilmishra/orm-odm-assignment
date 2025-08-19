const { MongoClient } = require('mongodb');
require('dotenv').config();

/**
 * MongoDB Migration: Initialize member collection
 * Database: MongoDB (Document-based)
 * Generated: 2025-08-17T07:19:20.107Z
 */

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/odm_demo';
const DB_NAME = process.env.MONGO_DB_NAME || 'odm_demo';

async function up() {
  const client = new MongoClient(MONGO_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    
    // Create collection with validation schema
    await db.createCollection('member', {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["_id"], // Add required fields here
          properties: {
            _id: {
              bsonType: "objectId",
              description: "Primary key for member"
            },
            
            // TODO: Add your schema validation here
            // Example:
            // name: {
            //   bsonType: "string",
            //   minLength: 2,
            //   maxLength: 100,
            //   description: "User's full name"
            // },
            // email: {
            //   bsonType: "string",
            //   pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
            //   description: "Valid email address"
            // },
            // age: {
            //   bsonType: "int",
            //   minimum: 0,
            //   maximum: 150,
            //   description: "Age in years"
            // },
            // isActive: {
            //   bsonType: "bool",
            //   description: "Whether the user is active"
            // },
            
            createdAt: {
              bsonType: "date",
              description: "Document creation timestamp"
            },
            updatedAt: {
              bsonType: "date",
              description: "Document last update timestamp"
            }
          }
        }
      }
    });
    
    console.log(`✅ Collection '${collectionName}' created successfully`);
    
    // Create indexes
    await db.collection('member').createIndexes([
      // TODO: Add your indexes here
      // Example:
      // { key: { email: 1 }, unique: true, name: 'member_email_unique' },
      // { key: { createdAt: -1 }, name: 'member_created_at_desc' },
      
      // Default indexes
      { key: { createdAt: -1 }, name: 'member_created_at_desc' },
      { key: { updatedAt: -1 }, name: 'member_updated_at_desc' }
    ]);
    
    console.log(`✅ Indexes created for '${collectionName}'`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await client.close();
  }
}

async function down() {
  const client = new MongoClient(MONGO_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    
    // Drop collection
    await db.collection('member').drop();
    console.log(`✅ Collection '${collectionName}' dropped successfully`);
    
  } catch (error) {
    console.error('❌ Rollback failed:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Command line interface
const command = process.argv[2];

if (command === 'up') {
  up()
    .then(() => {
      console.log('🎉 Migration completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration failed:', error.message);
      process.exit(1);
    });
} else if (command === 'down') {
  down()
    .then(() => {
      console.log('🎉 Rollback completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Rollback failed:', error.message);
      process.exit(1);
    });
} else {
  console.log('Usage: node 20250817071920-init-member.js <up|down>');
  console.log('');
  console.log('Examples:');
  console.log('  node 20250817071920-init-member.js up    # Apply migration');
  console.log('  node 20250817071920-init-member.js down  # Rollback migration');
  process.exit(1);
}

module.exports = { up, down };

/*
NEXT STEPS:
===========
1. Edit this file and add your schema validation and indexes
2. Run: node migrations/mongodb/20250817071920-init-member.js up
3. Run: npm run odm-model member
   (This will generate the Mongoose model)

MONGODB SCHEMA TYPES:
====================
"string"       // String
"int"          // 32-bit integer
"long"         // 64-bit integer
"double"       // Double
"decimal"      // Decimal128
"bool"         // Boolean
"date"         // Date
"objectId"     // ObjectId
"array"        // Array
"object"       // Embedded document

VALIDATION OPTIONS:
==================
minLength: 5          // Minimum string length
maxLength: 100        // Maximum string length
minimum: 0            // Minimum number
maximum: 150          // Maximum number
pattern: "^[a-z]+$"   // Regex pattern
enum: ["A", "B", "C"] // Allowed values
*/