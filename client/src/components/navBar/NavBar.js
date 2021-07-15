import React from "react";
import style from'./Navbar.module.css';
import SearchBar  from '../searchBar/SearchBar';
import { Link } from 'react-router-dom';
import Logo from "./dog.png"
import Orden from "./orden"
import { filter, getDogs } from "../../actions";


export default function NavBar() {
    return (
        <div className={style.navbar}>
          <Link to ="/home">
            <img id="dog" 
                 src={Logo} 
                 className={style.img} 
                 alt="" 
                 onClick={filter([])}
                 /></Link>
          <Link to ="/home/createDog"><button className = {style.btn}>Create puppy</button></Link>
          <div className={style.list}>
          <SearchBar/>
          </div>               
          <Orden />
        </div>
    )
}




