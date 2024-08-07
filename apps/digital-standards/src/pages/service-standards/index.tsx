import {
  GoASpacer,
  GoAAccordion,
  GoAButton,
} from '@abgov/react-components-4.20.2';
import React from 'react';
import BackToTop from '../../components/BackToTop';

export default function ServiceStandards(): JSX.Element {
  return (
    <div>
      <GoAButton
        type="tertiary"
        size="compact"
        leadingIcon="arrow-back"
        onClick={() => (window.location.href = '/')}
      >
        Back
      </GoAButton>
      <GoASpacer vSpacing="l" />

      <h1>Digital Service standards</h1>
      <GoASpacer vSpacing="l" />
      <h2>What are Digital Service Standards?</h2>
      <p>
        Digital Service Standards are a set of best practices, policies, or
        guidelines for designing and delivering digital government service.
      </p>
      <p>
        Digital Service Standards are derived from Digital Service Principles
        and are measurable, have clear accountabilities, and will be required as
        a part of all digital service initiatives.
      </p>

      <GoASpacer vSpacing="3xs" />

      <h2>Why Digital Service Standards?</h2>
      <p>
        By aligning to digital service standards, the Government of Alberta sets
        clear expectations on how we will deliver{' '}
        <b>better, faster, smarter services</b>. Through the standards, with new
        supports and guidance, we’re shifting how teams develop and produce{' '}
        <b>user-centred</b> products for citizens and businesses in a{' '}
        <b>safe and secure manner</b>.
      </p>
      <p>
        The services covered by the Digital Service Standards are public facing
        services, although delivery teams are encouraged to adhere to the
        criteria outlined here, and in supporting documentation, for all types
        of digital design and delivery.
      </p>

      <GoASpacer vSpacing="l" />

      <GoAAccordion
        headingSize="medium"
        heading="Standard no. 1 - Design with users"
        open={false}
      >
        <h4>Relavent principles: The standard’s aspirations</h4>
        <p>
          <b>No. 1</b>– Understand users and their needs before the solution. A
          deep and ongoing understanding of the user’s experience will guide the
          design and evolution of the service.
        </p>
        <p>
          <b>No. 8</b> – Make the service accessible and inclusive. Design the
          service for inclusion so that all who need it can use it.
        </p>
        <h4>Overview: What the standard represents</h4>
        <p>
          The Government of Alberta’s approach to digital service design starts
          with understanding the needs, contexts, and pain points affecting
          users - including the public, business entities and government staff.
          Working with potential users from different demographic backgrounds
          (e.g. ethnicities, genders, socio-economic contexts, and Indigenous
          identities) and organizations (businesses, non-profits,
          municipalities) in the design of your service is critical to
          proactively identify and address user needs. Digital service teams can
          create accessible services for all Albertans while decreasing the risk
          of wasted time or re-work due to addressing the wrong problems or
          creating unnecessary complexity for users.
        </p>

        <h4>Goals: Why the standard matters</h4>
        <p>
          Designing services with and for users should aim to do the following:
        </p>
        <ul className="goa-unordered-list">
          <li>
            <b>...meet the needs of users</b> as best as possible through
            employing the methods, interactions, design and attention in
            developing digital services as outlined in relevant Government of
            Alberta policies, guidance and supports.
          </li>
          <li>
            <b>...improve user satisfaction and successful outcomes</b> by
            proactively removing barriers for service use and producing services
            that address the real needs of endusers.
          </li>
          <li>
            <b>...increase adoption</b> by facilitating access to services to a
            broader range of end-users, through new channels and technologies.
          </li>
          <li>
            <b>...enable equitable service access</b> without the risk of
            inherent biases or assumptions through using holistic insights of
            diverse end-users and how they may be impacted by service
            experiences.
          </li>
          <li>
            <b>...inform the prioritization</b> of service features through
            analyzing user feedback.
          </li>
          <li>
            <b>...ensure compliance</b> with Canadian and global standards for
            accessible and inclusive digital experiences.
          </li>
        </ul>

        <h4>In action: How to follow the standard in practice</h4>
        <p>Digital service teams should:</p>
        <ul className="goa-unordered-list">
          <li>
            Identify users of the service and frame proposed services or updates
            around a user-centered problem or need.
          </li>
          <li>
            Apply qualitative and quantitative research techniques when working
            with potential users to understand their needs, experiences, and
            expectations - taking into consideration backgrounds, abilities, and
            preferences.
          </li>
          <li>
            Build and test prototypes with users to identify gaps, barriers, and
            opportunities that can improve user experience and identify issues
            and improvements in the service interaction.
          </li>
          <li>
            Adopt a technology-agnostic approach, aiming first to understand
            user needs, then using ongoing insights from discovery, research and
            testing to inform technical decisions or releases.
          </li>
          <li>
            Regularly document and share research learnings with the wider
            network of service stakeholders to support better communications and
            governance.
          </li>
          <li>
            Conduct and leverage ongoing research insights throughout the
            service’s lifecycle to ensure any decisions surrounding its design,
            functionalities, features and support channels, are applied
            throughout the implementation. Potential data and privacy
            implications must be considered depending on the parameters of the
            research.
          </li>
          <li>Gather data to ensure the delivery of user value.</li>
          <li>
            Verify the service and its technologies meet relevant accessibility
            and plain language requirements and best practices, including the
            Government of Alberta Design System and Digital Experience Standard;
            the World Wide Web Consortium’s Web Content Accessibility Guidelines
            (WCAG) 2.0 level AA success criteria; and the Authoring Tool
            Accessibility Guidelines (ATAG) Part A & B.
          </li>
        </ul>

        <h4>
          Assessment criteria: Examples of how to measure alignment to the
          Service Standards
        </h4>
        <p>
          <ul className="goa-unordered-list">
            <li>
              The users, a problem and benefits/impacts have been clearly
              identified.
            </li>
            <li>
              User research and experience testing with a diverse range of
              end-users, and behaviours, motivations and pain points are
              captured, analyzed, and well understood.
            </li>
            <li>
              Users have a mechanism to give feedback, and feedback is
              documented for further investigation and implementation as needed
              and as appropriate in the future.
            </li>
            <li>
              Consistently assess, through data analysis and usability testing,
              whether the service continues to yield customer value.
            </li>
            <li>
              The team can demonstrate that website content (where appropriate)
              and accessibility levels are compliant with the relevant
              standards, such as the Worldwide Web Consortium’s Web Content
              Accessibility Guidelines (WCAG) 2.0.
            </li>
          </ul>
        </p>
      </GoAAccordion>
      <GoASpacer vSpacing="l" />

      <GoAAccordion
        headingSize="medium"
        heading="Standard no. 2 - Build multidisciplinary & agile teams"
        open={false}
      >
        <h4>Relavent Principles: The standards aspirations</h4>

        <p>
          <b>No. 2</b> – Establish and empower the right team. Put in place a
          multidisciplinary team that can create, operate, and continuously
          improve a service.
        </p>
        <p>
          <b>No. 3</b> – Iterate and improve frequently. Start small and scale
          the service rapidly using agile ways of working. Engage users and
          continuously improve services based on their feedback.
        </p>
        <p>
          <b>No. 5</b> – Structure budgets and contracts to support agile
          delivery. Apply modular contracting principles to product, service,
          and solution contracting and procurement.
        </p>

        <h4>Overview: What the standard represents</h4>
        <p>
          Multidisciplinary teams can reduce silos and encourage new
          collaborations and diversity by embedding varied perspectives directly
          into the team’s makeup. Digital service teams should include or have
          access to a variety of areas of expertise (e.g., service designers,
          user researchers, policy experts, and content designers) alongside
          technical roles and modern practitioners.
        </p>

        <p>
          Multidisciplinary, agile teams are better equipped to design services
          that can navigate their end-user’s needs. Digital service teams should
          have a product owner to facilitate the team’s ability to be empowered
          to capture and act on insights through iterative ways of working -
          ensuring the team has the capability and the authority to convert
          insights into action. Through adopting flexibility and iteration in
          their delivery, digital service teams can quickly adapt to new factors
          – e.g., user behaviours, technologies, policies, etc. – and mitigate
          overall project risk.
        </p>

        <h4>Goals: Why the standard matters</h4>
        <p>Embedding diversity and agility in service delivery teams should:</p>

        <ul className="goa-unordered-list">
          <li>
            <b>...set clear accountabilities</b> to steer service design from
            conception to delivery.
          </li>
          <li>
            <b>...empower the teams to have the capability and the authority</b>{' '}
            to convert insights into action.
          </li>
          <li>
            <b>...help create appropriate and improve initiative governance</b>{' '}
            by working in the open between ministries, digital service teams,
            and vendors.
          </li>
        </ul>

        <h4>In action: How to follow the standard in practice</h4>

        <p>Digital service teams should:</p>

        <ul className="goa-unordered-list">
          <li>
            Access, acquire and build diverse skillsets to ensure teams have the
            authority, capabilities, and resources – e.g., policy, research,
            design, QA, etc. – to support their initiative’s evolving
            priorities.
          </li>
          <li>
            Ensure the initiative’s budget and workplan support agile service
            delivery, from development through to launch, and includes ongoing
            service operations, maintenance, and support until eventual
            decommission.
          </li>
          <li>
            Have clear authorities, roles and accountabilities, including an
            empowered product owner to lead the team in agile delivery, and
            ensure executive sponsorship to support the vision.
          </li>
          <li>
            Be aware of existing structures or dependencies such as legislation
            or agreements that exist in the department to recognize constraints
            and work with the product team leadership to manage these.
          </li>
          <li>
            Employ agile practices (such as recurring sprints, daily stand-up
            meetings, demos to stakeholders, etc.) and
            cross-departmental/ministerial resourcing to develop.
          </li>
        </ul>

        <h4>
          Assessment criteria: Examples of how to measure alignment to the
          Service Standards
        </h4>

        <ul className="goa-unordered-list">
          <li>
            There are a Product Owner and Executive Product Owner, and these
            roles are engaged regularly as per the initiative governance and/or
            agile methodology requirements.
          </li>
          <li>
            Service design goals or decisions are communicated between the team
            and Executive Leadership in a clear and appropriate manner, on the
            agreed upon frequency and timing outlined through the initiative
            governance.
          </li>
          <li>
            Team resources are structured and assigned to ensure needed skill
            sets are available (both in house teams and/or outsourced as
            appropriate), and these roles and their purpose are clearly
            understood by partners, product owners and the team and are
            reflective of a multi-disciplinary approach.
          </li>
        </ul>
      </GoAAccordion>
      <GoASpacer vSpacing="l" />

      <GoAAccordion
        headingSize="medium"
        heading="Standard no. 3 - Focus on outcomes"
        open={false}
      >
        <h4>Relavent principles: The standard’s aspirations</h4>
        <p>
          <b>No. 4</b> – Operate a reliable service. Ensure services operate,
          improve, and adapt to changing user needs with minimum disruption.
        </p>
        <p>
          <b>No. 9</b> – Design and test the service from end-to-end. Design a
          seamless, resilient experience that meets user needs. Test end-to-end,
          early and often, with users to validate this.
        </p>
        <p>
          <b>No. 13</b> – Measure performance. Measure how well all parts of the
          service work for users and share performance data.
        </p>

        <h4>Overview: What the standard represents</h4>
        <p>
          Digital service teams should continuously monitor how effectively
          their services meet Albertans’ expectations by collecting and
          analyzing data about their service. Through appropriately analyzing
          and using performance data and testing the service from end-to-end,
          Albertans will be provided with intuitive and reliable services that
          meet user expectations.
        </p>

        <h4>Goals: Why the standard matters</h4>
        <p>Focusing on service performance should:</p>
        <ul className="goa-unordered-list">
          <li>
            <b>...increase end-user confidence</b> by providing consistent
            service performance and minimal disruptions, regardless of end-user
            context, technologies, or conditions.
          </li>
          <li>
            <b>...increase service resiliency and value</b> through identifying
            and addressing required changes to user needs, technology changes,
            and organizational priorities.
          </li>
          <li>
            <b>
              ...drive self-serve interactions and reduce stress on
              resource-heavy channels
            </b>{' '}
            (e.g., mailing, telephone, in-person desks) by increasing the
            reliability and consistency of online options for accessing
            services.
          </li>
        </ul>

        <h4>In action: How to follow the standard in practice</h4>
        <p>Digital service teams should:</p>
        <ul className="goa-unordered-list">
          <li>
            Track their service’s performance using metrics from available
            sources and channels to ensure an inclusive definition of success.
          </li>
          <li>
            Use research insights to define KPIs that track observable outputs
            and outcomes rather than proxy performance measures (e.g.,
            successful benefits delivery versus landing page hits).
          </li>
          <li>
            Incorporate various conditions – e.g., different devices, channels,
            assistive technologies, and connectivity – within the service’s
            testing activities to ensure its usability across contexts.
          </li>
          <li>
            Assess service performance against similar types of service
            categories within the Government of Alberta and across jurisdictions
            to find ways to benchmark with similar services.
          </li>
          <li>
            Continuously scan the service’s environment to identify and create a
            plan to address potential disruptors – usage spikes, system
            failures, new technologies, etc.
          </li>
          <li>
            Monitor the service use (and related supports) to optimize task
            completion rates across end-users.
          </li>
          <li>
            When a disruption is necessary, inform users in advance with
            appropriate notification methods.
          </li>
        </ul>

        <h4>
          Assessment criteria: Examples of how to measure alignment to the
          Service Standards
        </h4>
        <ul className="goa-unordered-list">
          <li>
            Initial/baseline performance measures have been captured for this
            service and documented appropriately before the start of service
            design improvements.
          </li>
          <li>
            Performance measures are monitored and evaluated throughout the
            development of a service and there is a plan in place to capture
            them once a service is live.
          </li>
          <li>
            Actions and decisions based on the results of performance measures,
            analytics and feedback are captured and documented for further
            investigation and implementation where appropriate.
          </li>
          <li>
            Service enhancements are prioritized, scoped, planned for delivery,
            and aligned to the team’s expectations and product owners and
            executive sponsors are engaged in this process as appropriate.
          </li>
          <li>
            The solution is tested from end-to-end with users and other
            automated tools for testing are leveraged throughout development and
            into operations.
          </li>
          <li>
            Financial controls have been implemented and monitored throughout
            the service delivery cycle and after a service is live.
          </li>
        </ul>
      </GoAAccordion>
      <GoASpacer vSpacing="l" />

      <GoAAccordion
        headingSize="medium"
        heading="Standard no. 4 - Use technology responsibly & transparently"
        open={false}
      >
        <h4>Relavent principles: The standard’s aspirations</h4>
        <p>
          <b>No. 10</b> – Choose the right tools and technologies. Choose
          technologies that are scalable, interoperable, secure, and accessible.
        </p>
        <p>
          <b>No. 11</b> – Work in the open. Explore appropriate ways to make new
          source code and nonsensitive data open and reusable. Explore
          appropriate ways to share research, learning, and progress openly
          throughout the service’s design, build, and operation.
        </p>
        <p>
          <b>No. 12</b> – Use and contribute to open standards, common
          components, and patterns. Build on open standards, common components,
          and patterns from inside and outside of the Government of Alberta.
        </p>
        <p>
          <b>No. 14</b> – Make data useable. Inform and support the forthcoming
          Data Strategy to ensure alignment with objectives and initiatives
          related to initiative delivery.
        </p>

        <h4>overiew: What the standard represents</h4>
        <p>
          Government services should set the bar for trustworthy usable and
          consistent digital experiences. Digital service teams should ensure
          the technologies they are using adopt common components that are
          interoperable with other systems, and core system data can be
          integrated with other data services within the Government of Alberta.
          Costs are proportionate to the benefits being delivered by digital
          products and using common platforms and re-usable components or
          processes can help to manage costs. Through working openly throughout
          the service’s design, build, and operations, teams should explore
          appropriate ways to make new source code and non-sensitive data open
          and reusable and build on open standards and patterns from inside and
          outside of the Government of Alberta.
        </p>

        <h4>Goals: Why the standard matters</h4>
        <p>Using technologies responsibly and transparently should:</p>
        <ul className="goa-unordered-list">
          <li>
            <b>...develop trust and collaboration</b> between the government,
            practitioner communities, industry partners, and the public by
            following transparent delivery practices that enable insight sharing
            and resource reuse.
          </li>
          <li>
            <b>...increase service usability and integration when applicable</b>{' '}
            by selecting tools, formats and technologies that are standardized,
            scalable and interoperable.
          </li>
          <li>
            <b>...reduce the risk of malicious attacks</b> by meeting
            established security and risk requirements and enable internal teams
            to better respond when they happen.
          </li>
          <li>
            <b>...decrease costs</b> by re-using code and common components.
          </li>
          <li>
            <b>...promote a culture of service delivery efficiency</b> by
            facilitating open access to existing and new data where appropriate,
            while ensuring the privacy and security of user data.
          </li>
        </ul>

        <h4>In action: How to follow the standard in practice</h4>
        <p>Digital service teams should:</p>
        <ul className="goa-unordered-list">
          <li>
            Follow existing Government of Alberta technology frameworks (e.g.,
            Data and Information Management Framework, the Cloud Strategy),
            approaches (e.g., the Digital Experience Standard, Design System),
            and policies (e.g., IMT Policy Instruments, the forthcoming Data
            Strategy) to facilitate integration and ensure the organization’s
            systems operate cohesively.
          </li>
          <li>
            Use Alberta.ca and the Alberta.ca Account as the front-end for the
            digital service.
          </li>
          <li>
            Explore the use of existing components from available common
            component libraries before embarking on new development projects.
          </li>
          <li>
            Meet the criteria of the Government of Alberta Tech Code of Practice
            (not yet published).
          </li>
          <li>
            Use and contribute to industry open standards (e.g., Open Data
            Standards, OpenAPI Specification) when possible, to provide
            transparency and support the wider digital public service community.
          </li>
          <li>
            As often as possible, share learning, outputs, or solutions with
            internal and external audiences to contribute to trust, community
            building and service advancement in/outside the Government of
            Alberta.
          </li>
          <li>
            Promote a responsible data sharing and reuse culture, emphasizing
            interoperable data formats and platforms and a consistent
            understanding of data stewardship.
          </li>
        </ul>

        <h4>
          Assessment criteria: Examples of how to measure alignment to the
          Service Standards
        </h4>
        <ul className="goa-unordered-list">
          <li>
            The team has assessed the use of common platforms, components for
            implementation of the service and where a custom based solution is
            being built, the reasons are well documented.
          </li>
          <li>
            Where artifacts built for this service contribute to a common
            platform, these are updated and documented into the appropriate
            repositories for re-use in the future.
          </li>
          <li>
            Technology or service delivery risks are identified, communicated,
            managed, and mitigated throughout development and operation of a
            service, including those related to the collection and safeguarding
            of user data.
          </li>
        </ul>
      </GoAAccordion>
      <GoASpacer vSpacing="l" />

      <GoAAccordion
        headingSize="medium"
        heading="Standard no. 5 - Design for safety & trust"
        open={false}
      >
        <h4>Relavent principles: The standard’s aspirations</h4>
        <p>
          <b>No. 6</b> – Create a secure, ethical service that protects user
          privacy. Protect users by applying appropriate privacy, legal, ethical
          and security measures.
        </p>
        <p>
          <b>No. 7</b> – Make the service simple to use. Ensure digital services
          are easy to use for everyone.
        </p>

        <h4>Overview: What the standard represents</h4>
        <p>
          Using digital services should be a positive, intuitive, and productive
          experience without any compromise to security or privacy. Digital
          service teams must strive to minimize legal, privacy, and security
          vulnerabilities and protect the end-user’s data.
        </p>

        <h4>Goals: Why the standard matters</h4>
        <p>Secure, simple services should:</p>
        <ul className="goa-unordered-list">
          <li>
            <b>...bolster end-user trust</b> by clearly defining service data
            use and ownership in accordance with FOIP requirements.
          </li>
          <li>
            <b>...increase service adoption and satisfaction</b> due to
            increased trust, ease of access, improved comprehension, and greater
            task resolution.
          </li>
          <li>
            <b>...improve service efficiency and inclusion</b> given decreased
            task complexity and barriers for interaction.
          </li>
          <li>
            <b>
              ...ensure legal, ethical, privacy, and security considerations
            </b>{' '}
            are incorporated from the start and not as an afterthought.
          </li>
          <li>
            <b>...decrease operational costs and error rates</b> by enabling
            successful, equitable self-service interactions, regardless of the
            end-user’s contexts and digital expertise.
          </li>
        </ul>

        <h4>in action: How to follow the standard in practice</h4>
        <p>Digital service teams should:</p>
        <ol className="goa-numbered-list">
          <li>
            Identify and apply the appropriate combination of privacy, legal,
            ethical, and security measures relevant to their digital service
            (e.g., applicable IMT Policy Instruments including the Information
            Security Management Directives(ISMD), the Freedom of Information and
            Protection of Privacy Act and the Alberta’s Cybersecurity Strategy),
            working with the appropriate areas in government with the subject
            matter expertise to advise and review services in development.
          </li>
          <li>
            Apply secure development practices across the full lifecycle of
            services to mitigate the risk of malicious activity or user
            information abuse.
          </li>
          <li>
            Mitigate unintended bias and discrimination across design choices to
            deliver fair service outcomes across end-user groups, regardless of
            personal traits (i.e., ethnicity, culture, language, religious
            belief, etc.).
          </li>
          <li>
            Consider the ethical and accessibility implications of their
            service, particularly how it may impact members of Indigenous,
            underserved, and vulnerable communities.
          </li>
          <li>
            Design services based on common end-user expectations around
            terminology, requirements, tasks, outcomes, and safeguards to
            streamline usability and accessibility.
          </li>
          <li>Minimize the collection and retention of sensitive user data.</li>
          <li>Apply robust security measures to protect user data.</li>
        </ol>

        <h4>
          Assessment criteria: Examples of how to measure alignment to the
          Service Standards
        </h4>
        <ul className="goa-unordered-list">
          <li>
            Has the team identified potential service disruptors or
            opportunities (e.g., privacy and security measures)?
          </li>
          <li>
            The team has worked with cybersecurity and privacy experts to
            identify risks and ensure compliance with safety and privacy
            protocols.
          </li>
          <li>
            The team built in privacy, financial and security enhancing features
            or controls, and has ensured the appropriate documentation has been
            completed.
          </li>
          <li>
            Error and vulnerability monitoring is in place and being managed for
            the service ongoing.
          </li>
          <li>
            The team has designed and tested user support materials (e.g., FAQs,
            how-tos, glossaries, employee manuals, etc.)
          </li>
          <li>
            The team has tested the service’s outputs to mitigate unintended
            bias, discrimination, or harm towards Indigenous and underserved
            end-user groups.
          </li>
        </ul>
      </GoAAccordion>
      <GoASpacer vSpacing="2xl" />
      <BackToTop />
    </div>
  );
}
