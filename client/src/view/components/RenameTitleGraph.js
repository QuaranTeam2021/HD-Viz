import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import React from 'react'
 
export default function RenameFielddd({ title, setTitle }) {
const [state, setState] = React.useState('false');
const [value, setValue] = React.useState('Scatterplot');

let viewMode = {}
let editMode = {}

if (state.editing) {
    viewMode.display = "none"
} else {
    editMode.display = "none"
}

const handleEditing = () => {
    setState({
      editing: true,
    })
}

const handleChange = event => {
    setValue(event.target.value);
};

const handleUpdatedDone = () => {
    setTitle(value);
    setState({ editing: false })
}

const handleEnterUpdate = event => {
    if (event.key === "Enter") {
        setTitle(value);
        setState({ editing: false})
    }
}

	return (
		<div>
            <ul>
                <li>
                    <div style={viewMode}>
                        <h1>{title}</h1>
                    </div>
                    <input 
                        type="text" 
                        style={editMode} 
                        className="textInput"
                        value={value}
                        onChange={handleChange}
                        onKeyDown={handleEnterUpdate}
                    />
                    <Fab style={viewMode} size="small" color="secondary" aria-label="edit" onClick={handleEditing}>
                        <EditIcon />
                    </Fab>
                    <Fab style={editMode} size="small" color="primary" aria-label="done" onClick={handleUpdatedDone}>
                        <DoneIcon />
                    </Fab>
                </li>
            </ul>
        </div>
	)
}