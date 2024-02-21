import React, { useState } from 'react';
import { Box, Typography, Tooltip, IconButton, Modal, Button, Grid } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { convertDateTime } from 'app/components/ConvertTimeDate';

// import { NavLink } from 'react-router-dom';

const ModalDetail = (props) => {
  const { row } = props;
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleCloseModal = () => {
    // console.log(row);
    setOpenModal((prevState) => !prevState);
  };

  return (
    <>
      <Tooltip arrow placement="bottom" title="Detail">
        <IconButton onClick={handleOpenModal}>
          <InfoIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Modal open={openModal} onClose={handleCloseModal}>
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
            APK Detail
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              Package: {row.original.packagename}
            </Grid>
            <Grid item xs={12}>
              Url: {row.original.apkfileUrl}
            </Grid>
            <Grid item xs={12}>
              Version: {row.original.version}
            </Grid>
            <Grid item xs={12}>
              MD5: {row.original.md5}
            </Grid>
            <Grid item xs={12}>
              Size: {row.original.packagesize} bytes
            </Grid>
            <Grid item xs={12}>
              Created By: {row.original.createdBy}
            </Grid>
            <Grid item xs={12}>
              Created Date: {convertDateTime(row.original.createdDate)}
            </Grid>
            <Grid item xs={12}>
              Modified By: {row.original.modifiedBy}
            </Grid>
            <Grid item xs={12}>
              Modified Date: {convertDateTime(row.original.modifiedDate)}
            </Grid>
          </Grid>
          <Box
            sx={{
              display: 'flex-end',
              justifyContent: 'space-between',
              marginTop: '1rem',
            }}
          >
            <Button variant="contained" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalDetail;
