const { Sequelize } = require('sequelize');
const db2 = new Sequelize('eventagency', 'postgres', 'project', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      // Your pg options here
    }
  });

  module.exports = db2