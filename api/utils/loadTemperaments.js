require('dotenv').config();
const { BASE_URL } = require('../constants')
const { API_KEY } = process.env;
const { Temperaments } = require('../src/db');
const axios = require('axios');

const loadTemperaments = async() => {
    var {data} = await axios.get(`${BASE_URL}?api_key=${API_KEY}`)
    var temperaments = []
    data.forEach(e => {
        if(typeof(e.temperament) === "string"){
            let res = e.temperament.split(",")
            res = res.map(e => e.trim())
            temperaments = temperaments.concat(res)
        }
    });
    console.log(temperaments)
    temperaments = Array.from(new Set(temperaments)).sort() 
   // Set permite almacenar valores únicos de cualquier tipo
   //  Array.from crea una nueva instancia de Array a partir de un objeto iterable
    for await (var temp of temperaments) {
        Temperaments.create({name: temp})
    }
}

module.exports = loadTemperaments;