import { format } from 'date-fns'

const convertDateToYearMonthDay = (date: Date) => format(date, 'yyyy-MM-dd')

export default convertDateToYearMonthDay
