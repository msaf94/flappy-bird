class State {
  #gameState = "preparation";
  #callbackList = new Set();

  setInProgress() {
    this.#gameState = "in-progress";
    this.#publish();
  }

  setEnded() {
    this.#gameState = "ended";
    this.#publish();
  }

  setPreparation() {
    this.#gameState = "preparation";
    this.#publish();
  }

  get gameState() {
    return this.#gameState;
  }

  get isInProgress() {
    return this.#gameState === "in-progress";
  }

  get isEnded() {
    return this.#gameState === "ended";
  }

  get isPreparation() {
    return this.#gameState === "preparation";
  }

  onGameStateChange(cb) {
    this.#callbackList.add(cb);
  }

  #publish() {
    this.#callbackList.forEach((cb) => cb(this.gameState));
  }
}

export const state = new State();
