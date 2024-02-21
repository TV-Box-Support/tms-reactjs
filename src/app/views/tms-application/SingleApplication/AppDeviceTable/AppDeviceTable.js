import React, { useState, useEffect } from 'react';
import { Box, Card, ThemeProvider, Typography, Button } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { columns } from './ColumnSetup';
import BottomBarSetup from './BottomBarSetup';
import tableTheme from 'app/components/Table/TableTheme';
import TopBarSetup from './TopBarSetup';
import { toast } from 'react-toastify';
import InfoIcon from '@mui/icons-material/Info';
import { convertDateTime } from 'app/components/ConvertTimeDate';
import { getAPageAppDevice } from 'app/Services/ApplicationServices';
import { NavLink } from 'react-router-dom';

// import { NavLink } from 'react-router-dom';

const DeviceAppTable = (props) => {
  const { id } = props;
  const [arrApps, setArrApps] = useState([]);
  const [paramsPageDeviceApps, setParamPageDeviceApps] = useState({
    page: 1,
    limit: 4,
    search: null,
  });
  const [totalPage, setTotalPage] = useState();
  const [updateTable, setUpdateTable] = useState(true);
  const [resetTable, setResetTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLoadAPageDevice = async () => {
    let response = await getAPageAppDevice(paramsPageDeviceApps, id);
    if (response.status === 200) {
      // console.log(`Page List device: `, response);
      if (response.data.totalElement === null && searchTerm !== null) {
        toast.error('No elements match');
      }
      let arr = response.data.listResult;
      setArrApps(arr);
      setTotalPage(response.data.totalPage);
    }
  };

  const handleMoveToNextPage = () => {
    if (paramsPageDeviceApps.page < totalPage) {
      setParamPageDeviceApps({
        limit: paramsPageDeviceApps.limit,
        page: paramsPageDeviceApps.page + 1,
      });
      setUpdateTable(true);
    }
  };
  const handleMoveToPrePage = () => {
    if (paramsPageDeviceApps.page > 1) {
      setParamPageDeviceApps({
        limit: paramsPageDeviceApps.limit,
        page: paramsPageDeviceApps.page - 1,
      });
      setUpdateTable(true);
    }
  };

  const handleResetTable = () => {
    setResetTable(true);
    setSearchTerm('');
    // console.log('resetTable');
  };
  const handleSearchMode = () => {
    setParamPageDeviceApps({ ...paramsPageDeviceApps, search: searchTerm });
    setUpdateTable(true);
  };

  //Edit user

  useEffect(() => {
    if (resetTable) {
      setParamPageDeviceApps({ page: 1, limit: 4, search: null });
      setResetTable(false);
      setUpdateTable(true);
    } else if (updateTable) {
      // console.log('change status');
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
        List of devices with app installed
      </Typography>
      <ThemeProvider theme={tableTheme}>
        <MaterialReactTable
          columns={columns}
          data={arrApps}
          options={{ actionsColumnIndex: -1 }}
          enableExpanding
          enableGlobalFilter={false}
          enableColumnFilters={false}
          enableColumnActions={false}
          enablePagination={false}
          enableSorting={false}
          muiTableBodyRowProps={{ hover: false }}
          defaultColumn={{
            maxSize: 100,
            minSize: 10,
            size: 80, //default size is usually 180
          }}
          initialState={{
            density: 'comfortable',
            columnVisibility: {
              id: false,
            },
            columnOrder: [
              'id',
              'sn',
              'model',
              'ip',
              'firmwareVer',
              'location',
              'description',
              'mrt-row-expand',
              'mrt-row-actions',
            ],
          }}
          renderRowActionMenuItems={({ row, table, closeMenu }) => [
            <>
              <Box flexBasis="25%">
                <NavLink
                  to={`/tms-devices/devices-management/device?id=${row.original.id}&sn=${row.original.sn}`}
                >
                  <Button>
                    <InfoIcon color="primary" />
                    <Typography style={{ marginLeft: '8px', color: 'black' }} textTransform="none">
                      Detail
                    </Typography>
                  </Button>
                </NavLink>
              </Box>
            </>,
          ]}
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
              paramsPageDevices={paramsPageDeviceApps}
              totalPage={totalPage}
              handleMoveToPrePage={handleMoveToPrePage}
              handleMoveToNextPage={handleMoveToNextPage}
            />
          )}
          renderTopToolbarCustomActions={() => (
            <TopBarSetup
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

export default DeviceAppTable;
