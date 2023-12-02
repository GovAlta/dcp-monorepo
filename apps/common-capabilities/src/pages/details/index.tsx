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
      showInSidebar: true,
      showContent: true,
    },
    {
      name: 'Email',
      id: 'service-contact',
      title: 'Contact',
      showInSidebar: true,
      showContent: false, // since it has its own dedicated section
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
        showBadges.push(badge);
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
        {items.content.length > 0
          ? items.content.map(({ id, name, title, showContent }: any) => {
              return showContent ? (
                <div key={`${id}`}>
                  <h3 id={`${id}`}>{title}</h3>
                  {name === 'Documentation' ? (
                    <ExternalLink
                      text={`${app.ServiceName} documentation`}
                      link={app.Documentation}
                    />
                  ) : (
                    <p className="service-content">{app[name]}</p>
                  )}
                  <GoASpacer vSpacing="l" />
                </div>
              ) : (
                ''
              );
            })
          : ''}

        <GoASpacer vSpacing="xs" />

        {app.AccessMethod !== '' || app.Email !== '' ? (
          <>
            <h3 id="service-contact">Contact us</h3>
            <p>
              <b>
                {app.AccessMethod !== 'Slack' && app.AccessMethod !== ''
                  ? `${app.AccessMethod}:`
                  : ''}
              </b>{' '}
              {app.AccessMethod !== 'Slack' ? app.AccessMethodDetails : ''}
              <br />
              <br />
              {app.AccessMethod !== 'Slack' &&
              app.AccessMethodDetails! === '' ? (
                <a href={`${app.AccessMethodLink}`} target="_blank">
                  {app.AccessMethodLink}
                </a>
              ) : (
                ''
              )}
            </p>
            {app.Email !== '' ? (
              <div className="line-elements">
                <GoAIcon type="mail" theme="outline" />
                <ExternalLink
                  link={`mailto:${app.Email}`}
                  text={app.Provider}
                />
              </div>
            ) : (
              ''
            )}
            {app.Phone !== '' ? (
              <>
                <GoASpacer vSpacing="s" />
                <div className="line-elements">
                  <GoAIcon type="call" theme="outline" />
                  <ExternalLink link={`tel:${app.Phone}`} text={app.Phone} />
                </div>
              </>
            ) : (
              ''
            )}
          </>
        ) : (
          ''
        )}

        {app.AccessMethod === 'Slack' ? (
          <>
            <h3>Slack support channel</h3>
            <div className="line-elements">
              <GoAIcon type="logo-slack" theme="outline" />
              <ExternalLink
                link={app.AccessMethodLink}
                text={app.AccessMethodDetails}
              />
            </div>
          </>
        ) : (
          ''
        )}
        <GoASpacer vSpacing="3xl" />

        <div className="line-elements back-top">
          <a href="#top-page">Back to top</a>
          <GoAIcon type="arrow-up-circle" theme="outline" />
        </div>
      </GoAThreeColumnLayout>
    </>
  );
}
