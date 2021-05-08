import React, { useState } from 'react';
import ButtonAddDb from './ButtonAddDb';
import ButtonConfirmAddDb from './ButtonConfirmAddDb';
import DatabaseManagerController from '../../../controller/DatabaseManagerController';
import DeleteDb from './DeleteDb';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextFieldAddDb from './TextFieldAddDb';

const controllerManager = new DatabaseManagerController();

export default function Database() {
    const [datasets, setDatasets] = useState(['tabella', 'tabella2', 'tabella3', 'tabella4', 'tabella5']); // <--controllerManager.getTablesName();
    const [tableName, setTableName] = useState('');
    const [insertDs, setInsertDs] = useState({});
    const [disableName, setDisableName] = useState(true);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);

    const onChangeTableName = e => {
        setTableName(e.target.value);
    };

    const onChangeInsertDs = e => {
        let v = e.target.files[0];
        let isUndef = v === undefined;
        setInsertDs(prev => {
            return isUndef ? prev : v;
        });
        setName(() => {
            return isUndef ? insertDs.name : v.name;
        });
        setTableName(() => {
            return isUndef ? insertDs.name : v.name;
        });
        setDisableName(isUndef);
    };

    const onClickDelete = idx => {
        let deletedTable = "";
        setDatasets(list => list.filter((d, i) => {
            if (i === idx)
                deletedTable = d;
            return i !== idx;
        }));

        if (deletedTable !== "")
            controllerManager.deleteTable(deletedTable);
    };

    const onChangeName = e => {
        let n = e.target.value;
        setName(n);
        setNameError(n.search(/[`"'\s\\;]/gu) !== -1);
    };

    const onBlurName = () => {
        let n = name === "" ? insertDs.name : name
        setTableName(n);
        setName(n);
    }

    const onClickDs = () => {
        controllerManager.upload(tableName ? tableName : insertDs.name, insertDs);
    };

    return (
        <div className="dataset_div">
            <div id="completeFormInsertDataset">
                <ButtonAddDb onChange={onChangeInsertDs} onChangeTableName={onChangeTableName} />
                <TextFieldAddDb onChangeName={onChangeName} fileName={insertDs.name} nameDs={name} onBlur={onBlurName} disabled={disableName} error={nameError} />
                {insertDs.name !== undefined && <ButtonConfirmAddDb onChange={onClickDs} fileName={insertDs.name} disabled={nameError} />}
            </div>
            <div id="dataset">
                <>
                    {datasets.map((d, i) => <FormControlLabel key={i} control={<DeleteDb onClickDelete={onClickDelete} idx={i} />} label={d} value={d} />)}
                </>
            </div>

        </div>
    );
}