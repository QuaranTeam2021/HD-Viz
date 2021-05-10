import React, { useState } from 'react';
import ButtonAddDb from './ButtonAddDb';
import ButtonConfirmAddDb from './ButtonConfirmAddDb';
import DatabaseManagerController from '../../../controller/DatabaseManagerController';
import DeleteDb from './DeleteDb';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextFieldAddDb from './TextFieldAddDb';

const controllerManager = new DatabaseManagerController();
const parseName = name => {
    if (name === undefined) return name;
    const parsedName = name.replace(/(\.(csv|tsv|json))/giu, "");
    return parsedName;
}

export default function Database() {
    const [datasets, setDatasets] = useState(['tabella', 'tabella2', 'tabella3', 'tabella4', 'tabella5']); // <--controllerManager.getTablesName();
    const [tableName, setTableName] = useState('');
    const [insertDs, setInsertDs] = useState({});
    const [disableName, setDisableName] = useState(true);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState([false, ""]);

    const onChangeInsertDs = e => {
        let v = e.target.files[0];
        let isUndef = v === undefined;
        setInsertDs(prev => {
            return isUndef ? prev : v;
        });
        setName(parseName(isUndef ? insertDs.name : v.name));
        setTableName(parseName(isUndef ? insertDs.name : v.name));
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
        let parsedN = parseName(n);
        if (n === parsedN) {
            setName(n);
            setNameError([n.search(/[`"'\s\\;]/gu) !== -1, "Nome non valido: rimuovi spazi e caratteri speciali"]);
        }
        else {
            setNameError([true, "Nome non valido: estensioni non supportate"])
        }
    };

    const onBlurName = () => {
        let n = name === "" ? parseName(insertDs.name, p => p) : name
        setName(parseName(n));
        setTableName(parseName(n));
    }

    const onClickDs = () => {
        controllerManager.upload(tableName ? tableName : parseName(insertDs.name), insertDs);
    };

    return (
        <div className="dataset_div">
            <div id="completeFormInsertDataset">
                <ButtonAddDb onChange={onChangeInsertDs} />
                <TextFieldAddDb onChangeName={onChangeName} fileName={parseName(insertDs.name)} nameDs={name} onBlur={onBlurName} disabled={disableName} error={nameError} />
                {insertDs.name !== undefined && <ButtonConfirmAddDb onClick={onClickDs} fileName={insertDs.name} disabled={nameError} />}
            </div>
            <div id="dataset">
                <>
                    {datasets.map((d, i) => <FormControlLabel key={i} control={<DeleteDb onClickDelete={onClickDelete} idx={i} />} label={d} value={d} />)}
                </>
            </div>

        </div>
    );
}