import CreateIcon from '@material-ui/icons/Create';
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

export default function ModifyDb() {
  const classes = useStyles();
   return (
    <div className={classes.root}>
      <IconButton aria-label="modify">
        <CreateIcon />
      </IconButton>
    </div>
  );
}

