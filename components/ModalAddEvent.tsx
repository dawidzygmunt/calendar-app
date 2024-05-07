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
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import useEventTypes from '../hooks/eventType/useEventTypes'
import { useEventCreate } from '../hooks/events/useEventCreate'

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

  const handleClickAdd = () => {
    const start = startDateRef.current?.value || ''
    const end = endDateRef.current?.value || ''

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
        <ModalBody>
          <FormControl>
            <FormLabel>Event Name</FormLabel>
            <Input ref={nameInputRef} placeholder="Event Name" />
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
            <Input ref={startDateRef} placeholder="Start Date" type="date" />
          </FormControl>

          {!isAllDayEvent && (
            <FormControl>
              <FormLabel>Start Hour</FormLabel>
              <Input ref={startHourRef} placeholder="Start Hour" type="time" />
            </FormControl>
          )}
          <FormControl>
            <FormLabel>End Date</FormLabel>
            <Input ref={endDateRef} placeholder="Start Date" type="date" />
          </FormControl>

          {!isAllDayEvent && (
            <FormControl>
              <FormLabel>End Hour</FormLabel>
              <Input ref={endHourRef} placeholder="Start Hour" type="time" />
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
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" marginInline={3} onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleClickAdd} colorScheme="blue" variant="solid">
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalAddEvent
