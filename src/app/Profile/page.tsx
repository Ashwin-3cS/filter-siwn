import React from 'react'
import Sidebar from '../components/SideBar'
import Profile from '../components/Profile'
import StoryBar from '../components/StoryBar'

const page = () => {
  return (
    <div>
      {/* <StoryBar/> */}
      <Sidebar/>
      <Profile/>
    </div>
  )
}

export default page