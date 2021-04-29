import '../css/App.css';
import { Link, Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import MainController, { MainControllerContext } from '../../controller/MainController';
import { Model, ModelContext } from '../../model/Model';
import React, { useEffect, useState } from 'react';
import BuildGraph from './BuildGraph';
import Database from './Database/Database';
import Header from './Header';
import Vizualization from './Vizualization';

const App = () => {
  // creaiamo un'unica istanza del modello per tutta l'App
  const model = new Model();
  const mainController = new MainController(model);
  const [modelDefined, setModelDefined] = useState(false)
  const i = 1;

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    model.getOriginalData.length > 0 ? setModelDefined(true) : setModelDefined(false);
  }, [model])

  return (
    // modelContext.Provider fornisce il contesto con un valore (model) a tutto il sottoalbero di componenti
    <ModelContext.Provider value={model}>
      <MainControllerContext.Provider value={mainController}>
        <div className="App">
          <Router>
            <Header />
            <ul>
              <li><Link to="/">Cambia dati</Link></li>
              <li><Link to="/dataset">Gestisci dataset</Link></li>
              <li><Link to="/help">Aiuto</Link></li>
            </ul>
            <Switch>
              <Route exact path="/">
                <BuildGraph />
              </Route>
              <Route path="/visualization">
                { modelDefined ? <Vizualization algoritmoGrafico="pca" tipoGrafico="scpm" distanzaGrafico="euclidean" onDelete={idx => console.log(`Eliminato ${idx}`)} key={i} index={i} /> : <Redirect to="/" /> }
              </Route>
              <Route path="/dataset">
                <div>
                  Gestion dataset
                  <Database/>
                  </div>
              </Route>
              <Route path="/help">
                <div>Manuale</div>
              </Route>
            </Switch>
          </Router>
        </div>

      </MainControllerContext.Provider>
    </ModelContext.Provider>
  );
};

export default App;
