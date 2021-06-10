import React, { useState } from 'react';
import ButtonCloseModal from './database/ButtonCloseModalDb';
import Modal from '@material-ui/core/Modal';
import { useStyles } from './database/ModalDb';

export default function Guide() {
    const [show, setShow] = useState(false)
    
    const classes = useStyles();

    const openModal = () => {
        setShow(true);
    }
    const closeModal = () => {
        setShow(false);
    }

    const body =
        <div id="db-div" className={classes.paper}>
            <ButtonCloseModal onClick={closeModal} />
            <h3 id="guide-title">Guida</h3>
            <div id="guide-desc">
                {/* nserire guida */}
            </div>   
        </div>
    
    return (
        <>
        <button onClick={openModal}>Guida</button>
            <Modal
                open={show}
                aria-labelledby="guide-title"
                aria-describedby="guide-desc"
            >
                {body}
            </Modal>
        </>
    );
}