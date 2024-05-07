"use client"

import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react'
import ModalAddType from '@/components/ModalAddType'
import ModalEditType from '@/components/ModalEditType'
import { useState } from 'react'
import useEventTypes, { EventType } from '@/hooks/eventType/useEventTypes'
import { useEventTypeDelete } from '@/hooks/eventType/useEventTypeDelete'


const Settings = () => {
  const { data } = useEventTypes()
  const [selectedType, setSelectedType] = useState<EventType | null>(null)
  const { mutate: deleteEventType } = useEventTypeDelete()

  const {
    isOpen: isOpenAddType,
    onOpen: onOpenAddType,
    onClose: onCloseAddType,
  } = useDisclosure()
  const {
    isOpen: isOpenEditType,
    onOpen: onOpenEditType,
    onClose: onCloseEditType,
  } = useDisclosure()

  const handleEditClick = (type: EventType) => {
    setSelectedType(type)
    onOpenEditType()
  }

  return (
    <Box m={10} marginInline={20}>
      <ModalAddType isOpen={isOpenAddType} onClose={onCloseAddType} />
      {selectedType && (
        <ModalEditType
          isOpen={isOpenEditType}
          onClose={onCloseEditType}
          selectedType={selectedType}
        />
      )}
      <Text fontSize="4xl" w="100%">Settings</Text>
      <Flex justify="center" marginTop="10rem">
        <Box>
          <Button
            w={400}
            textAlign={'center'}
            colorScheme="green"
            marginBottom={4}
            onClick={onOpenAddType}
          >
            Add
          </Button>


          <Flex direction="column" >

            {data?.map((eventType) => (
              <Flex
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                key={eventType.id}
                marginBlock={2}
                backgroundColor="#efefef"
                paddingInline={5}
              >
                <Text fontSize="medium">{eventType.name}</Text>

                <Box>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleEditClick(eventType)}
                    size="sm"
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    marginLeft={3}
                    size="sm"
                    marginBlock={2}
                    onClick={() => {
                      deleteEventType(eventType)
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Flex>
            ))}

          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default Settings
