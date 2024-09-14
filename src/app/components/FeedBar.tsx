// 'use client';

// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { formatDistanceToNow } from 'date-fns';
// import { customImageLoader } from '@/app/utils/imageLoader';
// import axios from 'axios';
// import { useNeynarContext } from '@neynar/react';

// // Define a type for the feed items based on the response structure
// type FeedItem = {
//   hash: string;
//   text: string;
//   parent_url: string | null;
//   author: {
//     username: string;
//     pfp_url: string;
//   };
//   timestamp: string;
// };

// const FeedBar: React.FC = () => {
//   const [feed, setFeed] = useState<FeedItem[]>([]);
//   const { user } = useNeynarContext();
  
//   const userFid = user?.fid;
  
//   console.log(userFid,'FID');
//   console.log(user , 'user')
  

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Replace with your Neynar API endpoint and user's fid
//         const response = await axios.get(`https://api.neynar.com/v2/farcaster/feed/following?fid=${userFid}&with_recasts=true&limit=50`, {
//           headers: {
//             accept: 'application/json',
//             api_key: 'NEYNAR_API_DOCS',
//           },
//         });

//         // Extract the `casts` array from the response
//         const data = response.data.casts;
//         const feedItems = data.map((item: any) => ({
//           hash: item.hash,
//           text: item.text || '',
//           parent_url: item.parent_url || null,
//           author: {
//             username: item.author.username,
//             pfp_url: item.author.pfp_url,
//           },
//           timestamp: item.timestamp,
//         }));
//         console.log('FeedItems : ', feedItems);
        
//         setFeed(feedItems);
//       } catch (error) {
//         console.error('Error fetching feed:', error);
//       }
//     };

//     if (userFid) {
//       fetchData();
//     }
//   }, [userFid]);

//   return (
//     <div>
//       <div className="max-w-screen-md mx-auto p-4 rounded-lg overflow-hidden">
//         <div style={{ maxHeight: 'calc(100vh - 80px)' }}>
//           {feed.length > 0 ? (
//             feed.map((item, index) => (
//               <div key={index} className="bg-white rounded-lg shadow-lg p-4 mb-4 ring-1 ring-slate-900/10">
//                 <div className="flex items-center mb-2">
//                   {/* Render profile picture */}
//                   <Image
//                     loader={customImageLoader}
//                     src={item.author.pfp_url || '/images/default-avatar.png'}
//                     width={50}
//                     height={50}
//                     alt={item.author.username || 'User Avatar'}
//                     className="w-10 h-10 rounded-full mr-2"
//                   />
//                   <div>
//                     {/* Render user name */}
//                     <p className="text-gray-800 font-semibold">{item.author.username || 'Anonymous'}</p>
//                     {/* Render post time */}
//                     <span className="text-gray-500 text-sm">
//                       {item.timestamp
//                         ? formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })
//                         : 'Unknown Time'}
//                     </span>
//                   </div>
//                 </div>
//                 {/* Render post content */}
//                 <p className="text-gray-800">{item.text || 'No content available.'}</p>
//               </div>
//             ))
//           ) : (
//             <div>No feed items available</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeedBar;





'use client'

// components/FeedBar.js
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { customImageLoader } from '@/app/utils/imageLoader';
import axios from 'axios';
import { useNeynarContext } from '@neynar/react';

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
  const { user } = useNeynarContext();
  const userFid = user?.fid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.neynar.com/v2/farcaster/feed/following?fid=${userFid}&with_recasts=true&limit=50`, {
          headers: {
            accept: 'application/json',
            api_key: 'NEYNAR_API_DOCS',
          },
        });

        const data = response.data.casts;
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

        setFeed(feedItems);
      } catch (error) {
        console.error('Error fetching feed:', error);
      }
    };

    if (userFid) {
      fetchData();
    }
  }, [userFid]);

  return (
    <div className="ml-64 mt-16 p-4">
      <div className="max-w-screen-md mx-auto p-4 rounded-lg overflow-hidden">
        <div style={{ maxHeight: 'calc(100vh - 80px)' }}>
          {feed.length > 0 ? (
            feed.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-4 mb-4 ring-1 ring-slate-900/10">
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
                    <p className="text-gray-800 font-semibold">{item.author.username || 'Anonymous'}</p>
                    <span className="text-gray-500 text-sm">
                      {item.timestamp
                        ? formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })
                        : 'Unknown Time'}
                    </span>
                  </div>
                </div>
                <p className="text-gray-800">{item.text || 'No content available.'}</p>
              </div>
            ))
          ) : (
            <div>No feed items available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedBar;
