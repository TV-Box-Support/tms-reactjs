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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { postCreateNewUser } from 'app/Services/User_Auth_Service';

const adminRule = ['admin', 'user'];
const userRule = ['user'];

const NewUserModal = (props) => {
  const { setResettable } = props;
  const [openModal, setOpenModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [rulename, setRulename] = useState('');

  // const handleResetTable = () => {
  //   setResettable(false);
  // };
  const handleCreateUserClick = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleCloseModalNewUser = () => {
    setOpenModal((prevState) => !prevState);
    setUsername('');
    setPassword('');
    setName('');
    setEmail('');
    setCompany('');
    setContact('');
    setRulename('');
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleOnchangeInput = (e, id) => {
    if (id === 'rulename') {
      if (e.target.value === 'admin') {
        setRulename(adminRule);
      } else {
        setRulename(userRule);
      }
    } else {
      switch (id) {
        case 'name':
          setName(e.target.value);
          break;
        case 'username':
          setUsername(e.target.value);
          break;
        case 'password':
          setPassword(e.target.value);
          break;
        case 'company':
          setCompany(e.target.value);
          break;
        case 'email':
          setEmail(e.target.value);
          break;
        case 'contact':
          setContact(e.target.value);
          break;
        default:
          break;
      }
    }
  };

  const checkValidateInput = () => {
    let check = true;
    const inputValues = {
      name,
      username,
      password,
      company,
      email,
      contact,
      rulename,
    };
    const requiredInputs = [
      'name',
      'username',
      'password',
      'company',
      'email',
      'contact',
      'rulename',
    ];
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

  const handleAddNewUser = async () => {
    let isValid = checkValidateInput();
    if (isValid) {
      let newUser = {
        name: name,
        username: username,
        password: password,
        company: company,
        email: email,
        contact: contact,
        rulename: rulename,
      };
      let responseCreateUser = await postCreateNewUser(newUser);
      // console.log('createUserResponse', responseCreateUser);
      if (responseCreateUser && responseCreateUser.statusCode === 500) {
        responseCreateUser.message.includes(`JSON parse error`)
          ? toast.error('Contact must be phone number')
          : toast.error(responseCreateUser.message);
      } else if (responseCreateUser && responseCreateUser.status === 200) {
        toast.success(`Create user success`);
        handleCloseModalNewUser();
        setResettable(true);
      } else {
        toast.error(responseCreateUser.message);
        handleCloseModalNewUser();
      }
    }
  };
  const handleBlurEmail = () => {
    if (!email.endsWith('@gmail.com')) {
      setEmail(email + '@gmail.com');
    }
  };
  const handleBlurContact = () => {
    if (!contact.endsWith('123456')) {
      setContact(contact + '123456');
    }
  };
  const handleBlurCompany = () => {
    if (!company.endsWith('vnpt')) {
      setCompany(company + 'vnpt');
    }
  };

  return (
    <>
      <Tooltip arrow placement="top" title="Add New User">
        <IconButton onClick={handleCreateUserClick}>
          <PersonAddAlt1Icon color="primary" />
        </IconButton>
      </Tooltip>
      <Modal open={openModal} onClose={handleCloseModalNewUser}>
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
            <Grid item xs={6}>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                required
                onChange={(e) => {
                  handleOnchangeInput(e, 'name');
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Username"
                fullWidth
                margin="normal"
                required
                onChange={(e) => {
                  handleOnchangeInput(e, 'username');
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Password"
                required
                fullWidth
                margin="normal"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  handleOnchangeInput(e, 'password');
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Company"
                fullWidth
                margin="normal"
                required
                onChange={(e) => {
                  handleOnchangeInput(e, 'company');
                }}
                //test
                onBlur={handleBlurCompany}
                value={company}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                required
                onChange={(e) => {
                  handleOnchangeInput(e, 'email');
                }}
                //test
                onBlur={handleBlurEmail}
                value={email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Contact"
                fullWidth
                margin="normal"
                type="numeric"
                inputProps={{
                  pattern: '[0-9]*',
                  shrink: false,
                }}
                required
                onChange={(e) => {
                  handleOnchangeInput(e, 'contact');
                }}
                //test
                onBlur={handleBlurContact}
                value={contact}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="rulename-label">Role</InputLabel>
                <Select
                  id="rulename"
                  onChange={(e) => {
                    handleOnchangeInput(e, 'rulename');
                  }}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
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
            <Button variant="contained" onClick={handleCloseModalNewUser}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" onClick={handleAddNewUser}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default NewUserModal;
