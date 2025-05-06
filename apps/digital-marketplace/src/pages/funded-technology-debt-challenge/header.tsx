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
              <li>
                <a href="/funded-challenges/">Funded Challenges</a>
              </li>
              <li className="goa-adm-breadcrumbs-active">
                Technology Debt Challenge
              </li>
            </ul>
          </div>
          <h1>Technology Debt Challenge</h1>
          <p className="lede">
            Tackling Alberta's tech debt with scalable solutions.
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
