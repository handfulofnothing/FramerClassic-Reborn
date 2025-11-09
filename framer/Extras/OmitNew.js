export const enable = (module = window) => {
  const ClassWrapper =
    (Klass) =>
    (...args) => {
      const instance = new Klass(...args);
      return Object.setPrototypeOf(() => {}, instance);
    };

  module.Frame = ClassWrapper(Framer.Frame);
  module.Layer = ClassWrapper(Framer.Layer);
  module.BackgroundLayer = ClassWrapper(Framer.BackgroundLayer);
  module.VideoLayer = ClassWrapper(Framer.VideoLayer);
  module.Animation = ClassWrapper(Framer.Animation);

  return module;
};

export default enable;
