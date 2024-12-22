const router = require('express').Router();
const bookingController = require('../controllers/bookingController');

router.get('/', bookingController.getAllBooking)
router.get('/:id', bookingController.getBooking)
router.get('/search/:key', bookingController.searchBooking);

router.post('/', bookingController.createBooking)

router.delete('/:id', bookingController.deleteBooking)


module.exports = router