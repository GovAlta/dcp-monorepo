import { GoAButton, GoASpacer } from '@abgov/react-components-4.20.2';
import React from 'react';
import Feedback from '../../components/Feedback';
import BackToTop from '../../components/BackToTop';
import {
  glossaryItems
  } from './config';
import './styles.css';

type glossaryItem = {
  term: string;
  definition: string;
}; 

const GlossaryPage = () => {
    const sortedGlossaryItems = glossaryItems.sort((a, b) => a.term.localeCompare(b.term));
    const groupedItems = sortedGlossaryItems.reduce((acc:any, item) => {
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
      >Back
      </GoAButton>
      <GoASpacer vSpacing="2xl" />
      <h1>Glossary</h1>
       <p>
         This Glossary is a collection of important terms with their meanings used on this website.
       </p>
      <GoASpacer vSpacing="l" />

      <div className='alphabetList' >
          {alphabet.map(letter => (
            uniqueLetters.includes(letter) ? (
              <a href={`#${letter}`} key={letter}>{letter}</a>
            ) : (
              <span className='noLink' key={letter}>{letter}</span>
            )
          ))}
        </div>        
        <div>
          {alphabet.map(letter => (
            groupedItems[letter] ? (
              <>
              <hr />
              <div key={letter} id={letter}>                
                <h2>{letter}</h2>
                {groupedItems[letter].map((item: glossaryItem) => (
                  <>
                  
                  <div key={item.term}>
                    <b>{item.term}</b>
                    <p>{item.definition}</p>
                  </div>
                  <GoASpacer vSpacing="xs" />
                  </>
                ))}
                
              </div>
              <BackToTop /><br/>
              
              </>
            ) : null
          ))}          
        </div>

        <GoASpacer vSpacing="3xl" />
        <Feedback />
      

      </div>
    );
  };  
  


export default GlossaryPage;