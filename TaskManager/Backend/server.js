const expres = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
//import taskroute
const taskroute = require("./router/taskRoute");
app.use(json());

//call taskRoute
app.use("/", taskroute);

app.listen(5050, () => {
  console.log("server listening");
});
