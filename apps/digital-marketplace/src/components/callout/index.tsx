import React from 'react';
import './styles.css';

interface CalloutProps {
  title: string;
  content: React.ReactNode;
  link: string;
  linkText: string;
}

const Callout: React.FC<CalloutProps> = ({
  title,
  content,
  link,
  linkText,
}) => {
  return (
    <section className="goa-adm-apc-callout">
      <h2>{title}</h2>
      <p>{content}</p>
      <a
        className="goa-adm-button-link"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {linkText}
      </a>
    </section>
  );
};

export default Callout;
