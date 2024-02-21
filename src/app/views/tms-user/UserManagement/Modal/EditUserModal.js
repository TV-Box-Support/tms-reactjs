import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { putEditUserData } from 'app/Services/User_Auth_Service';
import { Edit } from '@mui/icons-material';

const adminRule = ['ROLE_ADMIN', 'ROLE_USER'];
const userRule = ['ROLE_USER'];

const EditUserModal = (props) => {
  const { row, setUpdatetable } = props;
  const [openModal, setOpenModal] = useState(false);
  const name = row.original.name;
  const username = row.original.username;
  const [company, setCompany] = useState(row.original.company);
  const [email, setEmail] = useState(row.original.email);
  const [contact, setContact] = useState(row.original.contact);
  const [orRule, setOrRule] = useState(row.original.rulename.length > 1 ? adminRule : userRule);
  const [rulename, setRulename] = useState(row.original.rulename.length > 1 ? adminRule : userRule);

  const handleOpenEditUser = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleCloseModalEditUser = () => {
    // console.log(row);
    setOpenModal((prevState) => !prevState);
  };

  const handleOnchangeInput = (e, id) => {
    switch (id) {
      case 'company':
        setCompany(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'contact':
        setContact(e.target.value);
        break;
      case 'rulename':
        setRulename(e.target.value);
        break;
      default:
        break;
    }
  };

  const checkValidateInput = () => {
    let check = true;
    const inputValues = {
      company,
      email,
      contact,
      rulename,
    };
    const requiredInputs = ['company', 'email', 'contact', 'rulename'];
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

  const handleEditUserData = async () => {
    let isValid = checkValidateInput();
    if (isValid) {
      let newUserData = {
        id: row.original.id,
        company: company,
        email: email,
        contact: contact,
        rulename: rulename,
      };
      if (
        newUserData.company === row.original.company &&
        newUserData.email === row.original.email &&
        newUserData.contact === row.original.contact &&
        newUserData.rulename.length === orRule.length
      ) {
        // console.log(newUserData.rulename, orRule);
        toast.info('Nothing changes');
      } else {
        let responseEditUser = await putEditUserData(newUserData);
        // console.log('editUserResponse', responseEditUser);
        if (responseEditUser && responseEditUser.statusCode === 500) {
          responseEditUser.message.includes(`JSON parse error`)
            ? toast.error('Contact must be phone number')
            : toast.error(responseEditUser.message);
        } else {
          toast.success(`Change user data success`);
          setUpdatetable(true);
          setOrRule('');
          handleCloseModalEditUser();
        }
      }
    }
  };

  return (
    <>
      <Button onClick={row.original.active ? handleOpenEditUser : ''}>
        <Edit color="primary" />
        <Typography style={{ marginLeft: '8px', color: 'black' }} textTransform="none">
          Edit User Data
        </Typography>
      </Button>
      <Modal open={openModal} onClose={handleCloseModalEditUser}>
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
            Edit user: {name}'s data
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="name"
                label="Name"
                disabled
                fullWidth
                margin="normal"
                required
                value={name}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="username"
                label="Username"
                disabled
                fullWidth
                margin="normal"
                required
                value={username}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="company"
                label="Company"
                fullWidth
                margin="normal"
                required
                value={company}
                onChange={(e) => {
                  handleOnchangeInput(e, 'company');
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="email"
                label="Email"
                fullWidth
                margin="normal"
                required
                value={email}
                onChange={(e) => {
                  handleOnchangeInput(e, 'email');
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="contact"
                label="Contact"
                fullWidth
                margin="normal"
                type="number"
                required
                value={contact}
                onChange={(e) => {
                  handleOnchangeInput(e, 'contact');
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="rulename-label">Role</InputLabel>
                <Select
                  id="rulename"
                  value={rulename}
                  onChange={(e) => {
                    handleOnchangeInput(e, 'rulename');
                  }}
                >
                  <MenuItem value={adminRule}>Admin</MenuItem>
                  <MenuItem value={userRule}>User</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '1rem',
            }}
          >
            <Button variant="contained" onClick={handleCloseModalEditUser}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" onClick={handleEditUserData}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default EditUserModal;
