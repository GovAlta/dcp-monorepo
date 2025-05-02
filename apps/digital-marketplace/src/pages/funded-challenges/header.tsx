import React from 'react';
import FundedHeader from '../../img/illustration-funded-challenges.svg';
import './styles.css';

export default function ChallengeHeader() {
  return (
    <div className="goa-adm-body-header">
      <div className="container">
        <div className="goa-adm-body-header-content">
          <div className="goa-adm-breadcrumbs">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/challenge-based-procurement/">
                  Challenge-based Procurement
                </a>
              </li>
              <li className="goa-adm-breadcrumbs-active">Funded Challenges</li>
            </ul>
          </div>
          <h1>Funded Challenges</h1>
          <p className="lede">
            Track awarded recipients progress from concept to integration.
          </p>
        </div>

        <div className="goa-adm-body-header-graphic">
          <img
            src={FundedHeader.src}
            alt="Graphic of hand putting a coin into a jar filled with more coins"
          />
        </div>
      </div>
    </div>
  );
}
