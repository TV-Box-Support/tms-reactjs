import React from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { IconButton, Grid, Tooltip, FormControlLabel } from '@mui/material';
import { NavigateBefore } from '@mui/icons-material';
import { Android12Switch } from 'app/components/CustomSwitch';

const BottomBarSetup = (props) => {
  const {
    paramsPageDevices,
    totalPage,
    handleMoveToPrePage,
    handleMoveToNextPage,
    isSystem,
    setIsSystem,
    isAlive,
    setIsAlive,
  } = props;
  const handleChangeSearchSystem = (event) => {
    setIsSystem(!event.target.checked);
  };

  const handleChangeSearchIsAlive = (event) => {
    setIsAlive(event.target.checked);
  };

  return (
    <Grid container fullWidth>
      <Grid
        item
        lg={8}
        md={8}
        sm={12}
        xs={12}
        style={{ display: 'flex', justifyContent: 'flex-start' }}
      >
        <FormControlLabel
          control={
            <Android12Switch checked={!isSystem} onChange={(e) => handleChangeSearchSystem(e)} />
          }
          label={!isSystem ? 'User App' : 'System App'}
        />
        <FormControlLabel
          control={
            <Android12Switch checked={isAlive} onChange={(e) => handleChangeSearchIsAlive(e)} />
          }
          label={isAlive ? 'App Installed' : 'App Uninstalled'}
        />
      </Grid>
      <Grid
        item
        lg={4}
        md={4}
        sm={12}
        xs={12}
        style={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <span>
          <Tooltip title="Previous page">
            <IconButton disabled={paramsPageDevices.page === 1} onClick={handleMoveToPrePage}>
              <NavigateBefore />
            </IconButton>
          </Tooltip>
          Page {paramsPageDevices.page} of {totalPage}
          <Tooltip title="Next page">
            <IconButton
              disabled={paramsPageDevices.page === totalPage}
              onClick={handleMoveToNextPage}
            >
              <NavigateNextIcon />
            </IconButton>
          </Tooltip>
        </span>
      </Grid>
    </Grid>
  );
};

export default BottomBarSetup;
