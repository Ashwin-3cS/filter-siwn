// import type { NextApiRequest, NextApiResponse } from 'next';
// import { pinFileToIPFS, pinJSONToIPFS } from '../../../../utils/pinata'; // Adjust the import path if necessary
// import formidable from 'formidable';
// import fs from 'fs';

// // Disable body parsing for file uploads
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'POST') {
//     try {
//       const form = new formidable.IncomingForm();

//       // Handle form submission
//       form.parse(req, async (err, fields, files) => {
//         if (err) {
//           return res.status(500).json({ error: 'Failed to parse form' });
//         }

//         const groupName = Array.isArray(fields.groupName) ? fields.groupName[0] : fields.groupName || 'userPosts'; // Handle groupName as string

//         // Pin JSON to IPFS
//         if (fields.jsonData) {
//           const jsonData = JSON.parse(Array.isArray(fields.jsonData) ? fields.jsonData[0] : fields.jsonData as string);
//           const response = await pinJSONToIPFS(jsonData, groupName as string);
//           return res.status(200).json({ success: true, data: response });
//         }

//         // Pin file to IPFS
//         if (files.file) {
//           // Check if the file is an array or a single file object
//           const file = Array.isArray(files.file) ? files.file[0] : files.file as formidable.File;
//           const fileData = fs.createReadStream(file.filepath);
//           const response = await pinFileToIPFS(fileData, groupName as string);
//           return res.status(200).json({ success: true, data: response });
//         }

//         return res.status(400).json({ error: 'No file or JSON provided' });
//       });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: 'An error occurred while pinning data to IPFS' });
//     }
//   } else {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }
// };

// export default handler;
