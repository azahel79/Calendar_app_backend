const App = require("./app/App");


const CALENDAR_APP = new App();

CALENDAR_APP.controllers();
CALENDAR_APP.middlewares();
CALENDAR_APP.connectDB();
CALENDAR_APP.rutas();
CALENDAR_APP.listen()

















// CALENDAR_APP.controllers();
// CALENDAR_APP.middlewares();
// CALENDAR_APP.connectDB();
// CALENDAR_APP.rutas();
// CALENDAR_APP.listen();


