import DateManager from "../models/Date.js";

const InputView = {
  async readDate() {
    return await DateManager.getDate();
  },
};

export default InputView;
