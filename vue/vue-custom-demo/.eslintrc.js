module.exports = {
    "extends": "plugin:vue/essential",
    "root": true,
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
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
