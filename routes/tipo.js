const {Router} = require('express');
const router = Router();
const Tipo = require('../models/Tipo');
const {validationResult, check} = require('express-validator');

/*GET para obtener todos los generos*/
router.get('/', async (req, res) => {
    try {
        const tipos = await Tipo.find();
        res.json(tipos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


/*POST para crear un nuevo tipo*/
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    ],

    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            let tipo = new Tipo();

            tipo.nombre = req.body.nombre;
            tipo.descripcion = req.body.descripcion;
            tipo.fechaCreacion = new Date();
            tipo.fechaActualizacion = new Date();

            tipo = await tipo.save();

            res.json(tipo);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } 
)


/*PUT para actualizar un tipo existente*/
router.put('/:tipoId',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    ],

    async function(req, res) {
        try {
            let tipo = await Tipo.findById(req.params.tipoId);

            if (!tipo) {
                return res.status(404).json({ message: 'Tipo no encontrado' });
            }

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            tipo.nombre = req.body.nombre;
            tipo.descripcion = req.body.descripcion;    
            tipo.estado = req.body.estado;
            tipo.fechaActualizacion = new Date();
            tipo = await tipo.save();

            res.json(tipo);
        } catch (error) {
            console.log(error)
            res.status(500).send("Ocurrio un error")
        }
    }
)

module.exports = router;