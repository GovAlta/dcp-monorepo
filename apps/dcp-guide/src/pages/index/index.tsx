import React, { useEffect } from 'react';
import { GoAIcon } from '@abgov/react-components';
import Astro from '../../assets/astro.png';
import Github from '../../assets/Github.png';
import Script from '../../assets/Script.png';
import '../../styles/global.css';

export default function HomePage() {
  return (
    <>
      <main>
        <h3>What is DCP?</h3>
        <div>
          <p>
            DCP is a platform for digital content products. It includes shared
            libraries and micro-apps for rapid authoring and publishing of
            content with workflows for technical and non-technical writers.
            ADSP's digital content platform is a place for, well, digital
            content! Its where DDD teams can build and deploy websites for use
            within the organization, providing information to people within the
            Government of Alberta about various things like:
          </p>
          <ul>
            <li>Application overviews</li>
            <li>Application user guides and tutorials</li>
            <li>New application functionality</li>
            <li>Application FAQs</li>
            <li>DDD development standards and guidelines</li>
            <li>Team development standards and guidelines</li>
            <li>Technology concepts and implementations</li>
          </ul>
        </div>
        <div className="spacing">
          <p>
            {' '}
            It is meant to be a home for static websites, for information
            sharing rather than information processing. DCP is organized as a
            set of independent microsites, each with a specific purpose. The
            only thing they have in common is that they share
          </p>
        </div>
        <div className="technologies">
          <div className="technology">
            <div className="img-wrap">
              <noscript>
                <img src={Astro} alt="" />
              </noscript>
              <img
                alt=""
                data-image-id="62478e63266c637821c47343"
                data-type="image"
                src={Astro}
              />
            </div>
            <p>
              Astrobuild <br />A the Static Site Generator <br />
              technology{' '}
            </p>
          </div>{' '}
          <div className="technology">
            <div className="img-wrap">
              <noscript>
                <img src={Github} alt="" />
              </noscript>
              <img
                alt=""
                data-image-id="62478e63266c637821c47346"
                data-type="image"
                src={Github}
              />
            </div>
            <p>
              {' '}
              Git repository <br />
              Some text about git <br />
              repository{' '}
            </p>
          </div>
          <div className="technology">
            <div className="img-wrap">
              <noscript>
                <img src={Script} alt="" />
              </noscript>
              <img
                alt=""
                data-image-id="62478e63266c637821c47342"
                data-type="image"
                src={Script}
              />
            </div>
            <p>
              Common deployment
              <br />
              scripts
              <br /> Some text goes here{' '}
            </p>
          </div>
        </div>
        <div></div>
        <div className="gap">
          <small className="techs-note">
            *These technologies allow site developers to quickly get their
            content up and deployed.
          </small>
        </div>

        <h3>DCP micro site sample (title needed) </h3>
        <p>
          Some sort of highlights of qualification around 80 - 100 characters
          Some sort of highlights of qualification around 80 - 100 characters
          Some sort of highlights of qualification around 80 - 100 characters
          Some sort of highlights of qualification around 80 - 100 characters
          Some sort of highlights of qualification around 80 - 100 characters
          Some sort of highlights of qualification around 80 - 100 characters{' '}
        </p>
        <div className="services-wrapper">
          <div className="service-card">
            <div className="service-heading">Service name</div>
            <div className="service-sub-heading">Service provider name</div>
            <p>
              The file service provides the capability to upload and download
              files. Consumers are registered with their own space (tenant)
              containing file types that include role based access policy, and
              can associate files to domain records.
            </p>
            <div className="service-contact">
              Contact:{' '}
              <a rel="noopener noreferrer" target="_blank">
                ADSP platform
              </a>
              <GoAIcon size="small" type="open" />
            </div>
          </div>
          <div className="service-card">
            <div className="service-heading">Service name</div>
            <div className="service-sub-heading">Service provider name</div>
            <p>
              The file service provides the capability to upload and download
              files. Consumers are registered with their own space (tenant)
              containing file types that include role based access policy, and
              can associate files to domain records.
            </p>
            <div className="service-contact">
              Contact:{' '}
              <a rel="noopener noreferrer" target="_blank">
                ADSP platform
              </a>
              <GoAIcon size="small" type="open" />
            </div>
          </div>
          <div className="service-card">
            <div className="service-heading">Service name</div>
            <div className="service-sub-heading">Service provider name</div>
            <p>
              The file service provides the capability to upload and download
              files. Consumers are registered with their own space (tenant)
              containing file types that include role based access policy, and
              can associate files to domain records.
            </p>
            <div className="service-contact">
              Contact:{' '}
              <a rel="noopener noreferrer" target="_blank">
                ADSP platform
              </a>
              <GoAIcon size="small" type="open" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
