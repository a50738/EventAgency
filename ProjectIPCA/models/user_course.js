const Sequelize = require('sequelize');
const PostSQLdb = require('../config/database')

const user_course = PostSQLdb.define('users_courses',{
    // id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true       
    // },
    id_user: {
        type: Sequelize.BIGINT
    },
    id_course: {
        type: Sequelize.BIGINT
    },
})

module.exports = user_course