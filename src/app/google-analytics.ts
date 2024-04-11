/* eslint-disable @typescript-eslint/no-explicit-any */
export const GA_TRACKING_ID: string = "G-M0WSRMVZLX" // Replace with your own Google Analytics tracking ID

export const trackPageView = (url: string): void => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("config", GA_TRACKING_ID, {
            page_path: url,
        })
    }
}

export const pageView = (url: string): void => {
    trackPageView(url)
}

export const event = ({ action, params }: { action: string; params: any }): void => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", action, params)
    }
}