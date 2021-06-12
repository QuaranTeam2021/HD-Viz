import { makeStyles, withStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { purple } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
  },
  formLabel: {
    fontWeight: 'bold',
  },
  root: {
    display: 'flex',
  }
}));

const PurpleRadio = withStyles({
  checked: {},
  root: {
    '&$checked': {
      color: purple[600],
    },
    color: purple[400]
  }
})(props => <Radio color="default" {...props} />);

export default function RadioDistance({ distanza, onChange }) {
  const classes = useStyles();

  useEffect(() => {
    onChange("useEffect", distanza);
  }, [onChange, distanza])

  return (
    <div className={classes.root} id="dimensione">
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>Metrica per la distanza: </FormLabel>
        <RadioGroup aria-label="position" name="position" onChange={onChange} value={distanza}>
          <FormControlLabel value="euclidean" control={<PurpleRadio color="primary" />} label="Euclidean" />
          <FormControlLabel value="manhattan" control={<PurpleRadio color="primary" />} label="Manhattan" />
          <FormControlLabel value="cosine" control={<PurpleRadio color="primary" />} label="Cosine" />
          <FormControlLabel value="euclidean_squared" control={<PurpleRadio color="primary" />} label="Euclidean Squared" />
          <FormControlLabel value="canberra" control={<PurpleRadio color="primary" />} label="Canberra" />
          <FormControlLabel value="chebyshev" control={<PurpleRadio color="primary" />} label="Chebyshev" />
        </RadioGroup>
      </FormControl>
    </div>
  )
}

