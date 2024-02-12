import dayjs from "dayjs"

export const parseISODateString = (date: Date = new Date()) => dayjs(date).format("YYYY-MM-DD")
export const parseDate = (date: string) => dayjs(date).toDate()