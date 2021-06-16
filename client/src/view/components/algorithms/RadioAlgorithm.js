import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { purple } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React from 'react';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
  },
  formLabel: {
    fontWeight: 'bold',
  },
  root: {
    display: 'flex',
  },
}));

const PurpleRadio = withStyles({
  checked: {},
  root: {
    '&$checked': {
      color: purple[600],
    },
    color: purple[400],
  }
})(props => <Radio color="default" {...props} />);

export default function RadioAlgorithm({ onChange, algorithm }) {
  const classes = useStyles();

  return (
    <div className={classes.root} id="algorithm">
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>Algoritmo:</FormLabel>
        <RadioGroup aria-label="position" name="position" onChange={onChange} value={algorithm}>
          <FormControlLabel value="none" control={<PurpleRadio color="primary" />} label="Nessuna riduzione" />
          <FormControlLabel value="UMAP" control={<PurpleRadio color="primary" />} label="UMAP" />
          <FormControlLabel value="FASTMAP" control={<PurpleRadio color="primary" />} label="FASTMAP" />
          <FormControlLabel value="ISOMAP" control={<PurpleRadio color="primary" />} label="ISOMAP" />
          <FormControlLabel value="T-SNE" control={<PurpleRadio color="primary" />} label="T-SNE" />
          <FormControlLabel value="LLE" control={<PurpleRadio color="primary" />} label="LLE" />
        </RadioGroup>
      </FormControl>
    </div>
  )
}

