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
    accessorKey: 'packagename',
    header: 'Package Name',
    muiTableHeadCellProps: {
      align: 'left',
    },
    muiTableBodyCellProps: {
      align: 'left',
    },
    muiTableBodyCellEditTextFieldProps: {
      required: true,
    },
  },
  {
    accessorKey: 'version',
    header: 'Version',
    muiTableHeadCellProps: {
      align: 'left',
    },
    muiTableBodyCellProps: {
      align: 'left',
    },
    muiTableBodyCellEditTextFieldProps: {
      required: true,
    },
  },
  {
    accessorKey: 'apkfileUrl',
    header: 'Url',
    muiTableHeadCellProps: {
      align: 'left',
    },
    muiTableBodyCellProps: {
      align: 'left',
    },
  },
];
