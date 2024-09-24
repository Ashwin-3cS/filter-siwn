// 'use client';

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Image from 'next/image';
// import { useNeynarContext } from '@neynar/react';

// interface ChannelDetailsProps {
//   params: { id: string };
// }

// const ChannelDetails: React.FC<ChannelDetailsProps> = ({ params }) => {
//   const { user } = useNeynarContext();
//   const [channel, setChannel] = useState<any>(null); // State to hold channel details
//   const [loading, setLoading] = useState<boolean>(true); // Loading state
//   const [error, setError] = useState<string | null>(null); // Error state
//   const [isFollowing, setIsFollowing] = useState<boolean>(false); // State to track follow/unfollow status

//   const apiKey = process.env.NEXT_PUBLIC_NEYNAR_API_KEY; // Ensure you have your API key in environment variables


  
//     console.log(user);
    
//   useEffect(() => {
//     const fetchChannelDetails = async () => {
//       const options = {
//         method: 'GET',
//         url: `https://api.neynar.com/v2/farcaster/channel/bulk?ids=${params.id}`, // Use the dynamic ID from params
//         headers: { accept: 'application/json', api_key: apiKey },
//       };

//       try {
//         const response = await axios.request(options);
//         const fetchedChannel = response.data.channels[0]; // Assuming the API returns an array of channels
//         setChannel(fetchedChannel); // Set channel state
//       } catch (error) {
//         console.error('Error fetching channel data:', error);
//         setError('Error fetching channel details.'); // Set error state
//       } finally {
//         setLoading(false); // Set loading to false regardless of success or failure
//       }
//     };

//     fetchChannelDetails(); // Call the function to fetch channel details
//   }, [params.id, apiKey]); // Dependency array

//   const handleFollowToggle = async () => {
//     const options = {
//       method: 'POST',
//       url: 'https://api.neynar.com/v2/farcaster/channel/follow',
//       headers: {
//         accept: 'application/json',
//         api_key: apiKey,
//         'content-type': 'application/json',
//       },
//       data: {
//         signer_uuid: user.signer_uuid, // Use the signer_uuid from the user context
//         channel_id: params.id, // Channel ID from props
//       },
//     };

//     try {
//       await axios.request(options);
//       setIsFollowing(!isFollowing); // Toggle follow status
//     } catch (error) {
//       console.error('Error following/unfollowing channel:', error);
//       setError('Error toggling follow status.'); // Set error state
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>; // Show loading state
//   }

//   if (error) {
//     return <p>{error}</p>; // Show error state
//   }

//   if (!channel) {
//     return <p>Channel not found.</p>; // Fallback if channel is null
//   }

//   return (
//     <div className='p-4'>
//       <h1 className='text-2xl font-bold'>{channel.name}</h1>
//       <Image 
//         src={channel.image_url}
//         alt={channel.name}
//         className='rounded-lg my-4'
//         width={250}
//         height={250}   
//       />
//       <p>{channel.description}</p>
//       <p>
//         <strong>Followers:</strong> {channel.follower_count}
//       </p>
//       <a href={channel.url} className='text-blue-500 underline'>
//         View Channel
//       </a>
//       <button 
//         onClick={handleFollowToggle} 
//         className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
//       >
//         {isFollowing ? 'Unfollow' : 'Follow'}
//       </button>
//     </div>
//   );
// };

// export default ChannelDetails;








'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useNeynarContext } from '@neynar/react';

interface ChannelDetailsProps {
  params: { id: string };
}

const ChannelDetails: React.FC<ChannelDetailsProps> = ({ params }) => {
  const { user } = useNeynarContext();
  const [channel, setChannel] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  
  const apiKey = process.env.NEXT_PUBLIC_NEYNAR_API_KEY;

  useEffect(() => {
    const fetchChannelDetails = async () => {
      if (!user || !user.fid) {
        console.warn('User or user.fid is not available.');
        setError('User not logged in or invalid user data.');
        setLoading(false);
        return;
      }

      const user_fid = user.fid;
      console.log(user_fid);

      const options = {
        method: 'GET',
        url: `https://api.neynar.com/v2/farcaster/channel/bulk?ids=${params.id}`,
        headers: { accept: 'application/json', api_key: apiKey },
      };

      try {
        const response = await axios.request(options);
        const fetchedChannel = response?.data?.channels?.[0]; // Safely access channels array
        if (fetchedChannel) {
          setChannel(fetchedChannel);
          await checkFollowingStatus(user_fid, fetchedChannel.lead.username); // Pass user_fid to the function
        } else {
          setError('Channel not found.');
        }
      } catch (error) {
        console.error('Error fetching channel data:', error);
        setError('Error fetching channel details.');
      } finally {
        setLoading(false);
      }
    };

    const checkFollowingStatus = async (user_fid: string, leadUsername: string) => {
      const options = {
        method: 'GET',
        url: `https://api.neynar.com/v2/farcaster/followers?fid=${user_fid}&limit=20`,
        headers: { accept: 'application/json', api_key: apiKey },
      };

      try {
        const response = await axios.request(options);
        const isUserFollowing = response?.data?.channels?.some((ch: any) => ch.name === leadUsername);
        setIsFollowing(isUserFollowing || false);
      } catch (error) {
        console.error('Error checking follow status:', error);
      }
    };

    // Only fetch data when user object is available
    if (user && user.fid) {
      fetchChannelDetails();
    }
  }, [params.id, user, apiKey]); // Include user in the dependency array

  const handleFollowToggle = async () => {
    if (isFollowing) {
      await handleUnfollowChannel();
    } else {
      await handleFollowChannel();
    }
  };

  const handleFollowChannel = async () => {
    if (!user) return;
    const options = {
      method: 'POST',
      url: 'https://api.neynar.com/v2/farcaster/channel/follow',
      headers: {
        accept: 'application/json',
        api_key: apiKey,
        'content-type': 'application/json',
      },
      data: {
        signer_uuid: user.signer_uuid,
        channel_id: params.id,
      },
    };

    try {
      await axios.request(options);
      setIsFollowing(true);
    } catch (error) {
      console.error('Error following channel:', error);
      setError('Error following the channel.');
    }
  };

  const handleUnfollowChannel = async () => {
    if (!user) return;
    const options = {
      method: 'DELETE',
      url: 'https://api.neynar.com/v2/farcaster/channel/follow',
      headers: {
        accept: 'application/json',
        api_key: apiKey,
        'content-type': 'application/json',
      },
      data: {
        signer_uuid: user.signer_uuid,
        channel_id: params.id,
      },
    };

    try {
      await axios.request(options);
      setIsFollowing(false);
    } catch (error) {
      console.error('Error unfollowing channel:', error);
      setError('Error unfollowing the channel.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!channel) {
    return <p>Channel not found.</p>;
  }

  console.log(isFollowing);
  

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>{channel.name}</h1>
      <Image 
        src={channel.image_url}
        alt={channel.name}
        className='rounded-lg my-4'
        width={250}
        height={250}   
      />
      <p>{channel.description}</p>
      <p>
        <strong>Followers:</strong> {channel.follower_count}
      </p>
      <a href={channel.url} className='text-blue-500 underline'>
        View Channel
      </a>
      <button 
        onClick={handleFollowToggle} 
        className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
        
      </button>
    </div>
  );
};

export default ChannelDetails;
