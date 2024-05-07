import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Switch,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import useEventTypes from '../hooks/eventType/useEventTypes'
// import { useEventCreate } from '../hooks/events/useEventCreate'
// import useEvent from '../hooks/events/useEvent'
import convertDateToYearMonthDay from '../helpers/convertDateToYearMonthDay'
import convertDateToHoursMinutes from '../helpers/convertDateToHoursMinutes'
import convertDateTimeToDate from '../helpers/convertDateTimeToDate'
import { useEventEdit } from '../hooks/events/useEventEdit'
import useEvent from '../hooks/events/useEvent'
import { useEventDelete } from '@/hooks/events/useEventDelete'


interface Props {
  isOpen: boolean
  onClose: () => void
  id: string
}

// 2024-04-25
// 13:13

const FORM_NAMES = {
  NAME: 'name',
  START_DATE: 'start-date',
  END_DATE: 'end-date',
  START_HOUR: 'end-hour',
  END_HOUR: 'end-hour',
}

const ModalEditEvent = ({ isOpen, onClose, id }: Props) => {
  const [isAllDayEvent, setIsAllDayEvent] = useState(false)
  const [selectedType, setSelectedType] = useState('')
  const { data: eventTypes } = useEventTypes()
  const { mutate: editEvent } = useEventEdit(id)
  const { mutate: deleteEvent } = useEventDelete(id)
  const { isPending, data: event } = useEvent(id)

  const [form, setForm] = useState({
    [FORM_NAMES.NAME]: event?.name || '',
    [FORM_NAMES.START_DATE]: event?.startDate
      ? convertDateToYearMonthDay(event.startDate)
      : '',
    [FORM_NAMES.END_DATE]: event?.endDate
      ? convertDateToYearMonthDay(event.endDate)
      : '',
    [FORM_NAMES.START_HOUR]: event?.startDate
      ? convertDateToHoursMinutes(event.startDate)
      : '',
    [FORM_NAMES.END_HOUR]: event?.endDate
      ? convertDateToHoursMinutes(event.endDate)
      : '',
  })

  useEffect(() => {
    setForm({
      [FORM_NAMES.NAME]: event?.name || '',
      [FORM_NAMES.START_DATE]: event?.startDate
        ? convertDateToYearMonthDay(event.startDate)
        : '',
      [FORM_NAMES.END_DATE]: event?.endDate
        ? convertDateToYearMonthDay(event.endDate)
        : '',
      [FORM_NAMES.START_HOUR]: event?.startDate
        ? convertDateToHoursMinutes(event.startDate)
        : '',
      [FORM_NAMES.END_HOUR]: event?.endDate
        ? convertDateToHoursMinutes(event.endDate)
        : '',
    })

    // setSelectedType
    // set select type from db

    setSelectedType((event?.eventTypeId as string) || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending])

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name = null, value = null } = e.target
    if (!name || !value) return

    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleChangeIsAllDay = () => {
    setIsAllDayEvent((prev) => !prev)
    setForm((prev) => ({
      ...prev,
      [FORM_NAMES.START_HOUR]: '00:00',
      [FORM_NAMES.END_HOUR]: '23:59',
    }))
  }

  const handleChangeType = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedType(e.target.value)

  const handleClickAdd = () => {
    editEvent({
      name: form[FORM_NAMES.NAME] || '',
      startDate: convertDateTimeToDate(
        form[FORM_NAMES.START_DATE],
        form[FORM_NAMES.START_HOUR]
      ),
      endDate: convertDateTimeToDate(
        form[FORM_NAMES.END_DATE],
        form[FORM_NAMES.END_HOUR]
      ),
      eventTypeId: selectedType,
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isPending ? (
            <CircularProgress isIndeterminate />
          ) : (
            <>
              <FormControl>
                <FormLabel>Event Name</FormLabel>
                <Input
                  placeholder="Event Name"
                  name={FORM_NAMES.NAME}
                  value={form[FORM_NAMES.NAME]}
                  onChange={(e) => handleChangeForm(e)}
                />
              </FormControl>

              <FormControl display="flex" alignItems="center" py={3}>
                <Switch
                  id="all-day-switch"
                  isChecked={isAllDayEvent}
                  onChange={handleChangeIsAllDay}
                />
                <FormLabel htmlFor="all-day-switch" ml="2" mb="0">
                  All day Event
                </FormLabel>
              </FormControl>
              <FormControl>
                <FormLabel>Start Date</FormLabel>
                <Input
                  placeholder="Start Date"
                  type="date"
                  name={FORM_NAMES.START_DATE}
                  value={form[FORM_NAMES.START_DATE]}
                  onChange={(e) => handleChangeForm(e)}
                />
              </FormControl>

              {!isAllDayEvent && (
                <FormControl>
                  <FormLabel>Start Hour</FormLabel>
                  <Input
                    placeholder="Start Hour"
                    type="time"
                    name={FORM_NAMES.START_HOUR}
                    value={form[FORM_NAMES.START_HOUR]}
                    onChange={(e) => handleChangeForm(e)}
                  />
                </FormControl>
              )}
              <FormControl>
                <FormLabel>End Date</FormLabel>
                <Input
                  placeholder="End Date"
                  type="date"
                  name={FORM_NAMES.END_DATE}
                  value={form[FORM_NAMES.END_DATE]}
                  onChange={(e) => handleChangeForm(e)}
                />
              </FormControl>

              {!isAllDayEvent && (
                <FormControl>
                  <FormLabel>End Hour</FormLabel>
                  <Input
                    placeholder="End Hour"
                    type="time"
                    name={FORM_NAMES.END_HOUR}
                    value={form[FORM_NAMES.END_HOUR]}
                    onChange={(e) => handleChangeForm(e)}
                  />
                </FormControl>
              )}

              <Select
                placeholder="Select type event"
                value={selectedType}
                onChange={handleChangeType}
              >
                {eventTypes?.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </Select>
            </>
          )}
        </ModalBody>

        <ModalFooter display="flex" width="100%" justifyContent="space-between">
          <Button
            onClick={() => {
              onClose();
              deleteEvent()
            }
            }
            colorScheme="red"
            variant="solid"
            marginInline={2}
          >
            Delete
          </Button>
          <Box>
            <Button colorScheme="orange" marginInline={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleClickAdd} colorScheme="blue" variant="solid">
              Submit
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalEditEvent
