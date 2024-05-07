const convertDateTimeToDate = (dates: string, hours: string) =>
  new Date(`${dates}T${hours}:00.000`)

export default convertDateTimeToDate
