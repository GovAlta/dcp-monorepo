import {
  GoabThreeColumnLayout,
  GoabSpacer,
  GoabBadge,
  GoabIcon,
  GoabSideMenu,
  GoabTable,
  GoabButton,
  GoabCircularProgress,
  GoabNotification,
} from '@abgov/react-components';
import type { GoabIconType } from '@abgov/ui-components-common';
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
  BodyItemKey,
  SpecificationItemKey,
  BodyConfigDefinition,
  SpecConfigDefinition,
  SecurityDataConfig,
  SecurityGroupConfig,
  SecurityItemKey,
} from './config';
import useFetch from '../../hooks/useFetch';
import { getApiUrl } from '../../utils/configs';
import Roadmap from '../../components/Roadmap';
import LastUpdated from '../../components/LastUpdated';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../providers/AuthStateProvider';
import {
  Roadmap as ServiceRoadmap,
  Service,
  ContactMethod,
  ServiceAttribute,
} from '../../types/types';

type ServiceDetailsResponse = {
  serviceInfo: Service;
};

type ContentItem = BodyConfigDefinition & {
  id: string;
  showContent: boolean;
  showInSidebar: boolean;
  name: BodyItemKey;
};

type SpecificationsItem = SpecConfigDefinition & {
  id: string;
  name: SpecificationItemKey;
};

type DisplayedDetails = {
  specs: SpecificationsItem[];
  content: ContentItem[];
};

