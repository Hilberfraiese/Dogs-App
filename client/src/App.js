import './App.css';
import React from 'react';
import { Switch } from 'react-router';
import { Route } from "react-router-dom";
import Inicio from "./components/inicio/Inicio.js"
import Home from "./components/home/Home.js"
import NavBar from './components/navBar/NavBar.js';
import FilterName from './components/filterName/FilterName'
import CreateDog from './components/createDog/CreateDog';
import dogDetail from './components/dogsDetail/dogsDetail';

function App() {
  return (
    <React.Fragment>
        <Route exact path="/" component={Inicio} />
        <Route path="/home" component={NavBar}/>
        <Route exact path="/home" component={Home}/> 
      <Switch>
        <Route exact path="/home/createDog" component={CreateDog}/> 
        <Route exact path="/home/search" component={FilterName}/>
        <Route exact path="/home/:id" component={dogDetail}/> 
      </Switch>
    </React.Fragment>
  );
}

export default App;
