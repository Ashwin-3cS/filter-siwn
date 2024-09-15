import React from 'react'
import Sidebar from '../components/SideBar'
import FeedBar from '../components/FeedBar'
import StoryBar from '../components/StoryBar'
import RightSidebar from '../components/RightSidebar'

const page = () => {
  return (
    <div >
      <StoryBar/>
      <Sidebar/>
      <FeedBar/>  
      <RightSidebar/>
    </div>
  )
}

export default page