import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";

const eslintRules = {
    rules: {
        // suppress errors for missing 'import React' in files
        "react/react-in-jsx-scope": "off",
        // allow jsx syntax in js files (for next.js project)
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        // You can add more ESLint rules here as needed
        "react/prop-types": "off",
    }
};

export default [
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    { files: ["**/*.jsx"], languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
    ...fixupConfigRules(pluginReactConfig),
    eslintRules // Include ESLint rules here
];