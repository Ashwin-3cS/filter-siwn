// 'use client'

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation'; 
// import { navlinks } from '../constants';
// import Image from 'next/image';

// interface IconProps {
//   styles?: string;
//   name: string;
//   imgUrl: string;
//   isActive: boolean;
//   handleClick: () => void;
// }

// const Icon: React.FC<IconProps> = ({ styles, name, imgUrl, isActive, handleClick }) => (
//   <div
//     className={`w-[48px] h-[48px] rounded-[10px] ${isActive ? 'bg-[#2c2f32]' : ''} flex justify-center items-center cursor-pointer ${styles}`}
//     onClick={handleClick}
//   >
//     <Image src={imgUrl} alt={`${name}_logo`} className={`w-1/2 h-1/2 ${isActive ? '' : 'grayscale'}`} />
//   </div>
// );

// const Sidebar: React.FC = () => {
//   const pathname = usePathname(); // Use usePathname
//   const [isActive, setIsActive] = useState('Feed');

//   useEffect(() => {
//     // Set active state based on current path
//     const currentPath = pathname.split('/')[1] || 'Feed';
//     setIsActive(currentPath);
//   }, [pathname]);

//   return (
//     <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
//       <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
//         <div className="flex flex-col justify-center items-center gap-3">
//           {navlinks.map((link) => (
//             <Link key={link.name} href={link.link}>
//               <Icon 
//                 imgUrl={link.imgUrl}
//                 name={link.name}
//                 isActive={isActive === link.name}
//                 handleClick={() => {
//                   if (!link.disabled) {
//                     setIsActive(link.name);
//                   }
//                 }}
//               />
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;










'use client'
// components/Sidebar.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { navlinks } from '../constants';
import Image from 'next/image';

interface IconProps {
  styles?: string;
  name: string;
  imgUrl: string;
  isActive: boolean;
  handleClick: () => void;
}

const Icon: React.FC<IconProps> = ({ styles, name, imgUrl, isActive, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${isActive ? 'bg-[#2c2f32]' : ''} flex justify-center items-center cursor-pointer ${styles}`}
    onClick={handleClick}
  >
    <Image src={imgUrl} alt={`${name}_logo`} className={`w-1/2 h-1/2 ${isActive ? '' : 'grayscale'}`} />
  </div>
);

const Sidebar: React.FC = () => {
  const pathname = usePathname(); 
  const [isActive, setIsActive] = useState('Feed');

  useEffect(() => {
    const currentPath = pathname.split('/')[1] || 'Feed';
    setIsActive(currentPath);
  }, [pathname]);

  return (
    <div className="fixed top-16 left-0 w-60 h-screen bg-[#1c1c24] flex flex-col justify-between items-center p-4">
      <div className="flex-1 flex flex-col justify-center items-center gap-3">
        {navlinks.map((link) => (
          <Link key={link.name} href={link.link}>
            <Icon 
              imgUrl={link.imgUrl}
              name={link.name}
              isActive={isActive === link.name}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                }
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

