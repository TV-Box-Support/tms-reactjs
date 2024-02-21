import React, { useState, useEffect } from 'react';
import { Box, Card, IconButton, ThemeProvider, Tooltip, Typography } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { getAPageListDevices } from 'app/Services/DevicesServices';
import BottomBarSetup from './BottomBarSetup';
import TopBarSetup from './TopBarSetup';
import { toast } from 'react-toastify';
import tableTheme from 'app/components/Table/TableTheme';
import { convertDateTime } from 'app/components/ConvertTimeDate';
import { postMapPolicyListDevices } from 'app/Services/PolicyServices';

const AddListDeviceToPolicy = (props) => {
  const { policyId, listDeviceId, setAddSuccess } = props;
  const handleAdd = async () => {
    let res = await postMapPolicyListDevices(policyId, listDeviceId);
    if (res.status === 200) {
      toast.success('Add list success');
      setAddSuccess(true);
    } else {
      toast.error('Add fail!!! ' + res.data.message);
    }
  };
  return (
    <Tooltip arrow placement="top" title={'Add this list to policy'}>
      <IconButton onClick={handleAdd}>
        <PostAddIcon color="primary" />
      </IconButton>
    </Tooltip>
  );
};

const PolicyListDevicesTable = (props) => {
  const { policyId, setAddSuccess } = props;
  const [arrDevices, setArrDevices] = useState([]);
  const [paramsPageDevices, setParamPageDevices] = useState({
    page: 1,
    limit: 5,
    name: null,
  });
  const [totalPage, setTotalPage] = useState();
  const [updateTable, setUpdateTable] = useState(true);
  const [resetTable, setResetTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
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
      accessorKey: 'name',
      header: 'Name',
      enableEditing: false,
      enableSorting: false,
    },
    {
      accessorKey: 'location',
      header: 'Location',
    },
    {
      accessorKey: 'description',
      header: 'Description',
      enableEditing: false,
    },
    {
      accessorKey: 'addToPolicy',
      header: 'Add to policy',
      enableEditing: false,
      Cell: (row) => (
        <AddListDeviceToPolicy
          policyId={policyId}
          listDeviceId={row.row.original.id}
          setAddSuccess={setAddSuccess}
        />
      ),
    },
  ];

  const handleLoadAPageDevice = async () => {
    // console.log(paramsPageDevices);
    let response = await getAPageListDevices(paramsPageDevices);
    // console.log(`Page List: `, response);
    if (response.status === 200) {
      // console.log(`Page List: `, response);
      if (response.data.totalElement === null && searchTerm !== null) {
        toast.error('No elemant match');
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
    setParamPageDevices({ ...paramsPageDevices, name: searchTerm });
    setUpdateTable(true);
  };

  useEffect(() => {
    if (resetTable) {
      setParamPageDevices({ page: 1, limit: 5, name: null });
      setResetTable(false);
      setUpdateTable(true);
    } else if (updateTable) {
      handleLoadAPageDevice();
      setUpdateTable(false);
    }
  }, [resetTable, updateTable]);

  return (
    <Card sx={{ m: 1 }}>
      <Typography
        variant="h6"
        align="left"
        fontWeight="fontWeightBold"
        fontSize={15}
        sx={{ marginTop: '5px', marginLeft: '10px' }}
      >
        List Devices available
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
            density: 'compact',
            columnVisibility: {
              id: false,
            },
            columnOrder: ['id', 'name', 'location', 'description', 'addToPolicy', 'mrt-row-expand'],
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
              <Typography fontSize={'15px'}>Created By: {row.original.createdBy}</Typography>
              <Typography fontSize={'15px'}>
                Modified Date: {convertDateTime(row.original.modifiedDate)}
              </Typography>
              <Typography fontSize={'15px'}>Modified By: {row.original.modifiedBy}</Typography>
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

export default PolicyListDevicesTable;
