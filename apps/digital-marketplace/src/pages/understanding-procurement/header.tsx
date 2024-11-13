import React from 'react';
import UnderstandingHeaderImg from '../../img/illustration-understanding-procurement.svg';

export default function UnderstandingHeader() {
  return (
    <div className="goa-adm-body-header">
      <div className="container">
        <div className="goa-adm-body-header-content">
          <div className="goa-adm-breadcrumbs">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li className="goa-adm-breadcrumbs-active">Understanding procurement</li>
            </ul>
          </div>
          <h1>Understanding procurement</h1>
          <p className="lede">
            Basics to understand and navigate government procurement.
          </p>
        </div>

        <div className="goa-adm-body-header-graphic">
          <img src={UnderstandingHeaderImg} alt="header-graphic" />
        </div>
      </div>
    </div>
  );
}