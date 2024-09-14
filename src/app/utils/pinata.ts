// src/utils/pinata.ts
import axios from 'axios';

const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY;

const pinFileToIPFS = async (file: File, groupName = 'userPosts') => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  const data = new FormData();
  data.append('file', file);

  // Metadata for grouping the file with default group "userPosts"
  const metadata = {
    name: file.name,  // Customize the name if needed
    keyvalues: {
      group: groupName, // Default group name
    },
  };

  data.append('pinataMetadata', JSON.stringify(metadata));

  try {
    const response = await axios.post(url, data, {
      headers: {
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_API_KEY,
        'Content-Type': 'multipart/form-data', // Ensure Content-Type is set correctly
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error pinning file to IPFS:', error);
    throw error; // Rethrow error to be handled in the component
  }
};

export { pinFileToIPFS };

