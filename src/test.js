import OutputView from "./views/OutputView.js";
import ChristmasController from "./controllers/ChristmasController.js";

async function runTest() {
  const controller = new ChristmasController();
  await controller.order();
}

runTest();
