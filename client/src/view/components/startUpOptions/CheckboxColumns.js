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
import { useModel } from '../../../model/Model';
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

  const model = useModel();

  const [uploadedColumns, setUploadedColumns] = useState([]);

  useEffect(() => autorun(() => {
          setUploadedColumns(model._features)
      }), [model._features])

  return (
    <div className="colonne">
    <FormControl component="fieldset">
    <FormLabel component="legend">Colonne:</FormLabel>
    <FormGroup col>
      {
        uploadedColumns.map((d, i) => <FormControlLabel key={i} control={<PurpleCheckbox />} onChange={onChange}
        label={d} value={d}
      />)
      }
    </FormGroup>
    </FormControl>
    </div>
  );
  
})

export default CheckboxColumns;
