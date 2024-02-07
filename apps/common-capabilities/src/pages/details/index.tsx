import {
  GoAThreeColumnLayout,
  GoAGrid,
  GoASpacer,
  GoABadge,
  GoAIcon,
  GoASideMenu,
} from '@abgov/react-components';
import React, { useEffect, useState } from 'react';
import './styles.css';
import ExternalLink from '../../components/ExternalLink';
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
    badgesToShow.map((badge) => {
      if (app[badge] !== '' && app[badge]?.length > 0) {
        if (Array.isArray(app[badge]) && !app[badge].includes('other')) {
          showBadges.push(badge);
        }
        if (typeof app[badge] === 'string' && app[badge] !== 'other') {
          showBadges.push(badge);
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
          <GoAIcon type={iconType} size='small' theme="outline" />
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
        <div>
          <ExternalLink text={`${doc.name} documentation`} link={doc.url} />
          <GoASpacer vSpacing="s" />
        </div>
      ));
    }

    if (name === 'Contact') {
      return (
        <table className="contact-table">
          <tbody>
            {app.Contact.methods.map((method: any) => renderContact(method))}
          </tbody>
        </table>
      );
    }

    return <p className="service-content">{app[name]}</p>;
  };
  return (
    <>
      <GoAThreeColumnLayout
        nav={
          <div className="details-side-nav">
            <GoASideMenu>
              {items.content.length > 0
                ? items.content.map((content: any) => {
                    return content.showInSidebar ? (
                      <a key={`${content.id}`} href={`#${content.id}`}>
                        {content.title}
                      </a>
                    ) : (
                      ''
                    );
                  })
                : ''}
            </GoASideMenu>
          </div>
        }
      >
        <div className="service-heading">
          <h2>{app.ServiceName}</h2>
          {app.Status !== '' ? (
            <GoABadge type="success" content={app.Status} />
          ) : (
            ''
          )}
        </div>
        <GoASpacer vSpacing="xs" />
        <p className="service-subtitle"> {app.Provider}</p>

        <div className="service-badges">
          {items.badges.length > 0
            ? items.badges.map((badge: string) => {
                return typeof app[badge] === 'string' ? (
                  <div key={`${badge}`}>
                    <GoABadge type="information" content={app[badge]} />
                  </div>
                ) : (
                  app[badge].map((item: string) => (
                    <div key={`${item}`}>
                      <GoABadge type="information" content={item} />
                    </div>
                  ))
                );
              })
            : ''}
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
