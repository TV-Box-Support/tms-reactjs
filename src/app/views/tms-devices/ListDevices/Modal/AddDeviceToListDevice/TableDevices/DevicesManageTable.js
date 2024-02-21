import React, { useState, useEffect } from 'react';
import { Box, Card, ThemeProvider, Typography } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { columns } from './ColumnSetup';
import { getAPageDevice, postDevicesToListDevices } from 'app/Services/DevicesServices';
import BottomBarSetup from './BottomBarSetup';
import TopBarSetup from './TopBarSetup';
import { toast } from 'react-toastify';
import tableTheme from 'app/components/Table/TableTheme';
import { convertDateTime } from 'app/components/ConvertTimeDate';

const DeviceManageTable = (props) => {
  const { id, handleAddDeviceSuccess } = props;
  const [arrDevices, setArrDevices] = useState([]);
  const [paramsPageDevices, setParamPageDevices] = useState({
    page: 1,
    limit: 5,
    search: null,
  });
  const [totalPage, setTotalPage] = useState();
  const [updateTable, setUpdateTable] = useState(true);
  const [resetTable, setResetTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [rowSelection, setRowSelection] = useState([]);

  const handleEditDevicesToListDevices = async () => {
    const selectedRows = Object.keys(rowSelection)
      .filter((key) => rowSelection[key])
      .map((key) => parseInt(key));
    if (selectedRows.length === 0) {
      toast.error('There is no devices selected.');
    } else {
      let res = await postDevicesToListDevices(id, selectedRows);
      if (res.status === 200) {
        toast.success('Add devices success');
        handleAddDeviceSuccess();
      } else {
        toast.error(res.message);
      }
    }
  };

  const handleLoadAPageDevice = async () => {
    // console.log(paramsPageDevices);
    let response = await getAPageDevice(paramsPageDevices);
    // console.log(`Page List: `, response);
    if (response.status === 200) {
      // console.log(`Page List: `, response);
      if (response.data.totalElement === null && searchTerm !== null) {
        toast.error('No elements match');
      }
      let arr = response.data.listResult;
      setArrDevices(arr);
      setTotalPage(response.data.totalPage);
    }
  };

  const handleMoveToNextPage = () => {
    if (paramsPageDevices.page < totalPage) {
      setParamPageDevices({ limit: paramsPageDevices.limit, page: paramsPageDevices.page + 1 });
      setUpdateTable(true);
    }
  };
  const handleMoveToPrePage = () => {
    if (paramsPageDevices.page > 1) {
      setParamPageDevices({ limit: paramsPageDevices.limit, page: paramsPageDevices.page - 1 });
      setUpdateTable(true);
    }
  };

  const handleResetTable = () => {
    setResetTable(true);
    setSearchTerm('');
    // console.log('resetTable');
  };
  const handleSearchMode = () => {
    setParamPageDevices({ ...paramsPageDevices, search: searchTerm });
    setUpdateTable(true);
  };

  useEffect(() => {
    if (resetTable) {
      setParamPageDevices({ page: 1, limit: 5, search: null });
      setResetTable(false);
      setUpdateTable(true);
    } else if (updateTable) {
      handleLoadAPageDevice();
      setUpdateTable(false);
    }
  }, [resetTable, updateTable]);

  // useEffect(() => {
  //   console.log(arrUsers);
  // }, [updateTable]);

  return (
    <Card>
      <Typography
        variant="h6"
        align="left"
        fontWeight="fontWeightBold"
        fontSize={15}
        sx={{ marginTop: '5px', marginLeft: '10px' }}
      >
        Devices available
      </Typography>
      <ThemeProvider theme={tableTheme}>
        <MaterialReactTable
          columns={columns}
          data={arrDevices}
          options={{ actionsColumnIndex: -1 }}
          enableExpanding
          positionExpandColumn={'last'}
          enableGlobalFilter={false}
          enableColumnFilters={false}
          enableColumnActions={false}
          enablePagination={false}
          enableSorting={false}
          muiTableBodyRowProps={{ hover: false }}
          enableRowSelection
          enableSelectAll={false}
          positionToolbarAlertBanner={'none'}
          getRowId={(row) => row.id}
          onRowSelectionChange={(selectedRows) => setRowSelection(selectedRows)}
          state={{ rowSelection }}
          defaultColumn={{
            maxSize: 120,
            minSize: 10,
            size: 100, //default size is usually 180
          }}
          initialState={{
            density: 'compact',
            columnVisibility: {
              id: false,
            },
          }}
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
          renderBottomToolbarCustomActions={() => (
            <BottomBarSetup
              paramsPageDevices={paramsPageDevices}
              totalPage={totalPage}
              handleMoveToPrePage={handleMoveToPrePage}
              handleMoveToNextPage={handleMoveToNextPage}
            />
          )}
          renderTopToolbarCustomActions={() => (
            <TopBarSetup
              handleEditDevicesToListDevices={handleEditDevicesToListDevices}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setResettable={setResetTable}
              handleSearchMode={handleSearchMode}
              handleResetTable={handleResetTable}
            />
          )}
        />
      </ThemeProvider>
    </Card>
  );
};

export default DeviceManageTable;
