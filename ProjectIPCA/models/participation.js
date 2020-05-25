const Sequelize = require('sequelize');
const PostSQLdb = require('../config/database')

const participation = PostSQLdb.define('participations',{
    // id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true       
    // },
    id_user: {
        type: Sequelize.BIGINT
    },
    id_event: {
        type: Sequelize.BIGINT
    },
    id_position: {
        type: Sequelize.BIGINT
    },
    salary: {
        type: Sequelize.STRING
    }
})

module.exports = participation