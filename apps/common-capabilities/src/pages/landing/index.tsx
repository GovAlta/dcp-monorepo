import React, { useEffect } from 'react';
import {
  GoACallout,
  GoAGrid,
  GoAHeroBanner,
  GoAPageBlock,
  GoASpacer,
} from '@abgov/react-components-4.20.2';
import './styles.css';
import ExternalLink from '../../components/ExternalLink';
import Category from './category';

export default function Landing(): JSX.Element {
  const categories = [
    {
      title: 'User management',
      description:
        'User authentication, authorization, identity verification and management, and role-based access control',
      link: '/services/index.html?category=User management',
    },
    {
      title: 'Data',
      description:
        'Data libraries, records, schemas, configuration storage, audit and log management',
      link: '/services/index.html?category=Data',
    },
    {
      title: 'Forms and documents',
      description:
        'File upload and management, document processing, forms creation, and digital signatures',
      link: '/services/index.html?category=Forms and documents',
    },
    {
      title: 'Automation',
      description: 'Workflow, process automation, and task management',
      link: '/services/index.html?category=Automation',
    },
    {
      title: 'Finance',
      description:
        'Payment processing, gateway integration, financial data management, billing, and invoicing',
      link: '/services/index.html?category=Finance',
    },
    {
      title: 'Communication',
      description: 'Messaging, emails, SMS, notifications, and alerts',
      link: '/services/index.html?category=Communication',
    },
    {
      title: 'Performance',
      description:
        'Service health monitoring, business performance tracking, and reporting dashboards',
      link: '/services/index.html?category=Performance',
    },
  ];
  return (
    <div>
      <GoAHeroBanner
        heading="Deliver better, faster, smarter services"
        minHeight="20%"
        textColor="#333333"
        backgroundColor="#F1F1F1"
        maxContentWidth='1500px'
      >
        <div className="cc-hero-subheading">
          A central hub for discovering and leveraging the foundational
          frameworks that drive success within GoA
        </div>
      </GoAHeroBanner>
      <GoAPageBlock width="1200px">
        <GoASpacer vSpacing="3xl" />
        <h2>
          Common capabilities is designed specifically for developers and
          solution architects to boost productivity, efficiency, alignment, and
          collaboration within teams and ministries.
        </h2>
        <GoASpacer vSpacing="s" />
        <ul className="goa-unordered-list cc-list-spacing">
          <li>
            Expedite development and reduce time to market for new solutions
          </li>
          <li>Enhance security and compliance measures</li>
          <li>Ensure compatibility and synergy across projects</li>
          <li>Foster collaboration and innovation across teams</li>
        </ul>
        {/* <ExternalLink
          link={'/gettingstarted/index.html'}
          text={'Getting started'}
        /> */}
        <GoASpacer vSpacing="l" />

        <h2>Browse services by category</h2>
        <GoASpacer vSpacing="s" />
        <GoAGrid minChildWidth="30ch" gap="3xl">
          {categories.map((category) => (
            <Category
              key={category.title}
              title={category.title}
              description={category.description}
              link={category.link}
            />
          ))}
        </GoAGrid>
        <GoASpacer vSpacing="2xl" />
        <GoASpacer vSpacing="3xl" />
        <div className="cc-landing-callout">
          <GoACallout
            type="information"
            heading="Start building with our design system"
          >
            <p>
              Use the design system to build your product quickly and align with
              government standards. The design system includes resources and
              guidelines for:
            </p>
            <ul className="goa-unordered-list cc-list-design-system">
              <li>Patterns and templates</li>
              <li>Components</li>
              <li>Styles</li>
              <li>Content</li>
            </ul>
            <ExternalLink
              link={'https://design.alberta.ca/'}
              text={'Explore the design system'}
            />
          </GoACallout>
        </div>
        <GoASpacer vSpacing="4xl" />
      </GoAPageBlock>
    </div>
  );
}
