import { GoAAccordion, GoASpacer } from '@abgov/react-components';
import React from 'react';
import SoftDelete from './faqdetails/SoftDelete';

interface FAQItem {
    question: string;
    answer: string | React.ReactNode;
}

const faqs: FAQItem[] = [
    {
        question: 'How do I decommission/remove a service?',
        answer: <SoftDelete />,
    },
];

export default function FAQ() {
    return (
        <>
            {faqs.map((faq) => (
                <>
                    <GoAAccordion key={faq.question} heading={faq.question}>
                        {faq.answer}
                    </GoAAccordion>
                    <GoASpacer vSpacing="xs" />
                </>
            ))}
        </>
    );
}
