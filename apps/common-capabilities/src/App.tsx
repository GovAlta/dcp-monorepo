import React from 'react';
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

export default function App() {
    return (
        <Router>
            <AuthStateProvider>
                <Routes>
                    <Route element={<GoALayout authEnforced />}>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/addservice" element={<AddService />} />
                        <Route path="/details/:id" element={<Details />} />
                        <Route path="/ecosystem" element={<Ecosystem />} />
                        <Route path="/gettingstarted" element={<GettingStarted />} />
                        <Route path="/roadmap" element={<Roadmap />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/support" element={<Support />} />
                        <Route path="/updateservice/:id" element={<UpdateService />} />
                    </Route>
                </Routes>
            </AuthStateProvider>
        </Router>
    );
}