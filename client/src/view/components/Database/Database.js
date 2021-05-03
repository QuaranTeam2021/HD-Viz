import React, { useState } from 'react';
import AddDb from './AddDb';
import DatabaseManagerController from '../../../controller/DatabaseManagerController';
import DeleteDb from './DeleteDb';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { purple } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { withStyles } from '@material-ui/core/styles';

const PurpleRadio = withStyles({
    checked: {},
    root: {
      '&$checked': {
        color: purple[600],
      },
      color: purple[400],
    }
})(props => <Radio color="default" {...props} />);


export default function Database() {
    const controllerManager = new DatabaseManagerController();
    const [datasets] = useState(['prova']); // <--controllerManager.getTablesName();
    const [tableName, setTableName] = useState('');
    const [insertDs, setInsertDs] = useState([]);
    const [deleteDs, setDeleteDs] = useState([]);

    const onChangeTableName = e => {
        setTableName(e.target.value);
    }

    const onChangeInsertDs = e => {
        setInsertDs(prev => {
            let v = e.target.files[0];
            return v === undefined ? prev : v;
        }) 
        controllerManager.upload(tableName ? tableName : insertDs.name, insertDs);
    };

    const onChangeDeleteDs = e => {
        setDeleteDs(e.target.value);
    }

    const onClickDelete = () => {
        console.log('click')
        controllerManager.deleteTable(deleteDs);
    };

    return (
        <div>
            <AddDb onChange={onChangeInsertDs} fileName={insertDs.name} onChangeTableName={onChangeTableName} />
            <div id="dataset">
                <FormControl component="fieldset">
                <FormLabel component="legend">Colonne:</FormLabel>
                <RadioGroup>
                {
                    datasets && datasets.map((d, i) => <FormControlLabel key={i} onChange={onChangeDeleteDs} control={<PurpleRadio />} label={d} value={d} />)
                }
                </RadioGroup>
                </FormControl>
            </div>
            <DeleteDb onClick={onClickDelete} />
        </div>
    );
}