import { useMemo } from "react";
import { useTable } from "react-table";
import "./Table.css";

const Table = ({ tableData, dataColumns }) => {
  const data = useMemo(() => tableData, [tableData]);

  const columns = useMemo(() => dataColumns, [dataColumns]);

  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const rowColor = (score) => {
    if (score > 90) return "high-score";
    if (score < 70) return "low-score";
  };

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          console.log(row.cells[2].value);
          return (
            <tr
              {...row.getRowProps()}
              className={rowColor(row.cells[2]?.value)}
            >
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
