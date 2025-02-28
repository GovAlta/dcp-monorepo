import React from 'react';
import JoinHeader from '../../img/illustration-join.svg';
import './styles.css';

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
                            <li className="goa-adm-breadcrumbs-active">Join</li>
                        </ul>
                    </div>
                    <h1>Maximize your impact</h1>
                    <p className="lede">
                        Receive the latest updates on government tech
                        initiatives.
                    </p>
                </div>

                <div className="goa-adm-body-header-graphic">
                    <img
                        src={JoinHeader.src}
                        alt="Graphic of person holding up a sign with a letter inside"
                    />
                </div>
            </div>
        </div>
    );
}
