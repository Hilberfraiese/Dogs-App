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
    errors.life_spane = "Life span must have min-max values. Example: '25-30'";
  } else {
    errors.life_spane = "";
  }
  return errors;
}

export default function CreateDog() {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [state, setState] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    temperaments: [],
  });

  const dispatch = useDispatch();

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

  function onFocus(ev) {
    setTouched({
      ...touched,
      [ev.target.name]: true,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!errors.name && !errors.weight && !errors.height && !errors.age) {
      await axios.post("http://localhost:3001/dog", state);
      setState({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        temperaments: [],
      });
      alert("Your breed has been created successfully");
    } else {
      alert("Something went wrong. Please try again.");
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
          <label>Name</label>
          <input
            name="name"
            onChange={handleInputChange}
            value={state.name}
            placeholder = "insert name"
            className={estilo.input}
            required
          />
          <br />
          <label>Height</label>
          <input
            name="height"
            onChange={handleInputChange}
            value={state.height}
            className={estilo.input}
            placeholder = "insert height"
            required
          />
          <br />
          <label>Weight</label>
          <input
            name="weight"
            onChange={handleInputChange}
            value={state.weight}
            placeholder = "insert weight"
            className={estilo.input}
            required
          />
          <br />
          <label>Life Sp</label>
          <input
            name="life_span"
            className={estilo.input}
            onChange={handleInputChange}
            value={state.life_span}
            placeholder = "insert life span"
            required
          />
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
                <button
                  onClick={(e) => deleteTemp(e, t)}
                >x</button>
              </p>
            ))}
          </div>
          <br />
          <button
            type="submit"
            onClick={handleSubmit}
            className={estilo.button}
          >
            ¡Crear!
          </button>
        </form>
      </div>
    </div>
  );
}
