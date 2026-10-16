/** Shared drag state so a pan that ends over an object never counts as a click on it. */
export const gesture = {
  until: 0,
  dragging: false,
  space: false,
  suppress(ms = 60) {
    this.until = performance.now() + ms;
  },
  suppressClick() {
    return performance.now() < this.until;
  },
};
