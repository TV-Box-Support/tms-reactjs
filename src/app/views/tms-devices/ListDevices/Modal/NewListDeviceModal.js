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
import { postANewListDevices } from 'app/Services/DevicesServices';

const NewListDeviceModal = (props) => {
  const { setResettable } = props;
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  // const handleResetTable = () => {
  //   setResettable(false);
  // };
  const handleCreateListClick = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleCloseModalNewList = () => {
    setOpenModal((prevState) => !prevState);
    setLocation('');
    setDescription('');
    setName('');
  };

  const handleOnchangeInput = (e, id) => {
    switch (id) {
      case 'name':
        setName(e.target.value);
        break;
      case 'location':
        setLocation(e.target.value);
        break;
      case 'description':
        setDescription(e.target.value);
        break;
      default:
        break;
    }
  };
  const checkValidateInput = () => {
    let check = true;
    const inputValues = {
      name,
      location,
      description,
    };
    const requiredInputs = ['name', 'location'];
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
      let newListDevices = {
        name: name,
        location: location,
        description: description,
      };
      let response = await postANewListDevices(newListDevices);
      // console.log('createList', response);
      if (response && response.statusCode === 500) {
        response.message.includes(`JSON parse error`)
          ? toast.error('Contact must be phone number')
          : toast.error(response.message);
      } else if (response && response.status === 200) {
        toast.success(`Create list devices success`);
        handleCloseModalNewList();
        setResettable(true);
      } else {
        toast.error(response.message);
        handleCloseModalNewList();
      }
    }
  };

  return (
    <>
      <Tooltip arrow placement="top" title="Add New List Devices">
        <IconButton onClick={handleCreateListClick}>
          <AddBox color="primary" />
        </IconButton>
      </Tooltip>
      <Modal open={openModal} onClose={handleCloseModalNewList}>
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
            Create a new User
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="name"
                label="Name"
                fullWidth
                margin="normal"
                onChange={(e) => {
                  handleOnchangeInput(e, 'name');
                }}
                value={name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="location"
                label="Location"
                fullWidth
                margin="normal"
                onChange={(e) => {
                  handleOnchangeInput(e, 'location');
                }}
                value={location}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                label="Description"
                fullWidth
                multiline
                rows={6}
                margin="normal"
                onChange={(e) => {
                  handleOnchangeInput(e, 'description');
                }}
                value={description}
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
            <Button variant="contained" onClick={handleCloseModalNewList}>
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

export default NewListDeviceModal;
