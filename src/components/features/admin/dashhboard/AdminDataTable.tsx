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
    <div className="admin-table-container">
      <h2>{title}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : data.length > 0 ? (
        <table className="admin-table">
          <thead>
            <tr>
              {columns.map((column, colIndex) => (
                <th className={colIndex === 0 ? 'text-align-left' : 'text-align-right'} key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id || item._id || Math.random()}>
                {columns.map((column, colIndex) => (
                  <td key={column} className={colIndex === 0 ? '' : 'text-align-right'}>
                    {columnFormatters?.[column] ? (
                      columnFormatters[column](item[column], item)
                    ) : typeof item[column] === 'boolean' ? (
                      item[column] ? (
                        'Yes'
                      ) : (
                        'No'
                      )
                    ) : columns.indexOf(column) === 0 && linkPath ? (
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
        <p>{emptyMessage}</p>
      )}
    </div>
  );
};

export default AdminDataTable;
