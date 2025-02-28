import {
  GoASideMenu,
  GoASpacer,
  GoATable,
  GoAThreeColumnLayout,
} from '@abgov/react-components';
import React, { useEffect } from 'react';
import {
  DDDDirectory,
  enterpriseDirectory,
  portfolioPlatformDirectory,
  sideNavItems,
} from './config';
import './styles.css';
import BackToTop from '../../components/BackToTop';

type Directory = {
  name: string;
  provider: string;
  designation: string;
};

export default function EcoSystemPage(): JSX.Element {
  useEffect(() => {
    if (window.location.hash) {
      const elmnt = document.getElementById(window.location.hash.substring(1));
      elmnt?.scrollIntoView(true);
    }
  }, []);
  return (
    <GoAThreeColumnLayout
      maxContentWidth="1550px"
      rightColumnWidth="8%"
      leftColumnWidth="22%"
      nav={
        <GoASideMenu>
          {sideNavItems.map((item) => (
            <a href={`#${item.id}`} key={item.id}>
              {item.title}
            </a>
          ))}
        </GoASideMenu>
      }
    >
      <h1>Eco-system</h1>
      <p>
        The Government of Alberta capability eco-system is a multi-level
        landscape with common components being owned, produced, and managed by
        various platform teams that exist at the enterprise level, divisional
        level, and within specific ministries.
      </p>
      <GoASpacer vSpacing="l" />
      <h2 id="enterprise-platform-team">Enterprise platform team</h2>
      <p>
        The Enterprise Platform Team, at the broader Government of Alberta
        level, creates and maintains foundational technology solutions that
        serve the entire Government of Alberta. They focus on building common
        platform capabilities, ensuring high-level security and compliance, and
        managing the overarching technology infrastructure for the entire
        government.
      </p>
      <ol className="goa-ordered-list">
        <li>Resilience and support standards for enterprise capabilities</li>
        <li>Security and compliance policies</li>
        <li>Access and data management policies</li>
        <li>Cloud and hosting policies</li>
      </ol>
      <GoASpacer vSpacing="l" />

      <h3>Enterprise platform teams directory</h3>
      <GoATable>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Name</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          {enterpriseDirectory.map((provider: Directory) => (
            <tr key={provider.provider}>
              <td>{provider.provider}</td>
              <td>{provider.name}</td>
              <td>{provider.designation}</td>
            </tr>
          ))}
        </tbody>
      </GoATable>
      <GoASpacer vSpacing="l" />

      <h2 id="digital-design-and-delivery">Digital Design and Delivery</h2>
      <p>
        The Divisional Platform Team, known as Digital Design and Delivery
        (DDD), operates at the divisional level and specializes in tailoring
        enterprise-level common platform capabilities to meet the unique needs
        of specific government portfolios. This team ensures that digital
        services are user-friendly, accessible to all citizens, and aligned with
        divisional requirements.
      </p>
      <ol className="goa-ordered-list">
        <li>Resilience and support standards for DDD capabilities</li>
        <li>Design, development, and maintenance directives</li>
        <li>Accessibility directives</li>
      </ol>
      <GoASpacer vSpacing="3xs" />

      <h3>Digital Design and Delivery directory </h3>
      <GoATable>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Name</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          {DDDDirectory.map((provider: Directory) => (
            <tr key={provider.provider}>
              <td>{provider.provider}</td>
              <td>{provider.name}</td>
              <td>{provider.designation}</td>
            </tr>
          ))}
        </tbody>
      </GoATable>
      <GoASpacer vSpacing="l" />
      <h2 id="portfolio-platform-team">Portfolio platform team</h2>
      <p>
        The Portfolio Platform Team focuses on serving government portfolios,
        which are groups of related programs and services. They work to adapt
        and enhance common platform capabilities to align with the specific
        needs of these portfolios. This type of team also prioritizes resilience
        and support standards to ensure reliable service delivery.
      </p>
      <ol className="goa-ordered-list">
        <li>Resilience and support standards for portfolio capabilities</li>
        <li>Integration with broader or legacy systems</li>
        <li>Adherence to portfolio-specific requirements</li>
      </ol>
      <GoASpacer vSpacing="3xs" />

      <h3>Portfolio platform teams directory</h3>
      <GoATable>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Name</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          {portfolioPlatformDirectory.map((provider: Directory) => (
            <tr key={provider.provider}>
              <td>{provider.provider}</td>
              <td>{provider.name}</td>
              <td>{provider.designation}</td>
            </tr>
          ))}
        </tbody>
      </GoATable>
      <GoASpacer vSpacing="l" />

      <h2 id="product-team">Product team</h2>
      <p>
        The Product Team collaborates with business experts to align service
        design and development with their goals and objectives. They work
        closely with Portfolio Teams to ensure that common platform capabilities
        meet the specific needs of projects and initiatives at the team level.
      </p>
      <ol className="goa-ordered-list">
        <li>Specific business requirements</li>
        <li>Customization requirements</li>
        <li>Adherence to development timelines</li>
      </ol>
      <GoASpacer vSpacing="3xs" />

      <h2 id="product">Product</h2>
      <p>
        The Product itself is composed at the application, service, or
        capability level, to support the delivery of government services to
        external or internal end-users and stakeholders. The product may be
        based on a common platform capability but is customized to cater to the
        unique requirements of individual services and users, ensuring seamless
        integration and functionality.
      </p>
      <ol className="goa-ordered-list">
        <li>Specific user requirements</li>
      </ol>
      <GoASpacer vSpacing="l" />
      <BackToTop />
    </GoAThreeColumnLayout>
  );
}
