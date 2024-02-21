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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { AddBox } from '@mui/icons-material';
import { getAPageCommand, postCreateNewPolicy } from 'app/Services/PolicyServices';
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

  const handleLoadAPage = async () => {
    let response = await getAPageCommand(paramsPage);
    if (response.status === 200) {
      let arr = response.data.listResult;
      // console.log(arr);
      setArrNotiId(arr);
    }
  };

  const handleOnChange = (event, newValue) => {
    setSelectedOption(newValue);
    // console.log(newValue);
    setHasSelected(true);
  };

  useEffect(() => {
    handleLoadAPage();
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
        getOptionLabel={(option) => option.name}
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

const NewPolicyModal = (props) => {
  const { setResettable } = props;
  const [openModal, setOpenModal] = useState(false);
  const [policyname, setPolicyname] = useState('');
  const [action, setAction] = useState();
  const [selectedOption, setSelectedOption] = React.useState(null);

  const handleCreatePolicyClick = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleCloseModalNewPolicy = () => {
    setOpenModal((prevState) => !prevState);
    setAction();
    setPolicyname('');
    setSelectedOption(null);
  };

  const handleOnchangeInput = (e, id) => {
    switch (id) {
      case 'policyname':
        setPolicyname(e.target.value);
        break;
      case 'action':
        setAction(e.target.value);
        break;
      default:
        break;
    }
  };
  const checkValidateInput = () => {
    let check = true;
    const inputValues = {
      policyname: policyname,
      commandName: selectedOption.name,
      action: action,
    };
    const requiredInputs = ['policyname', 'action', 'commandName'];
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
        policyname: policyname,
        commandName: selectedOption.name,
        action: action,
      };
      let response = await postCreateNewPolicy(newListDevices);
      // console.log('createList', response);
      if (response && response.statusCode === 500) {
        response.message.includes(`JSON parse error`)
          ? toast.error('Contact must be phone number')
          : toast.error(response.message);
      } else if (response && response.status === 200) {
        toast.success(`Create list devices success`);
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
      <Tooltip arrow placement="top" title="Add New Policy">
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
            width: '60%',
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Create a new Policy
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="policyname"
                label="Policy"
                fullWidth
                margin="normal"
                onChange={(e) => {
                  handleOnchangeInput(e, 'policyname');
                }}
                value={policyname}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '10px',
                  width: '100%',
                }}
              >
                Action
                <RadioGroup
                  row
                  name="row-radio-buttons-group"
                  onChange={(e) => {
                    handleOnchangeInput(e, 'action');
                  }}
                  defaultValue={action}
                >
                  <FormControlLabel value={1} control={<Radio />} label="Install" />
                  <FormControlLabel value={2} control={<Radio />} label="Uninstall" />
                  <FormControlLabel value={3} control={<Radio />} label="Run Command" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <AutoComplete
                label={'Command'}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
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
