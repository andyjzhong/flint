import React from 'react';
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Box,
  Container,
  SimpleGrid,
  Icon,
  HStack,
  VStack,
  CheckIcon,
  useBreakpointValue,
  useColorModeValue,
  Avatar,
  Center,
} from '@chakra-ui/react';

const About = () => {

    const features = Array.apply(null, Array(8)).map(function (x, i) {
      return {
        id: i,
        title: 'Lorem ipsum dolor sit amet',
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.',
      };
    });

    return (
        <div className="about">
        <Box minH={'93vh'} p={4} bg={useColorModeValue('gray.50', 'gray.800')}>
          <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
            <Heading fontSize={'3xl'}>About</Heading>
            <Text color={'gray.600'} fontSize={'xl'}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
              sed diam voluptua.
            </Text>
          </Stack>

          <Center py={6}>
          <div style={{padding: "20px", minWidth: "400px"}}>
            <Box
              maxW={'270px'}
              w={'full'}
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'2xl'}
              rounded={'md'}
              overflow={'hidden'}>
              <Image
                h={'120px'}
                w={'full'}
                src={
                  'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                }
                objectFit={'cover'}
              />
              <Flex justify={'center'} mt={-12}>
                <Avatar
                  size={'xl'}
                  src={
                    'https://pbs.twimg.com/profile_images/1167502742723661824/OUZV61mh.jpg'
                  }
                  alt={'Author'}
                  css={{
                    border: '2px solid white',
                  }}
                />
              </Flex>

              <Box p={6}>
                <Stack spacing={0} align={'center'} mb={5}>
                  <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                    Andy Zhong
                  </Heading>
                  <Text color={'gray.500'}>Software Engineer</Text>
                </Stack>

                <Stack direction={'row'} justify={'center'} spacing={6}>
                  <Stack spacing={0} align={'center'}>
                    <Text fontWeight={600}>999k</Text>
                    <Text fontSize={'sm'} color={'gray.500'}>
                      Followers
                    </Text>
                  </Stack>
                  <Stack spacing={0} align={'center'}>
                    <Text fontWeight={600}>999k</Text>
                    <Text fontSize={'sm'} color={'gray.500'}>
                      Followers
                    </Text>
                  </Stack>
                </Stack>

                <Button
                  w={'full'}
                  mt={8}
                  bg={useColorModeValue('#151f21', 'gray.900')}
                  color={'white'}
                  rounded={'md'}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}>
                  Follow
                </Button>
              </Box>
            </Box>
            </div>


            <Box
              maxW={'270px'}
              w={'full'}
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'2xl'}
              rounded={'md'}
              overflow={'hidden'}>
              <Image
                h={'120px'}
                w={'full'}
                src={
                  'https://i0.wp.com/www.jessewatson.dev/wp-content/uploads/2020/04/bg-1.jpg?fit=1920%2C1280&ssl=1'
                }
                objectFit={'cover'}
              />
              <Flex justify={'center'} mt={-12}>
                <Avatar
                  size={'xl'}
                  src={
                    'https://cdn.discordapp.com/attachments/890641685523079258/891879535375691776/profilepic.jpg'
                  }
                  alt={'Author'}
                  css={{
                    border: '2px solid white',
                  }}
                />
              </Flex>

              <Box p={6}>
                <Stack spacing={0} align={'center'} mb={5}>
                  <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                    Jesse Watson
                  </Heading>
                  <Text color={'gray.500'}>Software Engineer</Text>
                </Stack>

                <Stack direction={'row'} justify={'center'} spacing={6}>
                  <Stack spacing={0} align={'center'}>
                    <Text fontWeight={600}>23k</Text>
                    <Text fontSize={'sm'} color={'gray.500'}>
                      Followers
                    </Text>
                  </Stack>
                  <Stack spacing={0} align={'center'}>
                    <Text fontWeight={600}>23k</Text>
                    <Text fontSize={'sm'} color={'gray.500'}>
                      Followers
                    </Text>
                  </Stack>
                </Stack>

                <Button
                  w={'full'}
                  mt={8}
                  bg={useColorModeValue('#151f21', 'gray.900')}
                  color={'white'}
                  rounded={'md'}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}>
                  Follow
                </Button>
              </Box>
            </Box>
          </Center>
        </Box>
        </div>
    )
}

export default About;
