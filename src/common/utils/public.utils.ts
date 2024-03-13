import { TOPIC_JAVA, TOPIC_TYPESCRIPT } from "@config"

export const getTopicSVGUrl = (name: string): string => {
    const nameToSvgUrl: Record<string, string> =
    {
        "Java": TOPIC_JAVA,
        "Typescript": TOPIC_TYPESCRIPT
    }
    return nameToSvgUrl[name] ?? ""
}