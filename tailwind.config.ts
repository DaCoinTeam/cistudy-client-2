import { nextui } from "@nextui-org/react"
import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                // Simple 16 column grid
                "17": "repeat(17, minmax(0, 1fr))",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    darkMode: "class",
    plugins: [nextui({
        themes: {
            light: {
                colors: {
                    primary: "rgb(20 184 166)",
                    success: "rgb(17 94 89)",
                    default: {
                        DEFAULT: "rgb(244 244 245)"
                    },
                    content3: "rgb(228 228 231)"
                },
            },
            dark: {
                colors: {
                    primary: "rgb(20 184 166)",
                    success: "rgb(153 246 228)",
                },
            }
        }
    }),
    ]
}
export default config
