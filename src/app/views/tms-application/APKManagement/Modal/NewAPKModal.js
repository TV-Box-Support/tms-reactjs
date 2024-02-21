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
  Tooltip,
  Tabs,
  Tab,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from '@mui/material';
import { postNewAPKData, postNewAPKFile } from 'app/Services/PolicyServices';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { CircularProgressWithLabel } from 'app/components/CircularProgress';

const NewApkModal = (props) => {
  const { setResettable } = props;
  const [openModal, setOpenModal] = useState(false);
  const [packagename, setPackagename] = useState('');
  const [version, setVersion] = useState('');
  const [apkfileUrl, setApkfileUrl] = useState('');
  const [md5, setMd5] = useState('');
  const [packagesize, setPackagesize] = useState('');
  const [key, setKey] = useState(1);
  const [uploadedFile, setUploadedFile] = useState(null);
  const inputFileRef = React.useRef(null);
  const [progress, setProgress] = useState(0);

  const handleOpenEditUser = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleCloseModalNewAPK = () => {
    // console.log(row);
    setOpenModal((prevState) => !prevState);
    setPackagename('');
    setVersion('');
    setApkfileUrl('');
    setMd5('');
    setPackagesize('');
    setUploadedFile(null);
    setProgress(0);
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

  const handleUploadFileAPK = async () => {
    // console.log(uploadedFile);
    if (!uploadedFile) {
      toast.error(`No File to upload`);
      handleCloseModalNewAPK();
    } else {
      const res = await postNewAPKFile(uploadedFile, (event) => {
        setProgress(Math.round((100 * event.loaded) / event.total));
      });
      // console.log(res);
      if (res && res.status === 200) {
        toast.success(`Upload APK file success`);
        setResettable(true);
        handleCloseModalNewAPK();
      } else {
        toast.error(res.message);
      }
    }
  };

  const handleNewAPKData = async () => {
    let isValid = checkValidateInput();
    if (isValid) {
      let newAPKData = {
        packagename: packagename,
        version: version,
        apkfileUrl: apkfileUrl,
        md5: md5,
        packagesize: packagesize,
      };

      let res = await postNewAPKData(newAPKData);
      // console.log('editUserResponse', responseEditUser);
      if (res && res.status === 200) {
        toast.success(`Upload APK data success`);
        setResettable(true);
        handleCloseModalNewAPK();
      } else {
        toast.error(res.message);
      }
    }
  };

  return (
    <>
      <Tooltip arrow placement="bottom" title="Upload APK Data/File">
        <IconButton onClick={handleOpenEditUser}>
          <UploadFileIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Modal open={openModal} onClose={handleCloseModalNewAPK}>
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
          <Tabs
            value={key}
            onChange={(e, newValue) => setKey(newValue)}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab value={1} label="New APK Information" />
            <Tab value={2} label="New APK File" />
          </Tabs>
          {key === 1 && (
            <Box>
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
                <Button variant="contained" onClick={handleCloseModalNewAPK}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit" onClick={handleNewAPKData}>
                  Save
                </Button>
              </Box>
            </Box>
          )}
          {key === 2 && (
            <Box
              sx={{
                minWidth: 630,
                minHeight: 210,
              }}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                handleUploadFileAPK(file);
              }}
              onDragOver={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  handleUploadFileAPK(file);
                }}
                style={{ display: 'none' }}
                ref={inputFileRef}
              />
              {!uploadedFile && (
                <Box
                  sx={{
                    minWidth: 510,
                    minHeight: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '1rem',
                    border: '1px dashed grey',
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Drag and drop your APK file here
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    or
                  </Typography>
                  <Button variant="contained" component="label">
                    Choose File
                    <input
                      type="file"
                      onChange={(e) => {
                        // const file = e.target.files[0];
                        setUploadedFile(e.target.files[0]);
                      }}
                      style={{ display: 'none' }}
                      ref={inputFileRef}
                    />
                  </Button>
                </Box>
              )}
              {uploadedFile && (
                <Box
                  sx={{
                    marginTop: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '1rem',
                    border: '1px dashed grey',
                  }}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <CircularProgressWithLabel value={progress} />
                    </ListItemAvatar>
                    <Divider
                      sx={{ height: 28, m: 0.5, borderWidth: 2, opacity: 0 }}
                      orientation="vertical"
                    />
                    <ListItemText
                      primary={`File name: ${uploadedFile.name}`}
                      secondary={`File size: ${uploadedFile.size} bytes`}
                    />
                  </ListItem>
                </Box>
              )}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '1rem',
                }}
              >
                <Button variant="contained" onClick={handleCloseModalNewAPK}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit" onClick={handleUploadFileAPK}>
                  Save
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default NewApkModal;
