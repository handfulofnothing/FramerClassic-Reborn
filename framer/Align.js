const pixelRound = parseInt;

const center = (layer, property, offset = 0) => {
  let parent = layer.parent ?? Screen;
  const borderWidth = parent.borderWidth ?? 0;

  const x = pixelRound(
    parent.width / 2 - layer.width / 2 - borderWidth + offset
  );
  const y = pixelRound(
    parent.height / 2 - layer.height / 2 - borderWidth + offset
  );

  if (property === "x") return x;
  if (property === "y") return y;
  if (property === "point") return { x, y };
  return 0;
};

const left = (layer, property, offset = 0) => {
  if (property !== "x") throw new Error("Align.left only works for x");
  return pixelRound(offset);
};

const right = (layer, property, offset = 0) => {
  if (property !== "x") throw new Error("Align.right only works for x");
  const parent = layer.parent ?? Screen;
  const borderWidth = parent.borderWidth ?? 0;
  return pixelRound(parent.width - 2 * borderWidth - layer.width + offset);
};

const top = (layer, property, offset = 0) => {
  if (property !== "y") throw new Error("Align.top only works for y");
  return pixelRound(offset);
};

const bottom = (layer, property, offset = 0) => {
  if (property !== "y") throw new Error("Align.bottom only works for y");
  const parent = layer.parent ?? Screen;
  const borderWidth = parent.borderWidth ?? 0;
  return pixelRound(parent.height - 2 * borderWidth - layer.height + offset);
};

// Helper to wrap function or value for flexible usage
const wrapper = (f, name) => {
  const align = (a, b) => {
    if (a == null || typeof a === "number") {
      return (layer, property) => f(layer, property, a ?? 0);
    }
    return f(a, b, 0);
  };
  align.toInspect = () => `Align.${name}`;
  return align;
};

export const Align = {
  center: wrapper(center, "center"),
  left: wrapper(left, "left"),
  right: wrapper(right, "right"),
  top: wrapper(top, "top"),
  bottom: wrapper(bottom, "bottom"),
};
