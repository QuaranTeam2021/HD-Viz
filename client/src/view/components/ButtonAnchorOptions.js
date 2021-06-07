import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import React from 'react';

export default function ButtonAnchorOptions({ optionsPosition: { position, setPosition } }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (e, v) => {
    if (v && v !== position) {
      setPosition(v);
    }
    setOpen(false);
  };

  const handleListKeyDown = e => {
    if (e.key === 'Tab') {
      e.preventDefault();
      setOpen(false);
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <div className="MenuBG">
      <Button
        ref={anchorRef}
        aria-controls={open ? 'anchor-options-menu' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <MoreHorizIcon fontSize="small" />
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
        <Paper elevation={2}>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList autoFocusItem={open} id="anchor-options-menu" onKeyDown={handleListKeyDown}>
              <MenuItem onClick={handleClose} value="up">Sopra il grafico</MenuItem>
              <MenuItem onClick={handleClose} value="right">A destra del grafico</MenuItem>
              <MenuItem onClick={handleClose} value="down">Sotto del grafico</MenuItem>
              <MenuItem onClick={handleClose} value="left">A sinistra il grafico</MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </div>
  );
}