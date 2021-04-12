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

export default function SelectDistanza({ distanza, onChange }) {
  const classes = useStyles();

  useEffect(() => {
    onChange("useEffect", distanza);
  }, [onChange, distanza])

  return (
    <div className={classes.root} id="dimensione">
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" >Metrica per la distanza: </FormLabel>
        <RadioGroup aria-label="position" name="position" onChange={onChange}>
          <FormControlLabel value="Euclidean" control={<PurpleRadio color="primary" />} label="Euclidean" />
          <FormControlLabel value="Manhattan" control={<PurpleRadio color="primary" />} label="Manhattan" />
          <FormControlLabel value="Cosine" control={<PurpleRadio color="primary" />} label="Cosine" />
          <FormControlLabel value="Euclidean Squared" control={<PurpleRadio color="primary" />} label="Euclidean Squared" />
          <FormControlLabel value="Canberra" control={<PurpleRadio color="primary" />} label="Canberra" />
          <FormControlLabel value="Chebyshev" control={<PurpleRadio color="primary" />} label="Chebyshev" />
        </RadioGroup>
      </FormControl>
    </div>
  )
}

