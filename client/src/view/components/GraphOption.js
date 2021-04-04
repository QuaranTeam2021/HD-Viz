import React, { useState } from 'react';
import ButtonConfirm from './ButtonConfirm';
import Insert from './Insert';
import MainController from '../../controller/MainController';
import SelectAlgorithm from './SelectAlgorithm';
import SelectColumns from './SelectColumns';
import SelectDimensione from './SelectDimensione';
import SelectGraph from './SelectGraph';
import {useModel} from '../../model/Model';

function GraphOption() {
  const setGraph = useState('')[1];
  const [insert, setInsert] = React.useState({});
  const [insertReadResult, setInsertReadResult] = useState('');
  const setAlgorithm = useState('')[1];
  const setDimensione = useState('')[1];
  const model = useModel();
  const cntr = new MainController(model);

  const onChangeGraph = e => {
    setGraph(e.target.value);
  }

  const onChangeInsert = e => {
    cntr.parseCSV(e.target.files[0]);
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
      <SelectColumns />
      <ButtonConfirm />

    </div>
  );
}

export default GraphOption;