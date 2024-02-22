import { Autocomplete, Box, Icon, IconButton, TextField, Grid } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import { topBarHeight } from 'app/utils/constant';
import React, { useEffect, useState } from 'react';
import { getSearchResult } from 'app/Services/User_Auth_Service';

export function SearchBox({ selectedOption, setSelectedOption }) {
  const [arr, setArr] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleBarSearch = (event) => {
    setSearchTerm(event.target.value);
    // console.log(event.target.value);
  };

  const handleSearchMode = async () => {
    let res = await getSearchResult(searchTerm);
    // console.log(res);
    if (res.status === 200) {
      setArr(res.data.listResult);
    }
    // console.log(arr);
  };

  const handleAutocompleteClose = () => {
    setArr([]);
  };

  useEffect(() => {
    if (searchTerm !== '') {
      handleSearchMode();
      // console.log(searchTerm);
    }
  }, [searchTerm]);

  const handleOnChange = (event, newValue) => {
    setSelectedOption(newValue);
    // console.log(newValue);
  };

  return (
    <Grid container alignItems="center" justify="space-between">
      <Grid item xs>
        <Autocomplete
          options={arr}
          getOptionLabel={(option) => option.sn}
          id="include-input-in-list"
          value={selectedOption}
          onClose={handleAutocompleteClose}
          sx={{ marginBottom: '5px' }}
          InputProps={{
            endAdornment: [],
          }}
          onChange={handleOnChange}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              onChange={handleBarSearch}
              fullWidth
              label={'Search'}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
const SearchContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 9,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  height: topBarHeight,
  background: theme.palette.primary.main,
  color: theme.palette.text.primary,
  '& input::placeholder': {
    color: theme.palette.text.primary,
  },
}));

const TmsSearchBox = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };

  const { palette } = useTheme();
  const textColor = palette.text.primary;
  const [selectedOption, setSelectedOption] = React.useState(null);

  useEffect(() => {
    if (selectedOption) {
      window.location.href = `/tms-devices/devices-management/device?id=${selectedOption.id}&sn=${selectedOption.sn}`;
    }
  }, [selectedOption]);

  return (
    <React.Fragment>
      {!open && (
        <IconButton onClick={toggle}>
          <Icon sx={{ color: textColor }}>search</Icon>
        </IconButton>
      )}

      {open && (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          <SearchContainer>
            <Box width={'20px'} />
            <SearchBox selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            <IconButton onClick={toggle} sx={{ mx: 2, verticalAlign: 'middle' }}>
              <Icon sx={{ color: textColor }}>close</Icon>
            </IconButton>
          </SearchContainer>
        </div>
      )}
    </React.Fragment>
  );
};

export default TmsSearchBox;
