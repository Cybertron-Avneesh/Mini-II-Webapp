import { ChakraProvider, theme } from '@chakra-ui/react';
import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddEvidence from './pages/Add-Evidence';
import AllFIR from './pages/All-FIR';
import ConnectWallet from './pages/Connect-Wallet';
import CreateFIR from './pages/Create-FIR';
import StationDetail from './pages/Station-Detail';
import ViewFIR from './pages/View-FIR';

const ContractAddressContext = createContext();
const CurrentAccountContext = createContext();
// const CONTRACT_ADDRESS = '0x23eD4fBdBED1cDb1B2e43a995515B52967F088CD';
const CONTRACT_ADDRESS = '0x9E71d852177ED34e442ac17a43Be77f9F4b02397';

function App() {
  const [currAccount, setCurrAccount] = useState('');

  const getCurrentAccount = async () => {
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
        setCurrAccount(account);
      } else {
        console.log('No account found');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCurrentAccount();
  }, []);
  return (
    <ContractAddressContext.Provider value={CONTRACT_ADDRESS}>
      <CurrentAccountContext.Provider value={currAccount}>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route index element={<ConnectWallet />} />
                <Route path="connect-wallet" element={<ConnectWallet />} />
                <Route path="home" element={<ConnectWallet />} />
                <Route path="create-fir" element={<CreateFIR />} />
                <Route path="add-evidence" element={<AddEvidence />} />
                <Route path="view-fir" element={<ViewFIR />} />
                <Route path="all-fir" element={<AllFIR />} />
                <Route path="station-detail" element={<StationDetail />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </CurrentAccountContext.Provider>
    </ContractAddressContext.Provider>
  );
}

export default App;
export { ContractAddressContext, CurrentAccountContext };
