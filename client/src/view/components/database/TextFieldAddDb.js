import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function TextFieldAddDb({onChangeName, nameDs, fileName, onBlur, disabled, error, onSubmit }) {
  const classes = useStyles();

  return (
    <form id="formInsertDataset" className={classes.root} autoComplete="off" onSubmit={onSubmit}>
      <TextField
        variant="outlined"
        label="Nome"
        id="dataset-name"
        onChange={onChangeName}
        onBlur={onBlur}
        placeholder={fileName}
        value={nameDs}
        disabled={disabled}
        error={error[0]}
        helperText={error[0] ? error[1] : undefined}
      />
    </form>
  );
}