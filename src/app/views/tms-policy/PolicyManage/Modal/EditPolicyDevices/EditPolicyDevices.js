import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Modal,
  Tab,
  Tabs,
  // Tooltip,
  Typography,
} from '@mui/material';
import PolicyDevicesManageTable from './PolicyDevicesManagement/PolicyDeviceMap/PolicyDevicesManageTable';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import { Close } from '@mui/icons-material';
import PolicyDeviceTable from './PolicyDevicesManagement/PolicyDeviceTable/PolicyDeviceTable';
import PolicyListDevicesTable from './PolicyListDevicesManagement/ListDevicesTable/PolicyListDevicesTable';

const EditPolicyDevices = (props) => {
  const { row } = props;
  const [openModal, setOpenModal] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [key, setKey] = useState(1);

  const handleOpenEditDescription = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleCloseModal = () => {
    setOpenModal((prevState) => !prevState);
  };

  return (
    <>
      <Button onClick={handleOpenEditDescription}>
        <QueuePlayNextIcon color="primary" />
        <Typography style={{ marginLeft: '8px', color: 'black' }} textTransform="none">
          Edit Policy Device & List Device
        </Typography>
      </Button>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '95%',
            minHeight: '35%',
            maxHeight: '95%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 0,
            overflow: 'auto',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Tabs
              value={key}
              onChange={(e, newValue) => setKey(newValue)}
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab value={1} label="Add new device" />
              <Tab value={2} label="Add new list device" />
            </Tabs>
            <IconButton type="button">
              <Close color="inherit" onClick={handleCloseModal} />
            </IconButton>
          </Box>
          {key === 1 && (
            <Box sx={{ p: 1 }}>
              <PolicyDevicesManageTable id={row.original.id} setAddSuccess={setAddSuccess} />
              <br />
              <PolicyDeviceTable
                id={row.original.id}
                addSuccess={addSuccess}
                setAddSuccess={setAddSuccess}
              />
            </Box>
          )}
          {key === 2 && (
            <Box sx={{ p: 1 }}>
              <PolicyListDevicesTable policyId={row.original.id} setAddSuccess={setAddSuccess} />
              <br />
              <PolicyDeviceTable
                id={row.original.id}
                addSuccess={addSuccess}
                setAddSuccess={setAddSuccess}
              />
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default EditPolicyDevices;
