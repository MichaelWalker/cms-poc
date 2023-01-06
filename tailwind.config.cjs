/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{ts,tsx}", "./graph-cms/**/*.{ts,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "gray-gradient": "linear-gradient(to bottom right, #4b5563, #1f2937)",
            },
        },
    },
    plugins: [],
};
