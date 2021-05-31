import '../css/App.css';
import '../css/Resp_1440px.css';
import '../css/Resp_768px.css';
import '../css/Resp_600px.css';
import DistanceBasedGraphController, { DistanceBasedGraphControllerContext } from '../../controller/DistanceBasedGraphController';
import FastmapController, { FastmapControllerContext } from '../../controller/FastmapController';
import IsomapController, { IsomapControllerContext } from '../../controller/IsomapController';
import { Link, Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import LleController, { LleControllerContext } from '../../controller/LleController';
import LocalLoaderController, { LocalLoaderControllerContext } from '../../controller/LocalLoaderController';
import React, { useEffect, useState } from 'react';
import StandardController, { StandardControllerContext } from '../../controller/StandardController';
import Store, { StoreContext, useStore } from '../../store/Store';
import TsneController, { TsneControllerContext } from '../../controller/TsneController';
import UmapController, { UmapControllerContext } from '../../controller/UmapController';
import { autorun } from 'mobx';
import BuildGraph from './BuildGraph';
import Database from './database/Database';
import Footer from './Footer';
import Header from './Header';
import { observer } from 'mobx-react-lite';
import Visualization from './Visualization';

const store = new Store();
const localLoaderController = new LocalLoaderController(store);
const standardController = new StandardController(store);
const fastmapController = new FastmapController(store);
const isomapController = new IsomapController(store);
const lleController = new LleController(store);
const tsneController = new TsneController(store);
const umapController = new UmapController(store);
const distanceBasedController = new DistanceBasedGraphController(store);

const App = () => {
  const [storeDefined, setStoreDefined] = useState(store.graphs.length);
  const defineStore = v => setStoreDefined(v);

  return (
    <StoreContext.Provider value={store}>
      <LocalLoaderControllerContext.Provider value={localLoaderController}>
        <DistanceBasedGraphControllerContext.Provider value={distanceBasedController}>
        <StandardControllerContext.Provider value={standardController}>
        <FastmapControllerContext.Provider value={fastmapController}>
        <IsomapControllerContext.Provider value={isomapController}>
        <LleControllerContext.Provider value={lleController}>
        <TsneControllerContext.Provider value={tsneController}>
        <UmapControllerContext.Provider value={umapController}>
          <div className="App">
            <Router>
              <Header />
              <div className="menu_div">
                  <ul className="main_menu">
                    <li className="item_home"><Link to="/">{storeDefined ? 'Aggiungi ' : 'Nuovo ' }grafico</Link></li>
                    <li><Link to="/dataset">Gestisci database</Link></li>
                    <li><Link to="/help">Aiuto</Link></li>
                  </ul>
              </div>
              <Switch>
                <Route exact path="/">
                  <BuildGraph />
                </Route>
                <Route path="/visualization">
                  {storeDefined ? <Visualization /> : <Redirect to="/" /> }
                </Route>
                <Route path="/dataset">
                  <Database />
                </Route>
                <Route path="/help">
                  <div id="ManUt">Manuale</div>
                </Route>
              </Switch>
            </Router>
            <div id="push"> </div>
          </div>
          <div>
            <Footer />
          </div>
        </UmapControllerContext.Provider>
        </TsneControllerContext.Provider>
        </LleControllerContext.Provider>
        </IsomapControllerContext.Provider>
        </FastmapControllerContext.Provider>
        </StandardControllerContext.Provider>
      </DistanceBasedGraphControllerContext.Provider>  
      </LocalLoaderControllerContext.Provider>
    <StoreObserver defineStore={defineStore} />
    </StoreContext.Provider>
  );
};

// Forces update of App component to redirect when the store is empty
export const StoreObserver = observer(({ defineStore }) => {
  const str = useStore();

  useEffect(() => autorun(() => {
    if (str.graphs.length > 0)
      defineStore(true);
    else
      defineStore(false);
  }), [defineStore, str.graphs.length]);

  return <React.Fragment />;
})

export default App;
