import React from 'react';
import { GoAAppFooter, GoAAppFooterNavSection } from '@abgov/react-components';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <GoAAppFooter maxContentWidth="1500px">
            <GoAAppFooterNavSection maxColumnCount={1}>
                <Link to="/gettingstarted#getting-started">
                    Getting started
                </Link>
                <Link to="/about">About</Link>
                <Link to="/ecosystem">Eco-system</Link>
            </GoAAppFooterNavSection>

            <GoAAppFooterNavSection>
                <Link to="/services">Services</Link>
                <Link to="/support">Support</Link>
            </GoAAppFooterNavSection>
        </GoAAppFooter>
    );
};

export default Footer;
