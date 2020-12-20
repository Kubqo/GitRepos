import React from "react";
import "./App.css";
import SearchBar from "./components/searchbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserInfo from "./components/userinfo";
import { ThemeContext, Theme } from "./components/ThemeContext";
import ThemeButton from "./components/theme";

function App() {
  const [theme, setTheme] = React.useState(Theme.Light);

  return (
    <Router>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className={`App ${theme}`}>
          <ThemeButton />
          <Switch>
            <Route path="/Search" component={SearchBar} />
            <Route path="/User" component={UserInfo} />

            <Route path="">
              <Redirect to="/Search" />
            </Route>
          </Switch>
        </div>
      </ThemeContext.Provider>
    </Router>
  );
}

export default App;
