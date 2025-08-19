'use strict';

/**
 * Migration: Create course table
 * Database: PostgreSQL (Relational)
 * Naming Convention: snake_case columns
 * Generated: 2025-08-16T11:28:36.956Z
 */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('course', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: 'Primary key for course table'
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: 'Title of the course (required, max length 100)'
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Course description (optional)'
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Duration in weeks'
      },
      fee: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        comment: 'Course fee'
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('course');
  }
};