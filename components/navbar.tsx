import React from 'react'
import { MainNavbar } from './main-nav'
import { Flex } from '@chakra-ui/react'

const Navbar = () => {
  return (
    <Flex backgroundColor="#fcfcf2" shadow="4px 2px 10px gray" width="100%" fontWeight="600" padding="20px">
      <MainNavbar />
    </Flex>
  )
}

export default Navbar