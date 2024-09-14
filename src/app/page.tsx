// "use client";

// import { ErrorRes } from "@neynar/nodejs-sdk/build/neynar-api/v2";
// import { NeynarAuthButton, useNeynarContext } from "@neynar/react";
// import axios, { AxiosError } from "axios";
// import Image from "next/image";
// import { useState } from "react";
// import UploadForm from "./components/UploadForm";

// export default function Home() {
//   const { user } = useNeynarContext();
//   console.log('user', user);
//   const [text, setText] = useState("");
//   const NEYNAR_API_KEY = process.env.NEXT_PUBLIC_NEYNAR_API_KEY; // Use NEXT_PUBLIC_ prefix for client-side


//   const handlePublishCast = async () => {
//     try {
//       console.log(NEYNAR_API_KEY,'api key');
      
//       const url = 'https://api.neynar.com/v2/farcaster/cast';
//       const options = {
//         method: 'POST',
//         headers: {
//           accept: 'application/json',
//           api_key: NEYNAR_API_KEY!,
//           'content-type': 'application/json'
//         },
//         body: JSON.stringify({
//           signer_uuid: user?.signer_uuid,
//           text: text,
//           embeds: [
//             {
//               url: 'https://drive-clonegoogle.s3.ap-southeast-2.amazonaws.com/user-files/f498d464-2d44-4c91-9b83-e6858a48590b-bangalore.jpeg-1726303717908'
//             }
//           ]
//         })
//       };

//       const response = await fetch(url, options);
//       console.log(response);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const json = await response.json();
//       console.log(json);

//       setText("");

//     } catch (err) {
//       const axiosError = err as AxiosError<ErrorRes>;
//       const message = axiosError.response?.data?.message || "An error occurred";
//       alert(message);
//     }
//   };

//   return (
//     <main className="flex min-h-screen flex-col items-center p-24">
//       <NeynarAuthButton />
//       {user && (
//         <>
//           <div className="flex flex-col gap-4 w-96 p-4 rounded-md shadow-md">
//             <div className="flex items-center gap-4">
//               {user.pfp_url && (
//                 <Image
//                   src={user.pfp_url}
//                   width={40}
//                   height={40}
//                   alt="User Profile Picture"
//                   className="rounded-full"
//                 />
//               )}
//               <p className="text-lg font-semibold">{user?.display_name}</p>
//             </div>
//             <textarea
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               placeholder="Say Something"
//               rows={5}
//               className="w-full p-2 rounded-md shadow-md text-black placeholder:text-gray-900"
//             />
//           </div>
//           <button
//             onClick={handlePublishCast}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors duration-200 ease-in-out"
//           >
//             Cast
//           </button>
//           <UploadForm />
//         </>
//       )}
//     </main>
//   );
// }






// src/pages/index.tsx or src/app/page.tsx
"use client";

import { ErrorRes } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { NeynarAuthButton, useNeynarContext } from "@neynar/react";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useState } from "react";
import UploadForm from "./components/UploadForm";

export default function Home() {
  const { user } = useNeynarContext();
  console.log('user', user);
  const [text, setText] = useState("");
  const [postUrl, setPostUrl] = useState<string | null>(null);
  const NEYNAR_API_KEY = process.env.NEXT_PUBLIC_NEYNAR_API_KEY; // Use NEXT_PUBLIC_ prefix for client-side

  const handlePublishCast = async () => {
    try {
      console.log(NEYNAR_API_KEY, 'api key');

      const url = 'https://api.neynar.com/v2/farcaster/cast';
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          api_key: NEYNAR_API_KEY!,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          signer_uuid: user?.signer_uuid,
          text: text,
          embeds: [
            {
              url: postUrl || ''
            }
          ]
        })
      };

      const response = await fetch(url, options);
      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);

      setText("");

    } catch (err) {
      const axiosError = err as AxiosError<ErrorRes>;
      const message = axiosError.response?.data?.message || "An error occurred";
      alert(message);
    }
  };

  // Function to handle URL updates from UploadForm
  const handleUrlUpdate = (url: string) => {
    setPostUrl(url);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <NeynarAuthButton />
      {user && (
        <>
          <div className="flex flex-col gap-4 w-96 p-4 rounded-md shadow-md">
            <div className="flex items-center gap-4">
              {user.pfp_url && (
                <Image
                  src={user.pfp_url}
                  width={40}
                  height={40}
                  alt="User Profile Picture"
                  className="rounded-full"
                />
              )}
              <p className="text-lg font-semibold">{user?.display_name}</p>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Say Something"
              rows={5}
              className="w-full p-2 rounded-md shadow-md text-black placeholder:text-gray-900"
            />
          </div>
          <button
            onClick={handlePublishCast}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors duration-200 ease-in-out"
          >
            Cast
          </button>
          <UploadForm onUrlUpdate={handleUrlUpdate} />
        </>
      )}
    </main>
  );
}
