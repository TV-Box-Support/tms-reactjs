export const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 20,
    enableEditing: false,
    enableFilters: false,
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    Cell: (row) => <span>{row.row.original.id}</span>,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    enableEditing: false,
    enableSorting: false,
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'description',
    header: 'Description',
    enableEditing: false,
  },
];
