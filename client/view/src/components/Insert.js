import React from 'react';
import Button from '@material-ui/core/Button';
import {purple } from '@material-ui/core/colors';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import { lab } from 'd3-color';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
      '&:hover': {
        backgroundColor: purple[700],
      },
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