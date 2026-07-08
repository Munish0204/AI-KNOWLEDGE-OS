const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            {columns.map((column) => (
              <th key={column} className="p-3 text-left">
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-50"
            >
              {Object.values(row).map((value, i) => (
                <td key={i} className="p-3">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;