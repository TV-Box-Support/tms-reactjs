import React from 'react';
import { TextField, Divider } from '@mui/material';
import { IconButton, Grid, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Close, RestartAlt, SendAndArchive } from '@mui/icons-material';
import { toast } from 'react-toastify';

const TopBarSetup = (props) => {
  const {
    handleEditPolicyDevice,
    handleResetTable,
    handleSearchMode,
    searchLoca,
    searchDes,
    setSearchLoca,
    setSearchDes,
  } = props;

  const handleChangeSearchLoca = (event) => {
    setSearchLoca(event.target.value);
  };

  const handleChangeSearchDes = (event) => {
    setSearchDes(event.target.value);
  };

  const handleStartSearchMode = () => {
    if (searchLoca.trim().length === 0) {
      toast.error('Please in put location!!!');
      return;
    } else {
      handleSearchMode();
    }
  };
  const handleCloseSearchMode = () => {
    setSearchDes('');
    setSearchLoca('');
    handleResetTable();
  };
  const isSearchTermEmpty = searchLoca.trim().length === 0 && searchDes.trim().length === 0;

  return (
    <Grid container fullWidth>
      <Grid
        item
        lg={8}
        md={8}
        sm={12}
        xs={12}
        style={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <TextField
          id="searchlocation"
          label="Search Location"
          variant="outlined"
          size="small"
          value={searchLoca}
          onChange={handleChangeSearchLoca}
          edge="end"
          fullWidth
        />
        <Divider sx={{ height: 28, m: 0.5, borderWidth: 2, opacity: 0 }} orientation="vertical" />
        <TextField
          id="searchDescription"
          label="Search Description"
          variant="outlined"
          size="small"
          value={searchDes}
          onChange={handleChangeSearchDes}
          edge="end"
          fullWidth
        />
      </Grid>
      <Grid
        item
        lg={4}
        md={4}
        sm={12}
        xs={12}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Grid
          lg={2}
          md={2}
          sm={12}
          xs={12}
          style={{ display: 'flex', justifyContent: 'flex-start' }}
        >
          {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
          <Tooltip arrow placement="top" title={'Search'}>
            <IconButton
              type="button"
              aria-label="search"
              helperText="Search"
              onClick={handleStartSearchMode}
            >
              <SearchIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement="top" title={'Close Search'}>
            <IconButton type="button" onClick={handleCloseSearchMode} disabled={isSearchTermEmpty}>
              <Close color="error" />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid lg={2} md={2} sm={12} xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <Tooltip arrow placement="top" title="Add Devices">
            <IconButton color="primary" aria-label="clear" onClick={handleEditPolicyDevice}>
              <SendAndArchive />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TopBarSetup;
