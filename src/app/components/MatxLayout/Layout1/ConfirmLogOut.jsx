import { Button, Dialog, DialogActions, DialogTitle, Icon } from '@mui/material';
import React from 'react';

const ConfirmLogout = (props) => {
  const { openLogout, handleClose, handleAgreeLogout } = props;

  return (
    <Dialog
      open={openLogout}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <Icon color="error" style={{ marginRight: '10px' }}>
            warning
          </Icon>
          Confirm Logout
        </span>
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="info">
          Close
        </Button>
        <Button onClick={handleAgreeLogout} color="error">
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmLogout;
