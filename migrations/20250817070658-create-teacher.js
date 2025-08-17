'use strict';

/**
 * Migration: Create teacher table
 * Database: PostgreSQL (Relational)
 * Naming Convention: snake_case columns
 * Generated: 2025-08-16T11:28:50.562Z
 */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teacher', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: 'Primary key for teacher table'
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: 'Name of the teacher'
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        comment: 'Email address of the teacher'
      },
      phone: {
        type: Sequelize.STRING(50),
        allowNull: true,
        comment: 'Phone number of the teacher'
      },

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

    await queryInterface.addIndex('teacher', ['email'], {
      unique: true,
      name: 'teacher_email_unique'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('teacher');
  }
};