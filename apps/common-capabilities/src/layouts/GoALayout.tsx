import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../providers/AuthStateProvider';

const GoALayout = ({ authEnforced }: { authEnforced: boolean }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setContentHeight(window.innerHeight - (headerRef?.current?.clientHeight || 0));
  });

  return authEnforced && isAuthenticated ? (
    <>
      <div ref={headerRef}>
        <Header />
      </div>
      <div style={{ minHeight: `${contentHeight}px` }}>
        <Outlet />
      </div>
      <Footer />
    </>
  ) : null;
};

export default GoALayout;
