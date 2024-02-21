import React, { useState } from 'react';
import { Box, IconButton, Modal, Button, Typography } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import APKManageTable from './APKManagement/PolicyApkMap/APKManageTable';
import PolicyAPKTable from 'app/views/tms-policy/SinglePolicy/PolicyAPKTable/PolicyAPKTable';
import { Close } from '@mui/icons-material';

const EditPolicyAPK = (props) => {
  const { row } = props;
  const [openModal, setOpenModal] = useState(false);
  const [addAPKSuccess, setAddAPKSuccess] = useState(false);

  const handleOpenEditDescription = () => {
    setOpenModal((prevState) => !prevState);
  };
  const handleAddAPKSuccess = () => {
    setAddAPKSuccess(true);
  };
  const handleCloseModal = () => {
    setOpenModal((prevState) => !prevState);
  };

  return (
    <>
      <Button onClick={handleOpenEditDescription}>
        <AppRegistrationIcon color="primary" />
        <Typography style={{ marginLeft: '8px', color: 'black' }} textTransform="none">
          Edit Policy Map APK
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
                variant="h6"
                align="left"
                fontWeight="fontWeightBold"
                fontSize={22}
                sx={{ marginTop: '15px', marginLeft: '10px' }}
              >
                Add APKs to Policy
              </Typography>
              <IconButton type="button">
                <Close color="inherit" onClick={handleCloseModal} />
              </IconButton>
            </Box>
            <APKManageTable id={row.original.id} handleAddAPKSuccess={handleAddAPKSuccess} />
            <br />
            <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}>
              <PolicyAPKTable id={row.original.id} addAPKSuccess={addAPKSuccess} />
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default EditPolicyAPK;
