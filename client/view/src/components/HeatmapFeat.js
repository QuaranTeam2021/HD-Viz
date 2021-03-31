import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import ChangeDistance from './ChangeDistance'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },

}));

export default function CheckboxLabels() {
  const [state, setState] = React.useState({
    checkedA: false,
  });

  const [value, setValue] = React.useState('');

  const classes = useStyles();

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleClick = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
        <p>Opzioni del grafico HM</p>
        <ChangeDistance />
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label2">Modifica l'ordinamento</InputLabel>
            <Select labelId="demo-simple-select-label2" id="demo-simple-select2" value={value} onChange={handleClick}>
                <MenuItem value={'original'}>Originale</MenuItem>
                <MenuItem value={'cluster'}>Cluster</MenuItem>
            </Select>
        </FormControl>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedA}
                onChange={handleChange}
                name="checkedA"
                color="primary"
              />
            }
            label="Dendrogramma"
          />
        </FormGroup>
    </div>
  );
}