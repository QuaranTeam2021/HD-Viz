import '../css/App.css';
import Header from './Header';
import React from 'react';
import VizContainer from './VizContainer';

function App() {
  const i = 1;

  return (
    <div className="App">
      <Header />
      <VizContainer algoritmoGrafico="pca" tipoGrafico="scpm" distanzaGrafico="euclidean" onDelete={idx => console.log(`Eliminato ${idx}`)} key={i} index={i} />
    </div>
  );
}

export default App;
