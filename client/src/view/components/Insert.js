/* eslint-disable no-underscore-dangle */
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

const Insert = ({ fileName, onChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.root} id="insert">
      <input
        accept=".csv, .json, .tsv"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={onChange}
      />

      <label htmlFor="contained-button-file">
        <ColorButton variant="contained" color="primary" component="span" >
          {fileName === undefined ? "Inserimento file" : fileName}
        </ColorButton>
      </label>
    </div>
  );
};

export default Insert;