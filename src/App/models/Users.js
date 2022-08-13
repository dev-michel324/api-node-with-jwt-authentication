const Sequelize = require("sequelize");
const dbPostgres = require("./../../config/dbConnection");

const user = dbPostgres.databaseConnection.define('user', {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
},{
    timestamps: true
})

user.sync();

module.exports = user;