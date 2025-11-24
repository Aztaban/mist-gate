import React from 'react';

interface AdminDataTableProps {
  title: string;
  data: any[];
  columns: string[];
  loading?: boolean;
  emptyMessage?: string;
  columnFormatters?: Record<string, (value: any, row: any) => React.ReactNode>;
  linkPath?: (row: any) => string;
}

const AdminDataTable: React.FC<AdminDataTableProps> = ({
  title,
  data,
  columns,
  loading = false,
  emptyMessage = 'No data available',
  columnFormatters,
  linkPath,
}) => {
  return (
    <section className="admin-panel admin-panel--table surface-dark">
      <header className="admin-panel__header">
        <h2 className="admin-panel__title">{title}</h2>
      </header>

      <div className="admin-panel__body">
        {loading ? (
          <p className="admin-panel__meta">Loading…</p>
        ) : data.length > 0 ? (
          <table className="table table--compact admin-table">
            <thead>
              <tr>
                {columns.map((column, colIndex) => (
                  <th key={column} className={colIndex === 0 ? '' : 'u-text-right'}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id || item._id || Math.random()}>
                  {columns.map((column, colIndex) => (
                    <td key={column} className={colIndex === 0 ? '' : 'u-text-right'}>
                      {columnFormatters?.[column] ? (
                        columnFormatters[column](item[column], item)
                      ) : typeof item[column] === 'boolean' ? (
                        item[column] ? (
                          'Yes'
                        ) : (
                          'No'
                        )
                      ) : colIndex === 0 && linkPath ? (
                        <a href={linkPath(item)}>{item[column]}</a>
                      ) : (
                        item[column] ?? '-'
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="admin-panel__meta admin-panel__meta--empty">{emptyMessage}</p>
        )}
      </div>
    </section>
  );
};

export default AdminDataTable;
