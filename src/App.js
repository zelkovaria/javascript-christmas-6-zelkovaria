import ChristmasController from "../src/controllers/ChristmasController.js";

class App {
  async run() {
    const controller = new ChristmasController();

    await controller.order();
  }
}

export default App;
