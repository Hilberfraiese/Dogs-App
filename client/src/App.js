import './App.css';
import React, {useEffect, useState} from 'react';
import { Route } from "react-router-dom";
import Inicio from "./components/inicio/Inicio.js"
import Home from "./components/home/Home.js"
import NavBar from './components/navBar/NavBar.js';
import FilterName from './components/filterName/FilterName'
import CreateDog from './components/createDog/CreateDog';


function App() {
  return (
    <React.Fragment>
        <Route exact path="/" component={Inicio} />
        <Route path="/home" component={NavBar}/>
        <Route exact path="/home/createDog" component={CreateDog}/> 
        <Route exact path="/home" component={Home}/> 
        <Route exact path="/home/search" component={FilterName}/>
    </React.Fragment>
  );
}

export default App;
