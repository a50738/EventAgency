const Sequelize = require('sequelize');
const PostSQLdb = require('../config/database')

const course = PostSQLdb.define('course',{
    // id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true       
    // },
    name: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.STRING
    },
})

module.exports = course