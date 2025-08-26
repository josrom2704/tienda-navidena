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
                    50: "#fffbf0",
                    100: "#fef3c7",
                    200: "#fde68a",
                    300: "#fcd34d",
                    400: "#fbbf24",
                    500: "#f59e0b",
                    600: "#d97706",
                    700: "#b45309",
                    800: "#92400e",
                    900: "#78350f",
                },
                cream: {
                    50: "#fefefe",
                    100: "#fdfcf9",
                    200: "#faf7f0",
                    300: "#f5f0e3",
                    400: "#ede4d1",
                    500: "#e0d4b8",
                    600: "#c9b98a",
                    700: "#b09d6b",
                    800: "#8f7d4f",
                    900: "#746542",
                },
                elegant: {
                    black: "#0a0a0a",
                    dark: "#1a1a1a",
                    gray: "#2d2d2d",
                    light: "#f8f8f8",
                    white: "#ffffff",
                }
            },
            fontFamily: {
                'serif': ['Playfair Display', 'Georgia', 'serif'],
                'sans': ['Inter', 'system-ui', 'sans-serif'],
                'elegant': ['Cormorant Garamond', 'Playfair Display', 'serif'],
                'classic': ['Libre Baskerville', 'Times New Roman', 'serif'],
            },
            boxShadow: {
                'elegant': '0 10px 30px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.05)',
                'gold': '0 10px 30px rgba(245,158,11,0.15), 0 2px 8px rgba(0,0,0,0.1)',
                'subtle': '0 2px 10px rgba(0,0,0,0.08)',
            },
            borderRadius: {
                xl: "1rem",
                "2xl": "1.25rem",
                "3xl": "1.5rem",
            },
            backgroundImage: {
                'elegant-gradient': 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)',
                'gold-gradient': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                'cream-gradient': 'linear-gradient(135deg, #fefefe 0%, #faf7f0 100%)',
            },
        },
    },
    plugins: [],
};

export default config;
