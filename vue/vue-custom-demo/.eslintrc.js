module.exports = {
    "extends": "plugin:vue/essential",
    "root": true,
    "parserOptions": {
        // 在使用三点操作符的时候，不能指定版本为6，因为三点操作符在2018的时候才有的
        // "ecmaVersion": 6, // 2018
        "sourceType": "module",
        // "ecmaFeatures": {
        //     "experimentalObjectRestSpread": true
        // }
    },
    "globals": {
        "_": false
    },
    "env": {
        "browser": true
    },
    "rules": {
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "quotes": ["warn", "double"],
        "semi": ["warn", "always"],
        "no-empty": 2,
        "no-eq-null": 2,
        "no-new": 0,
        "no-fallthrough": 0,
        "no-unreachable": 0,
        "space-before-function-paren": 0,
        "no-console": 1
    }
}
