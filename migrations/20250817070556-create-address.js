'use strict';
/**
* Migration: Create address table
* Database: PostgreSQL (Relational)
* Naming Convention: snake_case columns
* Generated: 2025-08-16T11:28:30.827Z
*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('address', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: 'Primary key for address table'
      },
      street: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: 'Street address'
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: 'City name'
      },
      state: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: 'State name'
      },
      zip_code: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: 'Zip/Postal code'
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('address');
  }
};














