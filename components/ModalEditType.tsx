import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  ModalFooter,
  Button,
} from '@chakra-ui/react'
import { useLayoutEffect, useState } from 'react'
import { EventType } from '../hooks/eventType/useEventTypes'
import { useEventTypeEdit } from '../hooks/eventType/useEventTypeEdit'

interface Props {
  isOpen: boolean
  onClose: () => void
  selectedType: EventType
}

const ModalEditType = ({ isOpen, onClose, selectedType }: Props) => {
  const [input, setInput] = useState(selectedType.name)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value)

  const handeClickEdit = () => {
    modifyEventType({ name: input })
    onClose()
  }

  useLayoutEffect(() => setInput(selectedType.name), [selectedType])
  const { mutate: modifyEventType } = useEventTypeEdit(selectedType.id)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Type Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Event Name"
            value={input}
            onChange={handleChange}
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" marginInline={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue" onClick={handeClickEdit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalEditType
