import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }));

  const PurpleRadio = withStyles({
    root: {
      color: purple[400],
      '&$checked': {
        color: purple[600],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

export default function FormControlLabelPlacement({onChange}) {
    const classes= useStyles();
     const insert= (event)=> {
      event.preventDefault()

    }  

     return (
    <div className={classes.root} id="graph">
    <FormControl component="fieldset" className={classes.formControl} onSubmit={insert}>
      <FormLabel component="legend" >Grafico: </FormLabel>
      <RadioGroup aria-label="position" name="position" position="left" onChange={onChange}>
      <FormControlLabel value="Scatterplot Matrix" control={<PurpleRadio color="primary" />} label="Scatterplot Matrix" />
      <FormControlLabel value="Scatterplot" control={<PurpleRadio color="primary" />} label="Scatterplot" />
      <FormControlLabel value="HeatMap" control={<PurpleRadio color="primary" />} label="HeatMap" />
      <FormControlLabel value="Force Field" control={<PurpleRadio color="primary" />} label="Force Field" />
      <FormControlLabel value="Proiezione Multiassi" control={<PurpleRadio color="primary" />} label="Proiezione Multiassi" />
    </RadioGroup> 
    </FormControl>
    </div>
     )
}

