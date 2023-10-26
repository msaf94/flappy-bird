import { borders } from "./borders.js";
import { obstacles } from "./obstacles.js";

class CollisionDetector {
  doesObjectCollide(parameters) {
    const collidesWithObstacles =
      obstacles.isObjectCollidesWithObstacles(parameters);

    const collidesWithBorders = borders.isObjectCollidesWithBorders(parameters);

    return collidesWithObstacles || collidesWithBorders;
  }
}

export const collisionDetector = new CollisionDetector();
