module.exports = {
    db: {
        database: "antifraud",
        username: "root",
        password: "root",
        config: {
            host: "localhost",
            dialect: "mysql",
            port: 3306,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }
    }
};
