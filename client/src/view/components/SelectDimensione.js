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

export default function SelectDimensione({ onChange }) {
  const classes = useStyles();

  const insert = event => {
    event.preventDefault()

  }

  return (
    <div className={classes.root} id="dimensione">
      <FormControl component="fieldset" className={classes.formControl} onSubmit={insert}>
        <FormLabel component="legend" >Metrica per la distanza: </FormLabel>
        <RadioGroup aria-label="position" name="position" onChange={onChange}>
          <FormControlLabel value="Euclidean" control={<PurpleRadio color="primary" />} label="Euclidean" />
          <FormControlLabel value="Manhattn" control={<PurpleRadio color="primary" />} label="Manhattan" />
          <FormControlLabel value="Cosine" control={<PurpleRadio color="primary" />} label="Cosine" />
          <FormControlLabel value="Euclidean Squared" control={<PurpleRadio color="primary" />} label="Euclidean Squared" />
          <FormControlLabel value="Canberra" control={<PurpleRadio color="primary" />} label="Canberra" />
          <FormControlLabel value="Chebyshev" control={<PurpleRadio color="primary" />} label="Chebyshev" />
        </RadioGroup>
      </FormControl>
    </div>
  )
}