export default function Details(): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const { authToken } = useAuth();
  const detailsUrl = useMemo(() => getApiUrl(`/listings/services/${id}`), [id]);
  const [data, error, isLoading] = useFetch<ServiceDetailsResponse>(
    detailsUrl,
    { headers: { Authorization: `Bearer ${authToken}` } },
  );
  const [app, setApp] = useState<Service | undefined>(undefined);
  const [items, setItems] = useState<DisplayedDetails>({
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
      const showContent: ContentItem[] = [];
      Object.keys(bodyItems).forEach((key) => {
        const name = key as BodyItemKey;
        const value = bodyItems[name];
        const hasData = value.validate
          ? value.validate(app)
          : app[name as ServiceAttribute];
        if (hasData) {
          const newValue = {
            ...value,
            id: `body-${key.toLowerCase()}`,
            showContent: true,
            showInSidebar: true,
          };
          showContent.push({ name, ...newValue });
        }
      });

      const showSpecs: SpecificationsItem[] = [];
      Object.keys(specifications).forEach((key) => {
        const name = key as SpecificationItemKey;
        const value = specifications[name];
        if (
          app[name] &&
          app[name] !== 'Other' &&
          (app[name][0] as { item: string })?.item !== 'Other'
        ) {
          const newValue = { ...value, id: `spec-${name.toLowerCase()}` };
          showSpecs.push({ name, ...newValue });
        }
      });

      setItems({
        content: showContent,
        specs: showSpecs,
      });
    }
  }, [app]);

  const SecurityBlock: React.FC<{ group: SecurityGroupConfig }> = ({
    group,
  }) => {
    function displayName(
      obj: SecurityDataConfig,
      key: SecurityItemKey,
    ): string | undefined {
      return obj[key]?.title;
    }

    return (
      <>
        {group.tableTh.length > 0 ? <b>{group.title}</b> : null}
        {group.note != '' ? (
          <>
            <GoabSpacer vSpacing="m" />
            {group.note}
          </>
        ) : null}

        <GoabTable key={group.name} width="70%">
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
              .filter((item) => app?.[item] !== '')
              .map((item, index) => (
                <tr key={`tr-${group.name}${index}`}>
                  <td key={`td1-${index}`}>
                    {' '}
                    {displayName(securityData, item)}{' '}
                  </td>
                  <td key={`td2-${index}`} className={'service-content'}>
                    {' '}
                    {app?.[item] as string}{' '}
                  </td>
                </tr>
              ))}
          </tbody>
        </GoabTable>
        <GoabSpacer vSpacing="xl" />
      </>
    );
  };

  const renderSpecs = (specification: SpecificationsItem) => {
    if (specification.type == 'text')
      return <>{app?.[specification.name] as string}</>;
    else if (specification.type == 'status')
      return (
        <GoabBadge
          key={specification.id}
          type={app?.[specification.name] == 'Live' ? 'success' : 'midtone'}
          content={app?.[specification.name] as string}
        />
      );
    else if (specification.type == 'textArray') {
      if (app) {
        return (
          <>
            {(app[specification.name] as { item: string }[])
              .map((obj: { item: string }) => obj.item)
              .join(', ')}
          </>
        );
      }
    } else return <>{specification.type}?</>;
  };

  const renderContact = (method: ContactMethod) => {
    const contactMethods = {
      Slack: { iconType: 'logo-slack', linkPrefix: '' },
      Email: { iconType: 'mail', linkPrefix: 'mailto:' },
      Phone: { iconType: 'call', linkPrefix: 'tel:' },
      BERNIE: { iconType: 'cart', linkPrefix: '' },
      Web: { iconType: 'globe', linkPrefix: '' },
      Sharepoint: { iconType: 'share-social', linkPrefix: '' },
      GitHub: { iconType: 'logo-github', linkPrefix: '' },
    };
    const methodConfig =
      contactMethods[method.type as keyof typeof contactMethods] || {};
    const iconType = methodConfig.iconType || '';
    const linkPrefix = methodConfig.linkPrefix || '';

    return (
      <tr className="items-color" key={method.type}>
        <td className="contact-type">{`${method.type}:  `}</td>
        <td>
          <GoabIcon
            type={iconType as GoabIconType}
            size="small"
            theme="outline"
          />
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

  const renderRoadmap = (roadmap: ServiceRoadmap[]) => {
    if (!roadmap || roadmap.length === 0) return null;

    return <Roadmap roadmap={roadmap} />;
  };

  const renderContent = (name: string, app: Service) => {
    if (name === 'documentation' && app.documentation?.length > 0) {
      return app.documentation.map((doc) => {
        if (Object.keys(doc).length > 0) {
          return (
            <div key={doc.name}>
              <ExternalLink text={`${doc.name}`} link={doc.url} />
              <GoabSpacer vSpacing="s" />
            </div>
          );
        }
      });
    } else if (name === 'specs') {
      return (
        <>
          {app.recommended ? (
            <GoabBadge
              key="validated"
              type="information"
              content="Recommended"
            />
          ) : null}
          <table>
            <tbody className="specs-table">
              {items.specs.map((spec) => (
                <tr key={spec.id}>
                  <td className="spec-type">{spec.title}:</td>
                  <td>{renderSpecs(spec)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    } else if (name === 'roadmap') {
      return renderRoadmap(app.roadmap);
    } else if (name === 'contact') {
      return (
        <>
          {app.contact.details != '' ? (
            <>
              {app.contact.details}
              <GoabSpacer vSpacing="s" />
            </>
          ) : null}

          <table className="contact-table">
            <tbody>
              {app.contact?.methods?.map((method) => renderContact(method))}
            </tbody>
          </table>
        </>
      );
    } else if (name === 'security') {
      return (
        <>
          {securityGroups.map((group: SecurityGroupConfig) => (
            <SecurityBlock key={`block${group.name}`} group={group} />
          ))}
        </>
      );
    } else
      return (
        <p className="service-content">
          {app[name as ServiceAttribute] as string}
        </p>
      );
  };

  let content;

  if (isLoading || (!app && !error)) {
    content = (
      <GoabCircularProgress
        variant="fullscreen"
        size="large"
        message="Loading service details..."
        visible={true}
      />
    );
  } else if (app) {
    content = (
      <GoabThreeColumnLayout
        maxContentWidth="1500px"
        nav={
          <div className="details-side-nav" key="details-side-nav">
            <GoabSideMenu key="SideMenu">
              {items.content.length > 0
                ? items.content.map((content) => {
                    return (
                      <a key={`${content.id}-menu`} href={`#${content.id}`}>
                        {content.title}
                      </a>
                    );
                  })
                : 'No content'}
            </GoabSideMenu>
          </div>
        }
      >
        <BackButton
          text="Back to listing"
          onClick={() => {
            history.back();
          }}
        />

        <GoabSpacer vSpacing="l" />
        <div className="service-heading">
          <h2>{app.serviceName}</h2>
          <GoabButton
            type="secondary"
            onClick={() => navigate(`/updateservice/${app.appId}`)}
          >
            Update
          </GoabButton>
        </div>
        <GoabSpacer vSpacing="l" />
        <p className="service-content"> {app.description}</p>

        <GoabSpacer vSpacing="xl" />
        {items.content.length > 0 &&
          items.content.map(
            ({
              id,
              name,
              title,
            }: {
              id: string;
              name: string;
              title: string;
            }) => {
              return (
                <div key={`${id}`}>
                  <h3 id={`${id}`} className="service-title">
                    {title}
                  </h3>
                  {renderContent(name, app)}
                  <GoabSpacer vSpacing="l" />
                </div>
              );
            },
          )}

        <GoabSpacer vSpacing="xl" />
        <div>
          Please feel free to{' '}
          <ExternalLink
            link={`mailto:TI.Softwaredelivery@gov.ab.ca?subject=Common capabilities feedback: ${app.serviceName}`}
            text={'share feedback'}
          />{' '}
          on this service.
        </div>
        <GoabSpacer vSpacing="3xl" />
        <span className="content-bottom">
          <LastUpdated
            date={app?.lastUpdatedDate}
            name={app?.editorName}
            email={app?.editorEmail}
          />
          <BackToTop />
        </span>
      </GoabThreeColumnLayout>
    );
  } else {
    content = (
      <GoabNotification type="emergency" ariaLive="assertive">
        Failed to load service details. Please try again later. <br /> Error:{' '}
        {error?.message}
      </GoabNotification>
    );
  }

  return content;
}
