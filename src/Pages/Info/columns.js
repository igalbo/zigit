export const personalColumns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Team",
    accessor: "Team",
  },
  {
    Header: "Joined At",
    accessor: "joinedAt",
  },
  {
    Header: "Avatar",
    accessor: (data) => <img src={data.avatar} />,
  },
];

export const infoColumns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Name",
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
    accessor: (data) => data.madeDadeline.toString(),
  },
];
