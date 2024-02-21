import React, { useEffect, useState } from 'react';
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
import { getNotiID, postCreateNewCommand } from 'app/Services/PolicyServices';
import ListSelect from 'app/components/List/ListSelect';
import Autocomplete from '@mui/material/Autocomplete';

function AutoComplete({ label, selectedOption, setSelectedOption }) {
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
      // console.log(arr);
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
    if (!hasSelected) {
      setParamPage({ ...paramsPage, search: null });
    }
  }, [hasSelected]);

  return (
    <div>
      <Autocomplete
        options={arrNotiId}
        getOptionLabel={(option) => option.title}
        id="include-input-in-list"
        value={selectedOption}
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

const NewCommandModal = (props) => {
  const { setResettable } = props;
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [command, setCommand] = useState('');
  const [selectedOption, setSelectedOption] = React.useState(null);
  const Noti = ['Reboot', 'Notification'];

  const handleCreatePolicyClick = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleCloseModalNewPolicy = () => {
    setOpenModal((prevState) => !prevState);
    setCommand('');
    setName('');
  };

  const handleCommandChange = (command) => {
    setCommand(command);
  };

  const handleOnchangeInput = (e, id) => {
    switch (id) {
      case 'name':
        setName(e.target.value);
        break;
      default:
        break;
    }
  };
  const checkValidateInput = () => {
    let check = true;
    const inputValues = {
      name: name,
      command: command,
      commandNotificationId: selectedOption.id,
    };
    const requiredInputs = ['command', 'name'];
    if (command === 'Notification') {
      requiredInputs.push('commandNotificationId');
    }
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

  const handleAddNew = async () => {
    let isValid = checkValidateInput();
    if (isValid) {
      let newListDevices = {
        name: name,
        command: command,
        commandNotificationId: selectedOption.id,
      };
      let response = await postCreateNewCommand(newListDevices);
      // console.log('createList', response);
      if (response && response.statusCode === 500) {
        response.message.includes(`JSON parse error`)
          ? toast.error('Contact must be phone number')
          : toast.error(response.message);
      } else if (response && response.status === 200) {
        toast.success(`Create command success`);
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
      <Tooltip arrow placement="top" title="Add New Command">
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
            width: '65%',
            minHeight: '35%',
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Create a new Command
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
              <ListSelect
                data={Noti}
                handleSelected={handleCommandChange}
                title={'Command'}
                defaultValue={command}
              />
            </Grid>
            {command === 'Notification' ? (
              <Grid item xs={12}>
                <AutoComplete
                  label={'Notification'}
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
            <Button variant="contained" onClick={handleCloseModalNewPolicy}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" onClick={handleAddNew}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default NewCommandModal;
