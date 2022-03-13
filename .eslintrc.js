// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: { ecmaVersion: 8, project: "./tsconfig.json" }, // to enable features such as async/await
  ignorePatterns: ["node_modules/*", ".next/*", ".out/*", "!.prettierrc.js"], // We don't want to lint generated files nor node_modules, but we want to lint .prettierrc.js (ignored by default by eslint)
  extends: ["eslint:recommended", "plugin:@next/next/recommended", "mantine"],
  overrides: [
    // This configuration will apply only to TypeScript files
    {
      files: ["**/*.ts", "**/*.tsx", "*.js"],
      parser: "@typescript-eslint/parser",
      settings: { react: { version: "detect" } },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended", // TypeScript rules
        "plugin:react/recommended", // React rules
        "plugin:react-hooks/recommended", // React hooks rules
        "plugin:jsx-a11y/recommended", // Accessibility rules
        "plugin:prettier/recommended", // Prettier plugin
      ],
      plugins: ["simple-import-sort"],
      rules: {
        // We will use TypeScript's types for component props instead
        "react/prop-types": "off",

        // No need to import React when using Next.js
        "react/react-in-jsx-scope": "off",

        // This rule is not compatible with Next.js's <Link /> components
        "jsx-a11y/anchor-is-valid": "off",

        // Why would you want unused vars?
        "@typescript-eslint/no-unused-vars": ["warn"],

        // I suggest this setting for requiring return types on functions only where useful
        "@typescript-eslint/explicit-function-return-type": [
          "warn",
          {
            allowExpressions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          },
        ],

        // Includes .prettierrc.js rules
        "prettier/prettier": [
          "warn",
          {
            endOfLine: "auto",
            printWidth: 100,
            tabWidth: 2,
            singleQuote: false,
            bracketSameLine: false,
            trailingComma: "es5",
          },
          { usePrettierrc: false },
        ],
        "react/jsx-curly-brace-presence": ["warn", { props: "never", children: "never" }],

        // Import Sort
        "simple-import-sort/imports": "warn",
        "simple-import-sort/exports": "warn",
      },
    },
  ],
};
