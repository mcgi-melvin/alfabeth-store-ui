/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#003285",
                secondary: "#2A629A",
                tertiary: "#FF7F3E"
            }
        },
    },
    plugins: [],
}