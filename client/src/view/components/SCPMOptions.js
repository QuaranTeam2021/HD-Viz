import React, { useCallback, useEffect } from 'react';
import SelectVizColumns from './database/SelectVizColumns';

export default function SCPMOptions({ graphViz, buttonRef, currentOptions, setCurrentOptions, setDisabled }) {

  const [allCols, setAllCols] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const commitChanges = useCallback(() => {
    if (currentOptions.oldSel !== selected)
      graphViz.updateColumns(selected);
    setCurrentOptions({
      oldSel: selected,
    });
  }, [currentOptions, selected, graphViz, setCurrentOptions]);

  useEffect(() => {
    buttonRef.current.onclick = commitChanges;
    if (graphViz !== null) {
      setAllCols(graphViz.getAllCols());
    }
  }, [buttonRef, commitChanges, graphViz]);

  const onChangeColumns = e => setSelected(e.target.value);

  return (
    <div>
      <SelectVizColumns onChange={onChangeColumns} columns={allCols} selectedColumns={selected} />
    </div>
  );
}


