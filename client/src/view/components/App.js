import '../css/App.css';
import '../css/Resp_1023px.css';
import '../css/Resp_768px.css';
import '../css/Resp_600px.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
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
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { autorun } from 'mobx';
import BuildGraph from './BuildGraph';
import Database from './database/Database';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import Footer from './Footer';
import Guide from './Guide';
import Header from './Header';
import ManualeUtente from '../../manualeUtente.pdf'
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
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const menu =
    <dl className="main_menu">
      <dd>Qui puoi creare un nuovo grafico</dd>
      <dt className="item_home"><Link to="/build">{storeDefined ? 'Aggiungi ' : 'Nuovo '}grafico</Link></dt>
      {storeDefined && <>
        <dd>Visualizza i grafici creati in precedenza</dd>
        <dt className="item_home"><Link to="/visualization">Visualizza grafici</Link></dt>
      </>}
      <dd>Aggiungi o rimuovi dei dataset nel database, per poi utilizzarli per creare dei nuovi grafici</dd>
      <dt className="item_home"><Link to="/dataset">Gestisci database</Link></dt>
      <dd>Visualizza una breve guida sull&apos;applicazione</dd>
      <dt className="item_home"><Guide /></dt>
      <dd>Visualizza il manuale utente per una guida completa dell&apos;applicazione</dd>
      <dt className="item_home"><Link to="/manual">Manuale utente</Link></dt>
    </dl>

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
              <Header storeDefined={storeDefined} />
              <Switch>
                <Route exact path="/">
                  <div className="div-menu-home">
                    <h1>Benvenuto in HD-Viz</h1>
                    {menu}
                  </div> 
                </Route>
                <Route path="/build">
                  <BuildGraph />
                </Route>
                <Route path="/visualization">
                  {storeDefined ? <Visualization /> : <Redirect to="/build" /> }
                </Route>
                <Route path="/dataset">
                  <Database />
                </Route>
                <Route path="/manual">
                  <div className="ManUt">
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                      <Viewer fileUrl={ManualeUtente} plugins={[defaultLayoutPluginInstance]} />
                    </Worker>
                  </div>
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
