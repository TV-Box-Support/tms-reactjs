import { Box, IconButton, Tooltip } from '@mui/material';
import { NavLink } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';

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
    accessorKey: 'sn',
    header: 'Serial Number',
    enableEditing: false,
    enableSorting: false,
    enableColumnFilter: false,
    size: 50,
  },
  {
    accessorKey: 'model',
    header: 'Model',
    muiTableBodyCellEditTextFieldProps: {
      required: true,
    },
  },
  {
    accessorKey: 'ip',
    header: 'IP',
    enableEditing: false,
  },
  {
    accessorKey: 'firmwareVer',
    header: 'Firmware Version',
    muiTableBodyCellEditTextFieldProps: {
      required: true,
    },
  },
  {
    accessorKey: 'location',
    header: 'Location',
    muiTableBodyCellEditTextFieldProps: {
      required: true,
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    muiTableBodyCellEditTextFieldProps: {
      required: true,
    },
  },
  {
    accessorKey: 'detail',
    header: 'Detail',
    Cell: (row) => (
      <Box>
        <Tooltip arrow placement="bottom" title="Detail">
          <NavLink
            to={`/tms-devices/devices-management/device?id=${row.row.original.id}&sn=${row.row.original.sn}`}
          >
            <IconButton>
              <InfoIcon color="primary" />
            </IconButton>
          </NavLink>
        </Tooltip>
      </Box>
    ),
  },
];
