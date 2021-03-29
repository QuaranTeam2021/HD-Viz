import React, { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import MenuButtonGraph from './MenuButtonGraph';
import HeatmapFeat from './HeatmapFeat';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 160,
    },
  
  }));

export default function FeaturesGraph({algoritmoGrafico, distanzaGrafico, onDelete, i}) {
  const [value, setValue] = React.useState(algoritmoGrafico);
 //const [valueDist, setValueDist] = React.useState(distanzaoGrafico);
 const [state, setState] = React.useState({
    checkedA: false,
  });

  const CheckLabel = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
 const classes = useStyles();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

 /* const handleChangeDist = (event) => {
    setValueDist(event.target.valueDist);
  };*/

  return (
    <div className="FeaturesCont">
        <MenuButtonGraph onDelete={onDelete} i={i}/>
        <div>
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Scegli l'algoritmo</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={value} onChange={handleChange}>
                <MenuItem value={'PCA'}>PCA</MenuItem>
                <MenuItem value={'FASTMAP'}>FASTMAP</MenuItem>
                <MenuItem value={'LLE'}>LLE</MenuItem>
                <MenuItem value={'ISOMAP'}>ISOMAP</MenuItem>
                <MenuItem value={'T-SNE'}>T-SNE</MenuItem>
                <MenuItem value={'UMAP'}>UMAP</MenuItem>
            </Select>
        </FormControl>
        </div>
        <div>
        <FormControlLabel control={
            <Checkbox checked={state.checkedA} onChange={CheckLabel} name="checkedA" color="primary"/>
            } label="Legenda"/>
        <HeatmapFeat />
        </div>
    </div>
    );
}