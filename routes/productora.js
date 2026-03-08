const {Router} = require('express');
const router = Router();
const Productora = require('../models/Productora');
const {validationResult, check} = require('express-validator');

/*GET para obtener todos los generos*/
router.get('/', async (req, res) => {
    try {
        const productoras = await Productora.find();
        res.json(productoras);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


/*POST para crear un nuevo director*/
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        check('slogan', 'El slogan es obligatorio').not().isEmpty(),
        check('estado', 'El estado es obligatorio y debe ser "Activo" o "Inactivo"').isIn(['activo', 'inactivo'])
    ],

    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            let productora = new Productora();

            productora.nombre = req.body.nombre;
            productora.descripcion = req.body.descripcion;
            productora.slogan = req.body.slogan;
            productora.estado = req.body.estado;
            productora.fechaCreacion = new Date();
            productora.fechaActualizacion = new Date();

            productora = await productora.save();

            res.json(productora);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } 
)


/*PUT para actualizar un genero existente*/
router.put('/:productoraId',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        check('slogan', 'El slogan es obligatorio').not().isEmpty(),
        check('estado', 'El estado es obligatorio y debe ser "Activo" o "Inactivo"').isIn(['Activo', 'Inactivo'])
    ],

    async function(req, res) {
        try {
            let productora = await Productora.findById(req.params.productoraId);

            if (!productora) {
                return res.status(404).json({ message: 'Productora no encontrada' });
            }

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            productora.nombre = req.body.nombre;
            productora.descripcion = req.body.descripcion;
            productora.slogan = req.body.slogan;
            productora.estado = req.body.estado;
            productora.fechaActualizacion = new Date();
            productora = await productora.save();

            res.json(productora);
        } catch (error) {
            console.log(error)
            res.status(500).send("Ocurrio un error")
        }
    }
)

module.exports = router;