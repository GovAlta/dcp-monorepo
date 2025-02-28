import React, { useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthStateProvider } from './providers/AuthStateProvider';
import GoALayout from './layouts/GoALayout';
import LandingPage from './pages/landing';
import About from './pages/about';
import AddService from './pages/addservice';
import Details from './pages/details';
import Ecosystem from './pages/ecosystem';
import GettingStarted from './pages/gettingstarted';
import Roadmap from './pages/roadmap';
import Services from './pages/services';
import Support from './pages/support';
import UpdateService from './pages/updateservice';
import { getAdspConfigs } from './utils/configs';

export const secureRoutes = [
    {
        path: '/',
        element: <LandingPage />,
        title: 'Common Capabilities',
    },
    {
        path: '/about',
        element: <About />,
        title: 'About',
    },
    {
        path: '/addservice',
        element: <AddService />,
        title: 'Add Service',
    },
    {
        path: '/details/:id',
        element: <Details />,
        title: 'Details',
        titleRegex: /^\/details\/([a-zA-Z0-9_-]+)$/,
    },
    {
        path: '/ecosystem',
        element: <Ecosystem />,
        title: 'Ecosystem',
    },
    {
        path: '/gettingstarted',
        element: <GettingStarted />,
        title: 'Getting started',
    },
    {
        path: '/roadmap',
        element: <Roadmap />,
        title: 'Roadmap',
    },
    {
        path: '/services',
        element: <Services />,
        title: 'Services',
    },
    {
        path: '/support',
        element: <Support />,
        title: 'Support',
    },
    {
        path: '/updateservice/:id',
        element: <UpdateService />,
        title: 'Update Service',
        titleRegex: /^\/updateservice\/([a-zA-Z0-9_-]+)$/,
    },
];

export default function App() {
    const adpsConfig = useMemo(() => getAdspConfigs(), []);
    const titles = useMemo(
        () =>
            secureRoutes.map((route) => ({
                route: route.path,
                title: route.title,
                titleRegex: route.titleRegex,
            })),
        [],
    );

    return (
        <Router>
            <AuthStateProvider
                keyCloakConfig={{
                    auth_url: adpsConfig.auth_url,
                    realm: adpsConfig.realm,
                    idp_client_id: adpsConfig.idp_client_id,
                    idp_alias: adpsConfig.idp_alias,
                }}
            >
                <Routes>
                    <Route element={<GoALayout authEnforced titles={titles} />}>
                        {secureRoutes.map((route) => (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={route.element}
                            />
                        ))}
                    </Route>
                </Routes>
            </AuthStateProvider>
        </Router>
    );
}
