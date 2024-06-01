import CreateCar from "./pages/CreateCar";
import Admin from "./pages/Admin";
import AdPage from "./pages/AdPage";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import CreateAd from "./pages/CreateAd";
import UserAds from "./pages/UserAds";
import EditAd from "./pages/EditAd";
import { AD_ROUTE, CREATE_AD_ROUTE, CREATE_CAR_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, USER_ADS } from "./utils/consts";

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
    },
    {
        path: USER_ADS + '/:id',
        Component: UserAds
    },
    {
        path: CREATE_AD_ROUTE + '/:id', // Змінив шлях на CREATE_AD_ROUTE
        Component: EditAd
    }
];

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
];