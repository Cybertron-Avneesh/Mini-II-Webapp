import {
  ChakraProvider, theme
} from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllFIR from './pages/All-FIR';
import ConnectWallet from './pages/Connect-Wallet';
import CreateFIR from './pages/Create-FIR';
import StationDetail from './pages/Station-Detail';
import ViewFIR from './pages/View-FIR';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<ConnectWallet/>}/>
            <Route path='connect-wallet' element={<ConnectWallet/>}/>
            <Route path='home' element={<ConnectWallet/>}/>
            <Route path='create-fir' element={<CreateFIR/>}/>
            <Route path='view-fir' element={<ViewFIR/>}/>
            <Route path='all-fir' element={<AllFIR/>}/>
            <Route path='station-detail' element={<StationDetail/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
