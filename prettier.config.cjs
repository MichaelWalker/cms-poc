/** @type {import("prettier").Config} */
module.exports = {
    tabWidth: 4,
    printWidth: 120,
    plugins: [require.resolve("prettier-plugin-tailwindcss")],
};
