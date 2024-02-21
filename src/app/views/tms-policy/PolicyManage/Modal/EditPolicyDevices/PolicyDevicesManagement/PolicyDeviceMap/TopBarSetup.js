import React from 'react';
import { TextField, Divider } from '@mui/material';
import { IconButton, Grid, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Close, RestartAlt, SendAndArchive } from '@mui/icons-material';

const TopBarSetup = (props) => {
  const { handleEditPolicyApk, handleResetTable, handleSearchMode, searchTerm, setSearchTerm } =
    props;

  const handleChangeSearchPackage = (event) => {
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
        style={{ display: 'flex', justifyContent: 'flex-center' }}
      >
        <TextField
          id="search"
          label="Only search in SerialNumber and Description"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleChangeSearchPackage}
          edge="end"
          fullWidth
        />
        <Divider sx={{ height: 28, m: 0.5, borderWidth: 2, opacity: 0 }} orientation="vertical" />
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
          <Tooltip arrow placement="top" title="Reset table to default">
            <IconButton color="primary" aria-label="clear" onClick={handleResetTable}>
              <RestartAlt />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement="top" title="Add Policy">
            <IconButton color="primary" aria-label="clear" onClick={handleEditPolicyApk}>
              <SendAndArchive />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TopBarSetup;
