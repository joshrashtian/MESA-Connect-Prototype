import { auth } from '../../../../../../firebase'
import Home from '../../icons/Home.jpg'
import UserIcon from '../../icons/UserIcon.png'
import Social from '../../icons/Social.png'

export const SidebarIcons = [{
    id: 0,
    icon: UserIcon,
    link: '/signIn'
},{
    id: 1,
    icon: Home,
    link: '/',
},{
    id: 2,
    icon: Social,
    link: '/social'
}
]