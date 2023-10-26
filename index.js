import { borders } from "./borders.js";
import { canvas } from "./canvas.js";
import { obstacles } from "./obstacles.js";
import { player } from "./player.js";
import { restart } from "./restart.js";
import { start } from "./start.js";

canvas.init();
obstacles.init();
borders.init();
player.init();
restart.init();
start.init();

canvas.draw();
