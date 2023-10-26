import { canvas } from "./canvas.js";
import { getRandom, getRandomBoolean } from "./libs.js";

export class Obstacle {
  #orientation;
  #width;
  #height;
  #position;
  #onOutOfBounds;

  constructor({ onOutOfBounds, position }) {
    this.#initOrientation();
    this.#initWidth();
    this.#initHeight();
    this.#initOutOfBounds(onOutOfBounds);
    this.#initPosition(position);
  }

  #initOutOfBounds(onOutOfBounds) {
    this.#onOutOfBounds = onOutOfBounds;
  }

  #initPosition(position) {
    this.#position = position;
  }

  #updatePosition() {
    this.#position--;
    if (this.#position + this.#width <= 0) {
      this.#onOutOfBounds();
    }
  }

  #initOrientation() {
    this.#orientation = getRandomBoolean() ? "top" : "bottom";
  }

  #initWidth() {
    const minWidth = canvas.sizes.width / 100;
    const maxWidth = canvas.sizes.width / 40;

    this.#width = getRandom(minWidth, maxWidth);
  }

  #initHeight() {
    const minHeight = canvas.sizes.height / 20;
    const maxHeight = canvas.sizes.height / 3.5;

    this.#height = getRandom(minHeight, maxHeight);
  }

  getRightEdgePosition() {
    return this.#position + this.#width;
  }

  draw() {
    const { context, sizes } = canvas;
    if (context) {
      this.#updatePosition();
      context.beginPath();

      const isTop = this.#orientation === "top";
      const y = isTop ? 0 : sizes.height - this.#height;

      const gradient = context.createLinearGradient(
        this.#position + 10,
        0,
        this.#position + this.#width - 10,
        0
      );

      gradient.addColorStop(1, "#0e4d1d");
      gradient.addColorStop(0, "#1aab3e");

      context.fillStyle = gradient;
      context.fillRect(this.#position, y, this.#width, this.#height);
      context.closePath();
    }
  }

  isObjectCollidesWithObstacle({ x, y, width, height }) {
    const collidesOnX =
      x + width >= this.#position && x <= this.#position + this.#width;

    const collidesOnY = (() => {
      if (this.#orientation === "top") {
        return y < this.#height;
      }
      return y + height > canvas.sizes.height - this.#height;
    })();

    return collidesOnX && collidesOnY;
  }
}
