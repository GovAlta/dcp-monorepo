import React from 'react';
import ProcurementConciergeHeaderImg from '../../img/illustration-procurement-concierge-program.svg';
import './styles.css';

export default function ProcurementConciergeHeader() {
  return (
    <div className="goa-adm-body-header">
      <div className="container">
        <div className="goa-adm-body-header-content">
          <div className="goa-adm-breadcrumbs">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li className="goa-adm-breadcrumbs-active">Supplier Outreach Program</li>
            </ul>
          </div>
          <h1>Supplier Outreach Program</h1>
          <p className="lede">
          Tailored guidance to help you understand the government procurement process.
          </p>
        </div>

        <div className="goa-adm-body-header-graphic">
          <img src={ProcurementConciergeHeaderImg.src} alt="header-graphic" />
        </div>
      </div>
    </div>
  );
}