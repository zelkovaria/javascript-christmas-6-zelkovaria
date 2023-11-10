import OutputView from "./views/OutputView.js";
import ChristmasController from "./controllers/ChristmasController.js";

async function runTest() {
  await OutputView.readDate();

  const controller = new ChristmasController();
  await controller.orderStart();
}

runTest();
