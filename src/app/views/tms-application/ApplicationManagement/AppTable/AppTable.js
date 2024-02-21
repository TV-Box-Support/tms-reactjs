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
import { getAPageApp } from 'app/Services/ApplicationServices';
import { NavLink } from 'react-router-dom';

const AppTable = () => {
  const [arrApps, setArrApps] = useState([]);
  const [paramsPageDeviceApps, setParamPageDeviceApps] = useState({
    page: 1,
    limit: 10,
    packagename: null,
  });
  const [totalPage, setTotalPage] = useState();
  const [updateTable, setUpdateTable] = useState(true);
  const [resetTable, setResetTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLoadAPageDevice = async () => {
    let response = await getAPageApp(paramsPageDeviceApps);
    if (response.status === 200) {
      // console.log(`Page List App: `, response);
      if (response.data.totalElement === null && searchTerm !== null) {
        toast.error('No element match');
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
  };
  const handleSearchMode = () => {
    setParamPageDeviceApps({ ...paramsPageDeviceApps, packagename: searchTerm });
    setUpdateTable(true);
  };

  //Edit user

  useEffect(() => {
    if (resetTable) {
      setParamPageDeviceApps({ page: 1, limit: 10 });
      setResetTable(false);
      setUpdateTable(true);
    } else if (updateTable) {
      handleLoadAPageDevice();
      setUpdateTable(false);
    }
  }, [resetTable, updateTable]);

  return (
    <Card>
      <Typography
        variant="h6"
        align="left"
        fontWeight="fontWeightBold"
        fontSize={15}
        sx={{ marginTop: '5px', marginLeft: '10px' }}
      >
        Applications
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
              'name',
              'packagename',
              'version',
              'issystem',
              'mrt-row-expand',
              'mrt-row-actions',
            ],
          }}
          renderRowActionMenuItems={({ row }) => [
            <>
              <Box flexBasis="25%">
                <NavLink
                  to={`/tms-application/application-management/application?id=${row.original.id}&name=${row.original.name}`}
                >
                  <div>
                    <Button>
                      <InfoIcon color="primary" />
                      <Typography
                        style={{ marginLeft: '8px', color: 'black' }}
                        textTransform="none"
                      >
                        Detail
                      </Typography>
                    </Button>
                  </div>
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

export default AppTable;
