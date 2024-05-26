import CreateCar from "./pages/CreateCar"
import Admin from "./pages/Admin"
import AdPage from "./pages/AdPage"
import Auth from "./pages/Auth"
import Main from "./pages/Main"
import { AD_ROUTE, CREATE_AD_ROUTE, CREATE_CAR_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from "./utils/consts"
import CreateAd from "./pages/CreateAd"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: CREATE_CAR_ROUTE,
        Component: CreateCar
    },
    {
        path: CREATE_AD_ROUTE,
        Component: CreateAd
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: AD_ROUTE + '/:id',
        Component: AdPage
    }
]