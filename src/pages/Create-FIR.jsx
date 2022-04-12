import {
  Box,
  Button,
  Container,
  FormControl, FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Textarea,
  useColorModeValue, VStack
} from '@chakra-ui/react';
import { useState } from 'react';
import SidebarWithHeader from '../components/Layout';

const defaultState = {
  firid: 'SOME FIXED STRING',
  stationid: '',
  title: '',
  description: '',
};

const CreateFIR = () => {
  const [input, setInput] = useState(defaultState);

  const handleInputChange = e => {
    console.log(e);
    const { id, value } = e.target;
    setInput({ ...input, [id]: value });
  };

  const submitHandler = e => {
    e.preventDefault();
    console.log(input);
    setInput(defaultState);
  };

  return (
    <SidebarWithHeader currActive={'/create-fir'}>
      <VStack>
        <Heading>Create FIR Page!</Heading>
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
                <FormControl isReadOnly>
                  <FormLabel htmlFor="firid">FIR ID</FormLabel>
                  <Input
                    id="firid"
                    type="text"
                    value={input.firid}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="stationid">Station ID</FormLabel>
                  <Input
                    id="stationid"
                    type="text"
                    value={input.stationid}
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
              <FormControl isRequired>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea
                  id="description"
                  type="text"
                  value={input.description}
                  onChange={handleInputChange}
                />
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
                  Save
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </VStack>
    </SidebarWithHeader>
  );
};
export default CreateFIR;
