const router = require('express').Router();
const roomController = require('../controllers/roomController')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', roomController.getAllRoom)
router.get('/:id', roomController.getRoom)
router.post('/',upload.single('image'), roomController.createRoom)
router.get('/search/:id_hotel', roomController.searchRoom)
router.get('/searchNumberRoom/:key', roomController.searchNumberRoom )

router.patch('/:id',upload.single('image'), roomController.updateRoom)
router.delete('/:id', roomController.deleteRoom)

module.exports = router