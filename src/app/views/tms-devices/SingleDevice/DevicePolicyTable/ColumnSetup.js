// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Box,
  // Tooltip,
  Typography,
} from '@mui/material';
// import { Circle, Pending } from '@mui/icons-material';
// import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
// import ErrorIcon from '@mui/icons-material/Error';
// import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import { CheckTimeOut } from 'app/components/CheckTimeOut';

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
    accessorKey: 'policyName',
    header: 'Policy',
    enableEditing: false,
    enableSorting: false,
  },
  // {
  //   accessorKey: 'commandName',
  //   header: 'Command',
  //   enableEditing: false,
  //   enableSorting: false,
  // },
  {
    accessorKey: 'action',
    header: 'Action',
    enableEditing: false,
    enableSorting: false,
    Cell: (row) => (
      <Box>
        {row.row.original.action === 1
          ? 'Install'
          : row.row.original.action === 2
          ? 'Uninstall'
          : 'Run command'}
      </Box>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    enableEditing: false,
    enableSorting: false,
    Cell: (row) => (
      <Box>
        {row.row.original.status === 0 ? (
          // <Tooltip arrow placement="top" title="Not run">
          //   <DoNotDisturbOnIcon color="disabled" />
          // </Tooltip>
          <Typography color="grey" fontWeight={'bold'}>
            Not run
          </Typography>
        ) : row.row.original.status === 1 ? (
          // <Tooltip arrow placement="top" title="Run">
          //   <Pending color="secondary" />
          // </Tooltip>
          <Typography color="blue" fontWeight={'bold'}>
            Run
          </Typography>
        ) : row.row.original.status === 2 ? (
          // <Tooltip
          //   arrow
          //   placement="top"
          //   title={CheckTimeOut(row.row.original.modifiedDate) ? 'TimeOut' : 'Running'}
          // >
          //   {CheckTimeOut(row.row.original.modifiedDate) ? (
          //     <RunningWithErrorsIcon color="primary" />
          //   ) : (
          //     <Circle color="primary" />
          //   )}
          // </Tooltip>
          <Typography
            color={CheckTimeOut(row.row.original.modifiedDate) ? 'error' : 'blue'}
            fontWeight={'bold'}
          >
            {CheckTimeOut(row.row.original.modifiedDate) ? 'TimeOut' : 'Running'}
          </Typography>
        ) : row.row.original.status === 3 ? (
          // <Tooltip arrow placement="top" title="Success">
          //   <CheckCircleIcon color="success" />
          // </Tooltip>
          <Typography color="green" fontWeight={'bold'}>
            Success
          </Typography>
        ) : (
          // <Tooltip arrow placement="top" title="Cancel">
          //   <ErrorIcon color="error" />
          // </Tooltip>
          <Typography color="error" fontWeight={'bold'}>
            Cancel
          </Typography>
        )}
      </Box>
    ),
  },
];
