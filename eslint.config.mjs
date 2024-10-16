import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginJest from "eslint-plugin-jest";


export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginJest.configs['flat/recommended'],
];
