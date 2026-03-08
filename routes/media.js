const {Router} = require('express');
const router = Router();
const Media = require('../models/Media');
const {validationResult} = require('express-validator');

/*GET para obtener todos los generos*/
router.get('/', async function(req, res) {
    try {
        const medias = await Media.find().populate([
            {
                path: 'genero',
                select: 'nombre descripcion estado fechaCreacion fechaActualizacion'
            },
            {
                path: 'director',
                select: 'nombre apellido fechaNacimiento nacionalidad estado fechaCreacion fechaActualizacion'
            },
            {
                path: 'productora',
                select: 'nombre descripcion estado fechaCreacion fechaActualizacion'
            },
            {
                path: 'tipo',
                select: 'nombre descripcion estado fechaCreacion fechaActualizacion'
            }
        ]);
        res.json(medias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/*POST para crear un nuevo media (pelicula o serie)*/
router.post('/', async function(req, res) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const existeMedia = await Media.findOne({ serial: req.body.serial });

        if (existeMedia) {
            return res.status(400).json({ message: 'Ya existe una media con ese serial' });
        }

        let media = new Media();

        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sipnosis = req.body.sipnosis;
        media.url = req.body.url;
        media.imagen = req.body.imagen;
        media.añoEstreno = req.body.añoEstreno;
        media.genero = req.body.genero;
        media.director = req.body.director;
        media.productora = req.body.productora;
        media.tipo = req.body.tipo;
        media.fechaCreacion = new Date();
        media.fechaActualizacion = new Date();

        media = await media.save();

        res.json(media);
    } catch (error) {
        console.log(error)
        res.status(500).send("Ocurrio un error")
    }
})

/*PUT para actualizar un media existente*/
router.put('/:mediaId', async function(req, res) {
    try {
        let media = await Media.findById(req.params.mediaId);

        if (!media) {
            return res.status(404).json({ message: 'Media no encontrado' });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sipnosis = req.body.sipnosis;
        media.url = req.body.url;
        media.imagen = req.body.imagen;
        media.añoEstreno = req.body.añoEstreno;
        media.genero = req.body.genero;
        media.director = req.body.director;
        media.productora = req.body.productora;
        media.tipo = req.body.tipo;
        media.fechaActualizacion = new Date();

        media = await media.save();
        res.json(media);
    } catch (error) {
        console.log(error)
        res.status(500).send("Ocurrio un error")
    }
})

module.exports = router;