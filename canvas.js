import { state } from "./state.js";

class Canvas {
  #node;
  #drawFunctions = new Set();
  #width;
  #height;
  #requestAnimation;

  init() {
    this.#node = document.getElementsByTagName("canvas")[0];
    window.addEventListener("resize", this.#setSizes.bind(this));
    window.addEventListener("resize", this.#adjustSize.bind(this));

    state.onGameStateChange(() => {
      if (state.isInProgress || state.isPreparation) {
        this.draw();
      } else {
        cancelAnimationFrame(this.#requestAnimation);
      }
    });

    this.#setSizes();
    this.#adjustSize();
  }

  #setSizes() {
    const { innerWidth: width, innerHeight: height } = window;
    this.#width = width;
    this.#height = height;
  }

  #adjustSize() {
    this.#node.width = this.#width;
    this.#node.height = this.#height;
  }

  get sizes() {
    return {
      width: this.#width,
      height: this.#height,
    };
  }

  get context() {
    return this.#node.getContext("2d");
  }

  draw() {
    const context = this.context;
    const { width, height } = this.#node;

    context.clearRect(0, 0, width, height);

    this.#drawFunctions.forEach((fn) => fn());

    if (state.isInProgress) {
      this.#requestAnimation = requestAnimationFrame(this.draw.bind(this));
    }
  }

  addDrawFunction(fn) {
    this.#drawFunctions.add(fn);
  }

  removeDrawFunction(fn) {
    this.#drawFunctions.delete(fn);
  }
}

export const canvas = new Canvas();
