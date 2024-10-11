import React from 'react';
import PageHeader from '../../components/header';
import PageFooter from '../../components/footer';

export default function PageLayout({ children, page }: any) {
  return (
    <div>
      <PageHeader page={page} />
      {children}
      <PageFooter />   
    </div>
  );
}
