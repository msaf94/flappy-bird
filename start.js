import { canvas } from "./canvas.js";
import { state } from "./state.js";

class Start {
  #text = "Press any key to start";
  #config = {
    fillStyle: "blue",
    font: "bold 20px Arial",
    textAlign: "center",
    textBaseline: "middle",
  };
  init() {
    canvas.addDrawFunction(this.#draw.bind(this));
    window.addEventListener("keypress", this.#handleStart.bind(this));
  }

  #handleStart() {
    if (state.isPreparation) {
      canvas.draw();
    }
  }

  #draw() {
    if (state.isPreparation) {
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

export const start = new Start();
