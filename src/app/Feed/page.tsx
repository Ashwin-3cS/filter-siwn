import React from 'react'
import CastPublisher from '../components/CastPublisher'
import Sidebar from '../components/SideBar'
import FeedBar from '../components/FeedBar'
import StoryBar from '../components/StoryBar'

const page = () => {
  return (
    <div >
      <StoryBar/>
      <Sidebar/>
      <FeedBar/>  
    </div>
  )
}

export default page