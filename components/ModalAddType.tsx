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
import { useEventTypeCreate } from '../hooks/eventType/useEventTypeCreate'
import { useRef } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const ModalAddType = ({ isOpen, onClose }: Props) => {
  const { mutate: addEventType } = useEventTypeCreate()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClickAdd = () => {
    addEventType({ name: inputRef.current?.value || '' })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Type Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input ref={inputRef} placeholder="Event Name" />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" onClick={handleClickAdd}>
            Add
          </Button>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalAddType
