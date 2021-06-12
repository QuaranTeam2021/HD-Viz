/* eslint-disable require-unicode-regexp */
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function RenameTitle({ title, setTitle }) {
  const [editing, setEditing] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [tempTitle, setTempTitle] = React.useState(title);
  const field = React.useRef(null);
  const [focusField, setFocusField] = React.useState(false);

  React.useEffect(() => {
    if (focusField) {
      field.current.focus();
      setFocusField(false);
    }
  }, [focusField])

  const onChangeTitle = event => {
    let v = event.target.value;
    let parsedV = v.replace(/[\s]/g, ""); // rimuove separatori
    setTempTitle(v);
    if (v === "" || parsedV === "")
      setError(true);
    else
      setError(false);
  };

  const onSubmitTitle = () => {
    setTitle(tempTitle);
    setEditing(false);
  };

  const handleKeyDown = event => {
    if (event.key === "Escape")
      handleSubmit(false);
    else if (event.key === "Enter" && !error)
      handleSubmit(true);
  };

  const onClickEditing = () => {
    setEditing(true);
    setFocusField(true);
  };

  const onClickClose = () => {
    setTempTitle("");
    setError(true);
    setFocusField(true);
  };

  const handleSubmit = status => {
    if (status)
      onSubmitTitle();
    else {
      setTempTitle(title);
      setEditing(false);
    }
    setError(false);
  };

  const inProps = editing ? {
    endAdornment:
      <>
        <IconButton size="small" onClick={onClickClose}>
          <CloseIcon />
        </IconButton>
        <Divider orientation="vertical" />
        <IconButton size="small" onClick={() => handleSubmit(true)} disabled={error}>
          <DoneIcon />
        </IconButton>
      </>
  }
    : {
      endAdornment:
        <>
          <IconButton size="small" onClick={onClickEditing}>
            <EditIcon />
          </IconButton>
        </>
    };

  return (
    <TextField
      style={{ width: '70%' }}
      label={editing ? "Modifica titolo grafico" : undefined}
      variant={editing ? "outlined" : "standard"}
      placeholder={title}
      className="title-input"
      value={tempTitle}
      onKeyDown={handleKeyDown}
      onChange={onChangeTitle}
      disabled={!editing}
      error={error}
      helperText={error ? "Il titolo non può essere vuoto" : undefined}
      inputRef={field}
      InputProps={inProps}
    />
  );
}