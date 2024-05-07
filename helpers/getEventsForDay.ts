import { Event } from '@/hooks/events/useEvents'

const getEventsForDay = (day: number, events: Event[]): Event[] => {
  return events.filter((event) => {
    const startDate = new Date(event.startDate)
    // console.log(new Date(event.endDate))
    const endDate = new Date(event.endDate)
    const eventDay = startDate.getDate()
    return day >= eventDay && day <= endDate.getDate()
  })
}

export default getEventsForDay
