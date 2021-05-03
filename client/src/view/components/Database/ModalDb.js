import ButtonCloseModalDb from './ButtonCloseModalDb';
import DbButton from './DbButton'; 
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import React from 'react';
import SelectVizTable from './SelectVizTable';
import VizColumns from './VizColumns';

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    position: 'absolute',
    width: 400,
    
  },
}));

export default function ModalDb() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  
  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  }
  const body = 
  <div className={classes.paper}>
      <ButtonCloseModalDb onClick={onClose}/> 
      <h2 id="title">Database</h2>
      <p id="description">
        <SelectVizTable/>
        <VizColumns /> 
      </p>   
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