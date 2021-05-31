import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import React from 'react';

export default function RenameFielddd({ title, setTitle }) {
  const [state, setState] = React.useState(false);
  const [value, setValue] = React.useState(title);

  let viewMode = {};
  let editMode = {};

  if (state.editing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  }

  const handleEditing = () => {
    setState({
      editing: true,
    });
  };

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleUpdatedDone = () => {
    setTitle(value);
    setState({ editing: false });
  };

  const handleEnterUpdate = event => {
    if (event.key === "Enter") {
      setTitle(value);
      setState({ editing: false });
    }
  };

  return (
    <div className="titleGraphdiv">
      <div style={viewMode}>
        <h2>{title}</h2>
      </div>
      <input
        type="text"
        style={editMode}
        className="textInput"
        value={value}
        onChange={handleChange}
        onKeyDown={handleEnterUpdate}
      />
      <Fab style={viewMode} size="small" className="buttonRenameTitle" color="secondary" aria-label="edit" onClick={handleEditing}>
        <EditIcon />
      </Fab>
      <Fab style={editMode} size="small" className="buttonConfirmRename" color="primary" aria-label="done" onClick={handleUpdatedDone}>
        <DoneIcon />
      </Fab>
    </div>
  );
}