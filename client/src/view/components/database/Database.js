import React, { useCallback, useEffect, useState } from 'react';
import { action } from 'mobx';
import ButtonAddDb from './ButtonAddDb';
import ButtonConfirmAddDb from './ButtonConfirmAddDb';
import DatabaseManagerController from '../../../controller/DatabaseManagerController';
import DatabaseTablesController from '../../../controller/DatabaseTablesController';
import DeleteDb from './DeleteDb';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextFieldAddDb from './TextFieldAddDb';

export default function Database() {
    const controllerManager = new DatabaseManagerController();
    const tablesController = new DatabaseTablesController();
    const [datasets, setDatasets] = useState([]);
    const [tableName, setTableName] = useState('');
    const [insertDs, setInsertDs] = useState([]);
    const [deleteDs, setDeleteDs] = useState([]);
    const [disableName, setDisableName] = useState(true);
    const [name, setName] = useState("");
    const [sentDataset, setDs] = useState([]);

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
      let v = e.target.files[0];  
      setInsertDs(prev => {
            return v === undefined ? prev : v;
        })  
        setName(() => {
          return v === undefined ? insertDs.name : v.name;
      })
      setDisableName(v === undefined);
    };

    const onClickDelete = idx => {
        console.log('click');
        console.log(idx);
        controllerManager.deleteTable(idx);
        setDeleteDs(list => list.filter((_d, i) => i !== idx))
    }; 

    const onChangeName = e => {
        setName(e.target.value);
      }; 

    const optionsAddDs = useCallback(() => {
        let select; 
        select = name !== "";
        setDs(select);
    }, [name]);  
    
    useEffect(() => {
        optionsAddDs();
    }, [optionsAddDs]);  
 
    const onClickDs = action(() => {
        let formData = {
          name 
        }; 
        formData.name = name; 
        controllerManager.upload(formData.name, insertDs);
      });
      

    return (
        <div>
            <ButtonAddDb onChange={onChangeInsertDs} onChangeTableName={onChangeTableName} />
            {console.log(insertDs.name)}
            <TextFieldAddDb onChangeName={onChangeName} fileName={insertDs.name} nameDs={name} disabled={disableName}/>
            <ButtonConfirmAddDb onClick={onClickDs} disabled={!sentDataset} fileName={insertDs.name}/>
            <div id="dataset">
            <>
            {datasets.map((d, i) => <FormControlLabel key={i} control={<DeleteDb onClick={onClickDelete} key={d} />} label={d} value={d} />)}
             </>
            </div>
                
         </div>
    );
}