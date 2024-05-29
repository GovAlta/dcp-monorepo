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
import { categories } from './config';

export default function Landing(): JSX.Element {
  return (
    <div>
      <GoAHeroBanner
        heading="Technology for better, faster, smarter services"
        minHeight="20%"
        textColor="#333333"
        backgroundColor="#F1F1F1"
        maxContentWidth="1500px"
      >
        <div className="cc-hero-subheading">
          Discover and leverage the technology used by DDD product teams to
          deliver digital services that are efficient, secure, and compliant.
        </div>
      </GoAHeroBanner>
      <GoAPageBlock width="1200px">
        <GoASpacer vSpacing="3xl" />
        <h2>
          Common capabilities is designed for developers and solution architects
          to explore existing services and technology used within GoA, circulate
          best practices, and deliver meaningful experiences to all Albertans.
        </h2>
        <GoASpacer vSpacing="s" />
        <ul className="goa-unordered-list cc-list-spacing">
          <li>
            Accelerate development by reusing existing capabilities and build
            new services faster.
          </li>
          <li>
            Enhance security and compliance measures to create ethical services
            that protect user privacy.
          </li>
          <li>
            Contribute to a culture of collaboration across teams to ensure
            service delivery efficiency and innovation.
          </li>
        </ul>
        <ExternalLink
          link={'/gettingstarted/index.html#getting-started'}
          text={'Getting started'}
        />
        <GoASpacer vSpacing="l" />

        <h2>Browse services by category</h2>
        <GoASpacer vSpacing="s" />
        <GoAGrid minChildWidth="30ch" gap="2xl">
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
