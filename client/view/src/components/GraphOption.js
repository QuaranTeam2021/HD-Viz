import React from 'react';
import Insert from './Insert';
import SelectGraph from './SelectGraph';
import SelectAlgorithm from './SelectAlgorithm'; 
import SelectDimensione from './SelectDimensione'; 
import ButtonConfirm from './ButtonConfirm';
import SelectColumns from './SelectColumns';

function GraphOption() {
  const [graph, setGraph] = React.useState('');
  const [insert, setInsert] = React.useState('');
  const [algorithm, setAlgorithm] = React.useState('');
  const [dimensione, setDimensione] = React.useState('');

  const onChangeGraph = e => {
    setGraph(e.target.value); 
  } 

  const onChangeInsert = e => {
    setInsert(e.target.value);
  } 

  const onChangeAlgorithm = e => {
    setAlgorithm(e.target.value);
  }

  const onChangeDimensione= e =>{
    setDimensione(e.target.value);
  }


  return (

      <div className="GraphOption" >
        <Insert onChange={onChangeInsert} />
        <SelectGraph onChange={onChangeGraph}  />
        <SelectAlgorithm onChange={onChangeAlgorithm}/>
        <SelectDimensione onChange={onChangeDimensione}/>
        <SelectColumns />
        <ButtonConfirm />
  
      </div>
    );
  }

  export default GraphOption;