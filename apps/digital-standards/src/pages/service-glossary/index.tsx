import { GoAButton, GoASpacer } from '@abgov/react-components-4.20.2';
import React, { useEffect } from 'react';
import BackToTop from '../../components/BackToTop';
import { glossaryItems } from './config';
import './styles.css';

type glossaryItem = {
  term: string;
  definition: string;
};

const GlossaryPage = () => {
  useEffect(() => {
    if (window.location.hash) {
      const elmnt = document.getElementById(window.location.hash.substring(1));
      elmnt?.scrollIntoView(true);
    }
  }, []);
  const sortedGlossaryItems = glossaryItems.sort((a, b) =>
    a.term.localeCompare(b.term)
  );
  const groupedItems = sortedGlossaryItems.reduce((acc: any, item) => {
    const firstLetter = item.term[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  }, {});

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const uniqueLetters = Object.keys(groupedItems);

  return (
    <div data-pagefind-body>
      <GoAButton
        type="tertiary"
        size="compact"
        leadingIcon="arrow-back"
        onClick={() => (window.location.href = '/')}
      >
        Back
      </GoAButton>
      <GoASpacer vSpacing="2xl" />
      <h1 id="glossary">Glossary</h1>
      <p>
        This Glossary is a collection of important terms with their meanings
        used on this website.
      </p>
      <GoASpacer vSpacing="l" />

      <div className="alphabetList">
        {alphabet.map((letter) =>
          uniqueLetters.includes(letter) ? (
            <a href={`#${letter}`} key={letter}>
              {letter}
            </a>
          ) : (
            <span className="noLink" key={letter}>
              {letter}
            </span>
          )
        )}
      </div>
      <div>
        {alphabet.map((letter) =>
          groupedItems[letter] ? (
            <>
              <hr />
              <div key={letter} id={letter}>
                <h2>{letter}</h2>
                {groupedItems[letter].map((item: glossaryItem) => (
                  <>
                    <div key={item.term}>
                      <h5 id={item.term.replace(/\s+/g, '')}>{item.term}</h5>
                      <span>{item.definition}</span>
                    </div>
                    <GoASpacer vSpacing="xs" />
                  </>
                ))}
              </div>
              <BackToTop />
              <br />
            </>
          ) : null
        )}
      </div>
    </div>
  );
};

export default GlossaryPage;
