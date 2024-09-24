import React from 'react'
import UserFeed from './UserFeed'
import ChannelFeed from './ChannelFeed'

const ExploreFeed = () => {
  return (
    <section className='flex flex-col items-center justify-center h-screen'>
      {/* First section Top User Accounts Display */}
        <UserFeed/>
    
      {/* Second section Channels Display*/}  
        <ChannelFeed/>
    </section>
  )
}

export default ExploreFeed