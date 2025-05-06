import React from 'react';
import UnderstandingHeaderImg from '../../img/illustration-understanding-procurement.svg';
import './styles.css';

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
              <li>
                <a href="/supplier-support/">Supplier Support</a>
              </li>
              <li className="goa-adm-breadcrumbs-active">Procurement basics</li>
            </ul>
          </div>
          <h1>Procurement basics</h1>
          <p className="lede">
            Basics to understand and navigate government procurement.
          </p>
        </div>

        <div className="goa-adm-body-header-graphic">
          <img
            src={UnderstandingHeaderImg.src}
            alt="Graphic of person with question marks around their head and a sign pointing in different directions"
          />
        </div>
      </div>
    </div>
  );
}
