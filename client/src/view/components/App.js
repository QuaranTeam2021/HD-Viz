import '../css/App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import GraphOption from './GraphOption';
import Header from './Header';
import React from 'react';
import VizContainer from './VizContainer';

function App() {
  const i = 1;

  return (
    <div className="App">
      <Router>
      <Header />
        <Switch>
          <Route exact path="/" component={GraphOption} />
        </Switch>
      </Router>
<VizContainer algoritmoGrafico="pca" tipoGrafico="scpm" distanzaGrafico="euclidean" onDelete={idx => console.log(`Eliminato ${idx}`)} key={i} index={i} />
    </div>
  );
}

export default App;
