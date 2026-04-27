import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GoabText,
  GoabButton,
  GoabButtonGroup,
  GoabTabs,
  GoabTab,
  GoabFormItem,
  GoabInput,
  GoabFilterChip,
  GoabTable,
  GoabTableSortHeader,
  GoabCheckbox,
  GoabBadge,
  GoabIcon,
  GoabDropdown,
  GoabDropdownItem,
  GoabDrawer,
  GoabModal,
  GoabDivider,
  GoabDataGrid
} from '@abgov/react-components';
import { usePageHeader } from '../contexts/PageHeaderContext';
import { ScrollContainer } from '../components/ScrollContainer';
import { filterData, sortData } from '../utils/searchUtils';
import { getPriorityBadgeProps, getStatusBadgeProps } from '../utils/badgeUtils';
import { mockFetch } from '../utils/mockApi';
import { mockItems, currentUser } from '../data/mockData';
import type { Item } from '../types';

interface ItemsPageProps {
  myItemsOnly?: boolean;
}

/**
 * ItemsPage - List page for items with filtering, sorting, and actions
 *
 * Features:
 * - Tab filtering by category
 * - Search with chips
 * - Filter drawer
 * - Sortable columns
 * - Row selection
 * - Delete confirmation modal
 *
 * This is a comprehensive example - simplify based on your needs.
 */
