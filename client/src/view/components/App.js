import '../css/App.css';
import MainController, { MainControllerContext } from '../../controller/MainController';
import { Model, ModelContext } from '../../model/Model';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import GraphOption from './GraphOption';
import Header from './Header';
import React from 'react';
import VizContainer from './VizContainer';

const App = () => {
  // creaiamo un'unica istanza del modello per tutta l'App
  const model = new Model();
  const mainController = new MainController(model);
  const i = 1;

  return (
    // modelContext.Provider fornisce il contesto con un valore (model) a tutto il sottoalbero di componenti
    <ModelContext.Provider value={model}>
      <MainControllerContext.Provider value={mainController}>
        <div className="App">
          <Router>
            <Header />
            <Switch>
              <Route exact path="/" component={GraphOption} />
            </Switch>
          </Router>
          {/*
          <VizContainer algoritmoGrafico="pca" tipoGrafico="scpm" distanzaGrafico="euclidean" onDelete={idx => console.log(`Eliminato ${idx}`)} key={i} index={i} />
          */}
        </div>

      </MainControllerContext.Provider>
    </ModelContext.Provider>
  );
};

export default App;
