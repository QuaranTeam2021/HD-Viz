import '../css/App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import GraphOption from './GraphOption';
import Header from './Header';
import React from 'react';

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
        <Switch>
          <Route exact path="/" component={GraphOption} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
