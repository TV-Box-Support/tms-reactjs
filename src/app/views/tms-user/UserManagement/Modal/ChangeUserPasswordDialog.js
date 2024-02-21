import React, { useState } from 'react';
import useAuth from 'app/hooks/useAuth';
import { toast } from 'react-toastify';
import {
  IconButton,
  Button,
  TextField,
  Grid,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PasswordIcon from '@mui/icons-material/Password';
import { putChangeUserPassword } from 'app/Services/User_Auth_Service';

const ChangeUserPasswordDialog = (props) => {
  const { row } = props;
  const { logout, user } = useAuth();
  const [currentId, setCurrentId] = useState();
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [showPasswordNew1, setShowPasswordNew1] = useState(false);
  const [showPasswordNew2, setShowPasswordNew2] = useState(false);
  const [passwordNew1, setPasswordNew1] = useState('');
  const [passwordNew2, setPasswordNew2] = useState('');
  //Change user password

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPasswordNew1 = () => {
    setShowPasswordNew1(!showPasswordNew1);
  };

  const handleClickShowPasswordNew2 = () => {
    setShowPasswordNew2(!showPasswordNew2);
  };
  const handleOpenChangePassword = (row, table, values) => {
    setOpenChangePassword(true);
    setCurrentId(row.original.id);
  };
  const handleCloseChangePassword = () => {
    setCurrentId();
    setPasswordNew1();
    setPasswordNew2();
    setOpenChangePassword(false);
  };
  const handleChangePassword = async () => {
    if (passwordNew1 !== passwordNew2) {
      return;
    } else {
      let response = await putChangeUserPassword(currentId, passwordNew1);
      // console.log(response);
      if (response && response.status === 200) {
        toast.success(`Change password success`);
        // setUpdatetable(!updateTable);
        setCurrentId();
        setPasswordNew1();
        setPasswordNew2();
        handleCloseChangePassword();
        if (currentId === user.id) {
          alert('Please login again!!!');
          logout();
        }
      } else {
        toast.error(`Something went wrong. Cannot change password`);
        handleCloseChangePassword();
        setCurrentId();
        setPasswordNew1();
        setPasswordNew2();
      }
    }
  };
  //Change user password

  return (
    <>
      <Button onClick={() => (row.original.active ? handleOpenChangePassword(row) : '')}>
        <PasswordIcon color="primary" />
        <Typography style={{ marginLeft: '8px', color: 'black' }} textTransform="none">
          Change password
        </Typography>
      </Button>
      <Dialog
        open={openChangePassword}
        onClose={handleCloseChangePassword}
        id="changePassword"
        maxHeight={false}
        height={500}
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <br></br>
          <Grid item xs={12}>
            <TextField
              id="outlined-adornment-password"
              type={showPasswordNew1 ? 'text' : 'password'}
              variant="outlined"
              label="Password"
              value={passwordNew1}
              onChange={(event) => setPasswordNew1(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordNew1}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPasswordNew1 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <br></br>
          <Grid item xs={12}>
            <TextField
              id="outlined-adornment-password-2"
              type={showPasswordNew2 ? 'text' : 'password'}
              variant="outlined"
              label="Input Password again"
              value={passwordNew2}
              onChange={(event) => setPasswordNew2(event.target.value)}
              error={passwordNew1 !== passwordNew2}
              helperText={passwordNew1 !== passwordNew2 ? 'Passwords do not match' : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordNew2}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPasswordNew2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChangePassword} color="primary">
            Cancel
          </Button>
          <Button onClick={handleChangePassword} color="primary">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog change user password*/}
    </>
  );
};

export default ChangeUserPasswordDialog;
