import React, { useState, useEffect } from 'react';
import { Box, Card, ThemeProvider, Typography, Tooltip, IconButton } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { columns } from './ColumnSetup';
import { getAPageDeviceApp } from 'app/Services/DevicesServices';
import BottomBarSetup from './BottomBarSetup';
import tableTheme from 'app/components/Table/TableTheme';
import TopBarSetup from './TopBarSetup';
import { toast } from 'react-toastify';
import InfoIcon from '@mui/icons-material/Info';
import { convertDateTime } from 'app/components/ConvertTimeDate';
import { NavLink } from 'react-router-dom';

// import { NavLink } from 'react-router-dom';

const DeviceAppTable = (props) => {
  const { deviceID } = props;
  const [arrApps, setArrApps] = useState([]);
  const [paramsPageDeviceApps, setParamPageDeviceApps] = useState({
    page: 1,
    limit: 5,
    name: null,
    isSystem: false,
    isAlive: true,
  });
  const [totalPage, setTotalPage] = useState();
  const [updateTable, setUpdateTable] = useState(true);
  const [resetTable, setResetTable] = useState(false);
  const [isSystem, setIsSystem] = useState(false);
  const [isAlive, setIsAlive] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLoadAPageDevice = async () => {
    let response = await getAPageDeviceApp(paramsPageDeviceApps, deviceID);
    if (response.status === 200) {
      // console.log(`Page List App: `, response);
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
    setIsAlive(true);
    setIsSystem(false);
  };
  const handleSearchMode = () => {
    setParamPageDeviceApps({ ...paramsPageDeviceApps, name: searchTerm });
    setUpdateTable(true);
  };
  const handleIsAlive = () => {
    setParamPageDeviceApps({ ...paramsPageDeviceApps, isAlive: isAlive });
    setUpdateTable(true);
  };
  const handleIsSystem = () => {
    setParamPageDeviceApps({ ...paramsPageDeviceApps, isSystem: isSystem });
    setUpdateTable(true);
  };
  useEffect(() => {
    handleIsSystem();
  }, [isSystem]);
  useEffect(() => {
    handleIsAlive();
  }, [isAlive]);
  useEffect(() => {
    if (resetTable) {
      setParamPageDeviceApps({ page: 1, limit: 5, name: null, isSystem: false, isAlive: true });
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
        List of apps
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
              packagename: false,
            },
            columnOrder: [
              'id',
              'name',
              'packagename',
              'version',
              'issystem',
              // 'mrt-row-expand',
              'mrt-row-actions',
            ],
          }}
          renderRowActions={({ row, table, closeMenu }) => [
            <Box>
              <Tooltip arrow placement="bottom" title="Detail">
                <NavLink
                  to={`/tms-application/application-management/application?id=${row.original.id}&name=${row.original.name}`}
                >
                  <IconButton>
                    <InfoIcon color="primary" />
                  </IconButton>
                </NavLink>
              </Tooltip>
            </Box>,
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
              isSystem={isSystem}
              isAlive={isAlive}
              setIsSystem={setIsSystem}
              setIsAlive={setIsAlive}
              paramsPageDevices={paramsPageDeviceApps}
              totalPage={totalPage}
              handleMoveToPrePage={handleMoveToPrePage}
              handleMoveToNextPage={handleMoveToNextPage}
              handleIsAlive={handleIsAlive}
              handleSIsSystem={handleIsSystem}
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
