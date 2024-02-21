import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Box, IconButton, Button, Modal, Typography, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { getSingleNotiID } from 'app/Services/PolicyServices';
import { convertDateTime } from 'app/components/ConvertTimeDate';

const CommandNotiIDDetail = (props) => {
  const { id } = props;
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);

  // const handleResetTable = () => {
  //   setResettable(false);
  // };
  const handleOpenEditDescription = () => {
    setOpenModal((prevState) => !prevState);
    handleLoadDetailCommand();
  };

  const handleCloseModalEditDescription = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleLoadDetailCommand = async () => {
    let response = await getSingleNotiID(id);
    // console.log('detail', response);
    if (response && response.status === 200) {
      setData(response.data);
    } else if (response.statusCode === 500) {
      toast.error(`Error: `, response.message);
    }
  };

  return (
    <>
      <Tooltip arrow placement="bottom" title="Detail">
        <IconButton onClick={handleOpenEditDescription} disabled={id ? false : true}>
          <InfoIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Modal open={openModal} onClose={handleCloseModalEditDescription}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            minWidth: 400,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Detail Notification ID
          </Typography>
          <Typography>ID: {data.id}</Typography>
          <Typography>Title: {data.title}</Typography>
          <Typography>Message: {data.message}</Typography>
          <Typography>Created By: {data.createdBy}</Typography>
          <Typography>Created Date: {convertDateTime(data.createdDate)}</Typography>
          <Typography>Modified By: {data.modifiedBy}</Typography>
          <Typography>Modified Date: {convertDateTime(data.modifiedDate)}</Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '1rem',
            }}
          >
            <Button variant="contained" onClick={handleCloseModalEditDescription}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CommandNotiIDDetail;
