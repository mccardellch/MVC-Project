const controllers = require('./controllers');
const mid = require('./middleware');

// connect as many middleware calls in the order you wanted the middleware to run

// setup routes
const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getMyLocations', mid.requiresLogin, controllers.Location.getMyLocations);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/search', mid.requiresLogin, controllers.Location.searchPage);
  app.post('/search', mid.requiresLogin, controllers.Location.searchPage);
  
  app.get('/myLocations', mid.requiresLogin, controllers.Location.myLocations);
  app.get('/add', mid.requiresLogin, controllers.Location.addPage);
  app.post('/add', mid.requiresLogin, controllers.Location.add);
  
  app.get('/settings', mid.requiresLogin, controllers.Account.settings);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
