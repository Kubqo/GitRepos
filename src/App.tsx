import React from 'react';
import './App.css';
import SearchBar from './components/searchbar'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import UserInfo from './components/userinfo'


function App() {
  return (
    <Router>
        <div className="App">
          <Switch>
            <Route path="/Search" component={SearchBar} />
            <Route path="/User" component={UserInfo}/>

            {/* Main nechat nakoniec koli tomu ze je default */}
            <Route path="">
              <Redirect to="/Search" />
            </Route>
            
            
          </Switch>
        </div>
      </Router>
  );
}

export default App;
