import '../css/App.css';
import DistanceBasedGraphController, { DistanceBasedGraphControllerContext } from '../../controller/DistanceBasedGraphController';
import FastmapController, { FastmapControllerContext } from '../../controller/FastmapController';
import IsomapController, { IsomapControllerContext } from '../../controller/IsomapController';
import { Link, Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import LleController, { LleControllerContext } from '../../controller/LleController';
import LocalLoaderController, { LocalLoaderControllerContext } from '../../controller/LocalLoaderController';
import PcaController, { PcaControllerContext } from '../../controller/PcaController';
import React, { useEffect, useState } from 'react';
import StandardController, { StandardControllerContext } from '../../controller/StandardController';
import Store, { StoreContext } from '../../store/Store';
import TsneController, { TsneControllerContext } from '../../controller/TsneController';
import UmapController, { UmapControllerContext } from '../../controller/UmapController';
import BuildGraph from './BuildGraph';
import Header from './Header';
import Vizualization from './Vizualization';

const store = new Store();
const localLoaderController = new LocalLoaderController(store);
const standardController = new StandardController(store);
const fastmapController = new FastmapController(store);
const isomapController = new IsomapController(store);
const lleController = new LleController(store);
const pcaController = new PcaController(store);
const tsneController = new TsneController(store);
const umapController = new UmapController(store);
const distanceBasedController = new DistanceBasedGraphController(store);

const App = () => {
  const [storeDefined, setStoreDefined] = useState(false)
  const i = 1;

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    store.graphs.length > 0 ? setStoreDefined(true) : setStoreDefined(false);
  }, [])

  const defineStore = v => setStoreDefined(v);

  return (
    <StoreContext.Provider value={store}>
      <LocalLoaderControllerContext.Provider value={localLoaderController}>
        <DistanceBasedGraphControllerContext.Provider value={distanceBasedController}>
        <StandardControllerContext.Provider value={standardController}>
        <FastmapControllerContext.Provider value={fastmapController}>
        <IsomapControllerContext.Provider value={isomapController}>
        <LleControllerContext.Provider value={lleController}>
        <PcaControllerContext.Provider value={pcaController}>
        <TsneControllerContext.Provider value={tsneController}>
        <UmapControllerContext.Provider value={umapController}>
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
                  { storeDefined ? <Vizualization onDelete={idx => console.log(`Eliminato ${idx}`)} key={i} index={i} /> : <Redirect to="/" /> }
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
        </UmapControllerContext.Provider>
        </TsneControllerContext.Provider>
        </PcaControllerContext.Provider>
        </LleControllerContext.Provider>
        </IsomapControllerContext.Provider>
        </FastmapControllerContext.Provider>
        </StandardControllerContext.Provider>
      </DistanceBasedGraphControllerContext.Provider>  
      </LocalLoaderControllerContext.Provider>
    </StoreContext.Provider>
  );
};

export default App;
