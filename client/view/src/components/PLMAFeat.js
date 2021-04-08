import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function IconLabelButtons() {
  const classes = useStyles();

  return (
    <div>
      <p>Opzioni del grafico PLMA</p>
      <Button
        variant="contained"
        className={classes.button}
        startIcon={<AddIcon />}
      >
        Aggiungi asse
      </Button>
      <Button
        variant="contained"
        disabled
        color="default"
        className={classes.button}
        startIcon={<RemoveIcon />}
      >
        Rimuovi asse
      </Button>
    </div>
  );
}