import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import estilo from "./CreateDog.module.css";
import { useDispatch, useSelector } from "react-redux";

function validateForm(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "You must type a name";
  } else {
    errors.name = "";
  }
  if (!input.weight) {
    errors.weight = "Type a valid weight range";
  } else if (!/\d{1,2}-\d{1,2}/g.test(input.weight)) {
    errors.weight = "Weight must have min-max values. Example: '25-30'";
  } else {
    errors.weight = "";
  }

  if (!input.height) {
    errors.height = "Type a valid height range";
  } else if (!/\d{1,2}-\d{1,2}/g.test(input.height)) {
    errors.height = "Height must have min-max values. Example: '25-30'";
  } else {
    errors.height = "";
  }
  if (!input.life_span) {
    errors.life_span = "Type a valid life span";
  } else if (!/\d{1,2}-\d{1,2}/g.test(input.life_span)) {
    errors.life_span = "Life span must have min-max values. Example: '25-30'";
  } else {
    errors.life_span = "";
  }
  return errors;
}

export default function CreateDog() {
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    temperaments: [],
  });

  const temp = useSelector((state) => state.temps);
 
  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateForm({
        ...state,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.name && !errors.weight && !errors.height && !errors.life_span) {
      alert("Your breed has been created successfully");
      axios.post("http://localhost:3001/dog", state)
      .then(setState({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        temperaments: [],
      }))
    } else {
      return alert("Something went wrong. Please try again.");
    }
  };

  function handleSelect(e) {
    if (state.temperaments.includes(parseInt(e.target.value))) {
      alert("You already selected this temperament. Try again.");
    } else if (state.temperaments.length >= 3) {
      alert("You can select up to 3 temperaments.");
    } else {
      setState((prev) => ({
        ...prev,
        temperaments: [...prev.temperaments, parseInt(e.target.value)],
      }));
    }
  }

  function deleteTemp(e, t) {
    setState((prev) => ({
      ...prev,
      temperaments: prev.temperaments.filter((temp) => temp !== parseInt(t)),
    }));
  }


  function getNames(arr) {
    let names = [];
    temp?.forEach((t) => {
      arr.forEach((id) => {
        if (parseInt(id) === t.id) {
          names.push(t.name);
        }
      });
    });
    return names;
  }

  return (
    <div className={estilo.body}>
      <div className={estilo.container}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              name="name"
              type="text"
              onChange={handleInputChange}
              value={state.name}
              placeholder="insert name"
              className={estilo.input}
              required
            />
            <p className = {estilo.errorMsg}>{errors.name}</p>
          </div>
          <br />
          <div>
            <label>Height</label>
            <input
              name="height"
              type="text"
              onChange={handleInputChange}
              value={state.height}
              className={estilo.input}
              placeholder="insert height"
              required
            />
           <p className = {estilo.errorMsg}>{errors.height}</p>
          </div>
          <br />
          <div>
            <label>Weight</label>
            <input
              name="weight"
              onChange={handleInputChange}
              value={state.weight}
              type = "text"
              placeholder="insert weight"
              className={estilo.input}
              required
            />
            <p className = {estilo.errorMsg}>{errors.weight}</p>
          </div>
          <br />
          <div>
            <label>Life Span</label>
            <input
              name="life_span"
              type="text"
              className={estilo.input}
              onChange={handleInputChange}
              value={state.life_span}
              placeholder="insert life span"
              required
            />
            <p className = {estilo.errorMsg}>{errors.life_span}</p>
          </div>
          <br />
          <br />
          <select
            name="temperaments"
            onChange={(e) => handleSelect(e)}
            required
            value={state.temperaments}
            className="form-control"
          >
            {temp?.map((e) => (
              <option value={e.id} key={e.id}>
                {e.name}
              </option>
            ))}
          </select>
          <br />
          <div>
            {state.temperaments.map((t) => (
              <p id={t}>
                {getNames([t])}
                <button onClick={(e) => deleteTemp(e, t)}>x</button>
              </p>
            ))}
          </div>
          <br />
          <button
            type="submit"
            onClick={handleSubmit}
            className={estilo.button}
          >
            ¡Creat!
          </button>
        </form>
      </div>
    </div>
  );
}
