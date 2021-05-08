
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function TextFieldAddDb({onChangeName, nameDs, fileName, disabled}) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
        {console.log(name)}
      <FormControl variant="outlined">
        <InputLabel htmlFor="component-outlined">Name</InputLabel>
        <OutlinedInput id="component-outlined" value={nameDs} onChange={onChangeName} label="Name" disabled={disabled} placeholder={fileName} />
      </FormControl>
    </form>
  );
}