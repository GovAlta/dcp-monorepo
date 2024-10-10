import React from 'react';
import PartnerHeader from '../../img/partners-hero.svg';

export default function PartnersHeader() {
  return (
    <div className="goa-adm-body-header">
      <div className="container">
        <div className="goa-adm-body-header-content">
          <div className="goa-adm-breadcrumbs">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li className="goa-adm-breadcrumbs-active">Community partners</li>
            </ul>
          </div>
          <h1>Stay informed on government tech initiatives</h1>
          <p className="lede">
            Connect and collaborate with innovators, tech entrepreneurs, and
            Government of Alberta.
          </p>
        </div>

        <div className="goa-adm-body-header-graphic">
          <img src={PartnerHeader} alt="header-graphic" />
        </div>
      </div>
    </div>
  );
}
