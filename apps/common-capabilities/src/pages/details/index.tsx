import {
  GoAThreeColumnLayout,
  GoASpacer,
  GoABadge,
  GoAIcon,
  GoASideMenu,
  GoATable,
} from '@abgov/react-components-4.20.2';
import React, { useEffect, useState } from 'react';
import './styles.css';
import ExternalLink from '../../components/ExternalLink';
//import {fieldList} from './config';
import { securityGroups, securityData } from './config';
interface DetailsProps {
  app: any;
}
export default function Details({ app }: DetailsProps): JSX.Element {
  const [items, setItems] = useState<any>({
    badges: [],
    content: [],
  });

  const badgesToShow = ['FunctionalGroup', 'Language', 'Keywords'];
  const contentToShow = [
    {
      name: 'Description',
      id: 'service-overview',
      title: 'Overview',
      showInSidebar: true,
      showContent: true,
    },
    {
      name: 'Prerequisites',
      id: 'service-prerequisites',
      title: 'Prerequisites',
      showInSidebar: true,
      showContent: true,
    },
    {
      name: 'Comments',
      id: 'service-comments',
      title: 'Additional information',
      showInSidebar: true,
      showContent: true,
    },
    {
      name: 'Documentation',
      id: 'service-documentation',
      title: 'Documentation',
      showInSidebar: app.Documentation.length > 0 ? true : false,
      showContent: app.Documentation.length > 0 ? true : false,
    },
    {
      name: 'Security',
      id: 'service-documentation',
      title: 'Security compliance',
      showInSidebar: true,
      showContent: true,
    },
    {
      name: 'Contact',
      id: 'service-contact',
      title: 'Contact us',
      showInSidebar: app.Contact.methods.length >= 1 ? true : false,
      showContent: app.Contact.methods.length >= 1 ? true : false,
    },
  ];

  useEffect(() => {
    if (window.location.hash) {
      const elmnt = document.getElementById(window.location.hash.substring(1));
      elmnt?.scrollIntoView(true);
    }
  }, []);

  useEffect(() => {
    let showBadges: any[] = [];
    let showContent: any[] = [];
    if (app.InternalWeightage >= 50) {
      showBadges.push(
        <GoABadge key="validated" type="midtone" content="Validated" />
      );
    }
    badgesToShow.forEach((badge) => {
      if (app[badge] !== '' && app[badge]?.length > 0) {
        if (
          Array.isArray(app[badge]) &&
          !app[badge].some((item: string) => item.toLowerCase() === 'other')
        ) {
          app[badge].forEach((badgeValue: string) => {
            showBadges.push(
              <GoABadge
                key={badgeValue}
                type="information"
                content={badgeValue}
              />
            );
          });
        }
        if (
          typeof app[badge] === 'string' &&
          app[badge].toLowerCase() !== 'other'
        ) {
          showBadges.push(
            <GoABadge key={badge} type="information" content={app[badge]} />
          );
        }
      }
    });
    contentToShow.map((content) => {
      if (app[content.name] !== '') {
        showContent.push(content);
      }
    });

    setItems({
      badges: showBadges,
      content: showContent,
    });
  }, []);

  interface SecurityItem {
    name: any;
    title: any;
    id: any;
    fieldList: any;
    tableTh: any;
    dataName: any;
    note: any;
  }

  const SecurityBlock: React.FC<{ group: SecurityItem }> = ({ group }) => {
    const itemData = app.Security.find(
      (item: any) => item.Type === group.dataName
    );
    if (itemData == undefined) return null;

    function displayName(obj: any, key: string): string | undefined {
      return obj[key]?.title;
    }

    return (
      <>        
        {group.note != '' ? (
          <>
            <p>{group.note}</p>{' '} {/* <GoAtext ????={group.note} ></GoAtext> */}
            <GoASpacer vSpacing="m" />
          </>
        ) : null}

        {group.tableTh.length > 0 ? (
          <b>{group.title}</b> //  {/* Title_Medium_256 */}
        ) : null}

        <GoATable>
          <thead>
            {group.tableTh.length > 0 ? (
              <tr>
                <th>{group.tableTh[0]} </th>
                <th>{group.tableTh[1]} </th>
              </tr>
            ) : (
              <tr>
                <th>{group.title}</th>
                <th></th>
              </tr>
            )}
          </thead>
          <tbody>
            {itemData.Items.map((row: any) => (
              <tr key={row.name + 'tr'}>
                <td key={row.name + 'td1'}>
                  {' '}
                  {displayName(securityData, row['Field'])}{' '}
                </td>
                <td key={row.name + 'td2'} className={'service-content'}>
                  {' '}
                  {row['Value']}{' '}
                </td>
              </tr>
            ))}
          </tbody>
        </GoATable>
        <GoASpacer vSpacing="xl" />
        {/* <GoASpacer vSpacing="l" /> */}
      </>
    );
  };

  // table
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
      Github: {
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
          <ExternalLink text={`${doc.name} documentation`} link={doc.url} />
          <GoASpacer vSpacing="s" />
        </div>
      ));
    } else if (name === 'Contact') {
      return (
        <table className="contact-table">
          <tbody>
            {app.Contact.methods.map((method: any) => renderContact(method))}
          </tbody>
        </table>
      );
    } else if (name === 'Security') {
      return (
        <>
          {/* Overview text is needed */}
          {securityGroups.map((group: SecurityItem) => (
            <SecurityBlock key={group.id} group={group} />
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
                    return content.showInSidebar ? (
                      <a key={`${content.id}-menu`} href={`#${content.id}`}>
                        {content.title}
                      </a>
                    ) : (
                      <></>
                    );
                  })
                : 'No content'}
            </GoASideMenu>
          </div>
        }
      >
        <div className="service-heading">
          <h2>{app.ServiceName}</h2>
          {app.Status !== '' && app.Status.toLowerCase() !== 'other' ? (
            <GoABadge type="success" content={app.Status} />
          ) : (
            ''
          )}
        </div>
        <GoASpacer vSpacing="xs" />
        <p className="service-subtitle"> {app.Provider}</p>

        <div className="service-badges">
          {items.badges.length > 0 ? items.badges : ''}
        </div>

        <GoASpacer vSpacing="xl" />
        {items.content.length > 0 &&
          items.content.map(({ id, name, title, showContent }: any) => {
            if (!showContent) return null;

            return (
              <div key={`${id}`}>
                <h3 id={`${id}`}>{title}</h3>
                {renderContent(name, app)}
                <GoASpacer vSpacing="l" />
              </div>
            );
          })}

        <GoASpacer vSpacing="3xl" />

        <div className="line-elements back-top">
          <a href="#top-page">Back to top</a>
          <GoAIcon type="arrow-up-circle" theme="outline" />
        </div>
      </GoAThreeColumnLayout>
    </>
  );
}
