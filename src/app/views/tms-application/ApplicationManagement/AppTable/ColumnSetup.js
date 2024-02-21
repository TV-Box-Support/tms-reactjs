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
    header: 'App Name',
    enableEditing: false,
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: 'packagename',
    header: 'Package',
    enableEditing: false,
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: 'version',
    header: 'Version',
    enableEditing: false,
    enableSorting: false,
    enableColumnFilter: false,
  },
];
