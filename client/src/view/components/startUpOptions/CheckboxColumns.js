/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState} from 'react';
import { autorun } from 'mobx';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { observer } from 'mobx-react-lite';
import { purple } from '@material-ui/core/colors';
import { useStore } from '../../../store/Store';
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

const CheckboxColumns = observer(({onChange}) => {

  const store = useStore();

  const [uploadedColumns, setUploadedColumns] = useState([]);

  useEffect(() => autorun(() => {
          setUploadedColumns([...store._features.keys()])
      }), [store._features])

  return (
    <div className="colonne">
    <FormControl component="fieldset">
    <FormLabel component="legend">Colonne:</FormLabel>
    <FormGroup>
      {
        uploadedColumns && uploadedColumns.map((d, i) => <FormControlLabel key={i} control={<PurpleCheckbox />} onChange={onChange}
        label={d} value={d}
      />)
      }
    </FormGroup>
    </FormControl>
    </div>
  );
  
})

export default CheckboxColumns;
