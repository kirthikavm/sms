const express = require('express');
const route = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');

route.get('/',services.homeRoutes);

route.get('/search-question',services.search_question);

route.get('/add-question',services.add_question);

route.get('/update-question',services.update_question);

route.get('/searchTag',services.searchTag_question);

route.get('/testQuestion',services.testQuestion);

route.post('/api/question/',controller.create);
route.get('/api/question/',controller.find);
route.get('/api/question/searchrec/',controller.find);
route.get('/api/question/search/',controller.search);
route.get('/api/question/test/',controller.test);
route.put('/api/question/:id',controller.update);
route.delete('/api/question/:id',controller.delete);
module.exports = route;

