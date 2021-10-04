import {
    Box,
    Button,
    Flex,
    HStack,
    Menu,
    MenuButton,
    MenuList,
    Avatar,
    MenuItem,
    useDisclosure,
    useColorModeValue as mode,
} from '@chakra-ui/react'
import { Logo } from './Logo'
import { NavLink } from './NavLink'
import { NavMenu } from './NavMenu'
import { Submenu } from './Submenu.jsx'
import { ToggleButton } from './ToggleButton'
import { links } from './_data'
import { useHistory } from 'react-router';
import { useContext } from 'react';
import { DataContext } from '../DataContext';

const MobileNavContext = (props) => {
    const history = useHistory()
    const { isOpen, onToggle } = useDisclosure()
    const { isUserLoggedIn } = useContext(DataContext);
    return (
        <>
            <Flex align="center" justify="space-between" className="nav-content__mobile" {...props}>
                <Box flexBasis="6rem">
                    <ToggleButton isOpen={isOpen} onClick={onToggle} />
                </Box>
                <Box as="a" rel="home" mx="auto">
                    <Logo h="24px" iconColor="blue.400" />
                </Box>
                <Box visibility={{ base: 'hidden', sm: 'visible' }}>
                    <Flex>
                        <Button
                            mx='2'
                            as="a"
                            href="login"
                            colorScheme="blue"
                            display={isUserLoggedIn ? 'none' : 'flex'}>
                            Sign In
                        </Button>
                        <Button
                            as="a"
                            href={isUserLoggedIn ? '/logout' : '/signup'}
                            fontFamily={'heading'}
                            bgGradient="linear(to-r, purple.400,red.400)"
                            color={'white'}
                            _hover={{
                                bgGradient: 'linear(to-r, purple.400,red.400)',
                                boxShadow: 'xl',
                            }}>
                            {isUserLoggedIn ? 'Sign out' : 'Sign up'}
                        </Button>
                    </Flex>
                </Box>
            </Flex>

            <NavMenu animate={isOpen ? 'open' : 'closed'}>
                {links.map((link, idx) =>
                    link.children
                    ? (<Submenu.Mobile key={idx} link={link} />)
                    : (<NavLink.Mobile key={idx} href={link.href}>{link.label}</NavLink.Mobile>),
                )}
                <Button colorScheme="gray" w="full" size="lg" mt="5" as="a" onClick={() => {
                    onToggle()
                    history.push('/account')}}>
                    Account Settings
                </Button>
                <Button colorScheme="blue" w="full" size="lg" mt="5" as="a" onClick={() => {
                    if(isUserLoggedIn){
                        onToggle()
                        history.push('/logout')
                    } else {
                        onToggle()
                        history.push('/login')
                    }}}>
                    {isUserLoggedIn ? 'Sign out' : 'Sign in'}
                </Button>
                <Button
                    fontFamily={'heading'}
                    w={'full'}
                    bgGradient="linear(to-r, purple.400,red.400)"
                    color={'white'}
                    _hover={{
                        bgGradient: 'linear(to-r, purple.400,red.400)',
                        boxShadow: 'xl',
                    }}
                    size="lg"
                    mt="5"
                    as="a"
                    display={isUserLoggedIn ? 'none' : 'flex'}
                    onClick={() => {
                      onToggle()
                      history.push('/signup')
                    }}>
                    Sign up
                </Button>
            </NavMenu>
        </>
    )
}

const DesktopNavContent = (props) => {
    const history = useHistory()
    const { isUserLoggedIn } = useContext(DataContext);

    return (
        <Flex className="nav-content__desktop" align="center" {...props} style={{position: "relative"}}>
            <Box as="a" href="/" rel="home">
                <Logo h="8" iconColor="blue.500" />
            </Box>
            <HStack
                as="ul"
                id="nav__primary-menu"
                aria-label="Main Menu"
                listStyleType="none">
                    {links.map((link, idx) => (
                        <Box as="li" key={idx} id={`nav__menuitem-${idx}`}>
                            {link.children
                                ? (<Submenu.Desktop link={link} />)
                                : (<NavLink.Desktop href={link.href}>{link.label}</NavLink.Desktop>)}
                        </Box>
                    ))}
            </HStack>
            <HStack spacing="8" minW="240px" style={{position: "absolute", right: "0"}}>
                <HStack bg="pink" minW="240px" style={{position: "relative"}}>
                    <HStack bg="lightblue" minW="240px">
                        <Box style={{position: "absolute", right: "0"}} mr={70}
                            as="a"
                            href="/logout"
                            color={mode('blue.600', 'blue.300')}
                            fontWeight="bold"
                            display={isUserLoggedIn ? 'block' : 'none'}>
                            Sign out
                        </Box>
                        <HStack bg="lightblue" minW="240px">
                            <Box style={{position: "absolute", right: "0"}} mr={120}
                                as="a"
                                href="login"
                                color={mode('blue.600', 'blue.300')}
                                fontWeight="bold"
                                display={isUserLoggedIn ? 'none' : 'block'}>
                                Sign in
                            </Box>
                            <Button style={{position: "absolute", right: "0"}} ml={200}
                                as="a"
                                href="signup"
                                colorScheme="blue"
                                fontWeight="bold"
                                display={isUserLoggedIn ? 'none' : 'flex'}>
                                Sign up
                            </Button>
                        </HStack>
                    </HStack>
                    <Menu>
                        <MenuButton style={{position: "absolute", right: "0"}}
                            as={Avatar}
                            size={"md"}
                            cursor="pointer"
                            src={localStorage.getItem('profilePicURL')}
                            border={"2px solid #2B6CB0"}
                            display={isUserLoggedIn ? 'block' : 'none'}>
                        </MenuButton>
                        <MenuList>
                            <MenuItem
                                display={isUserLoggedIn ? 'none' : 'block'}
                                href="/login"
                                onClick={() => history.push('/login')}>
                                Sign In
                            </MenuItem>
                            <MenuItem
                                display={isUserLoggedIn ? 'block' : 'none'}
                                onClick={() => history.push('/account')}>
                                Account Settings
                            </MenuItem>
                            <MenuItem
                                display={isUserLoggedIn ? 'block' : 'none'}
                                onClick={() => history.push('/logout')}>
                                Sign Out
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>
            </HStack>
        </Flex>
    )
}

export const NavContent = {
    Mobile: MobileNavContext,
    Desktop: DesktopNavContent,
}
