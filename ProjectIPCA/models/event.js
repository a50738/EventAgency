const Sequelize = require('sequelize');
const PostSQLdb = require('../config/database')

const event = PostSQLdb.define('events',{
    // id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true       
    // },
    title: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    place_of_meet: {
        type: Sequelize.STRING
    },
    date_of_meet: {
        type: Sequelize.DATE
    },
    start_date: {
        type: Sequelize.DATE
    },
    end_date: {
        type: Sequelize.DATEONLY
    },
    amount_of_people: {
        type: Sequelize.SMALLINT
    }
})

module.exports = event