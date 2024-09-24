'use client';

import React, { useState, useEffect } from 'react';
import { useNeynarContext } from '@neynar/react';
import axios from 'axios';
import Image from 'next/image';

const ProfileWithFeed: React.FC = () => {
  const { user } = useNeynarContext(); // Fetch user data from Neynar context
  const [feed, setFeed] = useState<any[]>([]); // State for the feed data
  const [cursor, setCursor] = useState<string | null>(null); // State for managing pagination cursor
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const apiKey = process.env.NEXT_PUBLIC_NEYNAR_API_KEY; // API key from environment variables

  const fetchData = async (useCursor = false) => {
    try {
      setLoading(true); // Set loading state before API call

      // Prepare API URL
      let url = `https://api.neynar.com/v2/farcaster/channel/list?limit=10`;
      if (useCursor && cursor) {
        url += `&cursor=${encodeURIComponent(cursor)}`; // Append cursor dynamically if available
      }

      const options = {
        method: 'GET',
        url,
        headers: { accept: 'application/json', api_key: apiKey },
      };

      const response = await axios.request(options); // API request
      const data = response.data.channels; // Fetch channels from response
      const nextCursor = response.data.next?.cursor; // Get next cursor for pagination

      setFeed((prevFeed) => [...prevFeed, ...data]); // Append new data to the existing feed
      setCursor(nextCursor || null); // Set next cursor for future API requests
      setLoading(false); // Set loading state after fetching
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  // Fetch initial data
  useEffect(() => {
    fetchData(); // Fetch data without cursor initially
  }, []); // Run only once when component mounts

  const loadMore = () => {
    if (!loading && cursor) {
      fetchData(true); // Load more data when 'Load More' button is clicked with cursor
    }
  };

  console.log(feed)

  return (
    <section className='bg-slate-600 w-1/2 p-4'>
      {/* User's Feed */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {feed.length > 0 ? (
          feed.map((item, index) => (
            <div key={index} className='bg-gray-700 p-4 rounded-lg'>
              <p>{item.name || 'No channel name'}</p>
              <small>Channel ID: {item.id}</small>
              <Image
                src={item.image_url}
                width={200}
                height={200}
                alt="User Profile Picture"
                className="rounded-md"
              />
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
            className="col-span-full mt-4 bg-blue-500 text-white p-2 rounded"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        )}
      </div>
    </section>
  );
};

export default ProfileWithFeed;
