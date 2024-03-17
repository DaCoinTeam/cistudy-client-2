import { TOPIC_JAVA, TOPIC_MONGODB, TOPIC_TYPEORM, TOPIC_TYPESCRIPT } from "@config"

export const getTopicSVGUrl = (name: string): string => {
    const nameToSvgUrl: Record<string, string> =
    {
        "Java": TOPIC_JAVA,
        "Typescript": TOPIC_TYPESCRIPT,
        "MongoDB": TOPIC_MONGODB,
        "TypeORM": TOPIC_TYPEORM
    }
    return nameToSvgUrl[name] ?? ""
}