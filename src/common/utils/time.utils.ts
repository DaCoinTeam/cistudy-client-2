import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
dayjs.extend(duration)

export const parseISODateString = (date: Date = new Date()) => dayjs(date).format("YYYY-MM-DD")
export const parseDate = (date: string) => dayjs(date).toDate()

export const parseDuration = (seconds: number) => {
    const formatStr = seconds >= 60 * 60 ? "HH:mm:ss" : "mm:ss"
    return dayjs.duration(seconds, "seconds").format(formatStr)
}