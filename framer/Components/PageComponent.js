import { Events } from "../Events.js";
import { ScrollComponent } from "./ScrollComponent.js";

`\
PageComponent

originX <number>
originY <number>

velocityThreshold <number>
animationOptions <animationOptions={}>
currentPage <Layer>
closestPage(<originX:n, originY:n>) <Layer>

nextPage(direction="", currentPage)
snapToNextPage(direction="", animate, animationOptions={})
\
`;

export class PageComponent extends ScrollComponent {
  static initClass() {
    this.define("originX", this.simpleProperty("originX", 0.5));
    this.define("originY", this.simpleProperty("originY", 0.5));
    this.define(
      "velocityThreshold",
      this.simpleProperty("velocityThreshold", 0.1)
    );

    this.define("closestPage", {
      get() {
        return this.closestContentLayerForScrollPoint(
          this._originScrollPoint(),
          this.originX,
          this.originY
        );
      },
    });
    this.define("currentPage", {
      get() {
        return _.last(this._previousPages);
      },
    });
    this.define("previousPage", {
      get() {
        return this._previousPages[this._previousPages.length - 2];
      },
    });
  }

  constructor(options) {
    this._scrollStart = this._scrollStart.bind(this);
    this._scrollMove = this._scrollMove.bind(this);
    this._scrollEnd = this._scrollEnd.bind(this);
    this._resetHistory = this._resetHistory.bind(this);
    super(
      _.defaults(options, {
        animationOptions: {
          curve: "spring(500, 50, 0)",
        },
      })
    );

    this.content.draggable.momentum = false;
    this.content.draggable.bounce = false;

    this.content.on(Events.DragSessionStart, this._scrollStart);
    this.content.on(Events.DragSessionEnd, this._scrollEnd);

    this.content.on("change:frame", _.debounce(this._scrollMove, 16));
    this.content.on("change:children", this._resetHistory);

    this._resetHistory();
  }

  nextPage(direction, currentPage = null, withoutCurrentPage) {
    let layers;
    if (direction == null) {
      direction = "right";
    }
    if (withoutCurrentPage == null) {
      withoutCurrentPage = true;
    }
    if (currentPage == null) {
      ({ currentPage } = this);
    }

    // Figure out the point from where to look for next layers in a direction
    let point = { x: 0, y: 0 };
    if (currentPage) {
      point = Utils.framePointForOrigin(
        currentPage,
        this.originX,
        this.originY
      );
    }
    if (!withoutCurrentPage) {
      point = {
        x: this.scrollX + this.originX * this.width,
        y: this.scrollY + this.originY * this.height,
      };
    }

    if (["up", "top", "north"].includes(direction)) {
      layers = this.content.childrenAbove(point, this.originX, this.originY);
    }
    if (["down", "bottom", "south"].includes(direction)) {
      layers = this.content.childrenBelow(point, this.originX, this.originY);
    }
    if (["left", "west"].includes(direction)) {
      layers = this.content.childrenLeft(point, this.originX, this.originY);
    }
    if (["right", "east"].includes(direction)) {
      layers = this.content.childrenRight(point, this.originX, this.originY);
    }

    // See if there is one close by that we should go to
    if (withoutCurrentPage) {
      layers = _.without(layers, currentPage);
    }

    layers = Utils.frameSortByAbsoluteDistance(
      point,
      layers,
      this.originX,
      this.originY
    );

    return _.head(layers);
  }

  snapToPage(page, animate, animationOptions = null) {
    if (animate == null) {
      animate = true;
    }
    this.scrollToLayer(
      page,
      this.originX,
      this.originY,
      animate,
      animationOptions
    );

    if (this.currentPage !== page) {
      this._previousPages.push(page);
      this.emit("change:previousPage", this.previousPage);
      return this.emit("change:currentPage", this.currentPage);
    }
  }

  snapToNextPage(direction, animate, animationOptions = null) {
    if (direction == null) {
      direction = "right";
    }
    if (animate == null) {
      animate = true;
    }
    if (animationOptions == null) {
      ({ animationOptions } = this);
    }
    let nextPage = this.nextPage(direction);
    if (nextPage == null) {
      nextPage = this.closestPage;
    }
    return this.snapToPage(nextPage, animate, animationOptions);
  }

