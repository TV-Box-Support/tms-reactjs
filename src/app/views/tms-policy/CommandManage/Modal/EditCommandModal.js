import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Box, Button, Modal, Typography, TextField, Grid, Autocomplete } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { getNotiID, putEditCommand } from 'app/Services/PolicyServices';
import ListSelect from 'app/components/List/ListSelect';

function AutoComplete({ label, defaultNoti, selectedOption, setSelectedOption }) {
  const [arrNotiId, setArrNotiId] = useState([]);
  const [paramsPage, setParamPage] = useState({
    page: 1,
    limit: 10,
    search: null,
  });
  const [hasSelected, setHasSelected] = useState(false);

  const handleBarSearch = (event) => {
    setParamPage({ ...paramsPage, search: event.target.value });
    setHasSelected(false);
  };

  const handleLoadAPagePolicy = async () => {
    let response = await getNotiID(paramsPage);
    if (response.status === 200) {
      let arr = response.data.listResult;
      setArrNotiId(arr);
    }
  };

  const handleOnChange = (event, newValue) => {
    setSelectedOption(newValue);
    setHasSelected(true);
  };

  useEffect(() => {
    handleLoadAPagePolicy();
  }, [paramsPage]);

  useEffect(() => {
    if (!hasSelected && arrNotiId.length > 0) {
      const defaultNotiObj = arrNotiId.find((item) => item.id === defaultNoti);
      setSelectedOption(defaultNotiObj);
      setParamPage({ ...paramsPage, search: null });
      setHasSelected(true);
    }
  }, [hasSelected, arrNotiId, defaultNoti, setSelectedOption, paramsPage]);

  return (
    <div>
      Recent Notification: {selectedOption ? selectedOption.title : ''}
      <Autocomplete
        options={arrNotiId}
        getOptionLabel={(option) => option.title}
        id="include-input-in-list"
        onChange={handleOnChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            onChange={handleBarSearch}
            fullWidth
          />
        )}
      />
    </div>
  );
}

const EditCommandModal = (props) => {
  const { row, setUpdatetable } = props;
  const [openModal, setOpenModal] = useState(false);
  const [command, setCommand] = useState(row.original.command);
  const [name, setName] = useState(row.original.name);
  const preCommand = row.original.command;
  const preName = row.original.name;
  const Noti = ['Reboot', 'Notification'];
  const prevNoti = row.original.commandNotificationId;
  const [selectedOption, setSelectedOption] = React.useState(null);

  const handleOpenEditDescription = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleCloseModalEditDescription = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleCommandChange = (command) => {
    setCommand(command);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEditCommand = async () => {
    if (preCommand === command && preName === name && prevNoti === selectedOption) {
      toast.info('Nothing changes');
      handleCloseModalEditDescription();
      return;
    }
    if (command === '' || name === '') {
      handleCloseModalEditDescription();
      return;
    }
    let data = {
      id: row.original.id,
      command: command,
      name: name,
      commandNotificationId: selectedOption.id,
    };
    let response = await putEditCommand(data);
    // console.log('editCommandResponse', response);
    if (response && response.status === 200) {
      toast.success(`Change command data success`);
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
          Edit Command
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
              <ListSelect
                data={Noti}
                handleSelected={handleCommandChange}
                title={'Command'}
                defaultValue={command}
              />
            </Grid>
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
            {command === 'Notification' ? (
              <Grid item xs={12}>
                <AutoComplete
                  label={'Notification'}
                  defaultNoti={prevNoti}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
              </Grid>
            ) : (
              <></>
            )}
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
            <Button variant="contained" type="submit" onClick={handleEditCommand}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default EditCommandModal;
