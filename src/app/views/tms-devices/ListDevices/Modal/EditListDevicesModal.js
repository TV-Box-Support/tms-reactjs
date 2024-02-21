import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Box, Button, Modal, Typography, TextField, Grid } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { putAPageListDevices } from 'app/Services/DevicesServices';

const EditListDeviceModal = (props) => {
  const { row, setUpdatetable } = props;
  const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState(row.original.description);
  const [name, setName] = useState(row.original.name);
  const preDescription = row.original.description;
  const preName = row.original.name;

  // const handleResetTable = () => {
  //   setResettable(false);
  // };
  const handleOpenEditDescription = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleCloseModalEditDescription = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEditDescription = async () => {
    if (description === preDescription && name === preName) {
      toast.info('Nothing changes');
      handleCloseModalEditDescription();
      return;
    }
    let data = {
      id: row.original.id,
      description: description,
      name: name,
    };
    let response = await putAPageListDevices(data);
    // console.log('editUserResponse', response);
    if (response && response.status === 200) {
      toast.success(`Change list devices data success`);
      setUpdatetable(true);
      handleCloseModalEditDescription();
    } else if (response.statusCode === 500) {
      toast.error(`Error: `, response.message);
    }
  };

  return (
    <div>
      <Button onClick={handleOpenEditDescription}>
        <Edit color="primary" />
        <Typography style={{ marginLeft: '8px', color: 'black' }} textTransform="none">
          Edit
        </Typography>
      </Button>
      <Modal open={openModal} onClose={handleCloseModalEditDescription}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '50%',
            height: '700',
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
                id="name"
                label="Name"
                fullWidth
                margin="normal"
                onChange={(event) => handleNameChange(event)}
                value={name}
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
                onChange={(event) => handleDescriptionChange(event)}
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
            <Button variant="contained" onClick={handleCloseModalEditDescription}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" onClick={handleEditDescription}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default EditListDeviceModal;
