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
  const [services, setServices] = useState(apps);

  const passInput = (input: any) => input;
  const findInArray = (array: any, searchRegExp: any, fields: any) => {
    return array.filter((item: any) => {
      // returns true if at least one of fields value match to regexp
      return fields
        .map((field: any) => searchRegExp.test(item[field]))
        .some(passInput);
    });
  };
  const reg = new RegExp(`${searchFilter}`, 'i');

  useEffect(() => {
    setServices(
      findInArray(apps, reg, ['Description', 'ServiceName', 'Provider'])
    );
  }, [searchFilter]);

  return (
    <div
      style={{
        padding: '0px 68px',
      }}
    >
      <GoAOneColumnLayout>
        <h2 id="home-title">Overview</h2>
        <span className="last-updated">Last updated: 08/12/2023</span>
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
