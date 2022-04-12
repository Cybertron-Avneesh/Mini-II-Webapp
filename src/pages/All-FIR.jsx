import {
  Container,
  Heading,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td, Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';
import SidebarWithHeader from '../components/Layout';

const rows = [
  {
    id: 1,
    stationid: 'Snow',
    title: 'Jon',
  },
  { id: 2, stationid: 'Lannister', title: 'Cersei' },
  { id: 3, stationid: 'Lannister', title: 'Jaime' },
  { id: 4, stationid: 'Stark', title: 'Arya' },
  { id: 5, stationid: 'Targaryen', title: 'Daenerys' },
  { id: 6, stationid: 'Melisandre', title: null },
  { id: 7, stationid: 'Clifford', title: 'Ferrara' },
  { id: 8, stationid: 'Frances', title: 'Rossini' },
  { id: 9, stationid: 'Roxie', title: 'Harvey' },
];

const AllFIR = () => {
  return (
    <>
      <SidebarWithHeader currActive={'/all-fir'}>
        <VStack>
          <Heading>All FIR Page!</Heading>
          <Container maxW="container.lg"
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
            <TableContainer>
              <Table size="md" variant="striped">
                <Thead>
                  <Tr>
                    <Th>FIR ID</Th>
                    <Th>Station ID</Th>
                    <Th>Title </Th>
                    <Th>View</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {rows.map(row => (
                    <Tr key={row.id}>
                      <Td>{row.id}</Td>
                      <Td>{row.stationid}</Td>
                      <Td>{row.title}</Td>
                      <Td>
                        <Link
                          href="/view-fir"
                          style={{ textDecoration: 'none' }}
                        >
                          <FiExternalLink color="blue" />
                        </Link>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Container>
        </VStack>
      </SidebarWithHeader>
    </>
  );
};
export default AllFIR;
