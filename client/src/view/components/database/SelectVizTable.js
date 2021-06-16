import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    maxWidth: 300,
    minWidth: 120,
  },
  formLabel: {
    fontWeight: 'bold',
  },
  inputLabel: {
    fontWeight: 'bold',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const none = "Nessuna tabella disponibile";

export default function SelectVizTable({ onChange, tables, selected }) {
  const classes = useStyles();

  return (
    <div>
        <FormControl className={classes.formControl}>
        <InputLabel id="tables-select-label" className={classes.inputLabel}>Tabelle</InputLabel>
        <Select
          labelId="tables-select-label"
          id="tables-select"
          value={tables.length > 0 ? selected : "none"}
          onChange={onChange}
        >
          {tables.length > 0 ? tables.map((v, i) => <MenuItem value={v} key={i}>{v}</MenuItem>)
            : <MenuItem value="none" disabled>{none}</MenuItem> }
        </Select>
      </FormControl>
    </div>
  );
}
