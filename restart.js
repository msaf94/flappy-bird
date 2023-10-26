import { canvas } from "./canvas.js";
import { state } from "./state.js";

class Restart {
  #text = "Game Over. Press any key to restart";
  #config = {
    fillStyle: "blue",
    font: "bold 20px Arial",
    textAlign: "center",
    textBaseline: "middle",
  };
  init() {
    canvas.addDrawFunction(this.#draw.bind(this));
    window.addEventListener("keypress", this.#handleRestart.bind(this));
  }

  #handleRestart() {
    if (state.isEnded) {
      state.setPreparation();
      canvas.draw();
    }
  }

  #draw() {
    if (state.isEnded) {
      const { context, sizes } = canvas;
      const { fillStyle, font, textAlign, textBaseline } = this.#config;

      context.beginPath();
      context.fillStyle = fillStyle;
      context.font = font;
      context.textAlign = textAlign;
      context.textBaseline = textBaseline;
      context.fillText(this.#text, sizes.width / 2, sizes.height / 2);
      context.closePath();
    }
  }
}

export const restart = new Restart();
