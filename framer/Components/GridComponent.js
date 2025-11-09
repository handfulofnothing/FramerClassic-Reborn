/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS202: Simplify dynamic range loops
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const Utils = require("../Utils");

const {Defaults} = require("../Defaults");
const {Layer} = require("../Layer");

const Cls = (exports.GridComponent = class GridComponent extends Layer {
	static initClass() {
	
		this.define("rows", {
			get() { return this._rows; },
			set(value) {
				this._rows = value;
				return this._render();
			}
		}
		);
	
		this.define("columns", {
			get() { return this._columns; },
			set(value) {
				this._columns = value;
				return this._render();
			}
		}
		);
	
		this.define("spacing", {
			get() { return this._spacing || {horizontal: 0, vertical: 0}; },
			set(value) {
				if (_.isNumber(value)) {
					value = {horizontal: value, vertical: value};
				}
				this._spacing = value;
				return this._render();
			}
		}
		);
	
		this.define("renderCell", {
			get() { return this._renderCell || this._defaultRenderCell; },
			set(f) {
				if (f === this._renderCell) { return; }
	
				if (!_.isFunction(f)) {
					throw Error(`GridComponent.renderCell should be a function, not ${typeof(f)}`);
				}
	
				this._renderCell = f;
				return this.render();
			}
		}
		);
	
		this.define("cellWidth",
			{get() { return (this.width - (this.spacing.horizontal * (this.columns - 1))) / this.columns; }});
	
		this.define("cellHeight",
			{get() { return (this.height - (this.spacing.vertical * (this.rows - 1))) / this.rows; }});
	
		this.define("cells",
			{get() { return _.values(this._cells); }});
	}

	constructor(options) {
		if (options == null) { options = {}; }
		super(Defaults.getDefaults("GridComponent", options));
	}

	cellX(row) {
		return row * (this.cellWidth + this.spacing.horizontal);
	}

	cellY(column) {
		return column * (this.cellHeight + this.spacing.vertical);
	}

	cellFrame(column, row) {
		let frame;
		return frame = {
			x: this.cellX(column),
			y: this.cellY(row),
			width: this.cellWidth,
			height: this.cellHeight
		};
	}

	cell(column, row) {
		return this._cells[`${column}:${row}`];
	}

	render() {
		return this._render();
	}

	// columns and rows

	_render() {

		this._reset();

		return __range__(this.rows-1, 0, true).map((row) =>
			(() => {
				const result = [];
				for (let start = this.columns-1, column = start, asc = start <= 0; asc ? column <= 0 : column >= 0; asc ? column++ : column--) {

					var frame = this.cellFrame(column, row);
					// frame.x = Math.floor(frame.x)
					// frame.y = Math.floor(frame.y)
					// frame.width = Math.ceil(frame.width)
					// frame.height = Math.ceil(frame.height)

					var cell = new Layer({
						parent: this,
						frame,
						name: `Cell ${column}:${row}`
					});

					this.renderCell(cell, row, column);

					result.push(this._cells[`${column}:${row}`] = cell);
				}
				return result;
			})());
	}

	_defaultRenderCell(cell, column, row) {
		const fraction = ((column / this.columns) + ((row / this.rows) / 2));
		cell.backgroundColor = "#28affa";
		cell.hueRotate = (column * 20) + ((row % this.columns) * (20 / (this.columns + 1)));
		Utils.labelLayer(cell, `${row}:${column}`);
		return cell.style.fontSize = "30px";
	}

	_reset() {
		_.invokeMap(this.cells, "destroy");
		return this._cells = {};
	}
});
Cls.initClass();

	// copy: ->
	// 	result = super
	// 	result.render()

function __range__(left, right, inclusive) {
  let range = [];
  let ascending = left < right;
  let end = !inclusive ? right : ascending ? right + 1 : right - 1;
  for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i);
  }
  return range;
}