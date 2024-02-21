import React, { useEffect, useState } from 'react';
import { Box, Button, Modal, Grid, Typography } from '@mui/material';
import { getUserListDevice } from 'app/Services/User_Auth_Service';
import InfoIcon from '@mui/icons-material/Info';
import { MaterialReactTable } from 'material-react-table';

const UserListDeviceModal = (props) => {
  const { row } = props;
  const [arrData, setArrData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const columns = [
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
  ];

  const handleOpenModalUserListDevices = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleCloseModalUserListDevices = () => {
    // console.log(row);
    setOpenModal((prevState) => !prevState);
  };

  const handleLoadUserListDevices = async () => {
    let response = await getUserListDevice(row.original.id);
    if (response.status === 200) {
      // console.log(response);
      setArrData(response.data.listResult);
    }
  };

  useEffect(() => {
    if (openModal === true) {
      handleLoadUserListDevices();
    }
  }, [openModal]);
  return (
    <>
      <Button onClick={handleOpenModalUserListDevices}>
        <InfoIcon color="primary" />
        <Typography style={{ marginLeft: '8px', color: 'black' }} textTransform="none">
          User's List Devices
        </Typography>
      </Button>
      <Modal open={openModal} onClose={handleCloseModalUserListDevices}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            minWidth: 400,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            {row.original.name}'s List Devices
          </Typography>
          <Grid spacing={2}>
            <MaterialReactTable
              data={arrData}
              columns={columns}
              enableSorting={false}
              enableBottomToolbar={false}
              enableTopToolbar={false}
              enableColumnActions={false}
              enableHiding={false}
              enableColumnFilterModes={false}
              enableFilters={false}
              enableDensityToggle={false}
              initialState={{
                density: 'compact',
              }}
            />
          </Grid>
          <br></br>
          <Box sx={{ textAlign: 'right' }}>
            <Button variant="contained" onClick={handleCloseModalUserListDevices}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default UserListDeviceModal;
