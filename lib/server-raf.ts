const scope = globalThis as typeof globalThis & {
  requestAnimationFrame?: (callback: FrameRequestCallback) => number;
  cancelAnimationFrame?: (handle: number) => void;
};

if (typeof scope.requestAnimationFrame !== "function") {
  scope.requestAnimationFrame = () => 0;
  scope.cancelAnimationFrame = () => {};
}
