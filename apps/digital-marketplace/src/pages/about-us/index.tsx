import React from 'react';
import hero_mobile from '../../img/hero-mobile-tablet.svg';
import './styles.css';

const AboutUsPage = () => {
  return (
    <>
      <div className="goa-adm-body-header goa-adm-body-full">
        <div className="container">
          <div className="goa-adm-body-header-content">
            <div className="goa-adm-breadcrumbs">
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li className="goa-adm-breadcrumbs-active">About</li>
              </ul>
            </div>
            <h1>About</h1>
          </div>
          <div className="goa-adm-body-header-graphic">
            <div className="goa-adm-home-tablet-graphic">
              <img
                src={hero_mobile.src}
                alt="Illustration of Alberta's landscape"
              />
            </div>
            <div className="goa-adm-body-full-middle"></div>
            <div className="goa-adm-body-full-side-two"></div>
          </div>
        </div>
      </div>

      <div className="goa-adm-body" id="main">
        <div className="container">
          <div className="goa-adm-about-content">
            <section className="goa-adm-who-we-are">
              <h2>Who we are</h2>
              <p>
                The Alberta Digital Marketplace is a platform to connect
                government buyers with private sector vendors and innovators,
                fostering collaboration, efficiency, and economic growth. As
                part of the Ministry of Technology and Innovation (TI), we are
                the driving force behind Alberta's digital transformation. We
                partner with ministries and stakeholders to design and develop
                smarter, better, faster digital services through user-centered
                design and agile development practices. With dozens of in-flight
                projects each year, we are committed to reducing the digital
                divide.
              </p>
              <p>
                Alberta has a growing digital and technology sector sustained by
                strong academic and industry collaborations, a young and highly
                skilled workforce and long-term sustainable investments in
                machine learning, artificial intelligence, and other
                technologies critical to our success and global competitiveness.
                Through the Digital Marketplace we will explore ways to enhance
                procurement and collaboration, and delivery world-class digital
                services that are easy to use, fast, efficient, and secure.
              </p>
              <p>
                Let's build a digital future of public services together!
                <br />
                <a
                  href="https://www.alberta.ca/minister-of-technology-and-innovation"
                  target="_blank"
                >
                  Learn about Alberta's Technology and Innovation leadership
                </a>
              </p>
            </section>

            <section className="goa-adm-vision">
              <h2>Our vision</h2>
              <p>
                Our vision is to provide Albertans with outstanding user
                experiences. In times of need, or for everyday transactions,
                Albertans can count on their government to provide choice,
                convenience, and world-class digital services that are easy to
                use, fast, efficient, and secure.
              </p>
              <p>
                Technology and Innovation wants to make it easier for IT vendors
                and digital innovators in Alberta and across Canada to work with
                us to develop, test and deploy the best digital tools and
                solutions. We want to help you understand our procurement
                processes, bid for exciting opportunities, and foster
                transparent and effective partnerships that drive impactful
                change and sustain long-term relationships.
              </p>
              <h3>Excited to learn more?</h3>
              <p>
                Our team in the Ministry of Technology and Innovation is eager
                to learn more about your services, what sets you apart, what
                motivates and inspires you, and how you can support our vision.
              </p>
              <p>
                Reach out to schedule a chat with us at{' '}
                <a href="mailto:digital.outreach@gov.ab.ca">
                  digital.outreach@gov.ab.ca
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
export default AboutUsPage;
