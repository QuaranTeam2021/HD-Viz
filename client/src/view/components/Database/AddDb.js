import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function AddDb() {
  const classes = useStyles();
   return (
    <div className={classes.root}>
      <IconButton aria-label="modify">
        <AddIcon />
      </IconButton>
    </div>
  );
}

