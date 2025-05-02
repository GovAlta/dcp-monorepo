import React from 'react';
import BasedHeader from '../../img/illustration-challenge-based.svg';
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
              <li className="goa-adm-breadcrumbs-active">
                Challenge-based Procurement
              </li>
            </ul>
          </div>
          <h1>Challenge-based Procurement</h1>
          <p className="lede">
            Start your journey with us and be part of the solution!
          </p>
        </div>

        <div className="goa-adm-body-header-graphic">
          <img
            src={BasedHeader.src}
            alt="Graphic of person running through a finish line"
          />
        </div>
      </div>
    </div>
  );
}
