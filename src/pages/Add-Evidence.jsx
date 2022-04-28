import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContractAddressContext } from '../App';
import SidebarWithHeader from '../components/Layout';
import abi from '../utils/EvidenceContract.json';
toast.configure();

const defaultState = {
  TYPE: 'IMAGE',
  firid: '',
  contentid: 'https://pbs.twimg.com/media/Emjs5JyXEAAm2yk?format=jpg&name=orig',
  title: '',
};

const AddEvidence = () => {
  const contractAddress = useContext(ContractAddressContext);
  const [input, setInput] = useState(defaultState);
  const contractABI = abi.abi;


  const handleInputChange = e => {
    console.log(e);
    const { id, value } = e.target;
    setInput({ ...input, [id]: value });
  };

  const addEvidence = async () => {
    try {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const txn = await contract.createEvidence(
        input.TYPE+'|'+input.contentid,
        input.title,
        input.firid
      );
      toast.info('⛏️ Transaction Initiated.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      await txn.wait();
      toast('📦 Evidence Added Successfully.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log('Error: ', err);
      toast.error('⛏️ Transaction Failed. Something went wrong. Make sure FIR ID is correct.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    console.log(input);
    addEvidence();
    setInput(defaultState);
  };

  return (
    <SidebarWithHeader currActive={'/add-evidence'}>
      <VStack>
        <Heading>Add Evidence Page!</Heading>
        <Container maxW={'container.md'}>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            as="form"
            onSubmit={submitHandler}
          >
            <Stack spacing={4}>
              <HStack>
                <FormControl isRequired>
                  <FormLabel htmlFor="firid">FIR ID</FormLabel>
                  <Input
                    id="firid"
                    type="text"
                    value={input.firid}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isReadOnly>
                  <FormLabel htmlFor="contentid">Content ID</FormLabel>
                  <Input
                    id="contentid"
                    type="text"
                    value={input.contentid}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </HStack>
              <FormControl isRequired>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  id="title"
                  type="text"
                  value={input.title}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="filechooser">Choose file</FormLabel>
                {/* create a button to choose a file from directory */}
                <Center>
                  <Button id="filechooser">Click to choose file</Button>
                </Center>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'cyan.400'}
                  color={'white'}
                  _hover={{
                    bg: 'cyan.500',
                  }}
                  type="submit"
                >
                  Add
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </VStack>
    </SidebarWithHeader>
  );
};
export default AddEvidence;
