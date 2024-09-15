'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import { useNeynarContext } from '@neynar/react';
import '@/app/globals.css';
import { customImageLoader } from '../utils/imageLoader';

type FeedItem = {
  hash: string;
  text: string;
  parent_url: string | null;
  author: {
    username: string;
    pfp_url: string;
  };
  timestamp: string;
};

const FeedBar: React.FC = () => {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [cursor, setCursor] = useState<string | null>(null); // State to manage pagination
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useNeynarContext();
  const userFid = user?.fid;

  console.log('user FID : ', userFid);

  const fetchData = async () => {
    try {
      setLoading(true); // Set loading to true while fetching data

      // Create the axios request options based on your example
      const options = {
        method: 'GET',
        url: `https://api.neynar.com/v2/farcaster/feed/following?fid=${userFid}&with_recasts=true&limit=100${cursor ? `&cursor=${cursor}` : ''}`,
        headers: {
          accept: 'application/json',
          api_key: 'NEYNAR_API_DOCS',
        },
      };

      const response = await axios.request(options); // Perform the request

      const data = response.data.casts;
      const nextCursor = response.data.next?.cursor; // Get the next cursor from response
      const feedItems = data.map((item: any) => ({
        hash: item.hash,
        text: item.text || '',
        parent_url: item.parent_url || null,
        author: {
          username: item.author.username,
          pfp_url: item.author.pfp_url,
        },
        timestamp: item.timestamp,
      }));

      setFeed((prevFeed) => [...prevFeed, ...feedItems]); // Append new data to existing feed
      setCursor(nextCursor || null); // Set the next cursor for pagination
      setLoading(false); // Turn off loading after data is fetched
    } catch (error) {
      console.error('Error fetching feed:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userFid) {
      fetchData();
    }
  }, [userFid]);

  const loadMore = () => {
    if (!loading && cursor) {
      fetchData();
    }
  };

  return (
    <div className="ml-64 mt-16 p-4">
      <div className="max-w-screen-md mx-auto p-4 rounded-lg overflow-hidden">
        <div
          style={{ maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}
          className="overflow-y-auto scrollbar-hide"
        >
          {feed.length > 0 ? (
            feed.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-4 mb-4 ring-1 ring-slate-900/10"
              >
                <div className="flex items-center mb-2">
                  <Image
                    loader={customImageLoader}
                    src={item.author.pfp_url || '/images/default-avatar.png'}
                    width={50}
                    height={50}
                    alt={item.author.username || 'User Avatar'}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">
                      {item.author.username || 'Anonymous'}
                    </p>
                    <span className="text-gray-500 text-sm">
                      {item.timestamp
                        ? formatDistanceToNow(new Date(item.timestamp), {
                            addSuffix: true,
                          })
                        : 'Unknown Time'}
                    </span>
                  </div>
                </div>
                <p className="text-gray-800">
                  {item.text || 'No content available.'}
                </p>
              </div>
            ))
          ) : (
            <div>No feed items available</div>
          )}

          {/* Load More Button */}
          {cursor && (
            <button
              onClick={loadMore}
              className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedBar;
