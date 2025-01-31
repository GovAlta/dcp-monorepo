import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthStateProvider';

type Props = {
  authEnforced: boolean;
  titles?: { route: string; title: string, titleRegex?: RegExp }[];
};

const GoALayout = ({ authEnforced, titles }: Props) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    const title = titles?.find((t) => {
      console.log('regex', t.titleRegex, t.titleRegex?.test(location.pathname));
      return t.route === location.pathname || t.titleRegex?.test(location.pathname);
  })?.title;
    if (title) {
      document.title = title;
    }
  }, [location, titles]);


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
