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
        <h2>Common capabilities</h2>
        <p className="cc-intro">
          Common capabilities encompass a broad spectrum of software components
          and systems ( including applications, APIs, frameworks, libraries,
          tools, services and various other types) which are building blocks,
          adaptable for use independently or in conjunction and collectively
          contribute to enhancing and streamlining processes. These components
          are characterized by their reusability, potential to improve
          operational efficiency, alignment with organizational objectives, and
          compatibility with existing systems. By leveraging common
          capabilities, we can also foster innovation and productivity. In
          addition, utilizing common capabilities accelerates the development of
          user-centric services, eliminating the need to create bespoke
          solutions for recurring challenges.
        </p>
        <p className="cc-intro">
          We provide here a listing of common capabilities so that you can
          understand what is available. Do contact the respective teams to know
          more about their suitability and effectively integrate them into your
          projects.
        </p>

        <GoASpacer vSpacing="2xl" />

        <GoAInput
          placeholder="search"
          width="50%"
          name="firstname"
          value={searchFilter}
          onChange={(name: string, value: string) => {
            setSearchFilter(value);
          }}
        />

        <GoASpacer vSpacing="2xl" />
        <GoASpacer vSpacing="2xl" />
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
