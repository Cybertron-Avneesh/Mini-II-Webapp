import {
  Box,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Spacer,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiClock, FiSearch, FiPrinter } from 'react-icons/fi';
import { RiFullscreenFill, RiUser6Fill } from 'react-icons/ri';
import SidebarWithHeader from '../components/Layout';
import DOCUMENT from '../images/DOCUMENT.png';
import IMAGE from '../images/IMAGE.png';
import MULTIMEDIA from '../images/MULTIMEDIA.png';

const DUMMY_FIR_DATA = {
  firid: 'SOME FIXED STRING',
  title: '22 yr old went missing in the forest',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  stationid: 'ST_123_456',
  evidences: [
    {
      evidencetype: 'IMAGE',
      evidenceCID:
        'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a',
      timestamp: '2020-01-01 00:00:00.000 ',
      by: '0x123456789123456789',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ',
    },
    {
      evidencetype: 'MULTIMEDIA',
      evidenceCID:
        'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a',
      timestamp: '2020-01-01 00:00:00.000',
      by: '0x983456789123456789',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ',
    },
    {
      evidencetype: 'DOCUMENT',
      evidenceCID:
        'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a',
      timestamp: '2020-01-01 00:00:00.000',
      by: '0x983456789123456789',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ',
    },
  ],
  changelog: [
    {
      action: 'CREATED',
      timestamp: '2020-01-01 00:00:00.000',
      by: '0x983456789123456789',
    },
    {
      action: 'ADDED',
      timestamp: '2021-01-01 00:00:00.000',
      by: '0x183456789123456789',
    },
    {
      action: 'ADDED',
      timestamp: '2022-01-01 00:00:00.000',
      by: '0x283456789123456789',
    },
    {
      action: 'ADDED',
      timestamp: '2023-01-01 00:00:00.000',
      by: '0x383456789123456789',
    },
  ],
};

const ViewFIR = () => {
  const [firid, setFirId] = useState('');
  const handleInputChange = e => {
    console.log(e);
    setFirId(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
    console.log(firid);
    setFirId('');
  };

  const printThisDoc = e =>{
    // print the entire Vstack
    window.print();
    
  }

  return (
    <SidebarWithHeader currActive={'/view-fir'}>
      <VStack>
        <Heading>View FIR Page!</Heading>
        <Container
          maxW="container.md"
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Box as="form" onSubmit={submitHandler}>
            <HStack>
              <FormControl isRequired>
                <FormLabel htmlFor="firid">FIR ID</FormLabel>
                <HStack>
                  <Input
                    id="firid"
                    type="text"
                    value={firid}
                    onChange={handleInputChange}
                  ></Input>
                  <IconButton
                    type="submit"
                    bg={useColorModeValue('cyan.400')}
                    color="white"
                    _hover={{ bg: 'cyan.600', color: 'white' }}
                  >
                    <FiSearch />
                  </IconButton>
                </HStack>
              </FormControl>
            </HStack>
          </Box>
        </Container>
        {/* <Divider p={'2'} /> */}
        <Container
          maxW="container.md"
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <VStack align={'start'} spacing={'2'}>
            <HStack width={'container.sm'}>
              <Wrap>
                <Heading as={'h1'} size={'lg'}>
                  {DUMMY_FIR_DATA.title} {' cecece ecwc e e ecwcwcww dccwcsxaxw'} 
                </Heading>
              </Wrap>
              <Spacer/>
              <Box>
                <IconButton bg={'blue.400'} rounded="full" color={'white'} onClick={printThisDoc}>
                  <FiPrinter></FiPrinter>
                </IconButton>
              </Box>
            </HStack>
            <Divider></Divider>
            <HStack spacing={2} alignItems={'baseline'}>
              <Heading as="xs" size={'xs'}>
                FIR ID:
              </Heading>
              <Text as={'kbd'} fontSize={'md'} isTruncated>
                {DUMMY_FIR_DATA.firid}
              </Text>
            </HStack>
            <HStack spacing={2} alignItems={'baseline'}>
              <Heading as="xs" size={'xs'}>
                Station ID:
              </Heading>
              <Text as={'code'} fontSize={'md'} isTruncated>
                {DUMMY_FIR_DATA.stationid}
              </Text>
            </HStack>
            <VStack align={'start'}>
              <Heading as="h2" size={'md'}>
                Description
              </Heading>
              <Text
                fontSize={'md'}
                wordBreak
                maxW={'container.sm'}
                paddingLeft={'6'}
              >
                {DUMMY_FIR_DATA.description}
              </Text>
            </VStack>
            <Spacer />
            <Heading as={'h2'} size={'md'}>
              Evidences
            </Heading>
            <VStack spacing={2}>
              {DUMMY_FIR_DATA.evidences.length === 0 && (
                <HStack>
                  <Text fontSize={'md'}>No evidences found!</Text>
                </HStack>
              )}
              {DUMMY_FIR_DATA.evidences.map(function (evidence, index) {
                return (
                  <Box
                    maxW="container.md"
                    rounded={'lg'}
                    bg={'gray.50'}
                    boxShadow={'lg'}
                    p={8}
                    key={index}
                  >
                    <HStack spacing={2}>
                      <VStack>
                        <Image
                          src={
                            evidence.evidencetype === 'IMAGE'
                              ? IMAGE
                              : evidence.evidencetype === 'DOCUMENT'
                              ? DOCUMENT
                              : MULTIMEDIA
                          }
                          width={'100px'}
                        ></Image>
                        <IconButton
                          icon={<RiFullscreenFill />}
                          onClick={e => {
                            window.open(evidence.evidenceCID, '_blank');
                          }}
                        ></IconButton>
                      </VStack>
                      <VStack paddingLeft={4}>
                        <Wrap>
                          <Text>{evidence.description}</Text>
                        </Wrap>
                        <HStack alignSelf={'start'}>
                          <Box
                            padding={2}
                            bg={'green.100'}
                            rounded="full"
                            color={'green.800'}
                          >
                            <FiClock />
                          </Box>
                          <Text> {evidence.timestamp}</Text>
                        </HStack>
                        <HStack alignSelf={'start'}>
                          <Box
                            padding={2}
                            bg={'blue.100'}
                            rounded="full"
                            color={'blue.800'}
                          >
                            <RiUser6Fill />
                          </Box>
                          <Text as={'code'} fontSize={'md'}>
                            {evidence.by}
                          </Text>
                        </HStack>
                      </VStack>
                    </HStack>
                  </Box>
                );
              })}
            </VStack>
            <Spacer />
            <Heading as={'h2'} size={'md'}>
              Changelog
            </Heading>
            <TableContainer alignSelf={'center'}>
              <Table size="sm" variant="striped">
                <Thead>
                  <Tr>
                    <Th>Action</Th>
                    <Th>At</Th>
                    <Th>By</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {DUMMY_FIR_DATA.changelog.map(function (log, index) {
                    return (
                      <Tr>
                        <Td>
                          <Tag size="sm" key={index} variant={'outline'}>
                            {log.action === 'CREATED'
                              ? 'Created FIR'
                              : log.action === 'ADDED'
                              ? 'Added evidence'
                              : 'Viewed'}
                          </Tag>
                        </Td>
                        <Td>{log.timestamp}</Td>
                        <Td>
                          <Text as="code">{log.by}</Text>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
            <Divider />
          </VStack>
        </Container>
      </VStack>
    </SidebarWithHeader>
  );
};
export default ViewFIR;
