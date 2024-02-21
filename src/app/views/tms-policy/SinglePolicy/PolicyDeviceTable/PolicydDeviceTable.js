import React, { useState, useEffect } from 'react';
import { Box, Card, IconButton, ThemeProvider, Tooltip, Typography } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { columns } from './ColumnSetup';
import BottomBarSetup from './BottomBarSetup';
import tableTheme from 'app/components/Table/TableTheme';
import TopBarSetup from './TopBarSetup';
import { toast } from 'react-toastify';
import { getPolicyDevice } from 'app/Services/PolicyServices';
import InfoIcon from '@mui/icons-material/Info';
import { NavLink } from 'react-router-dom';
import { convertDateTime } from 'app/components/ConvertTimeDate';

// import { NavLink } from 'react-router-dom';

const PolicDevicesTable = (props) => {
  const { id } = props;
  const [arrApps, setArrApps] = useState([]);
  const [paramsPage, setParamPage] = useState({
    page: 1,
    limit: 10,
    id: id,
    search: null,
  });
  const [totalPage, setTotalPage] = useState();
  const [updateTable, setUpdateTable] = useState(true);
  const [resetTable, setResetTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLoadAPagePolicyAPK = async () => {
    let response = await getPolicyDevice(paramsPage);
    if (response.status === 200) {
      console.log(`Page List devices: `, response);
      let arr = response.data.listResult;
      setArrApps(arr);
      setTotalPage(response.data.totalPage);
    } else {
      if (searchTerm !== null) {
        toast.error('No elements match');
        setArrApps([]);
      }
    }
  };

  const handleResetTable = () => {
    setResetTable(true);
    setSearchTerm('');
    // console.log('resetTable');
  };
  const handleMoveToNextPage = () => {
    if (paramsPage.page < totalPage) {
      setParamPage({
        limit: paramsPage.limit,
        page: paramsPage.page + 1,
      });
      setUpdateTable(true);
    }
  };
  const handleMoveToPrePage = () => {
    if (paramsPage.page > 1) {
      setParamPage({
        limit: paramsPage.limit,
        page: paramsPage.page - 1,
      });
      setUpdateTable(true);
    }
  };
  const handleSearchMode = () => {
    setParamPage({ ...paramsPage, search: searchTerm });
    setUpdateTable(true);
  };

  //Edit user

  useEffect(() => {
    if (resetTable) {
      setParamPage({ page: 1, limit: 10, id: id, search: null });
      setResetTable(false);
      setUpdateTable(true);
    } else if (updateTable) {
      // console.log('change status');
      handleLoadAPagePolicyAPK();
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
        Policies' Devices
      </Typography>
      <ThemeProvider theme={tableTheme}>
        <MaterialReactTable
          columns={columns}
          data={arrApps}
          options={{ actionsColumnIndex: -1 }}
          enableTopToolbar={true}
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
            density: 'compact',
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
              'location',
              'description',
              'mrt-row-expand',
              'mrt-row-actions',
            ],
          }}
          renderRowActions={({ row, closeMenu }) => [
            <Tooltip arrow placement="bottom" title="Detail">
              <NavLink
                to={`/tms-devices/devices-management/device?id=${row.original.id}&sn=${row.original.sn}`}
              >
                <IconButton>
                  <InfoIcon color="primary" />
                </IconButton>
              </NavLink>
            </Tooltip>,
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
              paramsPageDevices={paramsPage}
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

export default PolicDevicesTable;
