import { canvas } from "./canvas.js";

class Borders {
  #height;
  init() {
    const { sizes, addDrawFunction } = canvas;
    this.#height = sizes.height / 100;

    addDrawFunction.call(canvas, this.#draw.bind(this));
  }

  #draw() {
    const { sizes, context } = canvas;

    context.beginPath();
    context.rect(0, 0, sizes.width, this.#height);
    context.rect(0, sizes.height - this.#height, sizes.width, this.#height);
    context.fillStyle = "red";
    context.fill();
    context.closePath();
  }

  isObjectCollidesWithBorders({ y, height }) {
    return y < this.#height || y + height > canvas.sizes.height - this.#height;
  }
}

export const borders = new Borders();
