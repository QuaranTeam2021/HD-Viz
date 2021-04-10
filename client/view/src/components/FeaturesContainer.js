
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FeaturesGraph from './FeaturesGraph';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
    nested: {
        paddingLeft: theme.spacing(4),
      },
    root: {
    backgroundColor: theme.palette.background.paper,
  },
  
}));

export default function FeaturesContainer(onDelete, i) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [showOption, setShowOption] = React.useState(true);

  const show = 'Mostra opzioni';
  const hide = 'Nascondi opzioni';

  const handleClick = () => {
    setOpen(!open);
    setShowOption(!showOption);
  };

  return (
      <div className="FeatContainer">
    <List
      component="nav"
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemText primary={showOption ? hide : show} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem>
            <div>
                <FeaturesGraph onDelete={onDelete} i={i}/>
            </div>
          </ListItem>
        </List>
      </Collapse>
    </List>
    </div>
  );
}