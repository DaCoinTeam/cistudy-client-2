import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"
import utc from "dayjs/plugin/utc"
import updateLocale from "dayjs/plugin/updateLocale"
dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(updateLocale)

dayjs.updateLocale("en", {
    relativeTime: {
        future: "In %s",
        past: "%s ago",
        s: "A few seconds",
        m: "A minute",
        mm: "%d minutes",
        h: "An hour",
        hh: "%d hours",
        d: "A day",
        dd: "%d days",
        M: "A month",
        MM: "%d months",
        y: "A year",
        yy: "%d years"
    }
})
export const parseISODateString = (date: Date = new Date()) => {
    return dayjs(new Date(date)).format("YYYY-MM-DD")
}

export const parseDate = (date: string) => dayjs(date).toDate()

export const parseDuration = (seconds: number) => {
    const formatStr = seconds >= 60 * 60 ? "HH:mm:ss" : "mm:ss"
    return dayjs.duration(seconds, "seconds").format(formatStr)
}

export const parseTimeAgo = (date: Date) => dayjs.utc().from(date, true)

export const parseDateStringFrom = (date?: Date) => date ? dayjs.utc(date).format("h:mm:ss A, D MMM YYYY") : null

export const parseMillisecondsTime = (milliseconds : number) => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    let hours = Math.floor(totalSeconds / 3600)
    let minutes = Math.floor((totalSeconds % 3600) / 60)
    let seconds = totalSeconds % 60

    hours = Number(String(hours).padStart(2, "0"))
    minutes = Number(String(minutes).padStart(2, "0"))
    seconds = Number(String(seconds).padStart(2, "0"))

    return `${hours}:${minutes}:${seconds}`
}
export const parseDateToString = (date: Date) => dayjs(date).format("DD MMM, YYYY")

export const countDayHoursMinutesLeft = (date: Date, additionalDays: number) => {
    const startDate = dayjs(date)
    const today = dayjs(new Date())
    const endDate = startDate.add(additionalDays, "day")
    const diffMilliseconds = endDate.diff(today)
    const remainingDuration = dayjs.duration(diffMilliseconds)
    const remainingDays = Math.floor(remainingDuration.asDays())
    const remainingHours = remainingDuration.hours()
    const remainingMinutes = remainingDuration.minutes()
    return `${remainingDays >= 0 ? remainingDays : 0} ${remainingDays > 1 ? "days" : "day"} ${remainingHours >= 0 ? remainingHours : 0} ${remainingHours > 1 ? "hours" : "hour"} ${remainingMinutes >= 0 ? remainingMinutes : 0} ${remainingMinutes > 1 ? "minutes" : "minute"} `
}