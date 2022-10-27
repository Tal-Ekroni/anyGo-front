import { HomePage } from './pages/home-page.jsx'
import { AboutUs } from './pages/about-us.jsx'
import { Explore } from './pages/explore.jsx'
// import { ChatApp } from './pages/chat-app.jsx'
import { AdminApp } from './pages/admin-app.jsx'
import { StayDetails } from './pages/stay-details.jsx'
import { LoginPage } from './pages/login.jsx'
import { TripsPage } from './pages/trips-page.jsx'
import { HostPage } from './pages/host-page.jsx'
import { BecomeAHost } from './pages/become-a-host.jsx'
import { NotificationsPage } from './pages/notifications.jsx'
import { LoginSignup } from './cmps/login-signup.jsx'
import { WishList } from './pages/wishlist.jsx'
import { UserProfile } from './pages/user-profile.jsx'
// import { Login } from './pages/'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: HomePage,
    },

    {
        path: '/explore/',
        component: Explore,
    },
    {
        path: '/stay/:stayId',
        component: StayDetails,
    },
    {
        path: '/trips',
        component: TripsPage,
    },
    {
        path: '/host',
        component: HostPage,
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/login-dev',
        component: LoginSignup
    },
    {
        path: '/become-a-host',
        component: BecomeAHost
    },

    {
        path: '/about',
        component: AboutUs,

    },
    {
        path: '/profile',
        component: UserProfile,

    },
    {
        path: '/wishlist',
        component: WishList,

    },
    {
        path: '/notifications',
        component: NotificationsPage,

    },
    {
        path: '/admin',
        component: AdminApp,
    }
]

export default routes;