import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './Component/Login/Login'
import DetailFish from './Component/Detail/DetailFish'
import AddFish from './Component/CreateFish/AddFish'
import { Provider } from 'react-redux'
import store from './Redux/Reducer'
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/datafish" component={DetailFish} />
            <Route exact path="/addfish" component={AddFish} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
