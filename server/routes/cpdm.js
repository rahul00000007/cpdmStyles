const express = require('express');
const styleController = require('../controller/styleController');
const router = express.Router();
const controller = require('../controller/styleController')
router.get('/', controller.getAllStyleDetails);
router.post('/newStyle',styleController.postStyle);
router.get('/style/:styleName',styleController.getStyleByName);
router.delete('/deleteStyle/:styleName/:styleOrder',styleController.deleteStyle)
module.exports= router;