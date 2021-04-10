import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { purple } from '@material-ui/core/colors';
import React from 'react';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}));

const ColorButton = withStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: purple[700],
    },
    backgroundColor: purple[500],
    color: theme.palette.getContrastText(purple[500])
  },
}))(Button);

export default function UploadButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root} id="insert">
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />

      <label htmlFor="contained-button-file">
        <ColorButton variant="contained" color="primary" component="span" >
          Inserimento File
        </ColorButton>
      </label>
      <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />

    </div>
  );
}