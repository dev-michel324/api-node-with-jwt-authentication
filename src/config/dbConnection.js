const { Sequelize } = require("sequelize");
const dotenv = require("dotenv").config();

const DBHOST = process.env.DBHOST;
const DBPORT = process.env.DBPORT;
const DBUSER = process.env.DBUSER;
const DBNAME = process.env.DBNAME;
const DBPASSWORD = process.env.DBPASSWORD;

class DbConnection {
  constructor() {
    this.databaseConnection = new Sequelize(DBNAME, DBUSER, DBPASSWORD, {
      host: DBHOST,
      port: DBPORT,
      dialect: "postgres",
      logging: false,
    });
  }

  testConnection() {
    this.databaseConnection
      .authenticate()
      .then(() => {
        console.log("Connection successfully!");
      })
      .catch((err) => {
        console.log(`Connection failed : ${err} \n
            USER: ${DBUSER}\n
            PASSWORD: ${DBPASSWORD}\n
            NAME: ${DBNAME}\n
            HOST: ${DBHOST}\n
            PORT: ${DBPORT}\n
            `);
      });
  }
}

module.exports = new DbConnection();
