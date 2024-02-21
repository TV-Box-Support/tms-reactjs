import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Modal,
  // Tooltip,
  Typography,
} from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Close } from '@mui/icons-material';
import UserManageTable from './TableUser/UsersManageTable';
import UserInListDeviceTable from './UserInListDeviceTable/UserInListDeviceTable';

const AddUserToListDevice = (props) => {
  const { row } = props;
  const [openModal, setOpenModal] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

  const handleOpenEditDescription = () => {
    setOpenModal((prevState) => !prevState);
  };
  const handleAddUserSuccess = () => {
    setAddSuccess(true);
  };
  const handleCloseModal = () => {
    setOpenModal((prevState) => !prevState);
  };

  return (
    <div>
      <Button onClick={handleOpenEditDescription}>
        <PersonAddAltIcon color="primary" />
        <Typography
          style={{ marginLeft: '8px', color: 'black', whiteSpace: 'nowrap' }}
          textTransform="none"
        >
          Add users to list device
        </Typography>
      </Button>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '95%',
            minHeight: '35%',
            maxHeight: '95%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 0,
            overflow: 'auto',
          }}
        >
          <Box sx={{ p: 1 }}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {' '}
              <Typography
                variant="h6"
                align="left"
                fontWeight="fontWeightBold"
                fontSize={22}
                sx={{ marginTop: '15px', marginLeft: '10px' }}
              >
                Add users to list devices
              </Typography>
              <IconButton type="button">
                <Close color="inherit" onClick={handleCloseModal} />
              </IconButton>
            </Box>
            <UserManageTable id={row.original.id} handleAddUserSuccess={handleAddUserSuccess} />
            <br />
            <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}>
              <UserInListDeviceTable
                id={row.original.id}
                addSuccess={addSuccess}
                setAddSuccess={setAddSuccess}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AddUserToListDevice;
