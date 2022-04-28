import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  FiChevronDown,
  FiCpu,
  FiFileText,
  FiLayers,
  FiUploadCloud,
  FiMenu,
  FiPlusCircle,
} from 'react-icons/fi';

const LinkItems = [
  { name: 'Create FIR', icon: FiPlusCircle, to: '/create-fir' },
  { name: 'Add Evidence', icon: FiUploadCloud, to: '/add-evidence' },
  { name: 'View FIR', icon: FiFileText, to: '/view-fir' },
  { name: 'All FIR', icon: FiLayers, to: '/all-fir' },
  { name: 'Station Detail', icon: FiCpu, to: '/station-detail' },
];

const SidebarWithHeader = ({ currActive, children }) => {
  const [currentAccount, setCurrentAccount] = useState('');

  // first make sure we have access to window.ethereum
  const checkIfWalletConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log('No ethereum object found');
        return;
      } else {
        console.log('Ethereum object found');
      }
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log('Account found: ', account);
        setCurrentAccount(account);
      } else {
        console.log('No account found');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log('No ethereum object found');
        return;
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log('Accounts: ', accounts);
      setCurrentAccount(accounts[0]);
      console.log('Connected to wallet');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const currActiveTab = currActive;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
        currActive={currActiveTab}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} currActive={currActiveTab} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav
        onOpen={onOpen}
        currentAccount={currentAccount}
        connectWallet={connectWallet}
      />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

const SidebarContent = ({ onClose, currActive, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Mini
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <NavItem
          key={link.name}
          icon={link.icon}
          to={link.to}
          currActive={currActive}
          marginTop="2"
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, to, currActive, children, ...rest }) => {
  const isActive = currActive === to;
  return (
    <Link
      href={to}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      {isActive && (
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          bg="cyan.600"
          color="white"
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      )}
      {!isActive && (
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      )}
    </Link>
  );
};

const MobileNav = ({ onOpen, currentAccount, connectWallet, ...rest }) => {
  const trimAccount = account => {
    return account.slice(0, 5) + '...' + account.slice(-5);
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Mini
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        {/* <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        /> */}
        <Flex alignItems={'center'}>
          {!currentAccount && (
            <Button onClick={connectWallet}>Connect your wallet!</Button>
          )}
          {currentAccount && (
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}
              >
                <HStack>
                  <Avatar
                    size={'sm'}
                    src={
                      'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">
                      {!currentAccount
                        ? 'No account found!'
                        : trimAccount(currentAccount)}
                    </Text>
                    {/* <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text> */}
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                // bg={useColorModeValue('white', 'gray.900')}
                // borderColor={useColorModeValue('gray.200', 'gray.700')}

                bg={'white'}
                borderColor={'gray.200'}
              >
                <MenuItem
                  onClick={() => {
                    navigator.clipboard.writeText(currentAccount);
                  }}
                >
                  Copy Address
                </MenuItem>
                <MenuDivider />
                <MenuItem>Sign out</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </HStack>
    </Flex>
  );
};

export default SidebarWithHeader;
