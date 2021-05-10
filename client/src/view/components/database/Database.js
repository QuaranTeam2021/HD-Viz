import React, { useEffect, useState } from 'react';
import ButtonAddDb from './ButtonAddDb';
import ButtonConfirmAddDb from './ButtonConfirmAddDb';
import DatabaseManagerController from '../../../controller/DatabaseManagerController';
import DatabaseTablesController from '../../../controller/DatabaseTablesController';
import DeleteDb from './DeleteDb';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextFieldAddDb from './TextFieldAddDb';

const controllerManager = new DatabaseManagerController();
const tablesController = new DatabaseTablesController();

const parseName = name => {
    if (name === undefined) return name;
    const parsedName = name.replace(/(\.(csv|tsv|json))/giu, "");
    return parsedName;
}

export default function Database() {
    const [datasets, setDatasets] = useState([]);
    const [tableName, setTableName] = useState(''); // tableName e name ridondanti, probabilmente se ne puó togliere uno
    const [name, setName] = useState("");
    const [insertDs, setInsertDs] = useState({});
    const [disableName, setDisableName] = useState(true);
    const [nameError, setNameError] = useState(false);

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

    const onClickDelete = async dsName => {
        await controllerManager.deleteTable(dsName);
        setDatasets(list => list.filter(d => {
            return d !== dsName;
        }));
    };

    const onChangeName = e => {
        let n = e.target.value;
        let parsedN = parseName(n);
        if (n === parsedN) {
            setName(n);
            setTableName(n);
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

    const onClickDs = async e => {
        e.preventDefault();
        await controllerManager.upload(tableName ? tableName : parseName(insertDs.name), insertDs);
        getTabNames();
    };

    return (
        <div className="dataset_div">
            <div id="completeFormInsertDataset">
                <ButtonAddDb onChange={onChangeInsertDs} />
                <TextFieldAddDb onChangeName={onChangeName} fileName={parseName(insertDs.name)} nameDs={name} onBlur={onBlurName} disabled={disableName} error={nameError} onSubmit={onClickDs} />
                {insertDs.name !== undefined && <ButtonConfirmAddDb onClick={onClickDs} fileName={insertDs.name} disabled={nameError[0]} />}
            </div>
            <div id="dataset">
                <>
                    {datasets !== undefined && datasets.map((d, i) => <FormControlLabel key={i} control={<DeleteDb onClickDelete={onClickDelete} value={d} />} label={d} value={d} />)}
                </>
            </div>

        </div>
    );
}