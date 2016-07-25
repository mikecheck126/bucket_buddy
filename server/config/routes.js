var items = require('../controllers/items.js');
var users = require('../controllers/users.js');

module.exports = function (app) {
  app.post('/login',
    function (req, res) {
      users.login(req, res);
    });
  app.post("/register",
    function (req, res){
      users.create(req, res);
    });
  app.get('/users/:id',
    function (req, res){
      users.all(req, res);
    });
  app.get('/user/:id',
    function (req, res){
      users.get_one(req, res);
    });
  app.get('/user/nav/:id',
    function (req, res){
      users.nav_get_one(req, res);
    });
  app.post("/add/item",
    function (req, res){
      items.create(req, res);
    });
  app.post("/update/item/:id",
    function (req, res){
      items.update(req, res);
    });
};