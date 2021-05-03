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

export default function SimpleSelect() {
  const classes = useStyles();
  const [table, setTable] = React.useState('');

  const onChangeTable = event => {
    setTable(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="select-Table">Tabelle</InputLabel>
        <Select
          labelId="select-table"
          id="select-table"
          value={table}
          onChange={onChangeTable}
        >
          <MenuItem value={"Tab1"}>Tab1</MenuItem>
          <MenuItem value={"Tab2"}>Tab2</MenuItem>
          <MenuItem value={"Tab3"}>Tab3</MenuItem>
        </Select>
      </FormControl>
     
    </div>
  );
}
