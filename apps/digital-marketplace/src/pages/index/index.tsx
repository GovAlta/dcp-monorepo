import React, { useEffect } from 'react';

import hero_mobile from '../../img/hero-mobile-tablet.svg';
import suppliers_thumb from '../../img/supplier-icon-home.svg';
import partners_thumb from '../../img/stakeholder-icon-home.svg';

import Mountains from '../../img/mountains.svg';
import handShakeLine from '../../img/handShakeLine.svg';

const HomePage = () => {
  // useEffect(() => { }, []);

  return (
    <>
      <div className="goa-adm-body-header goa-adm-body-full">
        <div className="container">
          <div className="goa-adm-body-header-content">
            <h1>Introducing the Alberta Digital Marketplace</h1>
            <p className="lede">
              Streamlining digital procurement for suppliers and public sector
              buyers.
            </p>
          </div>

          <div className="goa-adm-body-header-graphic">
            <div className="goa-adm-home-tablet-graphic">
              <img
                src={hero_mobile}
                alt="Illustration of Alberta's landscape"
              />
            </div>
            <div className="goa-adm-body-full-side-one">
              <div className="goa-adm-body-full-side-one-img">
                <img
                  src={handShakeLine}
                  width="144"
                  height="612"
                  alt="Hand shake line"
                />
              </div>
            </div>
            <div className="goa-adm-body-full-side-two">
              <div className="goa-adm-body-full-side-two-img">
                <div className="sun-cloud">
                  {' '}
                  {/* The class creates movement */}
                  {/* svg must be on the page to allow movement */}
                  <svg width="113" height="118" viewBox="0 0 113 118" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse fill="#E0B701" cx="62.4381" cy="57.9333" rx="46.4381" ry="45.9333" />
                  </svg>
                  <svg width="133" height="53" viewBox="0 0 133 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="white" fill-rule="evenodd" clip-rule="evenodd" d="M1.00007 52.833V52.7192C1.00002 52.7382 1 52.7571 1 52.7761C1 52.7951 1.00002 52.814 1.00007 52.833ZM3.41897 42.1895C7.35522 34.0615 15.6829 28.4563 25.3198 28.4563C26.946 28.4563 28.535 28.6159 30.0718 28.9203C34.5015 22.9297 41.6167 19.0452 49.6391 19.0452C55.8488 19.0452 61.515 21.3726 65.8129 25.2026C69.7861 11.2316 82.6414 1 97.8865 1C116.301 1 131.228 15.9276 131.228 34.3417C131.228 37.0448 130.906 39.6728 130.299 42.1895H3.41897Z" />
                    <path fill="#004070" d="M1.00007 52.833L6.77247e-05 52.8353L2.00007 52.833H1.00007ZM1.00007 52.7192H2.00007L6.77247e-05 52.7169L1.00007 52.7192ZM3.41897 42.1895L2.51896 41.7536L1.8236 43.1895H3.41897V42.1895ZM30.0718 28.9203L29.8775 29.9013L30.4991 30.0244L30.8758 29.5149L30.0718 28.9203ZM65.8129 25.2026L65.1476 25.9492L66.3384 27.0104L66.7747 25.4762L65.8129 25.2026ZM130.299 42.1895V43.1895H131.087L131.271 42.424L130.299 42.1895ZM2.00007 52.833V52.7192H6.51042e-05V52.833H2.00007ZM6.77247e-05 52.7169C2.25828e-05 52.7367 0 52.7564 0 52.7761H2C2 52.7579 2.00002 52.7397 2.00006 52.7215L6.77247e-05 52.7169ZM0 52.7761C0 52.7958 2.25828e-05 52.8156 6.77247e-05 52.8353L2.00006 52.8307C2.00002 52.8125 2 52.7943 2 52.7761H0ZM25.3198 27.4563C15.2852 27.4563 6.61591 33.2937 2.51896 41.7536L4.31899 42.6253C8.09453 34.8292 16.0807 29.4563 25.3198 29.4563V27.4563ZM30.2661 27.9394C28.6656 27.6224 27.0116 27.4563 25.3198 27.4563V29.4563C26.8804 29.4563 28.4043 29.6094 29.8775 29.9013L30.2661 27.9394ZM49.6391 18.0452C41.2861 18.0452 33.8779 22.0911 29.2677 28.3258L30.8758 29.5149C35.1251 23.7683 41.9472 20.0452 49.6391 20.0452V18.0452ZM66.4782 24.456C62.0042 20.4691 56.1035 18.0452 49.6391 18.0452V20.0452C55.5941 20.0452 61.0258 22.2761 65.1476 25.9492L66.4782 24.456ZM97.8865 0C82.1827 0 68.9433 10.5396 64.851 24.9291L66.7747 25.4762C70.629 11.9237 83.1001 2 97.8865 2V0ZM132.228 34.3417C132.228 15.3753 116.853 0 97.8865 0V2C115.748 2 130.228 16.4799 130.228 34.3417H132.228ZM131.271 42.424C131.897 39.8311 132.228 37.1244 132.228 34.3417H130.228C130.228 36.9652 129.916 39.5145 129.327 41.9549L131.271 42.424ZM3.41897 43.1895H130.299V41.1895H3.41897V43.1895Z" />
                  </svg>
                </div>

                <img src={Mountains} width="822" height="612" alt="Mountains" />
              </div>
            </div>
            <div className="goa-adm-body-owl">
              <div className="goa-adm-body-owl-line"></div>
              <div className="goa-adm-body-owl-eye"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="goa-adm-body">
        <div className="container">
          {/* CUSTOMIZABLE */}
          <section className="goa-adm-intro">
            <p>
              Step into the future with the Alberta government! We want to
              partner with top-tier technology vendors and service design
              professionals from coast to coast to create cutting-edge,
              impactful solutions that make life easier for Albertans, wherever
              they are, on any device. Join us on this exciting journey and be
              part of something truly remarkable.
            </p>
          </section>

          {/* CUSTOMIZABLE */}
          <section className="goa-adm-cards-info">
            <h2>Sign up and keep up to date</h2>
            <div className="goa-adm-cards">
              <div className="goa-adm-single-card">
                <div className="goa-adm-single-card-thumb">
                  <img src={suppliers_thumb} alt="Suppliers illustration" />
                </div>
                <h3>Suppliers</h3>
                <div className="goa-adm-single-card-content">
                  <p>
                    Do you have the technology and vision to help shape the
                    future? We want to hear ideas that support government
                    initiatives to create impactful, accessible digital
                    experiences for Albertans.
                  </p>
                </div>
                <div className="goa-adm-single-card-link">
                  <a
                    className="goa-adm-button-link goa-adm-secondary"
                    href="/for-suppliers/"
                  >
                    View supplier benefits
                  </a>
                </div>
              </div>
              <div className="goa-adm-single-card">
                <div className="goa-adm-single-card-thumb">
                  <img src={partners_thumb} alt="Partners illustration" />
                </div>
                <h3>Community partners</h3>
                <div className="goa-adm-single-card-content">
                  <p>
                    Curious? Keep connected as a digitally curious Albertan,
                    another government or community organization.
                  </p>
                </div>
                <div className="goa-adm-single-card-link">
                  <a
                    className="goa-adm-button-link goa-adm-secondary"
                    href="/for-partners/"
                  >
                    View partner benefits
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* CUSTOMIZABLE */}
          <section className="goa-adm-intro">
            <p>
              We're seeking talented vendors who are passionate about making a
              real impact for Albertans. Explore open opportunities and see how
              you can join us on this journey.
            </p>
          </section>

          {/* CUSTOMIZABLE */}
          <section className="goa-adm-apc-callout">
            <h2>
              Discover more about our opportunities and procurement process
              today.
            </h2>
            <a
              className="goa-adm-button-link"
              href="https://purchasing.alberta.ca/search"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore opportunities
            </a>
          </section>
        </div>
      </div>
    </>
  );
};

export default HomePage;
