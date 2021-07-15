import { getName } from "../../actions";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Estilo from "./searchBar.module.css";
import { Link } from "react-router-dom";

function SearchBar() {
  const [dogState, setdogState] = useState("");
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getName(dogState));
    setdogState("");
  };

  return (
    <div className={Estilo.search}>
      <input
        className={Estilo.input}
        type="text"
        placeholder="Name..."
        value={dogState}
        onChange={(e) => setdogState(e.target.value)}
      />
      <button  className = {Estilo.btn} onClick={handleClick} type="submit">  
      <Link to="/home/search" className={Estilo.Estilo}>🐶
      </Link></button>
    </div>
  );
}

export default SearchBar;
