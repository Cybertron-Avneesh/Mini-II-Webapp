import {
  Container,
  Heading,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td, Text, Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { ContractAddressContext } from '../App';
import SidebarWithHeader from '../components/Layout';
import abi from '../utils/EvidenceContract.json';

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
  const contractAddress = useContext(ContractAddressContext);
  const [firs, setFIRs] = useState([]);
  const contractABI = abi.abi;

  const getFirDetails = async () => {
    try {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      console.log('Signer: ', signer);
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const loadedFirs = await contract.getAllFirs();
      console.log('Loaded FIRs: ', loadedFirs);
      let tmpFir = [];
      for (let i = 0; i < loadedFirs.length; i++) {
        tmpFir.push({
          id: i,
          title: loadedFirs[i].Title,
          stationid: loadedFirs[i].stationid.toNumber(),
        });
      }
      setFIRs(tmpFir);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFirDetails();
  }, []);
  return (
    <>
      <SidebarWithHeader currActive={'/all-fir'}>
        <VStack>
          <Heading>All FIR Page!</Heading>
          <Container
            maxW="container.lg"
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            {firs.length === 0 && (
              <Text align={'center'} fontSize="2xl">
                Nothing to show!
              </Text>
            )}
            {firs.length !== 0 && (
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
                    {firs.map(row => (
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
            )}
          </Container>
        </VStack>
      </SidebarWithHeader>
    </>
  );
};
export default AllFIR;
