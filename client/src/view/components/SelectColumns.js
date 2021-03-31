import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { purple } from '@material-ui/core/colors';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const PurpleCheckbox = withStyles({
  checked: {},
  root: {
    '&$checked': {
      color: purple[600],
    },
    color: purple[400],
  },
})(props => <Checkbox color="default" {...props} />);

export default function SelectColumns() {
  const [state, setState] = React.useState({
    checkedColumn1: false,
    checkedColumn2: false,
    checkedColumn3: false,
    checkedColumn4: false,
    checkedColumn5: false,
  });

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
  };

  return (
    <div id="columns">
      <FormGroup row>
        <FormControlLabel
          control={<PurpleCheckbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
          label="Colonna1"
        />
        <FormControlLabel
          control={< PurpleCheckbox checked={state.checkedB} onChange={handleChange} name="checkedB" />}
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