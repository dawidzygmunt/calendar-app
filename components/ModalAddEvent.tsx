import {
  Button,
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
  Toast,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import useEventTypes from '../hooks/eventType/useEventTypes'
import { useEventCreate } from '../hooks/events/useEventCreate'
import { z } from "zod"
import toast from 'react-hot-toast'

const formSchema = z.object({
  name: z.string().min(2).max(15),
  startDate: z.string().min(8, { message: "Date is required" }),
  endDate: z.string().min(8, { message: "Date is required" }),
  startHour: z.string().optional(),
  endOfHour: z.string().optional(),
  eventTypeId: z.string().min(4, { message: "Event Type is required" }),
})




interface Props {
  isOpen: boolean
  onClose: () => void
}

const ModalAddEvent = ({ isOpen, onClose }: Props) => {
  const [isAllDayEvent, setIsAllDayEvent] = useState(false)
  const [selectedType, setSelectedType] = useState('')
  const { data: eventTypes } = useEventTypes()
  const { mutate: addEvent } = useEventCreate()

  const nameInputRef = useRef<HTMLInputElement>(null)
  const startDateRef = useRef<HTMLInputElement>(null)
  const endDateRef = useRef<HTMLInputElement>(null)
  const startHourRef = useRef<HTMLInputElement>(null)
  const endHourRef = useRef<HTMLInputElement>(null)

  const handleChangeIsAllDay = () => {
    setIsAllDayEvent((prev) => !prev)
    if (!startHourRef.current || !endHourRef?.current) return
    startHourRef!.current.value = '00:00'
    endHourRef!.current.value = '23:59'
  }

  const handleChangeType = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedType(e.target.value)

  const handleClickAdd = async (formData: FormData) => {
    const start = startDateRef.current?.value || ''
    const end = endDateRef.current?.value || ''

    const newEvent = {
      name: formData.get("name"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      eventTypeId: formData.get("eventType")
    }

    const result = formSchema.safeParse(newEvent)
    if (!result.success) {
      let errors = ''
      result.error.issues.forEach((issue) => {
        errors = errors + issue.path[0] + ": " + issue.message + '. '
      })
      toast.error(errors)
      return
    }

    addEvent({
      name: nameInputRef.current?.value || '',
      startDate: new Date(start),
      endDate: new Date(end),
      eventTypeId: selectedType,
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Type Event</ModalHeader>
        <ModalCloseButton />
        <form action={handleClickAdd}>
          <ModalBody>
            <FormControl>
              <FormLabel>Event Name</FormLabel>
              <Input ref={nameInputRef} name='name' placeholder="Event Name" />
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
              <Input ref={startDateRef} name='startDate' placeholder="Start Date" type="date" />
            </FormControl>

            {!isAllDayEvent && (
              <FormControl>
                <FormLabel>Start Hour</FormLabel>
                <Input ref={startHourRef} name='startHour' placeholder="Start Hour" type="time" />
              </FormControl>
            )}
            <FormControl>
              <FormLabel>End Date</FormLabel>
              <Input ref={endDateRef} name='endDate' placeholder="Start Date" type="date" />
            </FormControl>

            {!isAllDayEvent && (
              <FormControl>
                <FormLabel>End Hour</FormLabel>
                <Input ref={endHourRef} name='endHour' placeholder="Start Hour" type="time" />
              </FormControl>
            )}
            <FormLabel>Select Event Type</FormLabel>
            <Select
              placeholder='Select Event'
              name='eventType'
              value={selectedType}
              onChange={handleChangeType}
            >
              {eventTypes?.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Select>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" marginInline={3} onClick={onClose}>
              Close
            </Button>
            <Button type='submit' colorScheme="blue" variant="solid">
              Add
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal >
  )
}

export default ModalAddEvent
