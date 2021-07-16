const { Router } = require('express')
const router = Router();
const { Doggies, Temperaments } = require('../db.js');
const { v4: uuidv4 } = require('uuid');


router.post('/', async (req, res, next) => {
    const{name,
    height,
    weight,
    life_span,
    temperaments}= req.body;
    
    console.log(temperaments)
  
    try {
        console.log("creo el perro con el temperamento")
        console.log(temperaments)
        const id = uuidv4();
        newDog = await Doggies.create({id,name,height,weight,life_span})
        await newDog.setTemperaments(temperaments)
    }
    catch (error) {
        next(error)
    }
})

module.exports = router;
