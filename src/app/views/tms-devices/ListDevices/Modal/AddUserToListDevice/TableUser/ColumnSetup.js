import { Box, IconButton, Tooltip } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';

export const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 20,
    enableEditing: false,
    enableFilters: false,
    Cell: (row) => <span>{row.row.original.id}</span>,
  },
  {
    accessorKey: 'role-state',
    header: 'Role/State',
    enableEditing: false,
    enableSorting: false,
    enableColumnFilter: false,
    size: 50,
    Cell: (row) => (
      <Box>
        <Tooltip
          placement="left"
          title={
            row.row.original.rulename[0] === `ROLE_USER` && !row.row.original.rulename[1]
              ? 'User'
              : 'Admin'
          }
        >
          <IconButton>
            {row.row.original.rulename[0] === `ROLE_USER` && !row.row.original.rulename[1] ? (
              <PersonIcon color={row.row.original.active === true ? 'success' : 'error'} />
            ) : (
              <AdminPanelSettingsIcon
                color={row.row.original.active === true ? 'success' : 'error'}
              />
            )}
          </IconButton>
        </Tooltip>
      </Box>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    muiTableBodyCellEditTextFieldProps: {
      required: true,
    },
  },
  {
    accessorKey: 'username',
    header: 'Username',
    enableEditing: false,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    muiTableBodyCellEditTextFieldProps: {
      required: true,
    },
  },
  {
    accessorKey: 'company',
    header: 'Company',
    muiTableBodyCellEditTextFieldProps: {
      required: true,
    },
  },
  {
    accessorKey: 'contact',
    header: 'Contact',
    muiTableBodyCellEditTextFieldProps: {
      required: true,
      type: 'number',
    },
  },
];
