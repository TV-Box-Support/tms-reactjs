import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Typography } from '@mui/material';
import { Download } from '@mui/icons-material';
import { getAPKFromServer } from 'app/Services/PolicyServices';
import { toast } from 'react-toastify';

export default function DownloadAPKDialog(props) {
  const { url } = props;
  const filename = props.filename.toString();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDownloadAPK = async (url, filename) => {
    let res = await getAPKFromServer(url, filename);
    // console.log(res);
    if (res.status === 200) {
      handleClose();
      toast.success('File is downloading!!!');
    }
  };

  return (
    <div>
      {/* <Tooltip arrow placement="bottom" title="Download APK Data"> */}
      <IconButton onClick={handleClickOpen}>
        <Download color="primary" />
        <Typography style={{ marginLeft: '8px', color: 'black' }}>Download APK</Typography>
      </IconButton>
      {/* </Tooltip> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Confirm download'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to dowwn load this file?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleDownloadAPK(url, filename)}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
