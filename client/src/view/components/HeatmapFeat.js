import * as htmp from '../chart/heatmap';
import React, { useCallback, useEffect, useRef } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  column: {
    flexBasis: '50%'
  },
  formControl: {
    margin: theme.spacing(1),
  },
  root: { // dovrebbe renderlo largo quanto GraphContainer a seconda del grafico
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  row: {
    flexBasis: '50%'
  }
}));

const marks = [ // modificare marks e valori slider
  {
    label: '0',
    value: 0,
  },
  {
    label: '10',
    value: 10,
  },
];

export default function HeatmapOptions({ position, graphViz, data, buttonRef, currentOptions, setCurrentOptions }) {
  const classes = useStyles();

  const [ordinamento, setOrdinamento] = React.useState('none');
  const [threshold, setThreshold] = React.useState(0);
  const [maxThreshold, setMaxThreshold] = React.useState(10);

  const commitChanges = useCallback(() => {
    if (currentOptions.oldOrd !== ordinamento)
      graphViz.updateOrder(htmp.orders(data, ordinamento));
    if (currentOptions.oldThres !== threshold)
      graphViz.updateThreshold(threshold);
    
    setCurrentOptions({
      oldOrd: ordinamento,
      oldThres: threshold
    });
  }, [currentOptions, data, graphViz, ordinamento, setCurrentOptions, threshold]);

  useEffect(() => {
    buttonRef.current.onclick = commitChanges;
    if (graphViz !== null) {
      setMaxThreshold(graphViz.getMax());
      marks[1].label = graphViz.getMax().toString();
      marks[1].value = graphViz.getMax();
    }
  }, [buttonRef, commitChanges, graphViz]);

  // css nel caso sia verticale o orrizzontale (up, down => orrizzontale; left, right => verticale)
  classes.direction = ["up", "down"].includes(position) ? classes.column : classes.row;

  const onChangeOrdinamento = e => setOrdinamento(e.target.value);
  const onChangeThreshold = (_e, v) => setThreshold(v);

  return (
    <div className={classes.root}>
      <div className={classes.direction}>
        <Typography id="htmp-threshold-slider-label" gutterBottom>Distanza minima</Typography>
        <Slider id="htmp-threshold-slider"
          aria-labelledby="htmp-threshold-slider-label"
          valueLabelDisplay="auto"
          step={maxThreshold > 3 ? 1 : 0.1}
          marks={marks}
          min={0}
          max={maxThreshold}
          value={threshold}
          onChange={onChangeThreshold}
        />
      </div>
      <div className={classes.direction}>
        <FormControl className={classes.formControl}>
          <InputLabel id="order-select-label">Ordinamento</InputLabel>
          <Select labelId="order-select-label" id="order-select" value={ordinamento} onChange={onChangeOrdinamento}>
            <MenuItem value={'none'}>Originale</MenuItem>
            <MenuItem value={'group'}>Cluster</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}