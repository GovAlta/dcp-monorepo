import React from 'react';
import SupplierHeader from '../../img/suppliers-hero.svg';

export default function Header() {
  return (
    <div className="goa-adm-body-header">
      <div className="container">
        <div className="goa-adm-body-header-content">
          <div className="goa-adm-breadcrumbs">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li className="goa-adm-breadcrumbs-active">Suppliers</li>
            </ul>
          </div>
          <h1>
            Maximize your <br />
            impact
          </h1>
          <p className="lede">
            Join Alberta's Digital Marketplace as a provider of innovative
            solutions in digital services to power the next generation of public
            services.
          </p>
        </div>

        <div className="goa-adm-body-header-graphic">
          <img src={SupplierHeader} alt="header-graphic" />
        </div>
      </div>
    </div>
  );
}
