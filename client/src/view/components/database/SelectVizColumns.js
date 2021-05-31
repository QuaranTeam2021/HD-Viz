import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
 
  chip: {
    margin: 2,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    maxWidth: 150,
    minWidth: 120,
  },
 
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SelectVizColumns({ onChange, columns, selectedColumns }) {
  const classes = useStyles();
  
  return (
      <FormControl className={classes.formControl}>
      <InputLabel id="columns-select-label">Colonne</InputLabel>
      <Select
        labelId="columns-select-label"
        id="columns-select"
        multiple
        value={selectedColumns}
        onChange={onChange}
        input={<Input id="columns-chip" />}
        renderValue={selected => <div className={classes.chips}>
            {selected.map(value => <Chip key={value} label={value} className={classes.chip} />)}
          </div>
        }
        MenuProps={MenuProps}
      >
        {columns && columns.map((column, i) => <MenuItem key={i} value={column}> {column} </MenuItem>)}
      </Select>
    </FormControl>
  );
}