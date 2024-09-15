
import dashboard from '@/app/assets/dashboard.svg';
import profile from '@/app/assets/profile.svg';
import logout from '@/app/assets/logout.svg';
import post from '@/app/assets/post.png'


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
    name:'post',
    imgUrl:post,
    link:'/Cast-Post'

  },
  // {
  //   name: 'logout',
  //   imgUrl: logout,
  //   link: '/',
  //   disabled: true,
  // },
];
