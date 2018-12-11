module.exports = {
    "extends": "eslint:recommended",
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
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "no-empty": 2,
        "no-eq-null": 2,
        "no-new": 0,
        "no-fallthrough": 0,
        "no-unreachable": 0,
        "space-before-function-paren": 0,
        "no-console": 1
    }
}
