import React from 'react';
import { TextField, Divider } from '@mui/material';
import { IconButton, Grid, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Close, RestartAlt, SendAndArchive } from '@mui/icons-material';

const TopBarSetup = (props) => {
  const {
    handleEditPolicyApk,
    handleResetTable,
    handleSearchMode,
    searchTermPackage,
    setSearchTermPackage,
    searchTermVersion,
    setSearchTermVersion,
  } = props;

  const handleChangeSearchPackage = (event) => {
    setSearchTermPackage(event.target.value);
  };

  const handleChangeSearchVersion = (event) => {
    setSearchTermVersion(event.target.value);
  };

  const handleStartSearchMode = () => {
    if (isSearchTermEmpty) {
      return;
    } else {
      handleSearchMode();
    }
  };
  const handleCloseSearchMode = () => {
    setSearchTermPackage('');
    setSearchTermVersion('');
    handleResetTable();
  };
  const isSearchTermEmpty =
    searchTermPackage.trim().length === 0 && searchTermVersion.trim().length === 0;

  return (
    <Grid container fullWidth>
      <Grid
        item
        lg={4}
        md={4}
        sm={12}
        xs={12}
        style={{ display: 'flex', justifyContent: 'flex-center' }}
      >
        <TextField
          id="searchpackage"
          label="Search Package Name"
          variant="outlined"
          size="small"
          value={searchTermPackage}
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
        style={{ display: 'flex', justifyContent: 'flex-start' }}
      >
        <TextField
          id="searchversion"
          label="Search Version"
          variant="outlined"
          size="small"
          value={searchTermVersion}
          onChange={handleChangeSearchVersion}
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
          <Tooltip arrow placement="top" title="Add devices">
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
