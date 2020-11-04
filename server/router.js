const controllers = require('./controllers');
const mid = require('./middleware');

// connect as many middleware calls in the order you wanted the middleware to run

// setup routes
const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getLocation', mid.requiresLogin, controllers.Location.getLocation);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/search', mid.requiresLogin, controllers.Location.searchPage);
//  app.post('/search', mid.requiresLogin, controllers.Location.searchPage);
  
  app.get('/add', mid.requiresLogin, controllers.Location.addPage);
  app.post('/add', mid.requiresLogin, controllers.Location.add);
  
  app.get('/settings', mid.requiresLogin, controllers.Account.settings);

//  app.get('/maker', mid.requiresLogin, controllers.Domo.makerPage);
//  app.post('/maker', mid.requiresLogin, controllers.Domo.make);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
