
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';

export default function DeleteDb({ onClickDelete, dsName }) {
  return (
      <IconButton aria-label="delete" onClick={() => onClickDelete(dsName)}>
        <DeleteIcon />
      </IconButton>
  );
}

