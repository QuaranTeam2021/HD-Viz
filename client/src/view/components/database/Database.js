import React, { useEffect } from 'react';
import ButtonAddDb from './ButtonAddDb';
import ButtonConfirmAddDb from './ButtonConfirmAddDb';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DatabaseManagerController from '../../../controller/DatabaseManagerController';
import DatabaseTablesController from '../../../controller/DatabaseTablesController';
import DatasetEntry from './DatasetEntry';
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
    const [dbStatus, setDbStatus] = React.useState({
        message: "",
        value: null
    });

    const getTabNames = async () => {
        try {
            const tables = await tablesController.getTablesNames();
            setDatasets(typeof tables === "string" ? [] : tables);
        } catch (err) {
            setDatasets([]);
            setDbStatus({
                message: err.message ? err.message : err,
                value: false
            })
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
        setDbStatus({
            message: "",
            value: null
        })
    };

    const onClickDelete = async dsName => {
        try {
            let res = await controllerManager.deleteTable(dsName);
            setDbStatus({
                message: res,
                value: true
            });
            setDatasets(list => list.filter(d => {
                return d !== dsName;
            }));
        }
        catch (err) {
            setDbStatus({
                message: err.message ? err.message : err,
                value: false
            })
        }
    };

    const onChangeName = e => {
        let n = e.target.value;
        let parsedN = parseName(n);
        // console.log(parsedN)
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
        try {
            let res = await controllerManager.upload(tableName ? tableName : parseName(insertDs.name), insertDs);
            setDbStatus({
                message: res,
                value: true
            })
            getTabNames();
        }
        catch (err) {
            setDbStatus({
                message: err.message ? err.message : err,
                value: false
            });
        }
    };

    return (
        <div className="dataset_div">
            <div id="completeFormInsertDataset">
                <h2>Aggiungi dataset al database</h2>
                <ButtonAddDb onChange={onChangeInsertDs} />
                <TextFieldAddDb onChangeName={onChangeName} fileName={parseName(insertDs.name)} nameDs={name} onBlur={onBlurName} disabled={disableName} error={nameError} onSubmit={onClickDs} />
                {insertDs.name !== undefined && <ButtonConfirmAddDb onClick={onClickDs} fileName={insertDs.name} disabled={nameError[0]} />}
            </div>
            {dbStatus.value !== null &&
                <Card variant="outlined" className={`${dbStatus.value ? "success" : "error"} message`}>
                    <CardContent>
                        {dbStatus.message}
                    </CardContent>
                </Card>}
            <div>
                <h3>Elimina dataset</h3>
                <div id="datasets-container">
                    {datasets !== undefined && datasets.map((d, i) => <DatasetEntry key={i} onClickDelete={onClickDelete} dsName={d} />)}
                </div>
            </div>

        </div>
    );
}