import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Box, Button, Modal, Typography, TextField, Grid } from '@mui/material';
import { Edit } from '@mui/icons-material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { putEditPolicy } from 'app/Services/PolicyServices';
import { getAPageCommand } from 'app/Services/PolicyServices';
import Autocomplete from '@mui/material/Autocomplete';

function AutoComplete({ label, defaultCommand, selectedOption, setSelectedOption }) {
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
      setArrNotiId(arr);
    }
  };

  const handleOnChange = (event, newValue) => {
    setSelectedOption(newValue);
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

  useEffect(() => {
    if (!hasSelected && arrNotiId.length > 0) {
      const defaultNotiObj = arrNotiId.find((item) => item.name === defaultCommand);
      setSelectedOption(defaultNotiObj);
      setParamPage({ ...paramsPage, search: null });
      setHasSelected(true);
    }
  }, [hasSelected, arrNotiId, defaultCommand, setSelectedOption, paramsPage]);

  return (
    <div>
      <Typography>Recent Command Name: {selectedOption ? selectedOption.name : ''}</Typography>
      <br />
      <Autocomplete
        options={arrNotiId}
        getOptionLabel={(option) => option.name}
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

const EditPolicyModal = (props) => {
  const { row, setUpdatetable } = props;
  const [openModal, setOpenModal] = useState(false);
  const [action, setAction] = useState(row.original.action);
  const [policyname, setPolicyname] = useState(row.original.policyname);
  const preAction = row.original.action;
  const prePolicyName = row.original.policyname;
  const prevCommand = row.original.commandName;
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOpenEditDescription = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleCloseModalEditDescription = () => {
    setOpenModal((prevState) => !prevState);
    setSelectedOption(null);
    setPolicyname();
    setAction();
  };

  const handlePolicyActionChange = (event) => {
    setAction(event.target.value);
  };

  const handlePolicyNameChange = (event) => {
    setPolicyname(event.target.value);
  };

  const handleEditPolicy = async () => {
    if (
      action === preAction &&
      prePolicyName === policyname &&
      prevCommand === selectedOption.name
    ) {
      toast.info('Nothing changes');
      handleCloseModalEditDescription();
      return;
    }
    if (preAction === '') {
      return;
    }
    let data = {
      id: row.original.id,
      policyname: policyname,
      action: action,
      commandName: selectedOption.name,
    };
    let response = await putEditPolicy(data);
    // console.log('editPolicyResponse', response);
    if (response && response.status === 200) {
      toast.success(`Change list devices data success`);
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
          Edit Policy
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
                id="name"
                label="Policy Name"
                fullWidth
                margin="normal"
                onChange={(event) => handlePolicyNameChange(event)}
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
                  onChange={handlePolicyActionChange}
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
                defaultCommand={prevCommand}
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
            <Button variant="contained" onClick={handleCloseModalEditDescription}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" onClick={handleEditPolicy}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default EditPolicyModal;
