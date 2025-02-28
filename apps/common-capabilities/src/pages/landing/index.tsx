import React from 'react';
import {
    GoAGrid,
    GoAHeroBanner,
    GoAPageBlock,
    GoASpacer,
    GoAButton,
} from '@abgov/react-components';
import './styles.css';
import ExternalLink from '../../components/ExternalLink';
import Category from './category';
import { categories } from './config';
import { useNavigate } from 'react-router-dom';

export default function Landing(): JSX.Element {
    const navigate = useNavigate();

    return (
        <div>
            <GoAHeroBanner
                heading="Discover services designed for product teams within GoA"
                minHeight="20%"
                textColor="#333333"
                backgroundColor="#F1F1F1"
                maxContentWidth="1200px"
            >
                <div className="cc-hero-subheading">
                    Built for developers, digital architects, and service
                    integration experts to explore existing software, tools, and
                    APIs.
                </div>
            </GoAHeroBanner>

            <GoASpacer vSpacing="l" />
            <GoAPageBlock width="1200px">
                <h2>Browse services by category</h2>
                <GoASpacer vSpacing="s" />
                <GoAGrid minChildWidth="30ch" gap="2xl">
                    {categories.map((category) => (
                        <Category
                            key={category.title}
                            title={category.title}
                            description={category.description}
                            link={category.link}
                        />
                    ))}
                </GoAGrid>

                <GoASpacer vSpacing="2xl" />
                <GoAButton
                    type="primary"
                    size="normal"
                    variant="normal"
                    trailingIcon="arrow-forward"
                    onClick={() => navigate('/services')}
                >
                    Browse all services
                </GoAButton>

                <GoASpacer vSpacing="l" />
                <h2>Using common capabilities helps you:</h2>
                <ul className="goa-unordered-list cc-list-design-system">
                    <li>
                        Explore and find existing services including software,
                        tools, and APIs that you can reuse or repurpose.
                    </li>
                    <li>
                        Review and evaluate various GoA services based on your
                        development needs in one place.
                    </li>
                    <li>
                        Connect with service providers and teams who built or
                        maintain the service to learn more about implementation
                        or access the documentation to obtain code.
                    </li>
                </ul>

                <ExternalLink
                    link={'/gettingstarted'}
                    text={
                        'Learn how common capabilities is different from other similar resources that exist within GoA'
                    }
                    newTab={false}
                />

                <GoASpacer vSpacing="l" />

                <h2>Start building with the design system</h2>
                <p>
                    Use the design system to build your product quickly and
                    align with government standards. The design system includes
                    resources and guidelines for:
                </p>
                <ul className="goa-unordered-list cc-list-design-system">
                    <li>Patterns and templates</li>
                    <li>Components</li>
                    <li>Styles</li>
                    <li>Content</li>
                </ul>

                <ExternalLink
                    link={'https://design.alberta.ca/'}
                    text={'Go to design system'}
                />

                <GoASpacer vSpacing="4xl" />
            </GoAPageBlock>
        </div>
    );
}
