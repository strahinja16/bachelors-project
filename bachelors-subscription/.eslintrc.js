const path = require('path');

module.exports = {
  "extends": "airbnb-base",
  "plugins": ["jest"],
  "settings": {
    "import/resolver": {
      "alias": {
        "extensions": ['.js', '.json'],
        "map": [
          ["root", path.resolve(__dirname, 'src')],
          ["config", path.resolve(__dirname, 'src', 'config')],
          ["services", path.resolve(__dirname, 'src', 'services')],
          ["middleware", path.resolve(__dirname, 'src', 'middleware')],
          ["requests", path.resolve(__dirname, 'src', 'requests')],
        ]
      }
    }
  },
  "rules": {
    "linebreak-style": "off",
    "eqeqeq": ["error", "always", { "null": "ignore" }],
    "no-mixed-operators": ["error", { "allowSamePrecedence": true }],
    "no-trailing-spaces": ["warn", { "skipBlankLines": true }],
    "lines-between-class-members": ["error", "always"],
    "prefer-destructuring": "warn",
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error"
  },
  "env": {
    "node": true,
    "jest": true
  },
  "globals": {
    "cy": true,
    "expect": true,
    "jest": true
  }
};
