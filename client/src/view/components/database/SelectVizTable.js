import React, {useEffect, useState } from 'react';
import DatabaseTablesController from '../../../controller/DatabaseTablesController';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
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

export default function SimpleSelect({onChange, tab}) {
  const classes = useStyles();
  const tablesController = new DatabaseTablesController();
  const [databaseTables, setDatabaseTables] = useState(['tab1', 'tab2', 'tab3']);

/*  const getTabNames = async () => {
    try {
        const tables = await tablesController.getTablesNames();
        setDatabaseTables(tables);
    } catch (err) {
        console.log(err.message);
    }
  }

  useEffect(() => {
    getTabNames();
  });*/

  return (
    <div>
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Tabelle</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tab}
          onChange={onChange}>
          { databaseTables && databaseTables.map((v, i) => <MenuItem value={v} key={i}>{v}</MenuItem>) }
        </Select>
      </FormControl>
    </div>
  );
}
