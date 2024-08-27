import {
  GoAThreeColumnLayout,
  GoASpacer,
  GoABadge,
  GoAIcon,
  GoASideMenu,
  GoATable,
  GoAButton,
} from '@abgov/react-components-4.20.2';
import React, { useEffect, useState } from 'react';
import './styles.css';
import ExternalLink from '../../components/ExternalLink';
import BackToTop from '../../components/BackToTop';
import {
  securityGroups,
  securityData,
  specifications,
  bodyItems,
} from './config';
interface DetailsProps {
  app: any;
}
export default function Details({ app }: DetailsProps): JSX.Element {
  const [items, setItems] = useState<any>({
    content: [],
    specs: [],
  });

  useEffect(() => {
    if (window.location.hash) {
      const elmnt = document.getElementById(window.location.hash.substring(1));
      elmnt?.scrollIntoView(true);
    }
  }, []);

  useEffect(() => {
    let showContent: any = [];
    Object.entries(bodyItems).forEach(([name, obj]) => {
      if (obj.dataIn == '' ? app[name] != '' : app[name][obj.dataIn] != '') {
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
      if (app[name] != '' && app[name] != 'Other') {
        const newValue = { ...obj, id: `spec-${name.toLowerCase()}` };
        showSpecs.push({ name, ...newValue });
      }
    });

    setItems({
      content: showContent,
      specs: showSpecs,
    });
  }, []);

  interface SecurityItem {
    name: string;
    title: string;
    tableTh: any;
    dataSecurityType: string;
    note: string;
  }

  const SecurityBlock: React.FC<{ group: SecurityItem }> = ({ group }) => {
    
    //---[ app.Security is from the JSON data ]---
    // const itemData = app.Security.find( (item: any) => item.Type === group.dataSecurityType);
    // if (itemData == undefined) return null;

    function displayName(obj: any, key: string): string | undefined {
      return obj[key]?.title;
    }

    return (
      <>
        {group.tableTh.length > 0 ? <b>{group.title}</b> : null}

        {group.note != '' ? (
          <>
            <GoASpacer vSpacing="m" />
            <>{group.note}</>
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
             .filter(item => app[item] !== '')
             .map((item: any, index: any) => (
              <>
                <tr key={`tr-${group.name}${index}`}>
                  <td key={`td1-${index}`}> {' '} {displayName(securityData, item)}{' '}  </td>
                  <td key={`td2-${index}`} className={'service-content'}>
                     {' '}
                    {app[item]}{' '}
                  </td>
                </tr>
              </>
            ))} 
            {/* {itemData.Items.map((row: any, index: any) => (
              <>
                <tr key={`tr-${group.name}${index}`}>
                  <td key={`td1-${index}`}>
                    {' '}
                    {displayName(securityData, row['Field'])}{' '}
                  </td>
                  <td key={`td2-${index}`} className={'service-content'}>

                    {' '}
                    {row['Value']}{' '}
                  </td>
                </tr>
              </>
            ))} */}
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
      return <>{app[specification.name].join(', ')}</>;
    else return <>{specification.type}?</>;
  };

  const renderContact = (method: any) => {
    const contactMethods: any = {
      Slack: {
        iconType: 'logo-slack',
        linkPrefix: '',
      },
      Email: {
        iconType: 'mail',
        linkPrefix: 'mailto:',
      },
      Phone: {
        iconType: 'call',
        linkPrefix: 'tel:',
      },
      BERNIE: {
        iconType: 'cart',
        linkPrefix: '',
      },
      Web: {
        iconType: 'globe',
        linkPrefix: '',
      },
      Sharepoint: {
        iconType: 'share-social',
        linkPrefix: '',
      },
      GitHub: {
        iconType: 'logo-github',
        linkPrefix: '',
      },
    };
    const methodConfig = contactMethods[method.type] || {};
    const iconType = methodConfig.iconType || '';
    const linkPrefix = methodConfig.linkPrefix || '';

    return (
      <tr className="items-color">
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

  const renderContent = (name: string, app: any) => {
    if (name === 'Documentation' && app.Documentation.length > 0) {
      return app.Documentation.map((doc: any) => (
        <div key={doc.name}>
          <ExternalLink text={`${doc.name}`} link={doc.url} />
          <GoASpacer vSpacing="s" />
        </div>
      ));
    } else if (name === 'Specs') {
      return (
        <>
          {app.InternalWeightage >= 50 ? (
            <GoABadge key="validated" type="information" content="Recommended"  />
          ) : null}
          <table>
            {/* <thead> <tr><th></th><th></th></tr> </thead> */}
            <tbody className="specs-table">
              {items.specs.map((obj: any) => (
                <tr>
                  <td className='spec-type' >{obj.title}:</td>
                  <td>{renderSpecs(obj)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    } else if (name === 'Contact') {
      return (
        <>
        {app.Contact.details != '' ? (
            <>
            {app.Contact.details}
            <GoASpacer vSpacing="s" />
            </>
          ) : null}

        <table className="contact-table">
          <tbody>
            {app.Contact.methods.map((method: any) => renderContact(method))}
          </tbody>
        </table>
        </>
      );
    } else if (name === 'Security') {
      return (
        <>
          {securityGroups.map((group: SecurityItem) => (
            <SecurityBlock key={`block${group.name}`} group={group} />            
          ))}
        </>
      );
    } else return <p className="service-content">{app[name]}</p>;
  };

  return (
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
        <GoAButton
          type="tertiary"
          size="compact"
          leadingIcon="arrow-back"
          onClick={() => (window.location.href = '/services/index.html')}
        >
          Back to listing
        </GoAButton>

        <div className="back-top">
          <GoAButton
            type="tertiary"
            size="compact"
            variant="normal"
            trailingIcon="create"            
            onClick={() => alert('In development - coming soon')}
            disabled = {'true'}
          >
            Edit service
          </GoAButton>
        </div>

        <GoASpacer vSpacing="l" />
        <div className="service-heading">
          <h2>{app.ServiceName}</h2>
        </div>
        <GoASpacer vSpacing="l" />
        <p className="service-content"> {app.Description}</p>

        <GoASpacer vSpacing="xl" />
        {items.content.length > 0 &&
          items.content.map(({ id, name, title }: any) => {
            return (
              <div key={`${id}`}>
                <h3 id={`${id}`} className="service-title">
                  {title}
                </h3>
                {renderContent(name, app)}
                <GoASpacer vSpacing="l" />
              </div>
            );
          })}

        <GoASpacer vSpacing="xl" />
        <div>
          Please feel free to{' '}
          <ExternalLink
            link={`mailto:TI.Softwaredelivery@gov.ab.ca?subject=Common capabilities feedback: ${app.ServiceName}`}
            text={'share feedback'}
          />{' '}
          on this service.
        </div>

        <GoASpacer vSpacing="3xl" />
        <BackToTop />
      </GoAThreeColumnLayout>
    </>
  );
}
