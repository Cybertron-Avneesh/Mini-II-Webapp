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
  VStack,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Web3Storage } from 'web3.storage';
import { ContractAddressContext } from '../App';
import SidebarWithHeader from '../components/Layout';
import { encryptFile } from '../utils/enc-dec';
import abi from '../utils/EvidenceContract.json';
toast.configure();

const defaultState = {
  TYPE: 'File',
  firid: '',
  contentid: 'Autogenerated',
  title: '',
};

const AddEvidence = () => {
  const contractAddress = useContext(ContractAddressContext);
  const [input, setInput] = useState(defaultState);
  const [chosenFiles, setChosenFiles] = useState([]);
  const [fileList, setFileList] = useState(null);
  const contractABI = abi.abi;
  const fileInputRef = useRef(null);

  const handleInputChange = e => {
    console.log(e);
    const { id, value } = e.target;
    setInput({ ...input, [id]: value });
  };

  const handleFileChange = async e => {
    console.log(e.target.files);
    let tmpArr = [];
    for (let file of e.target.files) {
      tmpArr.push(file.name);
    }
    let tmp = e.target.files;
    setFileList(tmp);
    setChosenFiles(tmpArr);
  };

  // const readFile = file => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       resolve(reader.result);
  //     };
  //     reader.onerror = err => {
  //       reject(err);
  //     };
  //     reader.readAsArrayBuffer(file);
  //   });
  // };

  // const encryptFile = async objFile => {
  //   var txtEncpassphrase = '1234qwer';
  //   var plaintextbytes = await readFile(objFile).catch(function (err) {
  //     console.error(err);
  //   });
  //   var plaintextbytes = new Uint8Array(plaintextbytes);

  //   var pbkdf2iterations = 10000;
  //   var passphrasebytes = new TextEncoder('utf-8').encode(txtEncpassphrase);
  //   var pbkdf2salt = window.crypto.getRandomValues(new Uint8Array(8));

  //   var passphrasekey = await window.crypto.subtle
  //     .importKey('raw', passphrasebytes, { name: 'PBKDF2' }, false, [
  //       'deriveBits',
  //     ])
  //     .catch(function (err) {
  //       console.error(err);
  //     });
  //   console.log('passphrasekey imported', passphrasekey);

  //   var pbkdf2bytes = await window.crypto.subtle
  //     .deriveBits(
  //       {
  //         name: 'PBKDF2',
  //         salt: pbkdf2salt,
  //         iterations: pbkdf2iterations,
  //         hash: 'SHA-256',
  //       },
  //       passphrasekey,
  //       384
  //     )
  //     .catch(function (err) {
  //       console.error(err);
  //     });
  //   console.log('pbkdf2bytes derived', pbkdf2bytes);
  //   pbkdf2bytes = new Uint8Array(pbkdf2bytes);

  //   var keybytes = pbkdf2bytes.slice(0, 32);
  //   var ivbytes = pbkdf2bytes.slice(32);

  //   var key = await window.crypto.subtle
  //     .importKey('raw', keybytes, { name: 'AES-CBC', length: 256 }, false, [
  //       'encrypt',
  //     ])
  //     .catch(function (err) {
  //       console.error(err);
  //     });
  //   console.log('key imported', key);

  //   var cipherbytes = await window.crypto.subtle
  //     .encrypt({ name: 'AES-CBC', iv: ivbytes }, key, plaintextbytes)
  //     .catch(function (err) {
  //       console.error(err);
  //     });

  //   if (!cipherbytes) {
  //     // spnEncstatus.classList.add("redspan");
  //     // spnEncstatus.innerHTML='<p>Error encrypting file.  See console log.</p>';
  //     console.log('Error encrypting file');
  //     return;
  //   }

  //   console.log('plaintext encrypted');
  //   cipherbytes = new Uint8Array(cipherbytes);

  //   var resultbytes = new Uint8Array(cipherbytes.length + 16);
  //   resultbytes.set(new TextEncoder('utf-8').encode('Salted__'));
  //   resultbytes.set(pbkdf2salt, 8);
  //   resultbytes.set(cipherbytes, 16);

  //   var blob = new Blob([resultbytes], { type: 'application/download' });
  //   var blobUrl = URL.createObjectURL(blob);
  //   var aEncsavefile = document.createElement('a');
  //   aEncsavefile.href = blobUrl;
  //   aEncsavefile.download = 'enc_'+objFile.name;

  //   // spnEncstatus.classList.add("greenspan");
  //   // spnEncstatus.innerHTML='<p>File encrypted.</p>';
  //   aEncsavefile.click();
  // };

  // const decryptFile = async objFile => {
  //   var cipherbytes = await readFile(objFile).catch(function (err) {
  //     console.error(err);
  //   });
  //   var cipherbytes = new Uint8Array(cipherbytes);
  //   var txtDecpassphrase = '1234qwer';
  //   var pbkdf2iterations = 10000;
  //   var passphrasebytes = new TextEncoder('utf-8').encode(txtDecpassphrase);
  //   var pbkdf2salt = cipherbytes.slice(8, 16);

  //   var passphrasekey = await window.crypto.subtle
  //     .importKey('raw', passphrasebytes, { name: 'PBKDF2' }, false, [
  //       'deriveBits',
  //     ])
  //     .catch(function (err) {
  //       console.error(err);
  //     });
  //   console.log('passphrasekey imported');

  //   var pbkdf2bytes = await window.crypto.subtle
  //     .deriveBits(
  //       {
  //         name: 'PBKDF2',
  //         salt: pbkdf2salt,
  //         iterations: pbkdf2iterations,
  //         hash: 'SHA-256',
  //       },
  //       passphrasekey,
  //       384
  //     )
  //     .catch(function (err) {
  //       console.error(err);
  //     });
  //   console.log('pbkdf2bytes derived');
  //   pbkdf2bytes = new Uint8Array(pbkdf2bytes);

  //   var keybytes = pbkdf2bytes.slice(0, 32);
  //   var ivbytes = pbkdf2bytes.slice(32);
  //   cipherbytes = cipherbytes.slice(16);

  //   var key = await window.crypto.subtle
  //     .importKey('raw', keybytes, { name: 'AES-CBC', length: 256 }, false, [
  //       'decrypt',
  //     ])
  //     .catch(function (err) {
  //       console.error(err);
  //     });
  //   console.log('key imported');

  //   var plaintextbytes = await window.crypto.subtle
  //     .decrypt({ name: 'AES-CBC', iv: ivbytes }, key, cipherbytes)
  //     .catch(function (err) {
  //       console.error(err);
  //     });

  //   if (!plaintextbytes) {
  //     console.log('Error decrypting file');
  //     toast.error(
  //       'Error decrypting file.  Password may be incorrect or file may be corrupt.'
  //     );
  //     return;
  //   }

  //   console.log('ciphertext decrypted');
  //   plaintextbytes = new Uint8Array(plaintextbytes);

  //   var blob = new Blob([plaintextbytes], { type: 'application/download' });
  //   var blobUrl = URL.createObjectURL(blob);
  //   var aDecsavefile = document.createElement('a');
  //   aDecsavefile.href = blobUrl;
  //   aDecsavefile.download = 'dec_' + objFile.name;

  //   // spnDecstatus.classList.add('greenspan');
  //   // spnDecstatus.innerHTML = '<p>File decrypted.</p>';
  //   aDecsavefile.click();
  // };

  const generatePassphrase = () => {
    var passphrase = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      passphrase += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
    return passphrase;
  };
  const addEvidence = async () => {
    try {
      if (!fileList) {
        toast.error('No file selected');
        return;
      }
      const passphrase = generatePassphrase();
      var encFiles = [];
      var dt = new DataTransfer();
      toast('Encrypting files...');
      for (let file of fileList) {
        const encFile = await encryptFile(file, passphrase);
        encFiles.push(encFile);
        dt.items.add(encFile);
        // await decryptFile(file);
      }
      toast('Files encrypted');
      const encFileList = dt.files;
      console.log('encFileList', encFileList);
      toast.info('⬆️ File upload initiated.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEI2NjMyQWYxRTdGRDY2MzQ0YTc1MUMyNUYxMWU0NzQ1QjM5ODAxNTciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTEwNTgxNjE1OTksIm5hbWUiOiJNaW5pIFByb2plY3QgQVBJIFRva2VuIn0.xNpnrMvkZYPnrTKpoidL3VEYIMQDIOOL9bqpEyTt9Lw';
      const client = new Web3Storage({ token });
      const cid = await client.put(encFileList, {
        name: 'test',
        maxRetries: 3,
      });
      console.log('CID', cid);
      input.contentid = passphrase + '|' + cid;
      console.log(input);
      toast('File upload completed.');
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const txn = await contract.createEvidence(
        input.contentid,
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
      setFileList(null);
      setChosenFiles([]);
    } catch (err) {
      console.log('Error: ', err);
      toast.error(
        '⛏️ Transaction Failed. Something went wrong. Make sure FIR ID is correct and files are uploaded successfully.',
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
                  <Input
                    id="filechooser"
                    type={'file'}
                    border="none"
                    multiple
                    value={input.filechooser}
                    onChange={handleFileChange}
                    display="none"
                    ref={fileInputRef}
                  ></Input>
                  <Button
                    onClick={ev => {
                      console.log('button clickeed');
                      fileInputRef.current.click();
                    }}
                  >
                    Choose file
                  </Button>
                </Center>
                <ol>
                  {chosenFiles.map((file, index) => (
                    <li key={index}>{file}</li>
                  ))}
                </ol>
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
