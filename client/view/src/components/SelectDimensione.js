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

