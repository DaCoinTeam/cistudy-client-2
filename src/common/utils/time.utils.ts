import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"
import utc from "dayjs/plugin/utc"
dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.extend(utc)

export const parseISODateString = (date: Date = new Date()) => dayjs(date).format("YYYY-MM-DD")
export const parseDate = (date: string) => dayjs(date).toDate()

export const parseDuration = (seconds: number) => {
    const formatStr = seconds >= 60 * 60 ? "HH:mm:ss" : "mm:ss"
    return dayjs.duration(seconds, "seconds").format(formatStr)
}

export const parseTimeAgo = (date: Date) => dayjs.utc().from(date, true)

export const parseDateStringFrom = (date?: Date) => date ? dayjs.utc(date).format("h:mm:ss A, D MMM YYYY") : null
