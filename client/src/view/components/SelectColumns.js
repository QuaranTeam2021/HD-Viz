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

 

  
} 
