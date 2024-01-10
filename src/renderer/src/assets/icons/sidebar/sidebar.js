import { auth } from '../../../../../../firebase'
import Home from '../../icons/Home.jpg'
import UserIcon from '../../icons/UserIcon.png'
import Social from '../../icons/Social.png'
import Settings from '../../icons/Settings.png'
import Edu from '../../icons/EducationIcon.png'
import News from '../../icons/News.png'
import { useEffect } from 'react'

export const SidebarIcons = [{
    id: 1,
    icon: Home,
    link: '/',
},{
    id: 2,
    icon: Social,
    link: '/social'
},{
    id: 3,
    icon: Edu,
    link: '/onboarding'
}, {
    id: 4,
    icon: News,
    link: '/events'
}
]