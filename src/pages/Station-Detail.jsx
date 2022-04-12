import {
    Container, Heading,
    IconButton,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    VStack
} from '@chakra-ui/react';
import { FiCopy } from 'react-icons/fi';
import SidebarWithHeader from '../components/Layout';

const rows = [
  {
    id: 1,
    name: 'Snow',
    address: 'Jon',
  },
  { id: 2, name: 'Lannister', address: 'Cersei' },
  { id: 3, name: 'Lannister', address: 'Jaime' },
  { id: 4, name: 'Stark', address: 'Arya' },
  { id: 5, name: 'Targaryen', address: 'Daenerys' },
  { id: 6, name: 'Melisandre', address: 'Indiana Beach' },
  { id: 7, name: 'Clifford', address: 'Ferrara' },
  { id: 8, name: 'Frances', address: 'Rossini' },
  { id: 9, name: 'Roxie', address: 'Harvey' },
];

const StationDetail = () => {
  return (
    <SidebarWithHeader currActive={'/station-detail'}>
      <VStack>
        <Heading>Station Detail Page!</Heading>
        <Container
          maxW="container.md"
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <TableContainer>
            <Table size="md" variant="striped">
              <Thead>
                <Tr>
                  <Th>Station ID</Th>
                  <Th>Name</Th>
                  <Th>Address </Th>
                  <Th>Copy</Th>
                </Tr>
              </Thead>
              <Tbody>
                {rows.map(row => (
                  <Tr key={row.id}>
                    <Td>{row.id}</Td>
                    <Td>{row.name}</Td>
                    <Td>{row.address}</Td>
                    <Td>
                      <IconButton
                        onClick={() => {
                          navigator.clipboard.writeText(row.id);
                          console.log('copied');
                          console.log(row.id);
                        }}
                      >
                        <FiCopy color="blue" />
                      </IconButton>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Container>
      </VStack>
    </SidebarWithHeader>
  );
};
export default StationDetail;
