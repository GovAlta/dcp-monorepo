import {
  GoAThreeColumnLayout,
  GoASpacer,
  GoABadge,
  GoAIcon,
  GoASideMenu,
  GoATable,
  GoAButton,
  GoACircularProgress
} from '@abgov/react-components';
import React, { useEffect, useState, useMemo } from 'react';
import './styles.css';
import ExternalLink from '../../components/ExternalLink';
import BackButton from '../../components/BackButton';
import BackToTop from '../../components/BackToTop';
import {
  securityGroups,
  securityData,
  specifications,
  bodyItems,
} from './config';
import useFetch from '../../hooks/useFetch';
import { getApiUrl } from '../../utils/configs';
import Roadmap from 'apps/common-capabilities/src/components/Roadmap';
import LastUpdated from '../../components/LastUpdated';
import type { Service } from '../../types/types';

type ServiceDetailsResponse = {
  serviceInfo: any;
}

interface SecurityItem {
  name: string;
  title: string;
  tableTh: any;  
  note: string;
  items: any;
}

export default function Details(): JSX.Element {
  const id = useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params.id;
  }, []);
  const detailsUrl = useMemo(() => getApiUrl(`/listings/services/${id}`), []); 
  const [data, error, isLoading] = useFetch<ServiceDetailsResponse>(detailsUrl);
  const [app, setApp] = useState<any>(undefined);
  const [items, setItems] = useState<any>({
    content: [],
    specs: [],
  });

  useEffect(() => {
    if (window.location.hash && app) {
      const elmnt = document.getElementById(window.location.hash.substring(1));
      elmnt?.scrollIntoView();
    }
  }, [app, items]);

  useEffect(() => {
    if (!isLoading && data) {
      setApp(data.serviceInfo);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (app) {
      let showContent: any = [];
      Object.entries(bodyItems).forEach(([name, obj]) => {
        const hasData = obj.validate ? obj.validate(app) : app[name];
        if (hasData) {
          const newValue = {
            ...obj,
            id: `body-${name.toLowerCase()}`,
            showContent: true,
            showInSidebar: true,
          };
          showContent.push({ name, ...newValue });
        }
      });

      let showSpecs: any = [];
      Object.entries(specifications).forEach(([name, obj]) => {
        if (app[name] && app[name] !== 'Other' && app[name][0]?.item !== 'Other') {
          const newValue = { ...obj, id: `spec-${name.toLowerCase()}` };
          showSpecs.push({ name, ...newValue });
        }
      });

      setItems({
        content: showContent,
        specs: showSpecs,
      });
    }
  }, [app]);

  const SecurityBlock: React.FC<{ group: SecurityItem }> = ({ group }) => {

    function displayName(obj: any, key: string): string | undefined {
      return obj[key]?.title;
    }

    return (
      <>
        {group.tableTh.length > 0 ? <b>{group.title}</b> : null}
        {group.note != '' ? (
          <>
            <GoASpacer vSpacing="m" />
            {group.note}
          </>
        ) : null}

        <GoATable key={group.name} width="70%">
          <thead>
            {group.tableTh.length > 0 ? (
              <tr key={'tr2' + group.name}>
                <th>{group.tableTh[0]} </th>
                <th>{group.tableTh[1]} </th>
              </tr>
            ) : (
              <tr key={'tr1' + group.name}>
                <th>{group.title}</th>
                <th></th>
              </tr>
            )}
          </thead>
          <tbody>
             {group.items
             .filter((item: any) => app[item] !== '')
             .map((item: any, index: any) => (
                <tr key={`tr-${group.name}${index}`}>
                  <td key={`td1-${index}`}> {' '} {displayName(securityData, item)}{' '}  </td>
                  <td key={`td2-${index}`} className={'service-content'}>
                      {' '}
                    {app[item]}{' '}
                  </td>
                </tr>
            ))}
          </tbody>
        </GoATable>
        <GoASpacer vSpacing="xl" />
      </>
    );
  };

  const renderSpecs = (specification: any) => {
    if (specification.type == 'text') return <>{app[specification.name]}</>;
    else if (specification.type == 'status')
      return (
        <GoABadge
          key={specification.id}
          type={app[specification.name] == 'Live' ? 'success' : 'midtone'}
          content={app[specification.name]}
        />
      );
    else if (specification.type == 'textArray')

      // To be used when using string arrays:
      // return <>{app[specification.name].join(', ')}</>;  
   
      // using object array:
      return <>{app[specification.name].map((obj: { item: any; }) => obj.item).join(', ')}</>;

    else return <>{specification.type}?</>;
  };

  const renderContact = (method: any) => {
    const contactMethods: any = {
      Slack:      {iconType: 'logo-slack',  linkPrefix: '',},
      Email:      {iconType: 'mail',  linkPrefix: 'mailto:',},
      Phone:      {iconType: 'call',  linkPrefix: 'tel:',},
      BERNIE:     {iconType: 'cart',  linkPrefix: '',},
      Web:        {iconType: 'globe', linkPrefix: '',},
      Sharepoint: {iconType: 'share-social',  linkPrefix: '',},
      GitHub:     {iconType: 'logo-github',   linkPrefix: '',},
    };
    const methodConfig = contactMethods[method.type] || {};
    const iconType = methodConfig.iconType || '';
    const linkPrefix = methodConfig.linkPrefix || '';

    return (
      <tr className="items-color" key={method.type}>
        <td className="contact-type">{`${method.type}:  `}</td>
        <td>
          <GoAIcon type={iconType} size="small" theme="outline" />
        </td>
        <td className="td-links">
          <ExternalLink
            link={`${linkPrefix}${method.url}`}
            text={method.value}
          />
        </td>
      </tr>
    );
  };

  const renderRoadmap = (roadmap: any) => {
    if (!roadmap || roadmap.length === 0)
      return null;

    return (
      <Roadmap roadmap={roadmap} />
    );
  };

  const renderContent = (name: string, app: any) => {
    if (name === 'documentation' && app.documentation?.length > 0) {
      return app.documentation.map((doc: any) => {
        if (Object.keys(doc).length > 0) {
          return (
            <div key={doc.name}>
              <ExternalLink text={`${doc.name}`} link={doc.url} />
              <GoASpacer vSpacing="s" />
            </div>
          );
        }
      });
    } else if (name === 'specs') {
      return (
        <>
          {app.recommended ? (
            <GoABadge key="validated" type="information" content="Recommended"  />
          ) : null}
          <table>
            <tbody className="specs-table">
              {items.specs.map((obj: any) => (
                <tr key={obj.id}>
                  <td className='spec-type' >{obj.title}:</td>
                  <td>{renderSpecs(obj)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    } 
    else if (name === 'roadmap') {
      return renderRoadmap(app.roadmap);
    }
    else if (name === 'contact') {
      return (
        <>
        {app.contact.details != '' ? (
            <>
            {app.contact.details}
            <GoASpacer vSpacing="s" />
            </>
          ) : null}

        <table className="contact-table">
          <tbody>
            {app.contact?.methods?.map((method: any) => renderContact(method))}
          </tbody>
        </table>
        </>
      );
    } else if (name === 'security') {
      return (
        <>
          {securityGroups.map((group: SecurityItem) => (
            <SecurityBlock key={`block${group.name}`} group={group} />
          ))}
        </>
      );
    } else return <p className="service-content">{app[name]}</p>;
  };

  return (isLoading || !app) ? (
      <GoACircularProgress variant="fullscreen" size="large" message="Loading service details..." visible={true} />
    ) : (
      <>
        <GoAThreeColumnLayout
          maxContentWidth="1500px"
          nav={
            <div className="details-side-nav" key="details-side-nav">
              <GoASideMenu key="SideMenu">
                {items.content.length > 0
                  ? items.content.map((content: any) => {
                      return (
                        <a key={`${content.id}-menu`} href={`#${content.id}`}>
                          {content.title}
                        </a>
                      );
                    })
                  : 'No content'}
              </GoASideMenu>
            </div>
          }
        >
          <BackButton text="Back to listing" onClick={() => { history.back(); }} />

          <GoASpacer vSpacing="l" />
          <div className="service-heading">
          <h2>{app.serviceName}</h2>
          <GoAButton
            type="secondary"
            onClick={() => (window.location.href = `/updateservice/index.html?id=${app.appId}`)}>
            Update
          </GoAButton>
        </div>
          <GoASpacer vSpacing="l" />
          <p className="service-content"> {app.description}</p>

          <GoASpacer vSpacing="xl" />
          {items.content.length > 0 &&
            items.content.map(({ id, name, title }: any) => {
              return (
                <div key={`${id}`}>
                  <h3 id={`${id}`} className='service-title'>{title}</h3>
                  {renderContent(name, app)}
                  <GoASpacer vSpacing="l" />
                </div>
              );
            })}

          <GoASpacer vSpacing="xl" />
          <div>
            Please feel free to{' '}
            <ExternalLink
              link={`mailto:TI.Softwaredelivery@gov.ab.ca?subject=Common capabilities feedback: ${app.serviceName}`}
              text={'share feedback'}
            />{' '}
            on this service.
          </div>
          <GoASpacer vSpacing="3xl" />
          <span className="content-bottom">
            <LastUpdated date={app.lastUpdatedDate} name={app.editorName} email={app.editorEmail} />
            <BackToTop />
          </span>
        </GoAThreeColumnLayout>
      </>
  );
}
