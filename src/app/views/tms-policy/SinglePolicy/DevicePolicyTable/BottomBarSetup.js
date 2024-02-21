import React from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { IconButton, Grid, Tooltip, FormControlLabel, Select, MenuItem } from '@mui/material';
import { NavigateBefore } from '@mui/icons-material';

const BottomBarSetup = (props) => {
  const {
    paramsPageDevices,
    totalPage,
    handleMoveToPrePage,
    handleMoveToNextPage,
    status,
    setStatus,
  } = props;
  const handleChange = (event) => {
    setStatus(event.target.value);
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
        {' '}
        <FormControlLabel
          variant="standard"
          sx={{ m: 1, minWidth: 100, height: 30 }}
          control={
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={status}
              displayEmpty
              onChange={handleChange}
              sx={{ height: 30 }}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value={0}>Not Run</MenuItem>
              <MenuItem value={1}>Pending</MenuItem>
              <MenuItem value={2}>Running</MenuItem>
              <MenuItem value={3}>Success</MenuItem>
            </Select>
          }
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
