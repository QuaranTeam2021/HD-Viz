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

const handleSubmit = (event, error) => {
  if (error)
    event.preventDefault();
}

export default function TextFieldAddDb({onChangeName, nameDs, fileName, onBlur, disabled, error}) {
  const classes = useStyles();

  return (
    <form id="formInsertDataset" className={classes.root} autoComplete="off" onSubmit={e => handleSubmit(e, error)}>
      <TextField
        variant="outlined"
        label="Nome"
        id="dataset-name"
        onChange={onChangeName}
        placeholder={fileName}
        value={nameDs}
        onBlur={onBlur}
        disabled={disabled}
        error={error}
        helperText={error ? "Nome non valido: rimuovi spazi e caratteri speciali" : undefined}
      />
    </form>
  );
}