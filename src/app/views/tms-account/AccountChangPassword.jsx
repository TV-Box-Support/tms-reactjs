import React from 'react';
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
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useAuth from 'app/hooks/useAuth';
import { putChangeAccountPassword } from 'app/Services/User_Auth_Service';
import { useState, useEffect } from 'react';

const AccountChangePassword = (props) => {
  const { stateOpenChangePassword, setStateOpenChangePassword } = props;
  const { user, logout } = useAuth();
  const [password, setPassword] = useState();
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [passwordNew1, setPasswordNew1] = useState();
  const [passwordNew2, setPasswordNew2] = useState();
  const [showPasswordPrev, setShowPasswordPrev] = useState(false);
  const [showPasswordNew1, setShowPasswordNew1] = useState(false);
  const [showPasswordNew2, setShowPasswordNew2] = useState(false);

  const handleClickShowPasswordPrev = () => {
    setShowPasswordPrev(!showPasswordPrev);
  };

  const handleClickShowPasswordNew1 = () => {
    setShowPasswordNew1(!showPasswordNew1);
  };

  const handleClickShowPasswordNew2 = () => {
    setShowPasswordNew2(!showPasswordNew2);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleOpenChangePassword = () => {
    setOpenChangePassword(true);
  };
  const handleCloseChangePassword = () => {
    setPasswordNew1();
    setPasswordNew2();
    setOpenChangePassword(false);
    setStateOpenChangePassword(false);
  };
  const handleChangePassword = async () => {
    if (passwordNew1 !== passwordNew2) {
      return;
    } else {
      let response = await putChangeAccountPassword(user.id, password, passwordNew1);
      // console.log(response);
      if (response && response.status === 200) {
        toast.success(`Change password success`);
        alert('Please login again!!!');
        // setUpdatetable(!updateTable);
        setPasswordNew1();
        setPasswordNew2();
        handleCloseChangePassword();
        setStateOpenChangePassword(false);
        logout();
      } else {
        toast.error(`Something went wrong. Cannot change password`);
        setPasswordNew1();
        setPasswordNew2();
        handleCloseChangePassword();
        setStateOpenChangePassword(false);
      }
    }
  };

  useEffect(() => {
    if (stateOpenChangePassword) {
      handleOpenChangePassword();
    }
  }, [stateOpenChangePassword]);
  return (
    <>
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
              id="outlined-adornment-password-0"
              type={showPasswordPrev ? 'text' : 'password'}
              variant="outlined"
              label="Previous Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordPrev}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPasswordPrev ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <br></br>
          <Grid item xs={12}>
            <TextField
              id="outlined-adornment-password-1"
              type={showPasswordNew1 ? 'text' : 'password'}
              variant="outlined"
              label="Password"
              value={passwordNew1}
              onChange={(event) => {
                setPasswordNew1(event.target.value);
              }}
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
              onChange={(event) => {
                setPasswordNew2(event.target.value);
              }}
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
    </>
  );
};

export default AccountChangePassword;
