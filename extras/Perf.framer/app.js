class FPS {
  constructor() {
    this.tick = this.tick.bind(this);
    this.start();
  }

  start() {
    this._start = Utils.getTime();
    this._time = this._start;
    this._frames = [];
    Framer.Loop.on("update", this.tick);
  }

  stop() {
    Framer.Loop.off("update", this.tick);
  }

  tick() {
    const now = Utils.getTime();
    this._frames.push(now - this._time);
    this._time = now;
  }

  totalTime() {
    return this._time - this._start;
  }

  droppedFrames() {
    return _.filter(this._frames, (t) => t > (1 / 60) * 1.1);
  }

  droppedFrameRate() {
    return Utils.round(this.droppedFrames().length / this.totalTime(), 1);
  }

  averageFPS() {
    return Utils.round(this._frames.length / Utils.sum(this._frames), 1);
  }
}

function testLayers(n, options, callback) {
  options = options || {};
  options = _.defaults(options, {
    width: 500,
    height: 500,
    time: 1,
  });

  Framer.CurrentContext.reset();

  let counter = 0;
  const fps = new FPS();

  const endGame = () => {
    counter++;
    if (counter === n) {
      fps.stop();
      if (typeof callback === "function") callback(fps);
    }
  };

  const root = new Layer({
    width: options.width,
    height: options.height,
    backgroundColor: "rgba(0, 0, 0, .1)",
    clip: true,
  });

  root.center();

  const layers = __range__(0, n, true).map((i) => {
    return new Layer({
      width: 100,
      height: 100,
      x: Math.random() * options.width - 50,
      y: Math.random() * options.height - 50,
      backgroundColor: Utils.randomColor(0.3),
      superLayer: root,
    });
  });

  layers.forEach((layer) => {
    const animation = layer.animate({
      properties: {
        x: Math.random() * options.width,
        y: Math.random() * options.height,
      },
      time: options.time,
    });
    animation.on(Events.AnimationEnd, endGame);
  });
}

const start = 40;
let current = start;
const minFPS = 40;
const stats = [];

function next() {
  testLayers(current, {}, (fps) => {
    console.log(`${current} layers at ${fps.averageFPS()} fps`);
    stats.push([current, fps.averageFPS()]);
    current += start;

    if (fps.averageFPS() > minFPS) {
      next();
    } else {
      Framer.CurrentContext.reset();
      drawChart(stats);
    }
  });
}

next();

function drawChart(stats) {
  const canvasLayer = new Layer({
    width: 500,
    height: 300,
    backgroundColor: "white",
  });

  canvasLayer.center();
  canvasLayer.html = `<canvas
    width='${canvasLayer.width - 20}px'
    height='${canvasLayer.height - 20}px'>
  </canvas>`;

  const canvasElement = canvasLayer.querySelectorAll("canvas")[0];

  const data = {
    labels: stats.map((i) => i[0].toString()),
    datasets: [
      {
        fillColor: "rgba(220, 220, 220, 0.2)",
        strokeColor: "rgba(220, 220, 220, 1)",
        pointColor: "rgba(220, 220, 220, 1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220, 220, 220, 1)",
        data: stats.map((i) => i[1]),
      },
    ],
  };

  const options = {};
  const lineChart = new Chart(canvasElement.getContext("2d")).Line(
    data,
    options
  );

  console.log(Framer.Version);
}

function __range__(left, right, inclusive) {
  const range = [];
  const ascending = left < right;
  const end = !inclusive ? right : ascending ? right + 1 : right - 1;
  for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i);
  }
  return range;
}
