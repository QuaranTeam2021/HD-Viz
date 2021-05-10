import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect({onChange, tables}) {
  const classes = useStyles();

  return (
    <div>
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Tabelle</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={onChange}>
          { tables && tables.map((v, i) => <MenuItem value={v} key={i}>{v}</MenuItem>) }
        </Select>
      </FormControl>
    </div>
  );
}
