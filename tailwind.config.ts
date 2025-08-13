import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./styles/**/*.{css,scss}"
    ],
    theme: {
        extend: {
            colors: {
                gold: {
                    50: "#fff8e1",
                    100: "#ffefb0",
                    200: "#ffe37a",
                    300: "#ffd54f",
                    400: "#d4af37",
                    500: "#b8901b",
                    600: "#8f6d00",
                    700: "#6a4f00",
                },
            },
            boxShadow: {
                gold: "0 10px 30px rgba(212,175,55,.14), 0 2px 8px rgba(0,0,0,.35)",
            },
            borderRadius: {
                xl: "1rem",
                "2xl": "1.25rem",
            },
        },
    },
    plugins: [],
};

export default config;
