
import dashboard from '@/app/assets/dashboard.svg';
import profile from '@/app/assets/profile.svg';
// import logout from '@/app/assets/logout.svg';
import post from '@/app/assets/post.png'
import explore from '@/app/assets/explore.png'

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

  {
    name: 'explore',
    imgUrl:explore,
    link:'/Explore'
  }
  // {
  //   name: 'logout',
  //   imgUrl: logout,
  //   link: '/',
  //   disabled: true,
  // },
];
