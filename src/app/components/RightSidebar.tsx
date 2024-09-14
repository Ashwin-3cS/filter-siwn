import React from 'react';

const RightSidebar = () => {
  return (
    <div className="fixed top-16 right-0 w-60 h-screen p-4">
      <ul>
        <li className="mb-4"><a href="#">Suggestions</a></li>
        <li className="mb-4"><a href="#">Trending</a></li>
        <li className="mb-4"><a href="#">Discover</a></li>
        <li className="mb-4"><a href="#">Help</a></li>
      </ul>
    </div>
  );
};

export default RightSidebar;
