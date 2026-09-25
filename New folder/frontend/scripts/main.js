import { AppController } from "./controllers/app.controller.js";
import { AppModel } from "./models/app.model.js";
import { AppView } from "./views/app.view.js";

const root = document.querySelector("#app");
const controller = new AppController(new AppModel(), new AppView(root));

controller.start();
