const Sequelize = require("sequelize");
const baseDal = require("./baseDal");

const Model = Sequelize.Model;
class User extends Model {}
User.init(
    {
        ID: {
            type: Sequelize.INTEGER,
            // 如果没有指定主键的情况下，模型会自动添加id字段
            primaryKey: true
        },
        Name: {
            type: Sequelize.STRING
        },
        Password: {
            type: Sequelize.STRING
        },
        UserName: {
            type: Sequelize.STRING
        },
        Sex: {
            type: Sequelize.STRING
        },
        Birthday: {
            type: Sequelize.TIME
        }
    },
    {
        sequelize: baseDal,
        modelName: "user",
        // true表示表名为单数
        freezeTableName: true,
        // 将createdAt和updatedAt时间戳添加到模型中
        timestamps: false
    }
);

module.exports = User;
