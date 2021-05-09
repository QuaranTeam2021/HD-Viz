import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import ForceFieldFeat from './ForceFieldFeat';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import HeatmapFeat from './HeatmapFeat';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import MenuButtonGraph from './MenuButtonGraph';
import MenuItem from '@material-ui/core/MenuItem';
import PLMAFeat from './PLMAFeat';
import RenameAxis from './RenameAxis';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 160,
    },
  
  }));

export default function FeaturesGraph({ onDelete, i}) {
// export default function FeaturesGraph({algoritmoGrafico, distanzaGrafico, onDelete, i}) {
  const [value, setValue] = useState('');
 // const [valueDist, setValueDist] = React.useState(distanzaGrafico);
 const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
    showing: false,
  });

  let showFeatMode = {}
  
  if (state.showing) {
      showFeatMode.display = "none"
  }

  const CheckLabel = event => {
    setState({ ...state,
[event.target.name]: event.target.checked });
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
         <MenuButtonGraph showing={state.showing} onDelete={onDelete} i={i}/>
        <div style={showFeatMode}>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Modifica l&apos;algoritmo</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={value} onChange={handleChange}>
                    <MenuItem value={'FASTMAP'}>FASTMAP</MenuItem>
                    <MenuItem value={'LLE'}>LLE</MenuItem>
                    <MenuItem value={'ISOMAP'}>ISOMAP</MenuItem>
                    <MenuItem value={'T-SNE'}>T-SNE</MenuItem>
                    <MenuItem value={'UMAP'}>UMAP</MenuItem>
                </Select>
            </FormControl>
        </div> 
        <div style={showFeatMode}>
             <FormControlLabel control={
                <Checkbox checked={state.checkedA} onChange={CheckLabel} name="checkedA" color="primary"/>
                } label="Legenda"/>
            <FormControlLabel control={    
                <Checkbox checked={state.checkedB} onChange={CheckLabel} name="checkedB" color="primary"/>
                } label="Hover dati"/> 
            <ForceFieldFeat />
             <PLMAFeat />
            <HeatmapFeat />
            <RenameAxis asse="1" color1="primary" color2="secondary" color3="default" />
            <RenameAxis asse="2" color1="secondary" color2="primary" color3="default" /> 
        </div>
    </div>
    );
}