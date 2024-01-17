module.exports = {
  root: true,
  env: { browser: true, es6: true },
  globals: {
    JSX: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "plugin:@typescript-eslint/recommended-requiring-type-checking",

    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "airbnb-base",
    "airbnb/hooks",
    "plugin:prettier/recommended",
    "prettier",
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '*.config.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: [
      "./tsconfig.json",
      "./tsconfig.eslint.json",
      "./tsconfig.node.json",
    ],
    ecmaFeatures: { "jsx": true },
    ecmaVersion: 2015,
    sourceType: "module"
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
    }
  ],
  plugins: ['react-refresh', '@typescript-eslint', 'react', 'import', 'prettier'],
  rules: {
    "strict": "error",
    "react/jsx-filename-extension": ["warn", { "extensions": [".tsx"] }],
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/no-unused-vars": "warn",
    "no-unused-vars": "warn",
    "no-use-before-define": "warn",

    "prettier/prettier": ["error", { "endOfLine": "auto" }],
    "no-param-reassign": [
      "error",
      { "props": true, "ignorePropertyModificationsFor": ["state"] }
    ],
    "no-console": "warn",
    "no-debugger": "warn",
    "semi": ["error", "always"],
    "quotes": ["error", "single"],
    "linebreak-style": ["error", "unix"],

    "import/newline-after-import": ["error", { "count": 1 }],
    "import/namespace": "warn",
    "import/extensions": [
      "error",
      "never",
      { "svg": "always", "json": "always", "css": "always", "scss": "off" }
    ],
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type"
        ],
        "newlines-between": "always"
      }
    ],

    "import/no-unresolved": "off",
    "import/no-extraneous-dependencies": 0,
    "import/prefer-default-export": "off",
    "no-undef": 1,
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-return": "warn",
    "@typescript-eslint/no-unsafe-call": "warn",
    "@typescript-eslint/restrict-template-expressions": "warn",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "@typescript-eslint/no-misused-promises": "warn",
    "@typescript-eslint/unbound-method": "warn",
    "@typescript-eslint/no-unnecessary-type-assertion": "warn",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/await-thenable": "off",
    "no-restricted-syntax": [
      "warn",
      "WithStatement",
      "BinaryExpression[operator='in']"
    ],
    "camelcase": "off",
    "no-prototype-builtins": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "off"
  }
}
