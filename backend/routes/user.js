const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUser)
router.get('/:id', userController.getUser)
router.get('/search/:key', userController.searchUser)
router.post('/', userController.createUser)

router.patch('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router