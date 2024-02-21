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
    accessorKey: 'sn',
    header: 'Serial Number',
    enableEditing: false,
    enableSorting: false,
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    enableColumnFilter: false,
    size: 50,
  },
  {
    accessorKey: 'model',
    header: 'Model',
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    muiTableBodyCellEditTextFieldProps: {
      required: true,
    },
  },
  {
    accessorKey: 'ip',
    header: 'IP',
    enableEditing: false,
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
  },
  {
    accessorKey: 'firmwareVer',
    header: 'Firmware Version',
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    muiTableBodyCellEditTextFieldProps: {
      required: true,
    },
  },
  {
    accessorKey: 'location',
    header: 'Location',
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    muiTableBodyCellEditTextFieldProps: {
      required: true,
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    muiTableBodyCellEditTextFieldProps: {
      required: true,
    },
  },
];
