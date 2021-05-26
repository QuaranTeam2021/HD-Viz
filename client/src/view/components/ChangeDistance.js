import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
  },

}));

export default function ChangeDistance() {

  const [value, setValue] = React.useState('');

  const classes = useStyles();

  const handleClick = event => {
    setValue(event.target.value);
  };

  return (
    <div>
      <FormControl>
        <InputLabel id="distance-select">Distanza</InputLabel>
        <Select labelId="distance-select" id="distance-select" value={value} onChange={handleClick}>
          <MenuItem value={'euclidean'}>Euclidean</MenuItem>
          <MenuItem value={'manhattan'}>Manhattan</MenuItem>
          <MenuItem value={'cosine'}>Cosine</MenuItem>
          <MenuItem value={'euclidean_squared'}>Euclidean Squared</MenuItem>
          <MenuItem value={'canberra'}>Canberra</MenuItem>
          <MenuItem value={'chebyshev'}>Chebyshev</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}