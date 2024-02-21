export const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 20,
    enableEditing: false,
    enableSorting: false,
    Cell: (row) => <span>{row.row.original.id}</span>,
  },
  {
    accessorKey: 'packagename',
    header: 'Package Name',
    enableEditing: false,
    enableSorting: false,
  },
  {
    accessorKey: 'version',
    header: 'Version',
    enableEditing: false,
    enableSorting: false,
  },
  {
    accessorKey: 'packagesize',
    header: 'Size (bytes)',
    enableEditing: false,
    enableSorting: false,
  },
];
