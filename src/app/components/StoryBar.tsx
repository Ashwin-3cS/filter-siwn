// components/TopNav.js
import React from 'react';

const StoryBar = () => {
  return (
    <nav className="shadow-md w-full fixed top-0 z-10">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold">Instagram</div>
        <div className="space-x-4">
          <button className="p-2">Home</button>
          <button className="p-2">Messages</button>
          <button className="p-2">Profile</button>
        </div>
      </div>
    </nav>
  );
};

export default StoryBar;