export function ItemsPage({ myItemsOnly = false }: ItemsPageProps) {
  // Page header with actions
  const headerActions = useMemo(() => (
    <GoabButtonGroup gap="compact" alignment="start">
      <GoabButton type="secondary" size="compact">Export</GoabButton>
      <GoabButton type="primary" size="compact">New Item</GoabButton>
    </GoabButtonGroup>
  ), []);
  usePageHeader(myItemsOnly ? 'My Items' : 'All Items', headerActions);

  // Data state
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter state
  const [activeTab, setActiveTab] = useState('all');
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [typedChips, setTypedChips] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Item | ''; direction: 'asc' | 'desc' | 'none' }>({
    key: '',
    direction: 'none'
  });

  // Drawer filter state
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [pendingFilters, setPendingFilters] = useState({
    status: [] as string[],
    priority: [] as string[],
    region: [] as string[]
  });
  const [appliedFilters, setAppliedFilters] = useState({
    status: [] as string[],
    priority: [] as string[],
    region: [] as string[]
  });

  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await mockFetch<Item[]>(
        myItemsOnly
          ? mockItems.filter(item => item.assignedTo === currentUser.name)
          : mockItems
      );
      setItems(data);
      setIsLoading(false);
    };
    fetchData();
  }, [myItemsOnly]);

  // Extract filter options from data
  const filterOptions = useMemo(() => ({
    statuses: [...new Set(items.map(item => item.statusText))].sort(),
    priorities: ['high', 'medium', 'low'],
    regions: [...new Set(items.map(item => item.region))].sort()
  }), [items]);

  // Filter and sort
  const filteredItems = useMemo(() => {
    let filtered = items;

    // Tab filter
    if (activeTab !== 'all') {
      filtered = filtered.filter(item => item.category === activeTab);
    }

    // Search chips
    filtered = filterData(typedChips, filtered);

    // Drawer filters
    if (appliedFilters.status.length > 0) {
      filtered = filtered.filter(item => appliedFilters.status.includes(item.statusText));
    }
    if (appliedFilters.priority.length > 0) {
      filtered = filtered.filter(item => appliedFilters.priority.includes(item.priority));
    }
    if (appliedFilters.region.length > 0) {
      filtered = filtered.filter(item => appliedFilters.region.includes(item.region));
    }

    return sortData(filtered, sortConfig.key, sortConfig.direction);
  }, [items, activeTab, typedChips, sortConfig, appliedFilters]);

  // Selection state
  const selectedCount = useMemo(() =>
    filteredItems.filter(item => item.selected).length,
    [filteredItems]
  );
  const isAllSelected = selectedCount > 0 && selectedCount === filteredItems.length;
  const isIndeterminate = selectedCount > 0 && selectedCount < filteredItems.length;

  // Handlers
  const applyFilter = (valueOverride?: string) => {
    const value = valueOverride ?? inputValue;
    const trimmed = value.trim();
    if (!trimmed) {
      setInputError('Search field empty');
      return;
    }
    if (typedChips.includes(trimmed)) {
      setInputError('Already added');
      return;
    }
    setTypedChips([...typedChips, trimmed]);
    setInputValue('');
    setInputError('');
  };

  const togglePendingFilter = (category: keyof typeof pendingFilters, value: string) => {
    setPendingFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
  };

  const applyFilters = () => {
    setAppliedFilters(pendingFilters);
    setFilterDrawerOpen(false);
  };

  const clearAllFilters = () => {
    setTypedChips([]);
    setAppliedFilters({ status: [], priority: [], region: [] });
    setPendingFilters({ status: [], priority: [], region: [] });
  };

  const handleSort = (detail: { sortBy: string; sortDir: number }) => {
    const { sortBy, sortDir } = detail;
    setSortConfig({
      key: sortBy as keyof Item,
      direction: sortDir === 1 ? 'asc' : sortDir === -1 ? 'desc' : 'none'
    });
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setItems(items.filter(item => item.id !== itemToDelete));
    }
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  // Build filter chips for display
  const filterChips = useMemo(() => {
    const chips: { category: string; value: string; label: string }[] = [];
    appliedFilters.status.forEach(v => chips.push({ category: 'status', value: v, label: v }));
    appliedFilters.priority.forEach(v => chips.push({ category: 'priority', value: v, label: `${v.charAt(0).toUpperCase() + v.slice(1)} priority` }));
    appliedFilters.region.forEach(v => chips.push({ category: 'region', value: v, label: v }));
    return chips;
  }, [appliedFilters]);

  return (
    <div style={{ maxWidth: '100%', overflow: 'hidden', paddingBottom: '32px' }}>
      {/* Filter section */}
      <div className="content-padding">
        <div className="filter-section">
          <GoabTabs initialTab={1} onChange={(detail) => {
            const tabMap = ['all', 'new', 'update', 'renewal'];
            setActiveTab(tabMap[detail.tab - 1]);
          }}>
            <GoabTab heading="All" />
            <GoabTab heading="New" />
            <GoabTab heading="Update" />
            <GoabTab heading="Renewal" />
          </GoabTabs>

          <GoabFormItem error={inputError} labelSize="compact">
            <div className="search-row">
              <div className="search-group">
                <GoabInput
                  name="filterInput"
                  value={inputValue}
                  leadingIcon="search"
                  width="100%"
                  size="compact"
                  placeholder="Search items..."
                  onChange={(detail) => { setInputValue(detail.value); setInputError(''); }}
                  onKeyPress={(detail) => detail.key === 'Enter' && applyFilter(detail.value)}
                />
                <GoabButton type="tertiary" size="compact" onClick={() => applyFilter()}>
                  Search
                </GoabButton>
              </div>
              <div className="actions-group">
                <GoabDropdown
                  value={sortConfig.key}
                  onChange={(detail) => setSortConfig({ key: detail.value as keyof Item, direction: 'asc' })}
                  placeholder="Sort by"
                  size="compact"
                  width="160px"
                >
                  <GoabDropdownItem value="dueDate" label="Due date" />
                  <GoabDropdownItem value="priority" label="Priority" />
                  <GoabDropdownItem value="status" label="Status" />
                </GoabDropdown>
                <GoabButton
                  type="tertiary"
                  leadingIcon="filter"
                  size="compact"
                  onClick={() => { setPendingFilters(appliedFilters); setFilterDrawerOpen(true); }}
                >
                  Filter
                </GoabButton>
              </div>
            </div>
          </GoabFormItem>
        </div>

        {/* Filter chips */}
        {(typedChips.length > 0 || filterChips.length > 0) && (
          <div className="chips-container">
            <GoabIcon type="filter" size="small" fillColor="var(--goa-color-text-secondary)" mr="2xs" />
            {typedChips.map(chip => (
              <GoabFilterChip key={`search-${chip}`} content={chip} onClick={() => setTypedChips(prev => prev.filter(c => c !== chip))} />
            ))}
            {filterChips.map(chip => (
              <GoabFilterChip
                key={`${chip.category}-${chip.value}`}
                content={chip.label}
                onClick={() => setAppliedFilters(prev => ({
                  ...prev,
                  [chip.category]: prev[chip.category as keyof typeof prev].filter(v => v !== chip.value)
                }))}
              />
            ))}
            <GoabButton size="compact" type="tertiary" onClick={clearAllFilters}>Clear all</GoabButton>
          </div>
        )}
      </div>

      {/* Data table */}
      <ScrollContainer>
        <div className="table-wrapper">
          <GoabDataGrid>
            <GoabTable width="100%" onSort={handleSort} variant="relaxed" striped>
              <thead>
                <tr>
                  <th className="goa-table-cell--checkbox">
                    <GoabCheckbox
                      name="selectAll"
                      checked={isAllSelected}
                      indeterminate={isIndeterminate}
                      onChange={() => setItems(prev => prev.map(item => ({ ...item, selected: !isAllSelected && !isIndeterminate })))}
                      ariaLabel="Select all"
                    />
                  </th>
                  <th><GoabTableSortHeader name="status">Status</GoabTableSortHeader></th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Assigned to</th>
                  <th><GoabTableSortHeader name="dueDate">Due date</GoabTableSortHeader></th>
                  <th>Region</th>
                  <th>Reference #</th>
                  <th><GoabTableSortHeader name="priority">Priority</GoabTableSortHeader></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  [...Array(10)].map((_, i) => (
                    <tr key={i}>
                      <td><div className="skeleton skeleton--checkbox" /></td>
                      <td><div className="skeleton skeleton--badge" /></td>
                      <td><div className="skeleton skeleton--text" /></td>
                      <td><div className="skeleton skeleton--text-short" /></td>
                      <td><div className="skeleton skeleton--text" /></td>
                      <td><div className="skeleton skeleton--text-short" /></td>
                      <td><div className="skeleton skeleton--text-short" /></td>
                      <td><div className="skeleton skeleton--text" /></td>
                      <td><div className="skeleton skeleton--badge" /></td>
                      <td><div className="skeleton skeleton--icon" /></td>
                    </tr>
                  ))
                ) : filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="empty-state-cell">
                      <div className="empty-state">
                        <GoabIcon type="search" size="large" />
                        <GoabText as="span" size="body-m" mt="m">No results found</GoabText>
                        <GoabText as="span" size="body-s">Try adjusting your search or filters.</GoabText>
                        <GoabButton type="tertiary" size="compact" onClick={clearAllFilters} mt="m">Clear filters</GoabButton>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredItems.map(item => (
                    <tr key={item.id} aria-selected={item.selected}>
                      <td className="goa-table-cell--checkbox">
                        <GoabCheckbox
                          name={`select-${item.id}`}
                          checked={item.selected}
                          onChange={() => setItems(prev => prev.map(i => i.id === item.id ? { ...i, selected: !i.selected } : i))}
                          ariaLabel={`Select ${item.title}`}
                        />
                      </td>
                      <td><GoabBadge {...getStatusBadgeProps(item.status)} /></td>
                      <td style={{ whiteSpace: 'nowrap' }}>
                        <Link to={`/items/${item.id}`} className="table-row-link">{item.title}</Link>
                      </td>
                      <td style={{ whiteSpace: 'nowrap' }}>{item.category}</td>
                      <td style={{ whiteSpace: 'nowrap' }}>{item.assignedTo}</td>
                      <td style={{ whiteSpace: 'nowrap' }}>{item.dueDate}</td>
                      <td style={{ whiteSpace: 'nowrap' }}>{item.region}</td>
                      <td>{item.referenceNumber}</td>
                      <td><GoabBadge {...getPriorityBadgeProps(item.priority)} /></td>
                      <td>
                        <GoabButton
                          type="tertiary"
                          size="compact"
                          leadingIcon="trash"
                          onClick={() => { setItemToDelete(item.id); setShowDeleteModal(true); }}
                          ariaLabel="Delete"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </GoabTable>
          </GoabDataGrid>
        </div>
      </ScrollContainer>

      {/* Filter drawer */}
      <GoabDrawer heading="Filter items" position="right" open={filterDrawerOpen} maxSize="300px" onClose={() => setFilterDrawerOpen(false)}
        actions={
          <GoabButtonGroup alignment="start" gap="compact">
            <GoabButton type="primary" size="compact" onClick={applyFilters}>Apply filters</GoabButton>
            <GoabButton type="tertiary" size="compact" onClick={() => setFilterDrawerOpen(false)}>Cancel</GoabButton>
          </GoabButtonGroup>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--goa-space-l)' }}>
          <GoabFormItem label="Status">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--goa-space-xs)' }}>
              {filterOptions.statuses.map(status => (
                <GoabCheckbox key={status} name={`status-${status}`} text={status}
                  checked={pendingFilters.status.includes(status)}
                  onChange={() => togglePendingFilter('status', status)} />
              ))}
            </div>
          </GoabFormItem>
          <GoabFormItem label="Priority">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--goa-space-xs)' }}>
              {filterOptions.priorities.map(p => (
                <GoabCheckbox key={p} name={`priority-${p}`} text={p.charAt(0).toUpperCase() + p.slice(1)}
                  checked={pendingFilters.priority.includes(p)}
                  onChange={() => togglePendingFilter('priority', p)} />
              ))}
            </div>
          </GoabFormItem>
          <GoabFormItem label="Region">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--goa-space-xs)' }}>
              {filterOptions.regions.map(r => (
                <GoabCheckbox key={r} name={`region-${r}`} text={r}
                  checked={pendingFilters.region.includes(r)}
                  onChange={() => togglePendingFilter('region', r)} />
              ))}
            </div>
          </GoabFormItem>
          {Object.values(pendingFilters).some(arr => arr.length > 0) && (
            <><GoabDivider /><GoabButton type="tertiary" size="compact" onClick={() => setPendingFilters({ status: [], priority: [], region: [] })}>Clear all</GoabButton></>
          )}
        </div>
      </GoabDrawer>

      {/* Delete modal */}
      <GoabModal heading="Delete item" open={showDeleteModal} calloutVariant="emergency"
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="tertiary" size="compact" onClick={() => setShowDeleteModal(false)}>Cancel</GoabButton>
            <GoabButton type="primary" size="compact" variant="destructive" onClick={confirmDelete}>Delete</GoabButton>
          </GoabButtonGroup>
        }
      >
        <GoabText mt="none" mb="none">Are you sure you want to delete this item? This action cannot be undone.</GoabText>
      </GoabModal>
    </div>
  );
}
