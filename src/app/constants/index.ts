
import dashboard from '@/app/assets/dashboard.svg';
import profile from '@/app/assets/profile.svg';
import logout from '@/app/assets/logout.svg';


export const navlinks = [
  {
    name: 'Feed',
    imgUrl: dashboard,
    link: '/Feed',
  },
  
  {
    name: 'profile',
    imgUrl: profile,
    link: '/Profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
    disabled: true,
  },
];
