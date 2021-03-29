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
    <div className={classes.root} id= "algorithm">
    <FormControl component="fieldset" className={classes.formControl} onSubmit={insert}>
    <FormLabel component="legend" >Algoritmo: </FormLabel>
      <RadioGroup aria-label="position" name="position" onChange={onChange}>
      <FormControlLabel value="PCA" control={<PurpleRadio color="primary" />} label="PCA" />
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

