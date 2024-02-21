import React, { useState } from 'react';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import { Close, Person2Outlined } from '@mui/icons-material';
import UserInListDeviceTable from './UserInListDeviceTable/UserInListDeviceTable';

const TableUserInListDevice = (props) => {
  const { row } = props;
  const [openModal, setOpenModal] = useState(false);

  const handleOpenEditDescription = () => {
    setOpenModal((prevState) => !prevState);
  };
  const handleCloseModal = () => {
    setOpenModal((prevState) => !prevState);
  };

  return (
    <div>
      <Button onClick={handleOpenEditDescription}>
        <Person2Outlined color="primary" />
        <Typography
          style={{
            marginLeft: '8px',
            color: 'black',
            whiteSpace: 'nowrap',
          }}
          textTransform="none"
        >
          Users in list device
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
              <Typography
                style={{
                  marginLeft: '8px',
                  color: 'black',
                  whiteSpace: 'nowrap',
                  fontWeight: 'bold',
                }}
                textTransform="none"
              >
                Users in list device
              </Typography>
              <IconButton type="button">
                <Close color="inherit" onClick={handleCloseModal} />
              </IconButton>
            </Box>
            <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}>
              <UserInListDeviceTable id={row.original.id} />
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default TableUserInListDevice;
