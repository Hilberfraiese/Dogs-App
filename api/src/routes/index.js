const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const DogsRouter = require('./dogs')
const DogRouter = require('./dog')
const TemperamentRouter = require('./temperament')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dog', DogRouter);
router.use('/dogs', DogsRouter);
router.use('/temperament', TemperamentRouter);


module.exports = router;
