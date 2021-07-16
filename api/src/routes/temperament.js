const { Router } = require('express')
const { BASE_URL } = require('../../constants')
const axios = require('axios');
const { Temperaments } = require('../db.js');
const { API_KEY } = process.env;
const { v4: uuidv4 } = require('uuid');

const router = Router();

router.get("/", async (req, res, next) => {
    try{
        const db = await Temperaments.findAll()
        return res.json(db).status(200)
    } catch (e) {
        console.log(e.message)
        return res.json(e.message).status(409)
    }
})

module.exports = router;