import React, { useCallback, useEffect, useState } from 'react';
import SelectVizColumns from './database/SelectVizColumns';


export default function MALPOptions({ graphViz, buttonRef, currentOptions, setCurrentOptions, setDisabled }) {

  const [allCols, setAllCols] = useState([]);
  const [selected, setSelected] = useState([]);


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
      console.log("oi");
      setAllCols(graphViz.getAllCols());
    }
  }, [buttonRef, commitChanges, graphViz]);

  const onChangeColumns = e => {
    console.log("ei", e.target.value);
    setSelected(e.target.value);
  };

  return (
    <div>
      <SelectVizColumns onChange={onChangeColumns} columns={allCols} selectedColumns={selected} />
    </div>
  );
}
