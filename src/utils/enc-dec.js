import { toast } from 'react-toastify';
toast.configure()

const readFile = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = err => {
      reject(err);
    };
    reader.readAsArrayBuffer(file);
  });
};

const encryptFile = async (objFile, passphrase) => {
  var plaintextbytes = await readFile(objFile).catch(function (err) {
    console.error(err);
  });
  var plaintextbytes = new Uint8Array(plaintextbytes);

  var pbkdf2iterations = 10000;
  var passphrasebytes = new TextEncoder('utf-8').encode(passphrase);
  var pbkdf2salt = window.crypto.getRandomValues(new Uint8Array(8));

  var passphrasekey = await window.crypto.subtle
    .importKey('raw', passphrasebytes, { name: 'PBKDF2' }, false, [
      'deriveBits',
    ])
    .catch(function (err) {
      console.error(err);
    });
  console.log('passphrasekey imported', passphrasekey);

  var pbkdf2bytes = await window.crypto.subtle
    .deriveBits(
      {
        name: 'PBKDF2',
        salt: pbkdf2salt,
        iterations: pbkdf2iterations,
        hash: 'SHA-256',
      },
      passphrasekey,
      384
    )
    .catch(function (err) {
      console.error(err);
    });
  console.log('pbkdf2bytes derived', pbkdf2bytes);
  pbkdf2bytes = new Uint8Array(pbkdf2bytes);

  var keybytes = pbkdf2bytes.slice(0, 32);
  var ivbytes = pbkdf2bytes.slice(32);

  var key = await window.crypto.subtle
    .importKey('raw', keybytes, { name: 'AES-CBC', length: 256 }, false, [
      'encrypt',
    ])
    .catch(function (err) {
      console.error(err);
    });
  console.log('key imported', key);

  var cipherbytes = await window.crypto.subtle
    .encrypt({ name: 'AES-CBC', iv: ivbytes }, key, plaintextbytes)
    .catch(function (err) {
      console.error(err);
    });

  if (!cipherbytes) {
    console.log('Error encrypting file');
    return;
  }

  console.log('plaintext encrypted');
  cipherbytes = new Uint8Array(cipherbytes);

  var resultbytes = new Uint8Array(cipherbytes.length + 16);
  resultbytes.set(new TextEncoder('utf-8').encode('Salted__'));
  resultbytes.set(pbkdf2salt, 8);
  resultbytes.set(cipherbytes, 16);

  var blob = new Blob([resultbytes], { type: 'application/download' });
  const encFile = new File([blob], objFile.name, {type: objFile.type});
//   console.log(encFile);
//   var blobUrl = URL.createObjectURL(blob);
//   var aEncsavefile = document.createElement('a');
//   aEncsavefile.href = blobUrl;
//   aEncsavefile.download = 'enc_' + objFile.name;
//   aEncsavefile.click();
  return encFile;
};

const decryptFile = async (objFile, passphrase) => {
  var cipherbytes = await readFile(objFile).catch(function (err) {
    console.error(err);
  });
  var cipherbytes = new Uint8Array(cipherbytes);
  var pbkdf2iterations = 10000;
  var passphrasebytes = new TextEncoder('utf-8').encode(passphrase);
  var pbkdf2salt = cipherbytes.slice(8, 16);

  var passphrasekey = await window.crypto.subtle
    .importKey('raw', passphrasebytes, { name: 'PBKDF2' }, false, [
      'deriveBits',
    ])
    .catch(function (err) {
      console.error(err);
    });
  console.log('passphrasekey imported');

  var pbkdf2bytes = await window.crypto.subtle
    .deriveBits(
      {
        name: 'PBKDF2',
        salt: pbkdf2salt,
        iterations: pbkdf2iterations,
        hash: 'SHA-256',
      },
      passphrasekey,
      384
    )
    .catch(function (err) {
      console.error(err);
    });
  console.log('pbkdf2bytes derived');
  pbkdf2bytes = new Uint8Array(pbkdf2bytes);

  var keybytes = pbkdf2bytes.slice(0, 32);
  var ivbytes = pbkdf2bytes.slice(32);
  cipherbytes = cipherbytes.slice(16);

  var key = await window.crypto.subtle
    .importKey('raw', keybytes, { name: 'AES-CBC', length: 256 }, false, [
      'decrypt',
    ])
    .catch(function (err) {
      console.error(err);
    });
  console.log('key imported');

  var plaintextbytes = await window.crypto.subtle
    .decrypt({ name: 'AES-CBC', iv: ivbytes }, key, cipherbytes)
    .catch(function (err) {
      console.error(err);
    });

  if (!plaintextbytes) {
    console.log('Error decrypting file');
    toast.error(
      'Error decrypting file.  Password may be incorrect or file may be corrupt.'
    );
    return;
  }

  console.log('ciphertext decrypted');
  plaintextbytes = new Uint8Array(plaintextbytes);

  var blob = new Blob([plaintextbytes], { type: 'application/download' });
  var blobUrl = URL.createObjectURL(blob);
  var aDecsavefile = document.createElement('a');
  aDecsavefile.href = blobUrl;
  aDecsavefile.download = 'dec_' + objFile.name;
  aDecsavefile.click();
};


export {encryptFile, decryptFile, readFile}