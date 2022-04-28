import {
  Container,
  Heading,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { ContractAddressContext } from '../App';
import SidebarWithHeader from '../components/Layout';
import abi from '../utils/EvidenceContract.json';

const rows = [
  {
    id: 1,
    name: 'Snow',
    location: 'Jon',
  },
  { id: 2, name: 'Lannister', location: 'Cersei' },
  { id: 3, name: 'Lannister', location: 'Jaime' },
  { id: 4, name: 'Stark', location: 'Arya' },
  { id: 5, name: 'Targaryen', location: 'Daenerys' },
  { id: 6, name: 'Melisandre', location: 'Indiana Beach' },
  { id: 7, name: 'Clifford', location: 'Ferrara' },
  { id: 8, name: 'Frances', location: 'Rossini' },
  { id: 9, name: 'Roxie', location: 'Harvey' },
];

const StationDetail = () => {
  const contractAddress = useContext(ContractAddressContext);
  const [stations, setStations] = useState([]);
  const contractABI = abi.abi;

  const getStationDetails = async () => {
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
      const loadedStations = await contract.getAllStations();
      console.log('Loaded stations: ', loadedStations);
      let tmpStations = [];
      for (let i = 0; i < loadedStations.length; i++) {
        tmpStations.push({
          id: i,
          name: loadedStations[i].name,
          location: loadedStations[i].location,
        });
      }
      setStations(tmpStations);
    } catch (err) {
      console.log(err);
    }
  };

  // const getCurrentAccount = async () => {
  //   try {
  //     const { ethereum } = window;
  //     if (!ethereum) {
  //       console.log('No ethereum object found');
  //       return;
  //     } else {
  //       console.log('Ethereum object found');
  //     }
  //     const accounts = await ethereum.request({
  //       method: 'eth_accounts',
  //     });
  //     if (accounts.length !== 0) {
  //       const account = accounts[0];
  //       console.log('Account found: ', account);
  //       setCurrentAccount(account);
  //       getStationDetails();
  //     } else {
  //       console.log('No account found');
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    // getCurrentAccount();
    getStationDetails();
  }, []);

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
          {stations.length === 0 && (
            <Text align={'center'} fontSize="2xl">
              Nothing to show!
            </Text>
          )}
          {stations.length !== 0 && (
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
                  {stations.map(row => (
                    <Tr key={row.id}>
                      <Td>{row.id}</Td>
                      <Td>{row.name}</Td>
                      <Td>{row.location}</Td>
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
          )}
        </Container>
      </VStack>
    </SidebarWithHeader>
  );
};
export default StationDetail;
