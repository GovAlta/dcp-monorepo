import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../providers/AuthStateProvider';

const GoALayout = ({ authEnforced }: { authEnforced: boolean }) => {
  const { isAuthenticated } = useAuth();
  // TODO can render nothing here if not authorized to avoid flash of header and footer.
  return authEnforced && isAuthenticated ? (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ) : null; // maybe show some loading indicator or redirect to a login page
};

export default GoALayout;
