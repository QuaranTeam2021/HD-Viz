import React, { useState } from 'react';
import { action } from 'mobx'
import ButtonConfirm from './ButtonConfirm';
import Insert from './Insert';
import SelectAlgorithm from './SelectAlgorithm';
import SelectColumns from './SelectColumns';
import SelectDimensione from './SelectDimensione';
import SelectGraph from './SelectGraph';
import { useMainController } from '../../controller/MainController';

function GraphOption() {
  const setGraph = useState('')[1];
  const [insert, setInsert] = React.useState([]);
  const [insertReadResult, setInsertReadResult] = useState('');
  const [selectedColumns, setSelectedColumns] = useState([]);
  const setAlgorithm = useState('')[1];
  const setDimensione = useState('')[1];
  const mainController = useMainController();
  mainController.setInsert(insert);

  const onChangeGraph = e => {
    setGraph(e.target.value);
  }

  const onChangeInsert = action(e => {
    setInsert(e.target.files[0]);
  })

  const onClickInsert = e => {
    e.target.value = null;
    setInsertReadResult("");
  }

  const onChangeAlgorithm = e => {
    setAlgorithm(e.target.value);
  }

  const onChangeDimensione = e => {
    setDimensione(e.target.value);
  }

  const onChangeColumns = e => {
    let actual = selectedColumns;
    if (e.target.checked) {
      actual.push(e.target.value);
      setSelectedColumns(actual);
    } else {
      actual = actual.filter(d => d !== e.target.value);
      setSelectedColumns(actual);
    }
  }

  return (

    <div className="GraphOption" >
      <Insert onChange={onChangeInsert} fileName={insert.name} onClick={onClickInsert}/>
      {insert && insertReadResult}
      <SelectGraph onChange={onChangeGraph} />
      <SelectAlgorithm onChange={onChangeAlgorithm} />
      <SelectDimensione onChange={onChangeDimensione} />
      <SelectColumns onChange={onChangeColumns} />
      <ButtonConfirm />

    </div>
  );
}

export default GraphOption;