  snapToPreviousPage(animate, animationOptions = null) {
    if (animate == null) {
      animate = true;
    }
    if (!this.previousPage) {
      return;
    }
    if (animationOptions == null) {
      ({ animationOptions } = this);
    }
    this.snapToPage(this.previousPage, animate, animationOptions);

    // Modify the previous page stack so we don"t end up in a loop
    return (this._previousPages = this._previousPages.slice(
      0,
      +(this._previousPages.length - 3) + 1 || undefined
    ));
  }

  addPage(page, direction) {
    // We only allow adding pages to the right and bottom for now, because it shouldn"t
    // be hard to insert them in the right order, and if we need to manage that for you
    // we"d have to change the position of every content layer so the new page fits.
    // Ergo: too much magic.
    if (direction == null) {
      direction = "right";
    }
    const directions = ["down", "bottom", "south"] + ["right", "east"];

    if (Array.from(directions).includes(!direction)) {
      direction = "right";
      throw new Error(`${direction} should be in ${directions}`);
    }

    // If you add pages it makes sense they end up in the default place .
    const point = { x: 0, y: 0 };

    if (this.content.children.length) {
      if (["right", "east"].includes(direction)) {
        point.x = Utils.frameGetMaxX(this.content.contentFrame());
      }
      if (["down", "bottom", "south"].includes(direction)) {
        point.y = Utils.frameGetMaxY(this.content.contentFrame());
      }
    }

    page.point = point;

    if (page.parent !== this.content) {
      return (page.parent = this.content);
    } else {
      return this.updateContent();
    }
  }

  horizontalPageIndex(page) {
    return _.sortBy(this.content.children, (l) => l.x).indexOf(page);
  }

  verticalPageIndex(page) {
    return _.sortBy(this.content.children, (l) => l.y).indexOf(page);
  }

  _scrollStart() {
    return (this._currentPage = this.currentPage);
  }

  _scrollMove() {
    let needle;
    const { currentPage } = this;

    if (
      ((needle = currentPage),
      ![_.last(this._previousPages), undefined].includes(needle))
    ) {
      this._previousPages.push(currentPage);
      return this.emit("change:currentPage", {
        old: this.previousPage,
        new: currentPage,
      });
    }
  }

  _scrollEnd() {
    if (this.content.isAnimating) {
      return;
    }

    const { velocity } = this.content.draggable;

    // See if we meet the minimum velocity to scroll to the next page. If not we snap
    // to the layer closest to the scroll point.

    const xDisabled =
      !this.scrollHorizontal &&
      (this.direction === "right" || this.direction === "left");
    const yDisabled =
      !this.scrollVertical &&
      (this.direction === "down" || this.direction === "up");

    const xLock =
      this.content.draggable._directionLockEnabledX &&
      (this.direction === "right" || this.direction === "left");
    const yLock =
      this.content.draggable._directionLockEnabledY &&
      (this.direction === "down" || this.direction === "up");

    const maximumVelocity = Math.max(
      Math.abs(velocity.x),
      Math.abs(velocity.y)
    );

    if (
      maximumVelocity < this.velocityThreshold ||
      xLock ||
      yLock ||
      xDisabled ||
      yDisabled
    ) {
      return this.snapToPage(this.closestPage, true, this.animationOptions);
    }

    // Figure out which direction we are scrolling to and make a sorted list of
    // layers on that side, sorted by absolute distance so we can pick the first.
    let nextPage = this.nextPage(this.direction, this._currentPage, false);

    // If not, we scroll to the closest layer that we have available, often the one
    // that we are already at.
    if (nextPage == null) {
      nextPage = this.closestPage;
    }

    // print @content, maximumVelocity, @velocityThreshold
    // print @direction, nextPage

    return this.snapToPage(nextPage, true, this.animationOptions);
  }

  _originScrollPoint() {
    const { scrollPoint } = this;
    scrollPoint.x += this.width * this.originX;
    scrollPoint.y += this.height * this.originY;
    return scrollPoint;
  }

  _resetHistory() {
    this._currentPage = this.closestPage;
    return (this._previousPages = [this._currentPage]);
  }
}
PageComponent.initClass();
