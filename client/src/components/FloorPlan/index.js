import React from 'react';
import * as PIXI from 'pixi.js';
import Viewport from 'pixi-viewport';
import PropTypes from 'prop-types';
import SetType from 'es6-set-proptypes';

import { theme } from '../../global-styles/variables';

import * as s from './styles';

class FloorPlan extends React.Component {
  constructor(props) {
    super(props);

    this.pixi = React.createRef();
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      transparent: false,
      antialias: true, // special filtering to look smoother
      resolution: window.devicePixelRatio // for different screen resolutions/types
    });
    this.viewport = new Viewport({
      screenHeight: window.innerWidth,
      screenWidth: window.innerHeight,
      worldHeight: 1000,
      worldWidth: 1000,
      interaction: this.app.renderer.interaction,
      passiveWheel: false // presence of unnecessary passive event listeners causes a warning
    });
    this.app.renderer.backgroundColor = parseInt(theme.contentBackground.slice(1), 16);
    this.tables = []; // TODO: investigate cleaner solutions
  }

  state = {
    locked: false
  };

  componentDidMount() {
    // Lay the initial stage
    this.pixi.current.appendChild(this.app.view);
    this.setup();
    this.resize();
  }

  componentDidUpdate(prevProps) {
    if (this.props.tables.length !== prevProps.tables.length) {
      // If any tables were added or removed, clear the stage...
      this.clear();

      // ...and redraw them on the stage
      this.props.tables.forEach((table) => {
        this.tables.push(table);
        this.circleCreator(table);
      });
    }
  }

  toggleLock = () => {
    this.setState(
      (prev) => ({
        locked: !prev.locked
      }),
      () => {
        if (this.state.locked) {
          this.viewport.pausePlugin('drag');
        } else {
          this.viewport.resumePlugin('drag');
        }
      }
    );
  };

  zoomIn = () => {
    this.viewport.zoomPercent(0.15, true);
  };

  zoomOut = () => {
    this.viewport.zoomPercent(-0.15, true);
  };

  clear = () => {
    this.viewport.removeChildren();
    this.tables = [];
    this.border();
  };

  line = (x, y, width, height) => {
    const l = this.viewport.addChild(new PIXI.Sprite(PIXI.Texture.WHITE));
    l.tint = 0xff0000;
    l.position.set(x, y);
    l.width = width;
    l.height = height;
  };

  border = () => {
    this.line(0, 0, this.viewport.worldWidth, 10);
    this.line(0, this.viewport.worldHeight - 10, this.viewport.worldWidth, 10);
    this.line(0, 0, 10, this.viewport.worldHeight);
    this.line(this.viewport.worldWidth - 10, 0, 10, this.viewport.worldHeight);
  };

  circleCreator = (table) => {
    // Create a circle, make it interactive,
    // and add `cursor: pointer` css style
    const circle = new PIXI.Graphics();
    circle.interactive = true;
    circle.buttonMode = true;

    // Determine the color, size,
    // and location of the circle.
    // But x and y shouldn't be set here
    circle.beginFill(0xf7f9fa);
    circle.drawCircle(0, 0, 30);
    circle.endFill();

    // Position the circle according to
    // its location from the database
    // and add the circle to the stage
    circle.x = table.x;
    circle.y = table.y;
    this.viewport.addChild(circle);

    // Adds the table number text,
    // adds it as a child to the circle,
    // and adjusts its position to be centered
    const tableNumber = new PIXI.Text(table.number);
    circle.addChild(tableNumber);
    tableNumber.anchor.set(0.5);

    const toggleActive = () => {
      if (!this.props.selected.has(table.number)) {
        // If the table doesn't exist in the active Set,
        // add it to the Set and adjust its appearance
        this.props.toggleTable(table.number);
        circle.alpha = 0.2;
      } else {
        // If the table does exist in the active Set,
        // remove it from the Set and adjust its appearance
        this.props.toggleTable(table.number);
        circle.alpha = 1;
      }
    };

    const onDragStart = (event) => {
      if (this.props.editing) {
        // If editing mode is on:
        // Make it transparent on drag, then store a
        // reference to the data to track the movement
        // of this particular touch for multitouch
        circle.alpha = 0.5;
        circle.data = event.data;
        circle.dragging = true;
      } else {
        // If editing mode is off, a click should
        // toggle the table's active status
        toggleActive();
      }

      this.viewport.pausePlugin('drag');
    };

    const onDragEnd = () => {
      if (this.props.editing) {
        // If editing mode is on:
        // Update Redux Store's table location,
        // set dragging to false and clear the data
        this.props.moveTable(this.tables);
        circle.dragging = false;
        circle.data = null;

        if (this.props.selected.has(table.number)) {
          // If the table is selected, it should
          // adjust its appearance appropriately
          circle.alpha = 0.2;
        } else {
          // Otherwise it should return to normal
          // after completing the drag
          circle.alpha = 1;
        }
      }
      console.log(this.viewport);
      this.viewport.resumePlugin('drag');
    };

    const onDragMove = () => {
      if (this.props.editing) {
        if (circle.dragging) {
          // If you are allowed to edit and the
          // circle is moving then adjust the position
          const newPosition = circle.data.getLocalPosition(circle.parent);
          circle.x = newPosition.x;
          circle.y = newPosition.y;
        }
      }
    };

    const deleteCircle = () => {
      // This is called on 'mouseupoutside' so that,
      // if you are in editing mode, dragging the
      // circle out of bounds will destroy it
      if (this.props.editing) {
        circle.destroy();
        // TODO: Call action to delete from the database
      }
    };

    // Run the render loop
    circle
      .on('mousedown', onDragStart)
      .on('touchstart', onDragStart)
      .on('mouseup', onDragEnd)
      .on('mouseupoutside', deleteCircle)
      .on('touchend', onDragEnd)
      .on('touchendoutside', deleteCircle)
      .on('mousemove', onDragMove)
      .on('touchmove', onDragMove);
  };

  setup = () => {
    const animate = () => {
      this.app.render(this.app.stage);
      requestAnimationFrame(animate);
    };

    animate();

    this.app.stage.addChild(this.viewport);

    this.viewport
      .drag()
      .bounce({ time: 500 })
      .pinch()
      .wheel()
      .decelerate();

    this.border();

    // TODO: Fix all this shit more
    // TODO: and then comment thit shit!

    window.onresize = () => {
      this.resize();
    };
  };

  resize = () => {
    const { sidebarRef, topbarRef } = this.props;
    const w = window.innerWidth
      - (sidebarRef ? sidebarRef.current.clientWidth : theme.sideBarWidth);
    const h = window.innerHeight
      - (topbarRef ? topbarRef.current.clientHeight : theme.topBarHeight);
    this.app.renderer.resize(w, h);
    this.viewport.resize(w, h, 1000, 1000);
  };

  render() {
    // TODO: Stretch Goal: Use border-radius and arrows to fuck with shit
    return (
      <React.Fragment>
        <s.FloorPlan innerRef={this.pixi} />
        <div style={{ position: 'fixed', right: '100px' }}>
          {' '}
          {/* // ! make these not inline */}
          <label htmlFor="lock">
            <input type="checkbox" id="lock" onClick={this.toggleLock} value={this.state.locked} />
            <span>Lock</span>
          </label>
        </div>
        <div style={{ position: 'fixed', right: '40px' }}>
          {' '}
          {/* // ! make these not inline */}
          <button type="button" onClick={this.zoomIn}>
            +
          </button>
          <button type="button" onClick={this.zoomOut}>
            -
          </button>
        </div>
      </React.Fragment>
    );
  }
}

FloorPlan.propTypes = {
  editing: PropTypes.bool,
  selected: SetType,
  tables: PropTypes.arrayOf(PropTypes.object),
  moveTable: PropTypes.func,
  toggleTable: PropTypes.func,
  topbarRef: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  sidebarRef: PropTypes.any // eslint-disable-line react/forbid-prop-types
};

FloorPlan.defaultProps = {
  editing: false,
  selected: new Set(),
  tables: [],
  moveTable: () => {},
  toggleTable: () => {},
  topbarRef: false, // hack to let the ternary work
  sidebarRef: false // hack to let the ternary work
};

export default FloorPlan;
