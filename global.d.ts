/* eslint-disable @typescript-eslint/no-explicit-any */

interface Window {
    gtag?: (type: "config" | "event", eventOrCommand: string, paramsOrOptions?: any) => void;
  }