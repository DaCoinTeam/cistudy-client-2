import { nextui } from "@nextui-org/react"
import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
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
        skew: {
            "-10": "-10deg",
            "10": "10deg",
        },
    },
    darkMode: "class",
    plugins: [
        nextui({
            themes: {
                light: {
                    // colors: {
                    //     primary: "rgb(3,4,94)",
                    //     primary: "rgb(184,251,60)",
                    //     success: "rgb(74, 222, 123)",
                    //     default: {
                    //         DEFAULT: "rgb(244 244 245)",
                    //     },
                    //     content3: "rgb(228 228 231)",
                    // },
                },
                dark: {
                    // colors: {
                    //     primary: "rgb(102,170,249)",
                    //     primary: "rgb(162,221,65)",
                    //     success: "rgb(74, 222, 123)",
                    // },
                },
            },
        }),
    ],
}
export default config
