const { Router } = require('express');
const router = Router();
const Genero = require('../models/Genero');
const { validationResult, check } = require('express-validator');

/*GET para obtener todos los generos*/
router.get('/', async (req, res) => {
    try {
        const generos = await Genero.find();
        res.json(generos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/*POST para crear un nuevo genero*/
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        check('estado', 'El estado es obligatorio y debe ser "activo" o "inactivo"').isIn(['Activo', 'Inactivo'])
    ],

    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            let genero = new Genero();

            genero.nombre = req.body.nombre;
            genero.descripcion = req.body.descripcion;
            genero.estado = req.body.estado;
            genero.fechaCreacion = new Date();
            genero.fechaActualizacion = new Date();

            genero = await genero.save();

            res.json(genero);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } 
)

/*PUT para actualizar un genero existente*/
router.put('/:generoId',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        check('estado', 'El estado es obligatorio y debe ser "Activo" o "Inactivo"').isIn(['Activo', 'Inactivo'])
    ],

    async function(req, res) {
        try {
            let genero = await Genero.findById(req.params.generoId);

            if (!genero) {
                return res.status(404).json({ message: 'Genero no encontrado' });
            }

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            genero.nombre = req.body.nombre;
            genero.descripcion = req.body.descripcion;
            genero.estado = req.body.estado;
            genero.fechaActualizacion = new Date();
            genero = await genero.save();

            res.json(genero);
        } catch (error) {
            console.log(error)
            res.status(500).send("Ocurrio un error")
        }
    }
)

/*DELETE para eliminar un genero existente
router.delete('/:id', async function(req, res) {
    try {
        let genero = await Genero.findById(req.params.id);

        if (!genero) {
            return res.status(404).json({ message: 'Genero no encontrado' });
        }

        await genero.remove();

        res.json({ message: 'Genero eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})*/

module.exports = router;