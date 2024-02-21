import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Box, IconButton, Button, Modal, Typography, TextField, Grid } from '@mui/material';
import { putEditAPKData } from 'app/Services/PolicyServices';
import { Edit } from '@mui/icons-material';

const EditApkModal = (props) => {
  const { row, setUpdatetable } = props;
  const [openModal, setOpenModal] = useState(false);
  const [packagename, setPackagename] = useState(row.original.packagename);
  const [version, setVersion] = useState(row.original.version);
  const [apkfileUrl, setApkfileUrl] = useState(row.original.apkfileUrl);
  const [md5, setMd5] = useState(row.original.md5);
  const [packagesize, setPackagesize] = useState(row.original.packagesize);

  const handleOpenEditUser = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleCloseModalEditUser = () => {
    // console.log(row);
    setOpenModal((prevState) => !prevState);
  };

  const handleOnchangeInput = (e, id) => {
    switch (id) {
      case 'packagename':
        setPackagename(e.target.value);
        break;
      case 'version':
        setVersion(e.target.value);
        break;
      case 'apkfileUrl':
        setApkfileUrl(e.target.value);
        break;
      case 'md5':
        setMd5(e.target.value);
        break;
      case 'packagesize':
        setPackagesize(e.target.value);
        break;
      default:
        break;
    }
  };

  const checkValidateInput = () => {
    let check = true;
    const inputValues = {
      packagename: packagename,
      version: version,
      apkfileUrl: apkfileUrl,
      md5: md5,
      packagesize: packagesize,
    };
    const requiredInputs = ['packagename', 'version', 'apkfileUrl', 'md5', 'packagesize'];
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
      let newAPKData = {
        packagename: packagename,
        version: version,
        apkfileUrl: apkfileUrl,
        md5: md5,
        packagesize: packagesize,
      };
      if (
        newAPKData.packagename === row.original.packagename &&
        newAPKData.version === row.original.version &&
        newAPKData.apkfileUrl === row.original.apkfileUrl &&
        newAPKData.md5 === row.original.md5 &&
        newAPKData.packagesize === row.original.packagesize
      ) {
        // console.log(newUserData.rulename, orRule);
        toast.info('Nothing changes');
      } else {
        let responseEditUser = await putEditAPKData(newAPKData, row.original.id);
        // console.log('editUserResponse', responseEditUser);
        if (responseEditUser && responseEditUser.status === 200) {
          toast.success(`Change user data success`);
          setUpdatetable(true);
          handleCloseModalEditUser();
        } else {
          toast.error(responseEditUser.message);
        }
      }
    }
  };

  return (
    <>
      {/* <Tooltip arrow placement="bottom" title="Edit APK Data"> */}
      <IconButton onClick={handleOpenEditUser}>
        <Edit color="primary" />
        <Typography style={{ marginLeft: '8px', color: 'black' }}>Edit APK Data</Typography>
      </IconButton>
      {/* </Tooltip> */}
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
            Edit APK: {packagename}'s data
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="packagename"
                label="Package Name"
                fullWidth
                margin="normal"
                required
                value={packagename}
                onChange={(e) => {
                  handleOnchangeInput(e, 'packagename');
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="version"
                label="Version"
                fullWidth
                margin="normal"
                required
                value={version}
                onChange={(e) => {
                  handleOnchangeInput(e, 'version');
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="apkfileUrl"
                label="URL"
                fullWidth
                margin="normal"
                required
                value={apkfileUrl}
                onChange={(e) => {
                  handleOnchangeInput(e, 'apkfileUrl');
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="md5"
                label="MD5"
                fullWidth
                margin="normal"
                required
                value={md5}
                onChange={(e) => {
                  handleOnchangeInput(e, 'md5');
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="packagesize"
                label="Size"
                fullWidth
                margin="normal"
                type="number"
                required
                value={packagesize}
                onChange={(e) => {
                  handleOnchangeInput(e, 'packagesize');
                }}
              />
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

export default EditApkModal;
