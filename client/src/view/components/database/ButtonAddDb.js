/* eslint-disable no-underscore-dangle */
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
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

const Dataset = ({ onChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.root} id="insertdataset">
      <input
        accept=".csv, .json, .tsv"
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={onChange}
      />
      <label htmlFor="contained-button-file">
        <IconButton variant="contained" color="primary" component="span" >
          <AddIcon/>
        </IconButton>
      </label>
    </div>
  );
};

export default Dataset;