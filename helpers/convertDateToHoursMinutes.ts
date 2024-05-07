import { format } from 'date-fns'

const convertDateToHoursMinutes = (date: Date) => format(date, 'HH:mm')

export default convertDateToHoursMinutes
