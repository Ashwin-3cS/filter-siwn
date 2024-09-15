


'use client'

import React, { useState, useEffect } from 'react';
import { useNeynarContext } from '@neynar/react';
import Image from 'next/image';
import axios from 'axios';
import { customImageLoader } from '../utils/imageLoader';

const ProfileWithFeed: React.FC = () => {
  const { user } = useNeynarContext(); // Fetch user data from Neynar context
  const [feed, setFeed] = useState<any[]>([]); // State for the feed data
  const [cursor, setCursor] = useState<string | null>(null); // State for managing pagination cursor
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [deleting, setDeleting] = useState<boolean>(false); // Deleting state

  const userFid = user?.fid;
  const signerUuid = user?.signer_uuid; // Get signer UUID from context
  const apiKey = process.env.NEXT_PUBLIC_NEYNAR_API_KEY; // API key from environment variables

  const fetchData = async () => {
    if (!userFid) {
      console.error('userFid is undefined');
      return; // Exit if userFid is not available
    }

    try {
      setLoading(true); // Set loading state before API call

      const options = {
        method: 'GET',
        url: `https://api.neynar.com/v2/farcaster/feed/user/casts?fid=${userFid}&limit=50${cursor ? `&cursor=${cursor}` : ''}&include_replies=true`,
        headers: { accept: 'application/json', api_key: apiKey }
      };

      const response = await axios.request(options); // API request

      const data = response.data.casts;
      const nextCursor = response.data.next?.cursor; // Get next cursor for pagination

      setFeed((prevFeed) => [...prevFeed, ...data]); // Append new data to the existing feed
      setCursor(nextCursor || null); // Set next cursor for future API requests

      setLoading(false); // Set loading state after fetching
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  // Function to delete a cast
  const deleteCast = async (hash: string) => {
    if (!signerUuid) {
      console.error('signerUuid is undefined');
      return; // Exit if signerUuid is not available
    }

    try {
      setDeleting(true); // Set deleting state before API call

      const options = {
        method: 'DELETE',
        url: 'https://api.neynar.com/v2/farcaster/cast',
        headers: {
          accept: 'application/json',
          api_key: apiKey,
          'content-type': 'application/json'
        },
        data: {
          target_hash: hash,
          signer_uuid: signerUuid
        }
      };

      const response = await axios.request(options); // API request to delete cast

      console.log('Cast deleted successfully:', response.data);
      setFeed((prevFeed) => prevFeed.filter((item) => item.hash !== hash)); // Remove deleted cast from the feed

      setDeleting(false); // Set deleting state after deleting
    } catch (error) {
      console.error('Error deleting cast:', error);
      setDeleting(false);
    }
  };

  // Fetch initial data when userFid is available
  useEffect(() => {
    if (userFid) {
      fetchData(); // Only fetch data when userFid is defined
    }
  }, [userFid]); // Run the effect only when userFid changes

  const loadMore = () => {
    if (!loading && cursor) {
      fetchData(); // Load more data when 'Load More' button is clicked
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen mt-16">
      {/* FirstSection - User Profile */}
      <div className="w-1/2 h-1/3 flex flex-row gap-6">
        {user?.pfp_url && (
          <div>
            <Image
              src={user.pfp_url}
              width={500}
              height={500}
              alt="User Profile Picture"
              className="rounded-full"
            />
          </div>
        )}
        
        {/* First SubSection */}
        <div className="flex flex-col gap-4">
          <p className="text-3xl">{user?.username}</p>

          <div className="flex flex-row gap-4">
            <h3>{user?.follower_count} followers</h3>
            <h3>{user?.following_count} following</h3>
          </div>

          <div>
            <h2>{user?.profile?.bio?.text}</h2>
          </div>
        </div>
      </div>

      <hr className="border-white w-1/2" />

      {/* FeedWithPagination - User's Posts */}
      <div className="w-1/2 h-1/2 gap-6 bg-slate-600 p-4 rounded-lg text-white overflow-auto scrollbar-hide">
        {/* Display feed data */}
        {feed.length > 0 ? (
          feed.map((item, index) => (
            <div key={index} className="relative mb-4 p-2 bg-gray-700 rounded">
              <div className="dropdown dropdown-end absolute top-2 right-2">
                <div tabIndex={0} role="button" className=" m-1" >
                  {deleting ? 'Deleting...' : '...'}
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <button className='btn bg-red-500' onClick={() => deleteCast(item.hash)}>Delete Cast</button>
                </ul>
              </div>
              <p>{item.text || 'No content'}</p>
              <small>by {item.author.username}</small>
              {item.hash}
              {/* Check if embeds exist and display image if present */}
              {item.embeds?.[0]?.url && item.embeds?.[0]?.metadata?.content_type?.includes('image') && (
                <div className="mt-2">
                  <Image
                    loader={customImageLoader}
                    src={item.embeds[0].url}
                    alt="Embedded Image"
                    width={400}
                    height={400}
                    className="rounded"
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}

        {/* Load More Button */}
        {cursor && (
          <button
            onClick={loadMore}
            disabled={loading}
            className="mt-4 p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        )}
      </div>
    </section>
  );
};

export default ProfileWithFeed;
