

"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import { NeynarAuthButton, useNeynarContext } from "@neynar/react";
import Image from "next/image";
import UploadForm from "./UploadForm";

export default function CastPublisher() {
  const { user } = useNeynarContext();
  const [text, setText] = useState("");
  const [postUrl, setPostUrl] = useState<string | null>(null);
  const NEYNAR_API_KEY = process.env.NEXT_PUBLIC_NEYNAR_API_KEY;

  const handlePublishCast = async () => {
    try {
      console.log(NEYNAR_API_KEY, 'api key');

      const url = 'https://api.neynar.com/v2/farcaster/cast';

      // Prepare embeds array only if a valid URL is available
      const embeds = postUrl ? [{ url: postUrl }] : [];

      const options = {
        method: 'POST',
        url: url,
        headers: {
          accept: 'application/json',
          api_key: NEYNAR_API_KEY!,
          'content-type': 'application/json',
        },
        data: {
          signer_uuid: user?.signer_uuid,
          text: text,
          embeds: embeds,  // Either an empty array or with the URL
        },
      };

      const response = await axios.request(options);
      console.log(response.data);

      // Reset the form after a successful cast
      setText("");
      setPostUrl(null);

    } catch (err) {
      if (err instanceof AxiosError) {
        // Handle Axios error
        const message = err.response?.data?.message || "An error occurred";
        alert(message);
      } else if (err instanceof Error) {
        // Handle generic JavaScript errors
        alert(err.message);
      } else {
        // Fallback error
        alert("An unknown error occurred.");
      }
    }
  };

  // Function to handle URL updates from UploadForm
  const handleUrlUpdate = (url: string) => {
    setPostUrl(url);
  };

  return (
    <div className="flex flex-col gap-4 rounded-md shadow-md h-screen justify-center items-center">
      <UploadForm onUrlUpdate={handleUrlUpdate} />
      <div className="flex items-center gap-4">
        {user?.pfp_url && (
          <div>
            <Image
              src={user.pfp_url}
              width={40}
              height={40}
              alt="User Profile Picture"
              className="rounded-full"
            />
          </div>
        )}
        <p className="text-lg font-semibold">{user?.display_name}</p>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Say Something"
        rows={5}
        className="p-2 rounded-md shadow-md text-black placeholder:text-gray-900"
      />
      <button
        onClick={handlePublishCast}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors duration-200 ease-in-out"
      >
        Cast
      </button>
    </div>
  );
}
