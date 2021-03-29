import ButtonConfirm from './ButtonConfirm';
import Insert from './Insert';
import React from 'react';
import SelectAlgorithm from './SelectAlgorithm';
import SelectColumns from './SelectColumns';
import SelectDimensione from './SelectDimensione';
import SelectGraph from './SelectGraph';

function GraphOption() {
  const setGraph = React.useState('')[1];
  const setInsert = React.useState('')[1];
  const setAlgorithm = React.useState('')[1];
  const setDimensione = React.useState('')[1];

  const onChangeGraph = e => {
    setGraph(e.target.value);
  }

  const onChangeInsert = e => {
    setInsert(e.target.value);
  }

  const onChangeAlgorithm = e => {
    setAlgorithm(e.target.value);
  }

  const onChangeDimensione = e => {
    setDimensione(e.target.value);
  }


  return (

    <div className="GraphOption" >
      <Insert onChange={onChangeInsert} />
      <SelectGraph onChange={onChangeGraph} />
      <SelectAlgorithm onChange={onChangeAlgorithm} />
      <SelectDimensione onChange={onChangeDimensione} />
      <SelectColumns />
      <ButtonConfirm />

    </div>
  );
}

export default GraphOption;