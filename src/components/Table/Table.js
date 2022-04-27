import { useMemo } from "react";
import { useTable } from "react-table";
import "./Table.css";

const Table = ({ tableData }) => {
  // const [data, setData] = useState();
  const data = useMemo(() => tableData, [tableData]);

  // useEffect(() => setData(tableData), [tableData]);

  console.log("From table:", tableData);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name:",
        accessor: "name",
      },
      {
        Header: "Score",
        accessor: "score",
      },
      {
        Header: "Duration (days)",
        accessor: "durationInDays",
      },
      {
        Header: "Bugs",
        accessor: "bugsCount",
      },
      {
        Header: "Made Deadline?",
        accessor: "madeDadeline",
      },
    ],
    []
  );

  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

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
          return (
            <tr {...row.getRowProps()}>
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
