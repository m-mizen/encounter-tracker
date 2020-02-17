import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Combat } from './components/Combat/Combat';
import { AppHeader } from './components/Header/Header';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';


function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Router>
        <AppHeader></AppHeader>
        <Switch>

          <Route 
            exact 
            path='/combat/new'
          >
            <Combat new={true} />
          </Route>

          <Route  
            path='/combat/:id'
            children={
              <Container maxWidth="md">
                <Combat new={false} />
              </Container>
            }
            >
          </Route>

          <Route 
            exact
            path='/'
          >
            <Home />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
