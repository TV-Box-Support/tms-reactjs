import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Typography,
} from '@mui/material';
import { deleteAPKfile } from 'app/Services/PolicyServices';
import { Delete } from '@mui/icons-material';
// import { TRUE } from 'node-sass';

const DeleteAPKDialog = (props) => {
  const { row, setUpdatetable } = props;
  const [currentId, setCurrentId] = useState();
  const [openModalDelete, setOpenModalDelete] = useState(false);

  //Delete user
  const handleDelete = async () => {
    let responseDel = await deleteAPKfile([currentId]);
    // console.log('ResponseDel: ', responseDel);
    if (responseDel.status === 200) {
      setUpdatetable(true);
      toast.success('Delete APK file success');
      handleCloseDelete();
      setCurrentId();
    } else {
      toast.error('Something went wrong. Cannot delete apk');
      handleCloseDelete();
      setCurrentId();
    }
  };
  const handleOpenDeleteModal = (row) => {
    setOpenModalDelete(true);
    setCurrentId(row.original.id);
  };
  const handleCloseDelete = () => {
    setOpenModalDelete(false);
  };
  //Delete apk

  return (
    <>
      {/* <Tooltip arrow placement="bottom" title="Delete"> */}
      <IconButton onClick={() => handleOpenDeleteModal(row)}>
        <Delete color="error" />
        <Typography style={{ marginLeft: '8px', color: 'black' }}>Delete</Typography>
      </IconButton>
      {/* </Tooltip> */}
      {/* Dialog delete apk*/}
      <Dialog open={openModalDelete} onClose={handleCloseDelete} id="deleteDialog">
        <DialogTitle>Delete confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this item?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog delete apk*/}
    </>
  );
};

export default DeleteAPKDialog;
