import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
    extendedIcon: {
        marginRight: theme.spacing(1),
      },

    root: {
        '& > *': {
        margin: theme.spacing(1),
    },
  },
}));

export default function RenameAxis(props) {
  const classes = useStyles();
  const [state, setState] = React.useState('false');
  const [value, setValue] = React.useState('Valore preso da asse X-Y');
  const [title, setTitle] = React.useState('nomeasse_x-y');
// titolo verrà passato da qualche parte

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

const modifyTitleAxis = () => {
  setTitle(value);
  setState({ editing: false })
};

const handleEnterUpdate = event => {
    if (event.key === "Enter") {
        setTitle(value);
        setState({ editing: false})
    }
}

const handleCloseEditing = () => {
    setState({
      editing: false,
    })
}

  return (
    <div>
        <div className={classes.root} style={viewMode}>
            <p> Asse { props.asse }: {title} </p>
            <Fab variant="extended" size="small" color={props.color1} aria-label="edit" onClick={handleEditing}>
                <EditIcon className={classes.extendedIcon} />
                Rinomina asse { props.asse } 
            </Fab>
            </div>
        <div style={editMode}>
            <input      
                type="text" 
                value={value} 
                onChange={handleChange}
                onKeyDown={handleEnterUpdate} 
            />
            <Fab size="small" color={props.color2} aria-label="done" onClick={modifyTitleAxis}>
                <DoneIcon />
            </Fab>
            <Fab size="small" color={props.color3} aria-label="done" onClick={handleCloseEditing}>
                <CloseIcon />
            </Fab>
        </div>
    </div>
  );
}
