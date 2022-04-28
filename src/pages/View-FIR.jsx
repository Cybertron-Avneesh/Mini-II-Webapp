import {
  Box,
  Container,
  Divider,
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
import { getDefaultNormalizer } from '@testing-library/react';
import { ethers } from 'ethers';
import { useContext, useState } from 'react';
import { FiClock, FiPrinter, FiSearch } from 'react-icons/fi';
import { RiFullscreenFill, RiUser6Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContractAddressContext } from '../App';
import SidebarWithHeader from '../components/Layout';
import DOCUMENT from '../images/DOCUMENT.png';
import IMAGE from '../images/IMAGE.png';
import MULTIMEDIA from '../images/MULTIMEDIA.png';
import abi from '../utils/EvidenceContract.json';
toast.configure();

const DUMMY_FIR_DATA = {
  firid: 'SOME FIXED STRING',
  title: '22 yr old went missing in the forest',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  stationid: 'ST_123_456',
  creator: '0x1234567890123456789012345678901234567890',
  time: '2020-01-01T00:00:00.000Z',
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
  const contractAddress = useContext(ContractAddressContext);
  const contractABI = abi.abi;
  const [firid, setFirId] = useState('');
  const [firData, setFirData] = useState();

  const handleInputChange = e => {
    console.log(e);
    setFirId(e.target.value);
  };

  const loadFIR = async () => {
    try {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const fir = await contract.getFir(firid);
      console.log(fir);
      let tmpFirData = {};
      tmpFirData.firid = firid;
      tmpFirData.title = fir.Title;
      tmpFirData.description = fir.Description;
      tmpFirData.stationid = fir.stationid.toNumber();
      tmpFirData.evidences = [];
      tmpFirData.time = fir.time.toNumber();
      tmpFirData.creator = fir.creator;
      tmpFirData.changelog = [];
      if (!tmpFirData.title) {
        toast.error('No FIR found with the given ID');
        setFirData();
        return;
      }
      fir.evidences_arr.forEach(async ev => {
        console.log(ev.toNumber());
        const evidence = await contract.evidences(ev.toNumber());
        console.log(evidence);
        const [TYPE, CID] = evidence.id.split('|');
        tmpFirData.evidences.push({
          evidencetype: TYPE,
          evidenceCID: CID,
          description: evidence.Title,
        });
      });
      // console.log(tmpFirData);
      setFirData(tmpFirData);
    } catch (e) {
      console.log(e);
      toast.error(
        'Something went wrong. Make sure correct FIR ID was provided.',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  const getTime = () => {
    try {
      let time = new Date(firData.time);
      return time.toLocaleString();
    } catch (e) {
      return 'Time not available';
    }
  };
  const submitHandler = e => {
    e.preventDefault();
    console.log(firid);
    loadFIR();
    setFirId('');
  };

  const printThisDoc = e => {
    // print the entire Vstack
    window.print();
  };

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
          {firData && (
            <VStack align={'start'} spacing={'2'}>
              <HStack width={'container.sm'}>
                <Wrap>
                  <Heading as={'h1'} size={'lg'}>
                    {firData.title}
                  </Heading>
                </Wrap>
                <Spacer />
                <Box>
                  <IconButton
                    bg={'blue.400'}
                    rounded="full"
                    color={'white'}
                    onClick={printThisDoc}
                  >
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
                  {firData.firid}
                </Text>
              </HStack>
              <HStack spacing={2} alignItems={'baseline'}>
                <Heading as="xs" size={'xs'}>
                  Station ID:
                </Heading>
                <Text as={'code'} fontSize={'md'} isTruncated>
                  {firData.stationid}
                </Text>
              </HStack>
              <VStack paddingLeft={4}>
                <HStack alignSelf={'start'}>
                  <Box
                    padding={2}
                    bg={'green.100'}
                    rounded="full"
                    color={'green.800'}
                  >
                    <FiClock />
                  </Box>
                  <Text> {getTime(firData.time)}</Text>
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
                    {firData.creator}
                  </Text>
                </HStack>
              </VStack>
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
                  {firData.description}
                </Text>
              </VStack>
              <Spacer />
              <Heading as={'h2'} size={'md'}>
                Evidences
              </Heading>
              <VStack spacing={2}>
                {firData.evidences.length === 0 && (
                  <HStack maxWidth={'container.md'} alignContent={'center'}>
                    <Text fontSize={'md'} color="gray" align={'center'}>
                      No evidences found!
                    </Text>
                  </HStack>
                )}
                {firData.evidences.map(function (evidence, index) {
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
                          {/* <HStack alignSelf={'start'}>
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
                            <Text as={'code'} fontSize={'md'}>{evidence.by} 
                            </Text>
                          </HStack> */}
                        </VStack>
                      </HStack>
                    </Box>
                  );
                })}
              </VStack>
              <Spacer />
              {/*
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
                    {firData.changelog.map(function (log, index) {
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
              </TableContainer> */}
              <Divider />
            </VStack>
          )}
          {!firData && (
            <Text align={'center'} fontSize="2xl">
              Nothing to show!
            </Text>
          )}
        </Container>
      </VStack>
    </SidebarWithHeader>
  );
};
export default ViewFIR;
