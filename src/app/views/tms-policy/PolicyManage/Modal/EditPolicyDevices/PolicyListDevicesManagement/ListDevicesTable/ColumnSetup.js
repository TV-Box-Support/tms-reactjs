import PostAddIcon from '@mui/icons-material/PostAdd';

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
  {
    accessorKey: 'addToPolicy',
    header: 'Add to policy',
    enableEditing: false,
    Cell: (row) => <span>{row.row.original.id}</span>,
  },
];
