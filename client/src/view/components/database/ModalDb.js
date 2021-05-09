import React, { useCallback, useEffect, useState } from 'react';
import { action } from 'mobx';
import ButtonCloseModalDb from './ButtonCloseModalDb';
import ButtonConfirmDb from './ButtonConfirmDb';
import DatabaseLoaderController from '../../../controller/DatabaseLoaderController';
import DatabaseTablesController from '../../../controller/DatabaseTablesController';
import DbButton from './DbButton'; 
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import SelectVizColumns from './SelectVizColumns';
import SelectVizTable from './SelectVizTable';
import { useStore } from '../../../store/Store';

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    position: 'absolute'
  },
}));

export default function ModalDb() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [selectedTable, setSelectedTable] = useState(''); 
  const [sent, sentDb] = useState([]); 

  const [datasetsDb, setDatasetsDb] = useState();
  const [tableColumnsDb, setTableColumnsDb] = useState();
  const store = useStore();
  const loaderController = new DatabaseLoaderController(store);
  const tablesController = new DatabaseTablesController();

  const getTabNames = async () => {
    try {
        const tables = await tablesController.getTablesNames();
        setDatasetsDb(tables);
    } catch (err) {
        setDatasetsDb([]);
        console.log(err.message);
    }
  }

  const getColsNames = async () => {
    try {
        const cols = await tablesController.getTableColumnsNames(selectedTable);
        setTableColumnsDb(cols);
    } catch (err) {
        console.log(err.message);
    }
  }

  useEffect(() => {
    getTabNames();
    getColsNames();
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
    getColsNames();
  }
  
  const optionsSelected = useCallback(() => {
    let select; 
    select = selectedColumns !== [];
    select = select && selectedTable !== "";  
    sentDb(select);
  }, [selectedColumns, selectedTable]);  
  
  useEffect(() => {
    optionsSelected();
  }, [optionsSelected]); 

  const onClickSent = action(() => {
    let formData = {
      selectedColumns,
      selectedTable 
    }; 
    formData.table = selectedTable; 
    formData.columns = selectedColumns; 
    if (selectedColumns.length === 0)
      loaderController.loadTable(selectedTable);
    else
      loaderController.loadTableCols(selectedTable, selectedColumns);
    onClose();
  });
  
  const body = 
  <div className={classes.paper}>
      <ButtonCloseModalDb onClick={onClose}/> 
      <div id="description">
        <SelectVizTable onChange={onChangeTableDb} tables={datasetsDb}/>
        <SelectVizColumns onChange={onChangeColumnsDb} columns={tableColumnsDb} /> 
        <ButtonConfirmDb onClick={onClickSent} disabled={!sent} />
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