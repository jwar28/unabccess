import typescriptEslint from "@typescript-eslint/eslint-plugin";
import importHelpers from "eslint-plugin-import-helpers";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["*.config.*"],
}, ...compat.extends(
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
        "import-helpers": importHelpers,
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 2021,
        sourceType: "module",
    },

    rules: {
        "import-helpers/order-imports": ["warn", {
            newlinesBetween: "always",

            groups: [
                ["/^next/", "module"],
                "/^@/styles/",
                "/^@/components/",
                "/^@/lib/",
                ["parent", "sibling", "index"],
            ],

            alphabetize: {
                order: "asc",
                ignoreCase: true,
            },
        }],
    },
}];