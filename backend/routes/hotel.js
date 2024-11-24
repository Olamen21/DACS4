const router = require('express').Router();
const multer = require('multer');
const hotelController = require('../controllers/hotelController');

// Cấu hình multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.get('/', hotelController.getAllHotel);
router.get('/:id', hotelController.getHotel);
router.post('/', upload.single('image'), hotelController.createHotel); // Thêm middleware upload
router.patch('/:id',upload.single('image'), hotelController.updateHotel);
router.delete('/:id', hotelController.deleteHotel);

module.exports = router;
