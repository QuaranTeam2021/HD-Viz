import '../css/App.css';
import { Link, Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import MainController, { MainControllerContext } from '../../controller/MainController';
import PcaController, { PcaControllerContext } from '../../controller/PcaController';
import React, { useEffect, useState } from 'react';
import Store, { StoreContext } from '../../store/Store';
import BuildGraph from './BuildGraph';
import Header from './Header';
import Vizualization from './Vizualization';

const store = new Store();
const mainController = new MainController(store);
const pcaController = new PcaController(store);

const App = () => {
  const [storeDefined, setStoreDefined] = useState(false)
  const i = 1;

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    store.originalData.matrix.length > 0 ? setStoreDefined(true) : setStoreDefined(false);
    console.log(store.graphs);
  }, [])

  const defineStore = v => setStoreDefined(v);

  return (
    <StoreContext.Provider value={store}>
      <MainControllerContext.Provider value={mainController}>
        <PcaControllerContext.Provider value={pcaController}>
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
                  <BuildGraph defineStore={defineStore}/>
              </Route>
              <Route path="/visualization">
                { storeDefined ? <Vizualization algoritmoGrafico="pca" tipoGrafico="scpm" distanzaGrafico="euclidean" onDelete={idx => console.log(`Eliminato ${idx}`)} key={i} index={i} /> : <Redirect to="/" /> }
              </Route>
              <Route path="/dataset">
                <div>Gestion dataset</div>
              </Route>
              <Route path="/help">
                <div>Manuale</div>
              </Route>
            </Switch>
          </Router>
        </div>

        </PcaControllerContext.Provider>
      </MainControllerContext.Provider>
    </StoreContext.Provider>
  );
};

export default App;
