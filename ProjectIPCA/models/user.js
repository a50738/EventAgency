const Sequelize = require('sequelize');
const PostSQLdb = require('../config/database')

const user = PostSQLdb.define('users',{
    // id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true       
    // },
    name: {
        type: Sequelize.STRING
    },
    surname: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    phone_number: {
        type: Sequelize.STRING
    }
})

module.exports = user