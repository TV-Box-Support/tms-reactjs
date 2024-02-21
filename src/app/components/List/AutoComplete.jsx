import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutoComplete({ data, label, selectedOption, setSelectedOption }) {
  const defaultProps = {
    options: data,
    getOptionLabel: (option) => option.title,
  };

  const handleOnChange = (event, newValue) => {
    setSelectedOption(newValue);
    // console.log(newValue);
  };

  return (
    <div>
      <Autocomplete
        {...defaultProps}
        id="include-input-in-list"
        value={selectedOption}
        onChange={handleOnChange}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="standard" fullWidth />
        )}
      />
    </div>
  );
}
