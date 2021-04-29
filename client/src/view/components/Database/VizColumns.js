import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { purple } from '@material-ui/core/colors';
import React from 'react';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(purple),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(purple),
  },
}));

export default function SimpleSelect() {
    const classes = useStyles();
  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="Columns">Columns</InputLabel>
        <Select
          labelId="Columns"
          id="Columns"
          label="Columns"
        >
          <MenuItem >Colonna</MenuItem>
          <MenuItem >Colonna</MenuItem>
          <MenuItem >Colonna</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}