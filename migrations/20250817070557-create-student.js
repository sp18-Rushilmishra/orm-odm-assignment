'use strict';
/**
 * Migration: Create student table
 * Database: PostgreSQL (Relational)
 * Naming Convention: snake_case columns
 * Generated: 2025-08-16T11:28:11.917Z
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('student', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: 'Primary key for student table'
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: 'Name of the student'
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        comment: 'Student email address'
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: 'Hashed password for the student'
      },
      profile_image: {
        type: Sequelize.STRING(100),
        allowNull: true,
        comment: 'Profile image for the student'
      },
      address_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique:true,
        comment: 'Foreign key referencing address table',
        references: {
          model: 'address',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      // Timestamps
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: 'Record creation timestamp'
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: 'Record last update timestamp'
      }
    });
    await queryInterface.addIndex('student', ['email'], {
      unique: true,
      name: 'student_email_unique'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('student');
  }
};


