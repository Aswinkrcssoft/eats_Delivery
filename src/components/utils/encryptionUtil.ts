// Utility functions for AES encryption and decryption

const STATIC_SALT_BYTES = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
const ITERATION_COUNT = 50;
const KEY_LENGTH = 128;

// Helper function to generate a derived key from a password
const generateKey = async (password: string): Promise<CryptoKey> => {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  const salt = STATIC_SALT_BYTES;

  return await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  ).then(keyMaterial => {
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: ITERATION_COUNT,
        hash: 'SHA-1'
      },
      keyMaterial,
      { name: 'AES-CBC', length: KEY_LENGTH },
      false,
      ['encrypt', 'decrypt']
    );
  });
};

// Function to encrypt text and return the encrypted value
export const encryptText = async (text: string, password: string): Promise<string> => {
  try {
    const key = await generateKey(password);
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    // Generate an initialization vector (IV)
    const iv = crypto.getRandomValues(new Uint8Array(16));

    // Encrypt the text
    const encryptedData = await crypto.subtle.encrypt(
      { name: 'AES-CBC', iv: iv },
      key,
      data
    );

    // Combine IV and encrypted data into a single array
    const encryptedBuffer = new Uint8Array(iv.length + encryptedData.byteLength);
    encryptedBuffer.set(iv);
    encryptedBuffer.set(new Uint8Array(encryptedData), iv.length);

    // Convert to base64 and return it
    return btoa(String.fromCharCode(...encryptedBuffer));
  } catch (error) {
    console.error('Error during encryption:', error);
    throw new Error('Encryption failed');
  }
};

// Function to decrypt text and return the decrypted value
export const decryptText = async (encryptedText: string, password: string): Promise<string | null> => {
  try {
    // Decode from base64 to binary buffer
    const encryptedBuffer = new Uint8Array(atob(encryptedText).split('').map(char => char.charCodeAt(0)));

    // Extract IV from the beginning of the buffer
    const iv = encryptedBuffer.slice(0, 16);
    const data = encryptedBuffer.slice(16);

    // Generate the decryption key
    const key = await generateKey(password);

    // Decrypt the text
    const decryptedData = await crypto.subtle.decrypt(
      { name: 'AES-CBC', iv: iv },
      key,
      data
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
  } catch (error) {
    console.error('Error during decryption:', error);
    return null;
  }
};
