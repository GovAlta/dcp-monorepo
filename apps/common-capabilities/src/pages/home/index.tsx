import React, { useEffect, useState } from 'react';
import apps from '../../content/datastore.json';
import {
  GoAOneColumnLayout,
  GoAGrid,
  GoASpacer,
  GoAInput,
} from '@abgov/react-components';
import Card from '../../components/Card';
import './styles.css';

export default function HomePage(): JSX.Element {
  const [searchFilter, setSearchFilter] = useState('');
  const [services, setServices] = useState([]);

  const passInput = (input: any) => input;
  const findInArray = (array: any, searchRegExp: any, fields: any) => {
    return array.filter((item: any) => {
      // returns true if at least one of fields value match to regexp
      return fields
        .map((field: any) => searchRegExp.test(item[field]))
        .some(passInput);
    });
  };

  useEffect(() => {
    const searchRegEx = new RegExp(
      `${searchFilter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`,
      'i'
    );
    setSearchFilter(localStorage.getItem('searchFilter') || '');
    setServices(
      findInArray(apps, searchRegEx, ['Description', 'ServiceName', 'Provider'])
    );
    let timeoutId = null;

    if (localStorage.getItem('searchFilter')) {
      let searchTimestamp = localStorage.getItem('searchTimestamp');
      let now = new Date().getTime();
      let remainingTime = searchTimestamp - now;
      console.log(remainingTime);
      if (remainingTime <= 0) {
        localStorage.removeItem('searchFilter');
        localStorage.removeItem('searchTimestamp');
      } else {
        timeoutId = setTimeout(() => {
          localStorage.removeItem('searchFilter');
          localStorage.removeItem('searchTimestamp');
        }, remainingTime);
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [searchFilter]);

  return (
    <div
      style={{
        padding: '0px 68px',
      }}
    >
      <GoAOneColumnLayout>
        <h2 id="home-title">Overview</h2>
        <span className="last-updated">Last updated: December 08, 2023</span>
        <GoASpacer vSpacing="s" />

        <p className="cc-intro">
          Common capabilities encompass a broad spectrum of software components
          and systems ( including applications, APIs, frameworks, libraries,
          tools, services and various other types). These are like building
          blocks that can be used on their own or together to improve and
          simplify processes. These components are known for being reusable,
          able to make operations more efficient, in line with the
          organization's goals, and compatible with existing systems. We provide
          here a listing of common capabilities to explore.
        </p>

        <GoASpacer vSpacing="2xl" />

        <GoAInput
          placeholder="Search"
          width="50%"
          name="firstname"
          value={searchFilter}
          onChange={(name: string, value: string) => {
            setSearchFilter(value);
            localStorage.setItem(
              'searchTimestamp',
              new Date().getTime() + 5 * 60 * 1000
            );
            localStorage.setItem('searchFilter', value);
          }}
        />

        <h3>Services listing</h3>

        <GoAGrid minChildWidth="35ch">
          {/* <div className="tile-wrapper"> */}
          {services.length >= 1
            ? services.map((app) => (
                <Card
                  key={app.ServiceName}
                  title={app.ServiceName}
                  provider={app.Provider}
                  description={app.Description}
                  app={app}
                />
              ))
            : 'No results found'}
          {/* </div> */}
        </GoAGrid>
      </GoAOneColumnLayout>
    </div>
  );
}
