import React from 'react';
import './styles.css';

interface CardsProps {
  title: string;
  date: string;
  link: string;
  lede: string;
}

const Cards: React.FC<CardsProps> = ({ title, link, date, lede }) => {
  return (
    /*<a href={link} className="goa-adm-cards-item">
      <div className="goa-adm-cards-title">
        <div>{title}</div>
      </div>
      <div className="goa-adm-cards-date">{date}</div>
      <div className="goa-adm-cards-lede">{lede}</div>
    </a>*/
    <div className="goa-adm-cards-item">
      <div className="goa-adm-cards-title">
        <div>{title}</div>
      </div>
      <div className="goa-adm-cards-date">{date}</div>
      <div className="goa-adm-cards-lede">{lede}</div>
      <div className="goa-adm-single-card-link">
        <a className="goa-adm-button-link goa-adm-secondary" href={link}>
          View challenge
        </a>
      </div>
    </div>
  );
};

export default Cards;
