import axios from "axios";

export function getDogs() {
  return function (dispatch) {
    return axios.get("http://localhost:3001/dogs").then((json) => {
      dispatch({
        type: "GET_DOG",
        payload: json.data,
      });
    });
  };
}

export function getName(name) {
  return async function (dispatch) {
    const { data } = await axios.get(`http://localhost:3001/dogs?name=${name}`);
    dispatch({ type: "GET_NAME", payload: data });
  };
}

export function getId(id) {
  return function (dispatch) {
    dispatch({ type: "GET_ID", payload: id });
  };
}

export function getTemp() {
  return function (dispatch) {
    return axios.get("http://localhost:3001/temperament").then((temp) => {
      dispatch({
        type: "GET_TEMP",
        payload: temp.data,
      });
    });
  };
}

export function getZA() {
  return function (dispatch) {
    return axios.get("http://localhost:3001/dogs").then((dog) => {
      const orderZA = dog.data.sort((b, a) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
      dispatch({
        type: "order_ZA",
        payload: orderZA,
      });
    });
  };
}

export function getAZ() {
  return function (dispatch) {
    return axios.get("http://localhost:3001/dogs").then((dog) => {
      const orderAZ = dog.data.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
      dispatch({
        type: "order_AZ",
        payload: orderAZ,
      });
    });
  };
}

export function getLight() {
  return function (dispatch) {
    return axios.get("http://localhost:3001/dogs").then((dog) => {
      const orderLight = dog.data.sort((a, b) => {
        if (!a.weight.metric) {
          const metric = a.weight;
          a.weight = metric;
        }

        if (!b.weight.metric) {
          const metric = { metric: b.weight };
          b.weight = metric;
        }
        if (parseInt(a.weight.metric) > parseInt(b.weight.metric)) return 1;
        if (parseInt(a.weight.metric) < parseInt(b.weight.metric)) return -1;
        return 0;
      });
      dispatch({
        type: "ORDER_LIGHT",
        payload: orderLight,
      });
    });
  };
}

export function getHeavy() {
  return function (dispatch) {
    return axios.get("http://localhost:3001/dogs").then((dog) => {
      const orderLight = dog.data.sort((b, a) => {
        if (b.id.length > 5) {
          const metric = { metric: b.weight };
          b.weight = metric;
        }
        if (parseInt(b.weight.metric) < parseInt(a.weight.metric)) return 1;
        if (parseInt(b.weight.metric) > parseInt(a.weight.metric)) return -1;
        return 0;
      });
      dispatch({
        type: "ORDER_LIGHT",
        payload: orderLight,
      });
    });
  };
}

export function filter(array) {
  return {
    type: "FILTER",
    payload: array,
  };
}

export function getSource(value) {
  if (value === "DB") {
    return {
      type: "DB",
    };
  } else if (value === "API") {
    return {
      type: "API",
    };
  } else if (value === "ALL") {
    return {
      type: "ALL",
    };
  }
}
