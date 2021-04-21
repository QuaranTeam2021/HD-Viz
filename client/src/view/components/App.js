import '../css/App.css';
import MainController, { MainControllerContext } from '../../controller/MainController';
import { Store, StoreContext } from '../../store/Store';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import GraphOption from './GraphOption';
import Header from './Header';
import React from 'react';
import VizContainer from './VizContainer';

const App = () => {
  const store = new Store();
  const mainController = new MainController(store);
  const i = 1;

  return (
    <StoreContext.Provider value={store}>
      <MainControllerContext.Provider value={mainController}>
        <div className="App">
          <Router>
            <Header />
            <Switch>
              <Route exact path="/" component={GraphOption} />
            </Switch>
          </Router>
          <VizContainer algoritmoGrafico="pca" tipoGrafico="scpm" distanzaGrafico="euclidean" onDelete={idx => console.log(`Eliminato ${idx}`)} key={i} index={i} />
        </div>

      </MainControllerContext.Provider>
    </StoreContext.Provider>
  );
};

export default App;
