import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ThemeProvider,
  Tooltip,
  Typography,
} from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { columns } from './ColumnSetup';
import tableTheme from 'app/components/Table/TableTheme';
import { toast } from 'react-toastify';
import InfoIcon from '@mui/icons-material/Info';
import { Delete } from '@mui/icons-material';
import BottomBarSetup from './BottomBarSetup';
import TopBarSetup from './TopBarSetup';
import { NavLink } from 'react-router-dom';
import { deleteDeviceinListDevice, getDevicesInListDevices } from 'app/Services/DevicesServices';

const DeleteDevice = ({ listDeviceId, deviceId, setUpdateTable }) => {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleOpenDeleteModal = () => {
    setOpenModalDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenModalDelete(false);
  };
  const handleDelete = async () => {
    let response = await deleteDeviceinListDevice(listDeviceId, deviceId);
    // console.log(`Page List App: `, response);
    if (response.status === 204) {
      toast.success('Delete success');
      setUpdateTable(true);
      handleCloseDelete();
    } else {
      toast.error(`Delete fail!!!`, response.message);
      handleCloseDelete();
    }
  };

  return (
    <>
      <Tooltip arrow placement="bottom" title="Delete">
        <IconButton onClick={handleOpenDeleteModal}>
          <Delete color="error" />
        </IconButton>
      </Tooltip>
      <Dialog open={openModalDelete} onClose={handleCloseDelete} id="deleteDialog">
        <DialogTitle>Delete confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete device?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const DevicesInListDeviceTable = (props) => {
  const { id, addDevicesSuccess, setAddDevicesSuccess } = props;
  const [arrApps, setArrApps] = useState([]);
  const [paramsPage, setParamPage] = useState({
    page: 1,
    limit: 5,
    id: id,
    search: null,
  });
  const [updateTable, setUpdateTable] = useState(true);
  const [resetTable, setResetTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPage, setTotalPage] = useState();
  const handleLoadAPageDevice = async () => {
    let response = await getDevicesInListDevices(paramsPage);
    // console.log(response);
    if (response.status === 200) {
      let arr = response.data.listResult;
      setArrApps(arr);
      setTotalPage(response.data.totalPage);
    }
  };
  const handleMoveToNextPage = () => {
    if (paramsPage.page < totalPage) {
      setParamPage({ limit: paramsPage.limit, page: paramsPage.page + 1 });
      setUpdateTable(true);
    }
  };
  const handleMoveToPrePage = () => {
    if (paramsPage.page > 1) {
      setParamPage({ limit: paramsPage.limit, page: paramsPage.page - 1 });
      setUpdateTable(true);
    }
  };

  const handleResetTable = () => {
    setResetTable(true);
    setSearchTerm('');
  };
  const handleSearchMode = () => {
    setParamPage({
      ...paramsPage,
      search: searchTerm,
    });
    setUpdateTable(true);
  };
  useEffect(() => {
    if (updateTable) {
      handleLoadAPageDevice();
      if (addDevicesSuccess) {
        setAddDevicesSuccess(false);
      }
      setUpdateTable(false);
    }
    if (addDevicesSuccess) {
      setUpdateTable(true);
    }
    if (resetTable) {
      setParamPage({
        page: 1,
        limit: 5,
        id: id,
        search: null,
      });
      setResetTable(false);
      setUpdateTable(true);
    }
  }, [updateTable, addDevicesSuccess, resetTable]);

  return (
    <Card>
      <Typography
        variant="h6"
        align="left"
        fontWeight="fontWeightBold"
        fontSize={15}
        sx={{ marginTop: '5px', marginLeft: '10px' }}
      >
        Devices in List Devices
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
            maxSize: 120,
            minSize: 10,
            size: 100, //default size is usually 180
          }}
          initialState={{
            density: 'compact',
            columnOrder: [
              'id',
              'sn',
              'model',
              'ip',
              'firmwareVer',
              'location',
              'description',
              'mrt-row-actions',
            ],
          }}
          renderRowActions={({ row }) => [
            <Box>
              <Tooltip arrow placement="bottom" title="Detail">
                <NavLink
                  to={`/tms-devices/devices-management/device?id=${row.original.id}&sn=${row.original.sn}`}
                >
                  <IconButton>
                    <InfoIcon color="primary" />
                  </IconButton>
                </NavLink>
              </Tooltip>
              <DeleteDevice
                listDeviceId={id}
                deviceId={row.original.id}
                setUpdateTable={setUpdateTable}
              />
            </Box>,
          ]}
          renderBottomToolbarCustomActions={() => (
            <BottomBarSetup
              paramsPage={paramsPage}
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

export default DevicesInListDeviceTable;
