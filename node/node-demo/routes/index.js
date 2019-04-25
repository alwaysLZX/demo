var indexRouter = require("./home");
var userRouter = require("./user");

module.exports = {
    "/": indexRouter,
    "/user": userRouter
};
