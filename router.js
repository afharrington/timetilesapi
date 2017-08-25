const tiles = require("./controllers/tilesController");
const auth = require("./controllers/authController");
const cors = require("cors");

const passportService = require("./services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate('jwt', { session: false});
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {

  // Handle CORS
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });
  app.use(cors());

  // AUTHENTICATION ROUTES
  app.post('/login', requireLogin, auth.login); // authenticate, then send token
  app.post('/signup', auth.signup);

  // MAIN APP ROUTES
  app.get('/', requireAuth, tiles.list_all_tiles);
  app.post('/', requireAuth, tiles.create_tile);

  app.get('/tile/:tileId', requireAuth, tiles.list_all_entries);
  app.post('/tile/:tileId', requireAuth, tiles.create_entry);
  app.delete('/tile/:tileId', requireAuth, tiles.delete_tile);
  app.put('/tile/:tileId', requireAuth, tiles.update_color);
  app.put('/tile/:tileId/settings', requireAuth, tiles.update_tile);

  app.delete('/tile/:tileId/entry/:entryId', requireAuth, tiles.delete_entry);
  app.put('/tile/:tileId/entry/:entryId', requireAuth, tiles.update_entry);
};
