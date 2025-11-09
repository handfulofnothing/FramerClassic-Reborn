import _ from "../Underscore.js";
import Utils from "../Utils.js";
import { Defaults } from "../Defaults.js";
import { Layer } from "../Layer.js";

export class GridComponent extends Layer {
  static initClass() {
    this.define("rows", {
      get: () => this._rows,
      set: function (value) {
        this._rows = value;
        this._render();
      },
    });

    this.define("columns", {
      get: () => this._columns,
      set: function (value) {
        this._columns = value;
        this._render();
      },
    });

    this.define("spacing", {
      get: function () {
        return this._spacing || { horizontal: 0, vertical: 0 };
      },
      set: function (value) {
        if (_.isNumber(value)) {
          value = { horizontal: value, vertical: value };
        }
        this._spacing = value;
        this._render();
      },
    });

    this.define("renderCell", {
      get: function () {
        return this._renderCell || this._defaultRenderCell;
      },
      set: function (f) {
        if (f === this._renderCell) return;
        if (!_.isFunction(f))
          throw new Error(
            `GridComponent.renderCell should be a function, not ${typeof f}`
          );
        this._renderCell = f;
        this.render();
      },
    });

    this.define("cellWidth", {
      get: function () {
        return (
          (this.width - this.spacing.horizontal * (this.columns - 1)) /
          this.columns
        );
      },
    });

    this.define("cellHeight", {
      get: function () {
        return (
          (this.height - this.spacing.vertical * (this.rows - 1)) / this.rows
        );
      },
    });

    this.define("cells", {
      get: function () {
        return _.values(this._cells);
      },
    });
  }

  constructor(options = {}) {
    super(Defaults.getDefaults("GridComponent", options));
  }

  cellX(column) {
    return column * (this.cellWidth + this.spacing.horizontal);
  }

  cellY(row) {
    return row * (this.cellHeight + this.spacing.vertical);
  }

  cellFrame(column, row) {
    return {
      x: this.cellX(column),
      y: this.cellY(row),
      width: this.cellWidth,
      height: this.cellHeight,
    };
  }

  cell(column, row) {
    return this._cells[`${column}:${row}`];
  }

  render() {
    return this._render();
  }

  _render() {
    this._reset();

    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        const frame = this.cellFrame(column, row);
        const cell = new Layer({
          parent: this,
          frame,
          name: `Cell ${column}:${row}`,
        });

        this.renderCell(cell, row, column);
        this._cells[`${column}:${row}`] = cell;
      }
    }

    return this._cells;
  }

  _defaultRenderCell(cell, row, column) {
    cell.backgroundColor = "#28affa";
    cell.hueRotate =
      column * 20 + (row % this.columns) * (20 / (this.columns + 1));
    Utils.labelLayer(cell, `${row}:${column}`);
    cell.style.fontSize = "30px";
    return cell;
  }

  _reset() {
    _.invokeMap(this.cells, "destroy");
    this._cells = {};
  }
}

GridComponent.initClass();
