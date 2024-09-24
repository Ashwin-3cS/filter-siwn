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
  const [channel, setChannel] = useState<any>(null); // State to hold channel details
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [isFollowing, setIsFollowing] = useState<boolean>(false); // State to track follow/unfollow status

  const apiKey = process.env.NEXT_PUBLIC_NEYNAR_API_KEY; // Ensure you have your API key in environment variables

  useEffect(() => {
    const fetchChannelDetails = async () => {
      const options = {
        method: 'GET',
        url: `https://api.neynar.com/v2/farcaster/channel/bulk?ids=${params.id}`, // Use the dynamic ID from params
        headers: { accept: 'application/json', api_key: apiKey },
      };

      try {
        const response = await axios.request(options);
        const fetchedChannel = response.data.channels[0]; // Assuming the API returns an array of channels
        setChannel(fetchedChannel); // Set channel state
      } catch (error) {
        console.error('Error fetching channel data:', error);
        setError('Error fetching channel details.'); // Set error state
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchChannelDetails(); // Call the function to fetch channel details
  }, [params.id, apiKey]); // Dependency array

  const handleFollowToggle = async () => {
    const options = {
      method: 'POST',
      url: 'https://api.neynar.com/v2/farcaster/channel/follow',
      headers: {
        accept: 'application/json',
        api_key: apiKey,
        'content-type': 'application/json',
      },
      data: {
        signer_uuid: user.signer_uuid, // Use the signer_uuid from the user context
        channel_id: params.id, // Channel ID from props
      },
    };

    try {
      await axios.request(options);
      setIsFollowing(!isFollowing); // Toggle follow status
    } catch (error) {
      console.error('Error following/unfollowing channel:', error);
      setError('Error toggling follow status.'); // Set error state
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  if (error) {
    return <p>{error}</p>; // Show error state
  }

  if (!channel) {
    return <p>Channel not found.</p>; // Fallback if channel is null
  }

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
