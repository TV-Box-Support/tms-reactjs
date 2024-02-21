import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
} from '@mui/material';
import { deleteUser } from 'app/Services/User_Auth_Service';
import { Delete } from '@mui/icons-material';

const DeleteUserDialog = (props) => {
  const { row, setUpdatetable } = props;
  const [currentId, setCurrentId] = useState();
  const [openModalDelete, setOpenModalDelete] = useState(false);

  //Delete user
  const handleDelete = async () => {
    let responseDel = await deleteUser(currentId);
    // console.log('ResponseDel: ', responseDel);
    if (responseDel.status === 200) {
      setUpdatetable(true);
      toast.success('Delete user success');
      handleCloseDelete();
      setCurrentId();
    } else {
      toast.error('Something went wrong. Cannot delete user');
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
  //Delete user

  return (
    <>
      <Button onClick={() => (row.original.active ? handleOpenDeleteModal(row) : '')}>
        <Delete color="error" />
        <Typography style={{ marginLeft: '8px', color: 'black' }} textTransform="none">
          Delete
        </Typography>
      </Button>
      <Dialog open={openModalDelete} onClose={handleCloseDelete} id="deleteDialog">
        <DialogTitle>Delete confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this item?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog delete user*/}
    </>
  );
};

export default DeleteUserDialog;
