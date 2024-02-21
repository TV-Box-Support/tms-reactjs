import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Box,
  IconButton,
  Button,
  Modal,
  Typography,
  TextField,
  Grid,
  Tooltip,
} from '@mui/material';
import { AddBox } from '@mui/icons-material';
import { postCreateNewNotiId } from 'app/Services/PolicyServices';

const NewPolicyModal = (props) => {
  const { setResettable } = props;
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  // const handleResetTable = () => {
  //   setResettable(false);
  // };
  const handleCreatePolicyClick = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleCloseModalNewPolicy = () => {
    setOpenModal((prevState) => !prevState);
    setMessage('');
    setTitle('');
  };

  const handleOnchangeInput = (e, id) => {
    switch (id) {
      case 'title':
        setTitle(e.target.value);
        break;
      case 'message':
        setMessage(e.target.value);
        break;
      default:
        break;
    }
  };
  const checkValidateInput = () => {
    let check = true;
    const inputValues = {
      title: title,
      message: message,
    };
    const requiredInputs = ['title', 'message'];
    for (let i = 0; i < requiredInputs.length; i++) {
      if (!inputValues[requiredInputs[i]]) {
        check = false;
        setOpenModal(true);
        toast.info('Missing required parameter: ' + requiredInputs[i]);
        break;
      }
    }
    return check;
  };

  const handleAddNewListDevices = async () => {
    let isValid = checkValidateInput();
    if (isValid) {
      let newData = {
        title: title,
        message: message,
      };
      let response = await postCreateNewNotiId(newData);
      // console.log('createList', response);
      if (response && response.status === 200) {
        toast.success(`Create success`);
        handleCloseModalNewPolicy();
        setResettable(true);
      } else {
        toast.error(response.message);
        handleCloseModalNewPolicy();
      }
    }
  };

  return (
    <>
      <Tooltip arrow placement="top" title="Add New Notification">
        <IconButton onClick={handleCreatePolicyClick}>
          <AddBox color="primary" />
        </IconButton>
      </Tooltip>
      <Modal open={openModal} onClose={handleCloseModalNewPolicy}>
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
            Create a new Notification
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="title"
                label="Title"
                fullWidth
                margin="normal"
                onChange={(e) => {
                  handleOnchangeInput(e, 'title');
                }}
                value={title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="message"
                label="Message"
                fullWidth
                margin="normal"
                onChange={(e) => {
                  handleOnchangeInput(e, 'message');
                }}
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
            <Button variant="contained" onClick={handleCloseModalNewPolicy}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" onClick={handleAddNewListDevices}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default NewPolicyModal;
