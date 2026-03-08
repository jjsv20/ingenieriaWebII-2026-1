const {Router} = require('express');
const router = Router();
const Director = require('../models/Director');
const {validationResult, check} = require('express-validator');

/*GET para obtener todos los generos*/
router.get('/', async (req, res) => {
    try {
        const directores = await Director.find();
        res.json(directores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


/*POST para crear un nuevo director*/
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('estado', 'El estado es obligatorio y debe ser "Activo" o "Inactivo"').isIn(['activo', 'inactivo'])
    ],

    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            let director = new Director();

            director.nombre = req.body.nombre;
            director.estado = req.body.estado;
            director.fechaCreacion = new Date();
            director.fechaActualizacion = new Date();

            director = await director.save();

            res.json(director);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } 
)


/*PUT para actualizar un genero existente*/
router.put('/:directorId',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('estado', 'El estado es obligatorio y debe ser "Activo" o "Inactivo"').isIn(['activo', 'inactivo'])
    ],

    async function(req, res) {
        try {
            let director = await Director.findById(req.params.directorId);

            if (!director) {
                return res.status(404).json({ message: 'Director no encontrado' });
            }

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            director.nombre = req.body.nombre;
            director.estado = req.body.estado;
            director.fechaActualizacion = new Date();
            director = await director.save();

            res.json(director);
        } catch (error) {
            console.log(error)
            res.status(500).send("Ocurrio un error")
        }
    }
)

module.exports = router;