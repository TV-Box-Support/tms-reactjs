import React, { useState, useEffect } from 'react';
import { Box, Card, ThemeProvider, Typography, Tooltip, Button } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { columns } from './ColumnSetup';
import { getAPageDevice } from 'app/Services/DevicesServices';
import BottomBarSetup from './BottomBarSetup';
import TopBarSetup from './TopBarSetup';
import { toast } from 'react-toastify';
import EditDescriptionModal from '../Modal/EditDescriptionModal';
import InfoIcon from '@mui/icons-material/Info';
import tableTheme from 'app/components/Table/TableTheme';

import { NavLink } from 'react-router-dom';
import { convertDateTime } from 'app/components/ConvertTimeDate';

const DeviceManageTable = () => {
  const [arrDevices, setArrDevices] = useState([]);
  const [paramsPageDevices, setParamPageDevices] = useState({
    page: 1,
    limit: 10,
    search: null,
  });
  const [totalPage, setTotalPage] = useState();
  const [updateTable, setUpdateTable] = useState(true);
  const [resetTable, setResetTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
      setParamPageDevices({ page: 1, limit: 10, search: null });
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
        Devices
      </Typography>
      <ThemeProvider theme={tableTheme}>
        <MaterialReactTable
          columns={columns}
          data={arrDevices}
          options={{ actionsColumnIndex: -1 }}
          enableExpanding
          enableGlobalFilter={false}
          enableColumnFilters={false}
          enableColumnActions={false}
          enablePagination={false}
          enableSorting={false}
          muiTableBodyRowProps={{ hover: false }}
          defaultColumn={{
            maxSize: 120,
            minSize: 10,
            size: 100, //default size is usually 180
          }}
          initialState={{
            columnVisibility: {
              id: false,
              mac: false,
            },
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
              'mrt-row-actions',
            ],
          }}
          renderRowActionMenuItems={({ row, table, closeMenu }) => [
            <>
              <Box flexBasis="25%">
                <EditDescriptionModal row={row} setUpdatetable={setUpdateTable} />
              </Box>
              <Box flexBasis="25%">
                <Tooltip arrow placement="bottom" title="Detail">
                  <NavLink
                    to={`/tms-devices/devices-management/device?id=${row.original.id}&sn=${row.original.sn}`}
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
                </Tooltip>
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
              paramsPageDevices={paramsPageDevices}
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

export default DeviceManageTable;
