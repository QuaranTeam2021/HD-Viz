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
    color: purple[400],
  }
})(props => <Radio color="default" {...props} />);

export default function SelectGraph({ onChange }) {
  const classes = useStyles();
  const insert = event => {
    event.preventDefault()

  }

  return (
    <div className={classes.root} id="graph">
      <FormControl component="fieldset" className={classes.formControl} onSubmit={insert}>
        <FormLabel component="legend" >Grafico: </FormLabel>
        <RadioGroup aria-label="position" name="position" position="left" onChange={onChange}>
          <FormControlLabel value="Scatterplot Matrix" control={<PurpleRadio color="primary" />} label="Scatterplot Matrix" />
          <FormControlLabel value="HeatMap" control={<PurpleRadio color="primary" />} label="HeatMap" />
          <FormControlLabel value="Force Field" control={<PurpleRadio color="primary" />} label="Force Field" />
          <FormControlLabel value="Proiezione Multiassi" control={<PurpleRadio color="primary" />} label="Proiezione Multiassi" />
        </RadioGroup>
      </FormControl>
    </div>
  )
}

