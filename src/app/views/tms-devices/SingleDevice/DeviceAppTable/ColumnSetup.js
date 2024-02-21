import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, IconButton, Tooltip } from '@mui/material';

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
  {
    accessorKey: 'issystem',
    header: 'System App',
    enableEditing: false,
    enableSorting: false,
    enableColumnFilter: false,
    Cell: (row) => (
      <Box>
        <Tooltip placement="top" title={row.row.original.issystem ? 'System App' : ''}>
          <IconButton>
            {row.row.original.issystem && <CheckCircleIcon color={'success'} />}
          </IconButton>
        </Tooltip>
      </Box>
    ),
  },
];
