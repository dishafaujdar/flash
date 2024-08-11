// sequelize.js
const { Sequelize, DataTypes } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('flashcard_db', 'root', 'your_password', {
  host: 'localhost',
  dialect: 'mysql',
});

// Test the connection
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Unable to connect to the database:', err));

// Define a model
const Flashcard = sequelize.define('Flashcard', {
  question: {
    type: DataTypes.STRING,
    allowNull: false
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'flashcards',
  timestamps: false
});

module.exports = { sequelize, Flashcard };
