import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
import { getADeviceInfo } from 'app/Services/DevicesServices';
import { ThemeProvider } from '@emotion/react';
import { MaterialReactTable } from 'material-react-table';
import tableTheme from 'app/components/Table/TableTheme';
import { Typography } from '@mui/material';
import { convertDateTime } from 'app/components/ConvertTimeDate';
import { Box } from '@material-ui/core';

const DeviceInfo = (props) => {
  const { id } = props;
  const [arrDeviceInfo, setarrDeviceInfo] = useState([]);
  const [updateList, setUpdateList] = useState(true);
  const columns = [
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
      accessorKey: 'mac',
      header: 'MAC',
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
      accessorKey: 'rom',
      header: 'ROM',
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
  ];

  const handleLoadDeviceData = async () => {
    let response = await getADeviceInfo(id);
    if (response.status === 200) {
      setarrDeviceInfo([response.data]);
    }
  };

  useEffect(() => {
    if (updateList) {
      handleLoadDeviceData();
      setUpdateList(false);
    }
  }, [updateList]);

  return (
    <ThemeProvider theme={tableTheme}>
      <MaterialReactTable
        columns={columns}
        data={arrDeviceInfo}
        enableSorting={false}
        enableBottomToolbar={false}
        enableTopToolbar={false}
        enableColumnActions={false}
        enableHiding={false}
        enablePagination={false}
        enableColumnFilterModes={false}
        enableFilters={false}
        enableDensityToggle={false}
        renderDetailPanel={({ row }) => (
          <Box
            sx={{
              display: 'grid',
              margin: 'auto',
              gridTemplateColumns: '1fr 1fr',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography fontSize={'15px'}>
              Created Date: {convertDateTime(row.original.createdDate)}
            </Typography>
            <Typography fontSize={'15px'}>
              Modified Date: {convertDateTime(row.original.modifiedDate)}
            </Typography>
          </Box>
        )}
        initialState={{
          density: 'compact',
          columnOrder: [
            'id',
            'sn',
            'mac',
            'model',
            'ip',
            'firmwareVer',
            'rom',
            'location',
            'description',
            'mrt-row-expand',
          ],
        }}
      />
    </ThemeProvider>
  );
};
export default DeviceInfo;
