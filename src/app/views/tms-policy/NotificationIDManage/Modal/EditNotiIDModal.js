import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Box, Button, Modal, Typography, TextField, Grid } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { putEditNotiID } from 'app/Services/PolicyServices';

const EditPolicyModal = (props) => {
  const { row, setUpdatetable } = props;
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState(row.original.title);
  const [message, setMessage] = useState(row.original.message);
  const preTitle = row.original.title;
  const preMessage = row.original.message;
  // const handleResetTable = () => {
  //   setResettable(false);
  // };
  const handleOpenEditDescription = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleCloseModalEditDescription = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleEdit = async () => {
    if (title === preTitle && preMessage === message) {
      toast.info('Nothing changes');
      handleCloseModalEditDescription();
      return;
    }
    if (title === '') {
      return;
    }
    let data = {
      id: row.original.id,
      message: message,
      title: title,
    };
    let response = await putEditNotiID(data);
    // console.log('editPolicyResponse', response);
    if (response && response.status === 200) {
      toast.success(`Change data success`);
      setUpdatetable(true);
      handleCloseModalEditDescription();
    } else if (response.statusCode === 500) {
      toast.error(`Error: `, response.message);
    }
  };

  return (
    <>
      <Button onClick={handleOpenEditDescription}>
        <Edit color="primary" />
        <Typography style={{ marginLeft: '8px', color: 'black' }} textTransform="none">
          Edit Notification
        </Typography>
      </Button>
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
            Edit
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="title"
                label="Title"
                fullWidth
                margin="normal"
                onChange={(event) => handleTitleChange(event)}
                value={title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="message"
                label="Message"
                fullWidth
                margin="normal"
                onChange={(event) => handleMessageChange(event)}
                value={message}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '1rem',
            }}
          >
            <Button variant="contained" onClick={handleCloseModalEditDescription}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" onClick={handleEdit}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default EditPolicyModal;
