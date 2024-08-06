import {
  GoAGrid,
  GoAContainer,
  GoAButton,
  GoASpacer,
} from '@abgov/react-components-4.20.2';
import React from 'react';
import Feedback from '../../components/Feedback';
import BackToTop from '../../components/BackToTop';

const StrategyPrinciples = () => {
  return (
    <div data-pagefind-body>
      <GoAButton
        type="tertiary"
        size="compact"
        leadingIcon="arrow-back"
        onClick={() => (window.location.href = '/')}
      >
        Back
      </GoAButton>
      <GoASpacer vSpacing="l" />
      <h1>Digital Service Principles</h1>
      <p>
        A set of 14 Digital Service Principles will guide how we work with
        in-house and vendor teams to design, deliver, and operate digital
        services. In 2024, these Digital Service Principles will be developed
        into Digital Service Standards that are measurable, include clear
        accountabilities, and will be required as part of all digital service
        initiatives. 
      </p>
      <GoASpacer vSpacing="xl" />

      <GoAGrid gap="xl" minChildWidth="320px">
        <GoAContainer type="non-interactive" accent="thin">
          <h3>Understand users and their needs before the solution.</h3>
          <p>
            Develop a deep and ongoing understanding of who the service users
            are, how they behave, and what that means for the design and
            evolution of the service.
          </p>
        </GoAContainer>
        <GoAContainer accent="thin" type="non-interactive">
          <h3>Make the service accessible and inclusive. </h3>
          <p>
            Design the service for inclusion so that all who need it can use it.
            A diverse, inclusive delivery team improves the chance of success.
          </p>
        </GoAContainer>
        <GoAContainer accent="thin" type="non-interactive">
          <h3>Establish and empower the right team.</h3>
          <p>
            Put in place a multidisciplinary team that can create, operate, and
            continuously improve the service in a sustainable way. A suitably
            skilled product owner, who is empowered to make decisions, should
            lead the team. Design and test the service from end to end.
          </p>
        </GoAContainer>
        <GoAContainer accent="thin" type="non-interactive">
          <h3>Design and test the service from end to end. </h3>
          <p>
            Design a seamless, resilient, omnichannel experience that meets user
            needs. Test end-to-end, early and often, with users to validate
            this.
          </p>
        </GoAContainer>
        <GoAContainer accent="thin" type="non-interactive">
          <h3>Iterate and improve frequently. </h3>
          <p>
            Start small and scale the service rapidly using agile ways of
            working. Design with users and continuously improve services based
            on their feedback.
          </p>
        </GoAContainer>
        <GoAContainer accent="thin" type="non-interactive">
          <h3> Choose the right tools and technology. </h3>
          <p>
            Choose technology that is scalable, interoperable, secure,
            accessible, and open, showing a bias to small pieces of technology,
            loosely joined.
          </p>
        </GoAContainer>
        <GoAContainer accent="thin" type="non-interactive">
          <h3>Operate a reliable service.</h3>
          <p>
            Sustainably resource the service so it can operate, improve, and
            adapt to changing user needs with minimum disruption for users.
          </p>
        </GoAContainer>
        <GoAContainer accent="thin" type="non-interactive">
          <h3>Work in the open.</h3>
          <p>
            Make new source code and non-sensitive data open and reusable.
            Expose the service via an API that can be used within and (where
            possible) beyond the government. Share Classification: Protected A
            research, learning, and progress openly throughout the service’s
            design, build, and operation.
          </p>
        </GoAContainer>
        <GoAContainer accent="thin" type="non-interactive">
          <h3>Structure budgets and contracts to support agile delivery.</h3>
          <p>
            When buying products, services, or solutions, apply modular
            contracting principles to mitigate risk, avoid vendor lock-in, and
            encourage the delivery of working software to users at pace.
          </p>
        </GoAContainer>
        <GoAContainer accent="thin" type="non-interactive">
          <h3>
            Use and contribute to open standards, common components and
            patterns.
          </h3>
          <p>
            Build on open standards, common components, and patterns from inside
            and outside the GoA. Identify and share any patterns and components
            that are developed so that others can use them.
          </p>
        </GoAContainer>
        <GoAContainer accent="thin" type="non-interactive">
          <h3>Create a secure, ethical service that protects user privacy.</h3>
          <p>
            Identify the data the service will use, store, or create. Apply
            privacy by design principles and appropriate legal and security
            measures to protect users as they use the service and afterwards.
            Ensure ethical data usage throughout the service.
          </p>
        </GoAContainer>
        <GoAContainer accent="thin" type="non-interactive">
          <h3>Measure performance.</h3>
          <p>
            Measure how well all parts of the service work for users, including
            how people interact with it in real time and publish performance
            data.
          </p>
        </GoAContainer>
        <GoAContainer accent="thin" type="non-interactive">
          <h3> Make the service simple to use. </h3>
          <p>
            Ensure that users can do what they need to do as simply as possible
            and succeed the first time with
          </p>
          minimal help.
        </GoAContainer>
        <GoAContainer accent="thin" type="non-interactive">
          <h3>Make data useable.</h3>
          <p>
            Ensure data will map into other services, and follows standards for
            data governance, metadata management, and quality assurance. Also,
            ensure that data will support a more precise understanding of
            service performance.
          </p>
        </GoAContainer>
      </GoAGrid>
      
      <GoASpacer vSpacing="l" />
      <Feedback />
      <BackToTop />
    </div>
  );
};

export default StrategyPrinciples;
