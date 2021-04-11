import React, { useState } from 'react';
import ButtonConfirm from './ButtonConfirm';
import Insert from './Insert';
import SelectAlgorithm from './SelectAlgorithm';

import SelectDimensione from './SelectDimensione';
import SelectGraph from './SelectGraph';

function GraphOption() {
  const setGraph = useState('')[1];
  const [insert, setInsert] = React.useState({});
  const [insertReadResult, setInsertReadResult] = useState('');
  const setAlgorithm = useState('')[1];
  const setDimensione = useState('')[1];

  const onChangeGraph = e => {
    setGraph(e.target.value);
  }

  const onChangeInsert = e => {
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.readAsText(file, "UTF-8");
      reader.onload = () => {
        setInsertReadResult(reader.result);
      };
      reader.onerror = () => {
        console.log("file error");
      };
      setInsert(file);
    }
  }

  const onClickInsert = e => {
    e.target.value = null;
    setInsert({});
    setInsertReadResult("");
  }

  const onChangeAlgorithm = e => {
    setAlgorithm(e.target.value);
  }

  const onChangeDimensione = e => {
    setDimensione(e.target.value);
  }
  
  return (

    <div className="GraphOption" >
      <Insert onChange={onChangeInsert} fileName={insert.name} onClick={onClickInsert}/>
      {insert && insertReadResult}
      <SelectGraph onChange={onChangeGraph} />
      
      <SelectAlgorithm onChange={onChangeAlgorithm} /> 
      <SelectDimensione onChange={onChangeDimensione} />
      
      <ButtonConfirm />

    </div>
  );
}

export default GraphOption;