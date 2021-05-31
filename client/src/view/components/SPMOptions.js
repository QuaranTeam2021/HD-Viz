import React, { useCallback, useEffect, useState } from 'react';
import SelectVizColumns from './database/SelectVizColumns';


export default function SPMOptions({ graphViz, buttonRef, setCurrentOptions, setDisabled}) {

  const [allCols, setAllCols] = useState([]);
const [selected, setSelected] = useState([]);


  const commitChanges = useCallback(() => {
    if (selected !== allCols)
    graphViz.updateColumns(selected)
      setCurrentOptions({
        selected: allCols,
    });
  }, [graphViz, allCols, selected, setCurrentOptions]);
 
  useEffect(() => {
    buttonRef.current.onclick = commitChanges;
    if (graphViz !== null) {
    setSelected(graphViz.getSelectedCols());
    setAllCols(graphViz.getAllCols());
  }
     
  
  }, [buttonRef, commitChanges, graphViz]);
  
  const onChangeColumns = e => {
    setAllCols(e.target.value);
    if (setAllCols.lenght > 5) {
      setDisabled(true); 
    }
  }
    
  return (
    <div >
       <SelectVizColumns onChange={onChangeColumns} columns={allCols} selectedColumns={selected} /> 
    </div>
  );
} 


