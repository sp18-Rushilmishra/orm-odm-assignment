'use strict';

/**
 * Migration: Create enrollment table
 * Database: PostgreSQL (Relational)
 * Naming Convention: snake_case columns
 * Generated: 2025-08-16T11:28:43.922Z
 */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('enrollment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: 'Primary key for enrollment table'
      },

      // =========================
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Foreign key referencing student',
        references: {
          model: 'student',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Foreign key referencing course',
        references: {
          model: 'course',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      enrollment_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: 'Enrollment date, auto-set on creation'
      },
      status: {
        type: Sequelize.ENUM('Active', 'Completed', 'Cancelled'),
        allowNull: false,
        defaultValue: 'Active',
        comment: 'Enrollment status'
      },
      // =========================

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

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('enrollment');
  }
};