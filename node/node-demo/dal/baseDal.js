const Sequelize = require("sequelize");
const Config = require("../config");

const sequelize = new Sequelize(Config.db.database, Config.db.username, Config.db.password, {
    ...Config.db.config
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
    });

module.exports = sequelize;
