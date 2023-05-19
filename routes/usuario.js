//importaciones
const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarioById , getUsuarios, postUsuario, putUsuario, deleteUsuario, registroUsuario } = require('../controllers/usuario');
const { emailExiste, esRoleValido, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', getUsuarios);
router.get('/mostrar/:id', getUsuarioById)

router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio para el post').not().isEmpty(),
    check('password', 'La password es obligatorio para el post').not().isEmpty(),
    check('password', 'La passwarod debe ser mayor a 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('rol', 'El rol es obligatorio para el post').not().isEmpty(),
    check('rol').custom( esRoleValido ),
    validarCampos
] , postUsuario);

router.post('/register', [
    check('nombre', 'El nombre es obligatorio para el registro').not().isEmpty(),
    check('password', 'La password es obligatorio para el registro').not().isEmpty(),
    check('password', 'La passwarod debe ser mayor a 6 letras').isLength({ min: 6 }),
    validarCampos
] , registroUsuario);


router.put('/editar/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'La password es obligatorio para el post').not().isEmpty(),
    check('password', 'La passwarod debe ser mayor a 6 letras').isLength({ min: 6 }),
    validarCampos
], putUsuario);


router.delete('/eliminar/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
] ,deleteUsuario);



module.exports = router;