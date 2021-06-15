import React, { useCallback, useEffect } from 'react';
import ButtonCloseModalDb from './ButtonCloseModalDb';
import ButtonConfirmDb from './ButtonConfirmDb';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DatabaseLoaderController from '../../../controller/DatabaseLoaderController';
import DatabaseTablesController from '../../../controller/DatabaseTablesController';
import DbButton from './DbButton';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import SelectVizColumns from './SelectVizColumns';
import SelectVizTable from './SelectVizTable';
import { useStore } from '../../../store/Store';

export const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    position: 'absolute'
  },
}));

export default function ModalDb({onSubmit}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedColumns, setSelectedColumns] = React.useState([]);
  const [selectedTable, setSelectedTable] = React.useState(''); 
  const [confirmDb, setConfirmDb] = React.useState([]); 

  const [datasetsDb, setDatasetsDb] = React.useState([]);
  const [tableColumnsDb, setTableColumnsDb] = React.useState([]);
  const [dbError, setDbError] = React.useState(null);
  const store = useStore();
  const loaderController = new DatabaseLoaderController(store);
  const tablesController = new DatabaseTablesController();

  const getTabNames = async () => {
    try {
      const tables = await tablesController.getTablesNames();
      setDatasetsDb(typeof tables === "string" ? [] : tables);
      setDbError(null);
    } catch (err) {
      setDatasetsDb([]);
      setDbError(err.message ? err.message : err);
    }
  }

  const getColsNames = async table => {
    try {
      let cols = await tablesController.getTableColumnsNames(table);
      cols = typeof cols === "string" ? [] : cols;
      setTableColumnsDb(cols);
      setSelectedColumns(cols);
      setDbError(null);
    } catch (err) {
      setDbError(err.message ? err.message : err);
      setSelectedColumns([]);
    }
  }

  useEffect(() => {
    getTabNames();
  }, []);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  } 

  const onChangeColumnsDb = e => {
    setSelectedColumns(e.target.value);
  };

  const onChangeTableDb = e => {
    setSelectedTable(e.target.value);
    getColsNames(e.target.value); 
  }
  
  const optionsSelected = useCallback(() => {
    let select; 
    select = selectedTable !== "";  
    select = select && selectedColumns.length >= 0;
    setConfirmDb(select);
  }, [selectedColumns, selectedTable]);  
  
  useEffect(() => {
    optionsSelected();
  }, [optionsSelected]); 

  const onClickConfirm = async () => {
    let formData = {
      selectedColumns,
      selectedTable 
    }; 
    formData.table = selectedTable; 
    formData.columns = selectedColumns; 
    if (selectedColumns.length === 0 || selectedColumns.length === tableColumnsDb.length)
      try {
        await loaderController.loadTable(selectedTable);
      } catch (e) {
        console.error(e.message)
      }
    else
      try {
        await loaderController.loadTableCols(selectedTable, selectedColumns);
      } catch (e) {
        console.error(e.message)
      }
    onClose(); 
    onSubmit({ name: selectedTable }); 
  };
  
  const body = 
    <div id="db-div" className={classes.paper}>
      <ButtonCloseModalDb onClick={onClose} />
      <h3 id="title">Importa da database</h3>
      <div id="description">
        <SelectVizTable onChange={onChangeTableDb} tables={datasetsDb} selected={selectedTable} />
        <SelectVizColumns onChange={onChangeColumnsDb} columns={tableColumnsDb} selectedColumns={selectedColumns} /> 
        {dbError &&
          <Card variant="outlined" className="error message">
            <CardContent>
              {dbError}
            </CardContent>
          </Card>}
        <Card variant="elevation" className="message" id="modaldb-info">
          <CardContent>
            <InfoIcon fontSize="small"/>
            Con nessuna colonna specificata verranno selezionate tutte le colonne nel dataset.
          </CardContent>
        </Card>
        <ButtonConfirmDb onClick={onClickConfirm} disabled={!confirmDb} />
      </div>   
  </div>
  

  return (
    <div >
      <div id="DbButton">
        <DbButton onClick={onOpen}/>
      </div> 
      <Modal 
        open={open}
        aria-labelledby="title"
        aria-describedby="description"
      >
        {body}
      </Modal>
    </div>
  );
}