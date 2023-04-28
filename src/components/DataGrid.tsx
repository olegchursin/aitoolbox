import { useState, useCallback, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';

import data from '../data/data.json';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import styles from './DataGrid.module.css';

import { ColDef, IRowNode, ValueFormatterParams } from 'ag-grid-community';
import clsx from 'clsx';
import { useTheme } from 'next-themes';

const categoryCountMap = data.reduce((acc, obj) => {
  const { category } = obj;
  if (!acc[category]) {
    acc[category] = 1;
  } else {
    acc[category]++;
  }
  return acc;
}, {} as Record<string, number>);

interface AiToolsData {
  name: string;
  logo: string;
  description: string;
  repo: string;
  website: string;
  category: string;
  year: number;
}

function tooltipRenderer(params: ValueFormatterParams): JSX.Element {
  return <div title={params.value}>{params.value}</div>;
}

function logoRenderer(params: ValueFormatterParams): JSX.Element {
  return (
    <div className={styles.logorenderer}>
      <img src={params.value} width={30} height={30} alt={params.value} />
    </div>
  );
}

function githubRenderer(params: ValueFormatterParams): JSX.Element {
  return (
    <div className={styles.logorenderer}>
      <a href={params.value} target="_blank" rel="noopener">
        <svg
          width="25"
          height="25"
          viewBox="0 0 1024 1024"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
            transform="scale(64)"
            fill="#999"
          />
        </svg>
      </a>
    </div>
  );
}

// remove protocol and www from url
function formatUrl(url: string): string {
  return url.replace(/(^\w+:|^)\/\//, '').replace('www.', '');
}

function linkRenderer(params: any) {
  return (
    <a
      className={styles.linkrenderer}
      href={params.value}
      target="_blank"
      rel="noopener"
    >
      {formatUrl(params.value)}
    </a>
  );
}

const baseCellStyle = { display: 'flex', alignItems: 'center' };

const DataGrid = () => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const dataGridClass = `ag-theme-alpine${isDarkMode ? '-dark' : ''}`;
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '500px', width: '100%' }), []);
  const [rowData, setRowData] = useState<AiToolsData[]>();

  const categoriesFilterSet = new Set<string>([]);
  const [activeFiltersMap, setActiveFiltersMap] = useState<
    Record<string, boolean>
  >({});

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: 'logo',
      cellRenderer: logoRenderer,
      pinned: 'left',
      width: 70,
      resizable: false
    },
    {
      field: 'name',
      filter: true,
      width: 120,
      cellStyle: baseCellStyle
    },
    {
      field: 'website',
      cellRenderer: linkRenderer,
      width: 140,
      cellStyle: baseCellStyle
    },
    {
      field: 'year',
      filter: true,
      width: 100,
      cellStyle: baseCellStyle
    },
    {
      field: 'category',
      filter: true,
      width: 150,
      cellStyle: baseCellStyle
    },
    {
      field: 'description',
      width: 450,
      cellRenderer: tooltipRenderer,
      cellStyle: baseCellStyle
    },
    {
      field: 'repo',
      cellRenderer: githubRenderer,
      cellStyle: baseCellStyle,
      width: 70,
      resizable: false
    }
  ]);

  const onGridReady = useCallback(() => setRowData(data), []);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      sortable: true,
      resizable: true,
      filter: false
    };
  }, []);

  const onBtnExport = useCallback(() => {
    gridRef.current!.api.exportDataAsCsv();
  }, []);

  const handleCellClicked = (event: any) => console.log('e', event);

  const onCellClicked = useCallback(
    (event: any) => handleCellClicked(event),
    []
  );

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }, []);

  const externalFilterChanged = useCallback((newValue: string) => {
    setActiveFiltersMap(prev => ({ ...prev, [newValue]: !prev[newValue] }));
    categoriesFilterSet.has(newValue)
      ? categoriesFilterSet.delete(newValue)
      : categoriesFilterSet.add(newValue);

    gridRef.current!.api.onFilterChanged();
  }, []);

  const isExternalFilterPresent = useCallback((): boolean => {
    return categoriesFilterSet.size > 0;
  }, []);

  const doesExternalFilterPass = useCallback(
    (node: IRowNode<any>): boolean => {
      if (node.data) {
        return categoriesFilterSet.has(node.data.category);
      }
      return true;
    },
    [categoriesFilterSet.size]
  );

  const isActive = (category: string): boolean => {
    return activeFiltersMap[category];
  };

  const categoryFilter = (
    <div className="mb-4 flex gap-1">
      {Object.keys(categoryCountMap).map(category => {
        const active = isActive(category);
        return (
          <button
            onClick={() => externalFilterChanged(category)}
            key={category}
            type="button"
            className={clsx(
              'mr-2 inline-flex items-center rounded-full px-2.5 py-1.5',
              'text-center text-sm font-medium ',
              'focus:outline-none focus:ring-2 focus:ring-teal-300',
              `${active ? 'bg-teal-100' : 'bg-gray-100'} hover:bg-gray-200`,
              `${active ? 'dark:bg-teal-300' : 'dark:bg-gray-700'}`,
              ' dark:text-gray-300 dark:hover:bg-teal-700 dark:focus:ring-teal-800'
            )}
          >
            {category}
            <span className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-teal-200 text-xs font-semibold text-teal-800">
              {categoryCountMap[category]}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div>
      <div className="my-4" style={containerStyle}>
        {categoryFilter}

        <form className="mb-4 flex gap-2">
          <div className="flex flex-1">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="filter-text-box"
                className="z-20 block w-full rounded-lg border border-l-2 border-gray-300 border-l-gray-50 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:border-l-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
                placeholder="Search..."
                onInput={onFilterTextBoxChanged}
                required
              />
            </div>
          </div>

          <div className="w-150">
            <button
              type="button"
              onClick={onBtnExport}
              className="rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              Download CSV
              <span className="sr-only">Download CSV</span>
            </button>
          </div>
        </form>

        <div className={dataGridClass} style={gridStyle}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            animateRows={true}
            isExternalFilterPresent={isExternalFilterPresent}
            doesExternalFilterPass={doesExternalFilterPass}
            defaultColDef={defaultColDef}
            rowSelection="multiple"
            rowHeight={60}
            onGridReady={onGridReady}
            onCellClicked={onCellClicked}
          />
        </div>
      </div>
    </div>
  );
};

export default DataGrid;
