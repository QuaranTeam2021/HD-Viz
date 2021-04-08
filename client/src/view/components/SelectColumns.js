/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState} from 'react';
import { autorun } from 'mobx';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { observer } from 'mobx-react-lite';
import { purple } from '@material-ui/core/colors';
import { useMainController } from '../../controller/MainController';
import { useModel } from '../../model/Model';
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

const SelectColumns = observer(() => {

  const model = useModel();
  const mainController = useMainController();

  const [uploadedColumns, setUploadedColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);

  mainController.setSelectedFeatures(selectedColumns);

  useEffect(() => autorun(() => {
          setUploadedColumns(model._features)
      }), [model._features])

  const handleChange = e => {
    setSelectedColumns({
      ...selectedColumns, 
      [e.target.value]: e.target.checked
    });
  }

  return (
    <div>
    <FormGroup row>
      {
        uploadedColumns.map((d, i) => <FormControlLabel key={i} control={<PurpleCheckbox />} onChange={handleChange}
        label={d}
      />)
      }
    </FormGroup>
    </div>
  );
  
})

export default SelectColumns;