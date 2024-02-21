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
import { getPolicyAPK, deleteMapPolicyApk } from 'app/Services/PolicyServices';
import { Delete } from '@mui/icons-material';

const DeleteAPKinPolicy = ({ policyId, apkId, setUpdateTable }) => {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleOpenDeleteModal = () => {
    setOpenModalDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenModalDelete(false);
  };
  const handleDelete = async () => {
    let response = await deleteMapPolicyApk(policyId, apkId);
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
          <DialogContentText>Are you sure you want to delete remove apk?</DialogContentText>
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

const PolicyAPKTable = (props) => {
  const { id, addAPKSuccess } = props;
  const [arrApps, setArrApps] = useState([]);
  const paramsPageDeviceApps = {
    page: 1,
    limit: 5,
    id: id,
  };
  const [updateTable, setUpdateTable] = useState(true);
  // const EMPTY_ROW = { packagename: '' };

  const handleLoadAPagePolicyAPK = async () => {
    let response = await getPolicyAPK(paramsPageDeviceApps);
    if (response.status === 200) {
      let arr = response.data.listResult;
      // while (arr.length < 3) {
      //   arr.push(EMPTY_ROW);
      // }
      setArrApps(arr);
    }
  };
  useEffect(() => {
    if (updateTable || addAPKSuccess) {
      handleLoadAPagePolicyAPK();
      setUpdateTable(false);
    }
  }, [updateTable, addAPKSuccess]);

  return (
    <Card>
      {arrApps.length > 0 && (
        <>
          {' '}
          <Typography
            variant="h6"
            align="left"
            fontWeight="fontWeightBold"
            fontSize={15}
            sx={{ marginTop: '5px', marginLeft: '10px' }}
          >
            Policies' APKs
          </Typography>
          <ThemeProvider theme={tableTheme}>
            <MaterialReactTable
              columns={columns}
              data={arrApps}
              options={{ actionsColumnIndex: -1 }}
              enableTopToolbar={false}
              enableExpanding
              enableGlobalFilter={false}
              enableColumnFilters={false}
              enableColumnActions={false}
              enablePagination={false}
              enableSorting={false}
              enableBottomToolbar={false}
              muiTableBodyRowProps={{ hover: false }}
              defaultColumn={{
                maxSize: 120,
                minSize: 10,
                size: 100, //default size is usually 180
              }}
              initialState={{
                density: 'comfortable',
                columnOrder: ['id', 'packagename', 'version', 'apkfileUrl', 'mrt-row-actions'],
              }}
              renderRowActions={({ row }) =>
                row.original.packagename !== '' && (
                  <Box>
                    <DeleteAPKinPolicy
                      policyId={id}
                      apkId={row.original.id}
                      setUpdateTable={setUpdateTable}
                    />
                  </Box>
                )
              }
            />
          </ThemeProvider>
        </>
      )}
    </Card>
  );
};

export default PolicyAPKTable;
