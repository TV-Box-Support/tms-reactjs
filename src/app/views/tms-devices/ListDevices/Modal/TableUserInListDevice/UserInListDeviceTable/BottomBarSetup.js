import React from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { IconButton, Grid, Tooltip } from '@mui/material';
import { NavigateBefore } from '@mui/icons-material';

const BottomBarSetup = (props) => {
  const { paramsPage, totalPage, handleMoveToPrePage, handleMoveToNextPage } = props;

  return (
    <Grid container fullWidth>
      <Grid
        item
        lg={8}
        md={8}
        sm={12}
        xs={12}
        style={{ display: 'flex', justifyContent: 'flex-end' }}
      ></Grid>
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
            <IconButton disabled={paramsPage.page === 1} onClick={handleMoveToPrePage}>
              <NavigateBefore />
            </IconButton>
          </Tooltip>
          Page {paramsPage.page} of {totalPage}
          <Tooltip title="Next page">
            <IconButton disabled={paramsPage.page === totalPage} onClick={handleMoveToNextPage}>
              <NavigateNextIcon />
            </IconButton>
          </Tooltip>
        </span>
      </Grid>
    </Grid>
  );
};

export default BottomBarSetup;
