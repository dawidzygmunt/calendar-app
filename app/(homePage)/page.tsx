"use client"

import ModalAddEvent from "@/components/ModalAddEvent";
import ModalEditEvent from "@/components/ModalEditEvent";
import { Box, useDisclosure } from "@chakra-ui/react";
import { DatesSetArg, EventClickArg } from "@fullcalendar/core/index.js";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";

import useEvents from "@/hooks/events/useEvents";
import {
  getInitialDate,
  getInitialView,
  setInitialDate,
  setInitialView,
} from "@/helpers/persistance";
import { useRef, useState } from "react";


const HomePage = () => {
  const { data: events } = useEvents()
  const [selectedEventId, setSelectedEventId] = useState('')
  const calendarRef = useRef<FullCalendar>(null)

  const {
    isOpen: isOpenAddEvent,
    onOpen: onOpenAddEvent,
    onClose: onCloseAddEvent,
  } = useDisclosure()
  const {
    isOpen: isOpenEditEvent,
    onOpen: onOpenEditEvent,
    onClose: onCloseEditEvent,
  } = useDisclosure()

  const handleClick = (e: EventClickArg) => {
    const eventId = e.event.id
    setSelectedEventId(eventId)
    onOpenEditEvent()
  }

  const handleViewChange = (view: string) => {
    if (calendarRef.current) calendarRef.current.getApi().changeView(view)
    setInitialView(view)
  }

  const handleDateChange = (dates: DatesSetArg) => {
    if (dates.end.getMonth() - dates.start.getMonth() > 1) {
      //When month view is picked, you cannot simply set start date, as it will set date from previous month
      return setInitialDate(
        new Date(
          `${dates.start.getFullYear()}-${(dates.start.getMonth() + 2)
            .toString()
            .padStart(2, '0')}-01`
        )
      )
    }
    setInitialDate(dates.start)
  }

  return (
    <>
      <ModalAddEvent isOpen={isOpenAddEvent} onClose={onCloseAddEvent} />
      {selectedEventId && (
        <ModalEditEvent
          isOpen={isOpenEditEvent}
          onClose={onCloseEditEvent}
          id={selectedEventId}
        />
      )}
      <Box className="m-10 xl:mx-32">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin]}
          customButtons={{
            month: {
              text: 'month',
              click: () => handleViewChange('dayGridMonth'),
            },
            week: {
              text: 'week',
              click: () => handleViewChange('timeGridWeek'),
            },
            day: {
              text: 'day',
              click: () => handleViewChange('timeGridDay'),
            },
            addButton: {
              text: 'Add Event',
              click: onOpenAddEvent,
            },
          }}
          headerToolbar={{
            left: 'prev,next addButton',
            center: 'title',
            right: 'month,week,day',
          }}
          initialView={getInitialView()}
          initialDate={getInitialDate()}
          datesSet={handleDateChange}
          events={events?.map(({ id, startDate, endDate, name }) => {
            return { id, start: startDate, end: endDate, title: name }
          })}
          eventClick={(clickinfo) => handleClick(clickinfo)}
        />
      </Box>
    </>
  )
}

export default HomePage
