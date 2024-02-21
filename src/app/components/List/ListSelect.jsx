import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 35;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(data, selected, theme) {
  return {
    fontWeight:
      selected.indexOf(data) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ListSelect(props) {
  const { data, handleSelected, title, defaultValue } = props;
  const theme = useTheme();
  const [selected, setSelected] = React.useState([]);

  const handleChange = (event) => {
    setSelected(event.target.value);
    handleSelected(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id="list-select">{title}</InputLabel>
        <Select
          labelId="list-select"
          id="list-select"
          value={defaultValue ? defaultValue : ''}
          //   defaultValue={defaultValue}
          onChange={handleChange}
          input={<OutlinedInput label={title} />}
          MenuProps={MenuProps}
        >
          {data.map((data) => (
            <MenuItem key={data} value={data} style={getStyles(data, selected, theme)}>
              {data}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
