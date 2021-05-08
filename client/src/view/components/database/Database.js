import React, { useEffect, useState } from 'react';
import AddDb from './AddDb';
import DatabaseManagerController from '../../../controller/DatabaseManagerController';
import DatabaseTablesController from '../../../controller/DatabaseTablesController';
import DeleteDb from './DeleteDb';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function Database() {
    const controllerManager = new DatabaseManagerController();
    const tablesController = new DatabaseTablesController();
    const [datasets, setDatasets] = useState([]);
    const [tableName, setTableName] = useState('');
    const [insertDs, setInsertDs] = useState([]);
    const [deleteDs, setDeleteDs] = useState([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getTabNames = async () => {
        try {
            const tables = await tablesController.getTablesNames();
            setDatasets(tables);
        } catch (err) {
            setDatasets([]);
            console.log(err.message);
        }
    }

    useEffect(() => {
        getTabNames();
    }, []);

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

    const onClickDelete = d => {
        console.log('click');
        console.log(d);
        controllerManager.deleteTable(d);
        setDeleteDs(list => list.filter((_d, i) => i !== d))
    };

    return (
        <div>
            <AddDb onChange={onChangeInsertDs} fileName={insertDs.name} onChangeTableName={onChangeTableName} />
            <div id="dataset">
            <>
            {datasets.map((d, i) => <FormControlLabel key={i} control={<DeleteDb onClick={onClickDelete} value={d} />} label={d} value={d} />)}
             </>
            </div>
                
         </div>
    );
}