import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GoabText,
  GoabButton,
  GoabFormItem,
  GoabInput,
  GoabBadge,
  GoabIcon
} from '@abgov/react-components';
import { usePageHeader } from '../contexts/PageHeaderContext';
import { mockItems } from '../data/mockData';
import { getStatusBadgeProps } from '../utils/badgeUtils';
import { formatDate } from '../utils/dateUtils';
import type { Item } from '../types';

/**
 * SearchPage - Full search functionality
 *
 * Features:
 * - Text search across all fields
 * - Results list with links to detail
 * - Empty states for no query and no results
 */
export function SearchPage() {
  usePageHeader('Search');

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Item[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;

    const lowerQuery = query.toLowerCase();
    const matched = mockItems.filter(item =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.referenceNumber.toLowerCase().includes(lowerQuery) ||
      item.assignedTo.toLowerCase().includes(lowerQuery) ||
      item.region.toLowerCase().includes(lowerQuery)
    );

    setResults(matched);
    setHasSearched(true);
  };

  return (
    <div className="content-padding" style={{ paddingBottom: '32px' }}>
      {/* Search form */}
      <div className="search-form">
        <GoabFormItem label="Search items" mb="m">
          <div className="search-input-row">
            <GoabInput
              name="searchQuery"
              value={query}
              leadingIcon="search"
              width="100%"
              placeholder="Enter search terms..."
              onChange={(detail) => setQuery(detail.value)}
              onKeyPress={(detail) => detail.key === 'Enter' && handleSearch()}
            />
            <GoabButton type="primary" onClick={handleSearch}>
              Search
            </GoabButton>
          </div>
        </GoabFormItem>
      </div>

      {/* Results */}
      {!hasSearched ? (
        <div className="empty-state">
          <GoabIcon type="search" size="large" />
          <GoabText as="span" size="body-m" mt="m">Enter a search term</GoabText>
          <GoabText as="span" size="body-s">Search by title, reference number, assignee, or region.</GoabText>
        </div>
      ) : results.length === 0 ? (
        <div className="empty-state">
          <GoabIcon type="search" size="large" />
          <GoabText as="span" size="body-m" mt="m">No results found</GoabText>
          <GoabText as="span" size="body-s">Try different search terms.</GoabText>
        </div>
      ) : (
        <>
          <GoabText as="h2" size="heading-s" mt="l" mb="m">
            {results.length} result{results.length !== 1 ? 's' : ''} found
          </GoabText>

          <div className="search-results-list">
            {results.map(item => (
              <div key={item.id} className="search-result-card">
                <div className="search-result-header">
                  <Link to={`/items/${item.id}`} className="search-result-link">
                    <GoabText as="span" size="body-m" mt="none" mb="none">{item.title}</GoabText>
                  </Link>
                  <GoabBadge {...getStatusBadgeProps(item.status)} />
                </div>
                <div className="search-result-meta">
                  <span>{item.referenceNumber}</span>
                  <span>|</span>
                  <span>{item.assignedTo}</span>
                  <span>|</span>
                  <span>Due {formatDate(item.dueDate)}</span>
                </div>
                <GoabText as="p" size="body-s" mt="s" mb="none">
                  {item.description}
                </GoabText>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
