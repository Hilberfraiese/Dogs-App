const { Router } = require('express')
const router = Router();
require('dotenv').config();
const { Doggies,Temperaments } = require('../db.js');
const { RAZA_URL, BASE_URL } = require('../../constants')
const axios = require('axios');
const { API_KEY } = process.env;


router.get('/', async (req, res, next) => {
  const { name } = req.query;
  if (!name) {
    try {
      var database = await Doggies.findAll({
        include: {
          model: Temperaments,
            attributes: {
              include: ['name'], 
              exclude:['createdAt', 'updatedAt']
            },
            through: {
              attributes:[]
            }  
        }
      })
      const api = await axios.get(`${BASE_URL}?api_key=${API_KEY}`)
      Promise.all([database, api])
        .then((results) => {
          const [dataDB, dataAPI] = results;
          const response = dataDB.concat(dataAPI.data)
          res.send(response)
        })
    } catch (error) {
      next(error)
      res.send(error.message)
    }
  } else {
    try {
      var database = await Doggies.findAll({
        include: {
          model: Temperaments,
            attributes: {
              include: ['name'], 
              exclude:['createdAt', 'updatedAt']
            },
            through: {
              attributes:[]
            }  
        }
      })

      const api = await axios.get(`${BASE_URL}?api_key=${API_KEY}`)
      let dogs = await Promise.all([database, api])
        .then((results) => {
          const [dataDB, dataAPI] = results;
          const response = dataDB.concat(dataAPI.data)
          return response
        })
      let resultado = []
      for (let i = 0; i<dogs.length;i++){
        if(dogs[i].name.includes(name)){
         resultado.push(dogs[i])
        }}
      res.send(resultado).status(200)       

    } catch (error) {
      next(error)
      console.log(error)
      res.send({error:"Dog does not exist"}).status(404)
    }
  }

})

router.get('/:idRaza', async (req, res, next) => {
  const { idRaza } = req.params;
  if (idRaza.length > 0) {
    try {
     let result = await axios.get(`${BASE_URL}/${idRaza}&api_key={${API_KEY}}`)
     if (result){
       res.send(result.data)
     }else{
      Doggies.findOne(
        { where: { 
          id: idRaza 
        },
        include:{
          model: Temperament,
          attributes: ["name"],
          through:{
            attributes:[]
          }
        } 
      })
      .then((resp) => res.send(resp))
      .catch((e) => next(e));
     }
    } catch (error) {
      next(error)
    }
  
  }
})


module.exports = router;