const Sequelize = require('sequelize');
const PostSQLdb = require('../config/database')

const position = PostSQLdb.define('positions',{
    // id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true       
    // },
    name: {
        type: Sequelize.STRING
    },
})

module.exports = position