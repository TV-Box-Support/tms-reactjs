import React from 'react';
import { TextField, Divider, InputAdornment } from '@mui/material';
import { IconButton, Grid, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Close, RestartAlt, SendAndArchive } from '@mui/icons-material';

const TopBarSetup = (props) => {
  const {
    searchTerm,
    setSearchTerm,
    handleResetTable,
    handleSearchMode,
    handleEditDevicesToListDevices,
  } = props;

  const handleChangeSearchBar = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStartSearchMode = () => {
    if (isSearchTermEmpty) {
      return;
    } else {
      handleSearchMode();
    }
  };
  const handleCloseSearchMode = () => {
    setSearchTerm('');
    handleResetTable();
  };
  const isSearchTermEmpty = searchTerm.trim().length === 0;

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
          id="search"
          label="Search"
          variant="outlined"
          placeholder="Only search in SerialNumber and Description"
          size="small"
          value={searchTerm}
          onChange={handleChangeSearchBar}
          edge="end"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Tooltip
                  arrow
                  placement="top"
                  title={'Only search in SerialNumber and Description'}
                >
                  <IconButton
                    type="button"
                    aria-label="search"
                    helperText="Search"
                    onClick={handleStartSearchMode}
                  >
                    <SearchIcon color="primary" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
        <Tooltip arrow placement="top" title={'Close Search'}>
          <IconButton type="button" onClick={handleCloseSearchMode} disabled={isSearchTermEmpty}>
            <Close color="error" />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid
        item
        lg={4}
        md={4}
        sm={12}
        xs={12}
        style={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Tooltip arrow placement="top" title="Reset table to default">
          <IconButton color="primary" aria-label="clear" onClick={handleResetTable}>
            <RestartAlt />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="top" title="Add devices">
          <IconButton color="primary" aria-label="clear" onClick={handleEditDevicesToListDevices}>
            <SendAndArchive />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default TopBarSetup;
