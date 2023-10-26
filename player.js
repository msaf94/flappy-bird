import { canvas } from "./canvas.js";
import { collisionDetector } from "./collisionDetector.js";
import { state } from "./state.js";

class Player {
  #size = 20;
  #position;
  #request;

  init() {
    canvas.addDrawFunction(this.#draw.bind(this));
    canvas.addDrawFunction(this.#drawImage.bind(this));
    this.#resetPosition();
    this.#initControls();

    state.onGameStateChange(() => {
      if (state.isPreparation) {
        this.#resetPosition();
      }
    });
  }

  #resetPosition() {
    this.#position = canvas.sizes.height / 2;
  }

  #draw() {
    const { context } = canvas;

    if (context) {
      const collides = collisionDetector.doesObjectCollide({
        x: this.#size * 2,
        y: this.#position - this.#size,
        width: this.#size,
        height: this.#size * 2,
      });

      if (collides && state.isInProgress) {
        state.setEnded();
      }
    }
  }

  #initControls() {
    window.addEventListener("keypress", () => {
      if (state.isPreparation) {
        this.#resetPosition();
        state.setInProgress();
      }
      if (state.isInProgress) {
        this.#updateGravity();
      }
    });
  }

  #updateGravity() {
    const heightGain = 60;
    const possibleHighPoint = this.#position - heightGain;
    let direction = "up";

    cancelAnimationFrame(this.#request);

    function updateFunction() {
      if (this.#position <= possibleHighPoint) {
        direction = "down";
      }

      if (direction === "up") {
        if (state.isInProgress) {
          this.#drawImage("up");
        }

        this.#position -=
          (this.#position -
            possibleHighPoint -
            possibleHighPoint / this.#position) /
            10 +
          1;
      } else {
        if (state.isInProgress) {
          this.#drawImage("down");
        }

        this.#position += Math.sqrt(this.#position / 40);
      }
      this.#request = requestAnimationFrame(updateFunction.bind(this));
    }
    updateFunction.call(this);
  }

  #drawImage(state) {
    const image = document.getElementById("bird");
    const { context } = canvas;

    if (image) {
      const isUp = state === "up";
      context.beginPath();

      context.drawImage(
        image,
        isUp ? 40 : 0,
        0,
        40,
        40,
        this.#size,
        this.#position - this.#size,
        40,
        40
      );

      context.closePath();
    }
  }
}

export const player = new Player();
