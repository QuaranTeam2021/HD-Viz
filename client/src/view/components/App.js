import '../css/App.css';
import { Model, ModelContext } from '../../model/Model';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import GraphOption from './GraphOption';
import Header from './Header';
import React from 'react';

const App = () => {
  // creaiamo un'unica istanza del modello per tutta l'App
  const model = new Model();
  return (
    // modelContext.Provider fornisce il contesto con un valore (model) a tutto il sottoalbero di componenti
    <ModelContext.Provider value={model}>
      <div className="App">
        <Router>
        <Header />
          <Switch>
            <Route exact path="/" component={GraphOption} />
          </Switch>
        </Router>
      </div>
    </ModelContext.Provider>
  );
}

export default App;
