import React, { useState } from 'react';
import ButtonAnchorOptions from './ButtonAnchorOptions';
import Checkbox from '@material-ui/core/Checkbox';
import ForceFieldOptions from './ForceFieldOptions';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import HeatmapOptions from './HeatmapOptions';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MALPOptions from './MALPOptions';
import RenameAxis from './RenameAxis';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1)
  },

}));

export default function FeaturesGraph({ onDelete, graphId }) {
  // export default function FeaturesGraph({algoritmoGrafico, distanzaGrafico, onDelete, i}) {
  const [value, setValue] = useState('');
  // const [valueDist, setValueDist] = React.useState(distanzaGrafico);
  const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
    showing: false,
  });

  let showFeatMode = {};

  if (state.showing) {
    showFeatMode.display = "none";
  }

  const CheckLabel = event => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
  };
  const classes = useStyles();


  const handleChange = event => {
    setValue(event.target.value);
  };

  /* const handleChangeDist = (event) => {
     setValueDist(event.target.valueDist);
   }; */

  return (
    <div className="FeaturesCont">
      <ButtonAnchorOptions showing={state.showing} onDelete={onDelete} i={graphId} />
    </div>
  );
}