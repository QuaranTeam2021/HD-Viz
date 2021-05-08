import React, { useEffect, useState } from 'react';
import AddDb from './AddDb';
import DatabaseManagerController from '../../../controller/DatabaseManagerController';
import DatabaseTablesController from '../../../controller/DatabaseTablesController';
import DeleteDb from './DeleteDb';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function Database() {
    const controllerManager = new DatabaseManagerController();
    const tablesController = new DatabaseTablesController();

    // **********************************************************************

    /* 
    OLD: const [datasets] = useState(['prova']); // <--controllerManager.getTablesName();
    Ho importato useEffect e aggiunto le cose presenti tra i due commenti.
    Funziona.
    */

    const [datasets, setDatasets] = useState([]);

    const getTabNames = async () => {
        try {
            const tables = await tablesController.getTablesNames();
            setDatasets(['tab1', 'tab2']);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getTabNames();
    });
    // **********************************************************************


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

    const onClickDelete = table => {
        console.log('click');
        console.log(table);
        controllerManager.deleteTable(table);
        setDeleteDs(list => list.filter(d => d !== table))
    };

    return (
        <div>
            <AddDb onChange={onChangeInsertDs} fileName={insertDs.name} onChangeTableName={onChangeTableName} />
            <div id="dataset">
            <>
            {datasets.map((d, i) => <FormControlLabel key={i} control={<DeleteDb onClick={onClickDelete(d)} />} label={d} value={d} />)}
             </>
            </div>
                
         </div>
    );
}