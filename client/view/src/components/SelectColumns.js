import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const PurpleCheckbox = withStyles({
  root: {
    color: purple[400],
    '&$checked': {
      color: purple[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function CheckboxLabels() {
  const [state, setState] = React.useState({
    checkedColumn1: false,
    checkedColums2: false, 
    checkedColums3: false,
    checkedColums4: false,
    checkedColumn5: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div id="columns">
    <FormGroup row>
      <FormControlLabel
        control={<PurpleCheckbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
        label="Colonna1"
      />
      <FormControlLabel
        control={< PurpleCheckbox  checked={state.checkedB} onChange={handleChange} name="checkedB" />}
        label="Colonna2"
      />
       <FormControlLabel
        control={<PurpleCheckbox checked={state.checkedC} onChange={handleChange} name="checkedC" />}
        label="Colonna3"
      /> 
       <FormControlLabel
        control={<PurpleCheckbox checked={state.checkedD} onChange={handleChange} name="checkedD" />}
        label="Colonna4"
      />
       <FormControlLabel
        control={<PurpleCheckbox checked={state.checkedE} onChange={handleChange} name="checkedE" />}
        label="Colonna5"
      />
    </FormGroup>
    </div>
  );
}   



