import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
