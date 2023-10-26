import { canvas } from "./canvas.js";
import { getRandom } from "./libs.js";
import { Obstacle } from "./obstacle.js";
import { state } from "./state.js";

class Obstacles {
  #list;
  #maxObstaclesCount = 30;

  init() {
    this.#fill();

    canvas.addDrawFunction(this.#draw.bind(this));

    state.onGameStateChange(() => {
      if (state.isPreparation) {
        this.#fill();
      }
    });
  }

  #fill() {
    this.#list = new Set();
    for (let index = 0; index < this.#maxObstaclesCount; index++) {
      this.#appendNewObstacle(Array.from(this.#list.keys())[index - 1]);
    }
  }

  #draw() {
    this.#list.forEach((obstacle) => {
      obstacle.draw();
    });
  }

  #appendNewObstacle(prevObstacle) {
    const gap = getRandom(100, 170);

    const position = (() => {
      if (!prevObstacle) return canvas.sizes.width / 5;

      return prevObstacle.getRightEdgePosition() + gap;
    })();

    const obstacle = new Obstacle({
      onOutOfBounds: () => {
        this.#list.delete(obstacle);
        this.#appendNewObstacle(
          Array.from(this.#list.keys())[this.#list.size - 1]
        );
      },
      position,
    });
    this.#list.add(obstacle);
  }

  isObjectCollidesWithObstacles({ x, y, width, height }) {
    for (const obstacle of this.#list.values()) {
      if (obstacle.isObjectCollidesWithObstacle({ x, y, width, height })) {
        return true;
      }
    }

    return false;
  }
}

export const obstacles = new Obstacles();
