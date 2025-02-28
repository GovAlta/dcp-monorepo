import React, { useState, useEffect } from 'react';
import { GoASkeleton } from '@abgov/react-components';
import './styles.css';

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const headerOffset = 24; // Adjust this based on your fixed header height
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth', // Smooth scrolling behavior
    });
  }
};

type HeadingType = { id: string; text: string; level: number };
function useHeadings() {
  const [headings, setHeadings] = React.useState<HeadingType[]>([]);
  React.useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3'))
      .filter((element) => element.id)
      .map((element) => ({
        id: element.id,
        text: element.textContent ?? '',
        level: Number(element.tagName.substring(1)),
      }));
    setHeadings(elements);
  }, []);
  return headings;
}

// Now, the function that renders it all
function TableOfContents() {
  const headings = useHeadings();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <nav className="goa-adm-toc">
      <h3>Table of contents</h3>

      {isLoading ? (
        <>
          <ul className={`goa-loader`}>
            <li className={`goa-adm-toc-level-1`}>
              <GoASkeleton type="text" size={4}></GoASkeleton>
            </li>
            <li className={`goa-adm-toc-level-1 short`}>
              <GoASkeleton type="text" size={4}></GoASkeleton>
            </li>
            <li className={`goa-adm-toc-level-2`}>
              <GoASkeleton type="text" size={4}></GoASkeleton>
            </li>
            <li className={`goa-adm-toc-level-2 short`}>
              <GoASkeleton type="text" size={4}></GoASkeleton>
            </li>
            <li className={`goa-adm-toc-level-1`}>
              <GoASkeleton type="text" size={4}></GoASkeleton>
            </li>
            <li className={`goa-adm-toc-level-1`}>
              <GoASkeleton type="text" size={4}></GoASkeleton>
            </li>
            <li className={`goa-adm-toc-level-1 short`}>
              <GoASkeleton type="text" size={4}></GoASkeleton>
            </li>
            <li className={`goa-adm-toc-level-2`}>
              <GoASkeleton type="text" size={4}></GoASkeleton>
            </li>
            <li className={`goa-adm-toc-level-1`}>
              <GoASkeleton type="text" size={4}></GoASkeleton>
            </li>
          </ul>
        </>
      ) : (
        <ul>
          {headings.map((heading) => (
            <li
              className={`goa-adm-toc-level-${heading.level - 1}`}
              key={heading.id}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(heading.id);
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default TableOfContents;
