import Backdrop from '@material-ui/core/Backdrop';
import ButtonCloseModal from './database/ButtonCloseModalDb';
import Fade from '@material-ui/core/Fade';
import GuideBody from './GuideBody';
import Modal from '@material-ui/core/Modal';
import React from 'react';
import { useStyles } from './database/ModalDb';


export default function Guide() {
  const [show, setShow] = React.useState(false)

  const classes = useStyles();

  const openModal = () => {
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
  };

  const body =
    <div id="guide-div" className={classes.paper}>
      <ButtonCloseModal onClick={closeModal} />
      <h3 id="guide-title">Guida</h3>
      <div id="guide-desc">
        <GuideBody />
      </div>
    </div>;

  return (
    <>
      <button onClick={openModal}>Guida</button>
      <Modal
        open={show}
        onClose={closeModal}
        aria-labelledby="guide-title"
        aria-describedby="guide-desc"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={show}>
          {body}
        </Fade>
      </Modal>
    </>
  );
}