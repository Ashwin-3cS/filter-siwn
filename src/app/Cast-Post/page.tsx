import React from 'react'
import Sidebar from '../components/SideBar'
import StoryBar from '../components/StoryBar'
import RightSidebar from '../components/RightSidebar'
import CastPublisher from '../components/CastPublisher'

const page = () => {
  return (
    <div >
      <StoryBar/>
      <Sidebar/>
      <CastPublisher/>
      <RightSidebar/>
    </div>
  )
}

export default page