import { HStack, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { FaMountain } from 'react-icons/fa';

import * as React from 'react'

export const Logo = (props) => {
    return (
        <HStack>
            <FaMountain className="logo-icon" style={{margin: "5px"}}/>
            <Text
                fontWeight={800}
                textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                fontFamily={'heading'}
                fontSize={'xl'}
                color={useColorModeValue('gray.800', 'white')}
            >
                Flint
            </Text>
        </HStack>
    )
}
