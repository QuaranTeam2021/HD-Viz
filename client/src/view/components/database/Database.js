import React, { useEffect } from 'react';
import ButtonAddDb from './ButtonAddDb';
import ButtonConfirmAddDb from './ButtonConfirmAddDb';
import DatabaseManagerController from '../../../controller/DatabaseManagerController';
import DatabaseTablesController from '../../../controller/DatabaseTablesController';
import DeleteDb from './DeleteDb';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextFieldAddDb from './TextFieldAddDb';

const controllerManager = new DatabaseManagerController();
const tablesController = new DatabaseTablesController();

export const parseName = name => {
    if (name === undefined) return name;
    const parsedName = name.replace(/(\.(csv|tsv|json))/giu, "");
    return parsedName;
}

export default function Database() {
    const [datasets, setDatasets] = React.useState([]);
    const [tableName, setTableName] = React.useState(''); // tableName e name ridondanti, probabilmente se ne puó togliere uno
    const [name, setName] = React.useState("");
    const [insertDs, setInsertDs] = React.useState({});
    const [disableName, setDisableName] = React.useState(true);
    const [nameError, setNameError] = React.useState(false);

    const getTabNames = async () => {
        try {
            console.log('yuyu')
            const tables = await tablesController.getTablesNames();
            setDatasets(tables);
        } catch (err) {
            console.log('sono qui')
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
        console.log(parsedN)
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
                <p>Aggiungi dataset al database</p>
                <ButtonAddDb onChange={onChangeInsertDs} />
                <TextFieldAddDb onChangeName={onChangeName} fileName={parseName(insertDs.name)} nameDs={name} onBlur={onBlurName} disabled={disableName} error={nameError} onSubmit={onClickDs} />
                {insertDs.name !== undefined && <ButtonConfirmAddDb onClick={onClickDs} fileName={insertDs.name} disabled={nameError[0]} />}
            </div>
            <div id="datasets-container">
                <>
                    {datasets !== undefined && datasets.map((d, i) => <FormControlLabel key={i} control={<DeleteDb onClickDelete={onClickDelete} value={d} />} label={d} value={d} />)}
                </>
            </div>

        </div>
    );
}