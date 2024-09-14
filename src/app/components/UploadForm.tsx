// import { useState } from 'react';
// import { pinFileToIPFS } from '@/app/utils/pinata';

// const UploadForm = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [response, setResponse] = useState<any>(null);
  
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!file) {
//       setError('No file selected');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       if (file) {
//         const fileResponse = await pinFileToIPFS(file);
//         console.log('File Response:', fileResponse);
//         setResponse(fileResponse);
//       }
//     } catch (err) {
//       setError('Failed to upload');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatResponse = (response: any) => {
//     if (!response) return '';
//     return `IPFS Hash: ${response.IpfsHash}, Pin Size: ${response.PinSize}, Timestamp: ${response.Timestamp}`;
//   };

//   const NEXT_PUBLIC_GATEWAY_KEY = process.env.NEXT_PUBLIC_GATEWAY_KEY;

//   // Construct URL only if response is available
//   const url = response ? `https://bronze-changing-aphid-363.mypinata.cloud/ipfs/${response.IpfsHash}?pinataGatewayToken=${NEXT_PUBLIC_GATEWAY_KEY}` : '';

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="file">Upload Image:</label>
//           <input type="file" id="file" onChange={handleFileChange} />
//         </div>
//         <button type="submit" disabled={loading}>
//           {loading ? 'Uploading...' : 'Upload'}
//         </button>
//       </form>
//       {response && <div>Response: {formatResponse(response)}</div>}
//       {url && <p>IPFS URL: <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p>}
//       {error && <div>Error: {error}</div>}
//     </div>
//   );
// };

// export default UploadForm;




// src/components/UploadForm.tsx
import { useState } from 'react';
import { pinFileToIPFS } from '@/app/utils/pinata';

interface UploadFormProps {
  onUrlUpdate: (url: string) => void;
}

const UploadForm = ({ onUrlUpdate }: UploadFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError('No file selected');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (file) {
        const fileResponse = await pinFileToIPFS(file);
        console.log('File Response:', fileResponse);
        setResponse(fileResponse);

        // Construct URL and notify parent
        const NEXT_PUBLIC_GATEWAY_KEY = process.env.NEXT_PUBLIC_GATEWAY_KEY;
        const url = `https://bronze-changing-aphid-363.mypinata.cloud/ipfs/${fileResponse.IpfsHash}?pinataGatewayToken=${NEXT_PUBLIC_GATEWAY_KEY}`;
        onUrlUpdate(url); // Pass URL to parent component
      }
    } catch (err) {
      setError('Failed to upload');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatResponse = (response: any) => {
    if (!response) return '';
    return `IPFS Hash: ${response.IpfsHash}, Pin Size: ${response.PinSize}, Timestamp: ${response.Timestamp}`;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Upload Image:</label>
          <input type="file" id="file" onChange={handleFileChange} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {response && <div>Response: {formatResponse(response)}</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default UploadForm;

