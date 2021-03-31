import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },

}));

export default function ChangeDistance() {

  const [value, setValue] = React.useState('');

  const classes = useStyles();

  const handleClick = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label3">Modifica la distanza</InputLabel>
            <Select labelId="demo-simple-select-label3" id="demo-simple-select3" value={value} onChange={handleClick}>
                <MenuItem value={'euclidean'}>Euclidean</MenuItem>
                <MenuItem value={'manhattan'}>Manhattan</MenuItem>
                <MenuItem value={'cosine'}>Cosine</MenuItem>
                <MenuItem value={'euclidean squared'}>Euclidean Squared</MenuItem>
                <MenuItem value={'canberra'}>Canberra</MenuItem>
                <MenuItem value={'chebyshev'}>Chebyshev</MenuItem>
            </Select>
        </FormControl>
    </div>    
    );
}