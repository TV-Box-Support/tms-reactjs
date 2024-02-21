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
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import { Close } from '@mui/icons-material';
import DeviceManageTable from './TableDevices/DevicesManageTable';
import DevicesInListDeviceTable from './DevicesInListDeviceTable/DevicesInListDeviceTable';
import DeviceLocationMap from './DeviceLocationMap/DeviceLocationMap';

const AddDeviceToListDevice = (props) => {
  const { row } = props;
  const [openModal, setOpenModal] = useState(false);
  const [addDevicesSuccess, setAddDevicesSuccess] = useState(false);
  const [key, setKey] = useState(1);

  const handleOpenEditDescription = () => {
    setOpenModal((prevState) => !prevState);
  };
  const handleAddDeviceSuccess = () => {
    setAddDevicesSuccess(true);
  };
  const handleCloseModal = () => {
    setOpenModal((prevState) => !prevState);
  };

  return (
    <div>
      <Button onClick={handleOpenEditDescription}>
        <QueuePlayNextIcon color="primary" />
        <Typography
          style={{ marginLeft: '8px', color: 'black', whiteSpace: 'nowrap' }}
          textTransform="none"
        >
          Add devices to list device
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
          <Box sx={{ p: 1 }}>
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
                <Tab value={2} label="Add new device by location" />
              </Tabs>
              <IconButton type="button">
                <Close color="inherit" onClick={handleCloseModal} />
              </IconButton>
            </Box>
            {key === 1 && (
              <Box sx={{ p: 1 }}>
                <DeviceManageTable
                  id={row.original.id}
                  handleAddDeviceSuccess={handleAddDeviceSuccess}
                />
                <br />
                <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}>
                  <DevicesInListDeviceTable
                    id={row.original.id}
                    addDevicesSuccess={addDevicesSuccess}
                    setAddDevicesSuccess={setAddDevicesSuccess}
                  />
                </Box>
              </Box>
            )}
            {key === 2 && (
              <Box sx={{ p: 1 }}>
                <DeviceLocationMap id={row.original.id} setAddSuccess={setAddDevicesSuccess} />
                <br />
                <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}>
                  <DevicesInListDeviceTable
                    id={row.original.id}
                    addDevicesSuccess={addDevicesSuccess}
                    setAddDevicesSuccess={setAddDevicesSuccess}
                  />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AddDeviceToListDevice;
