import React from 'react';
import * as PIXI from 'pixi.js';
import Viewport from 'pixi-viewport';
import PropTypes from 'prop-types';
import SetType from 'es6-set-proptypes';

import * as s from './styles';

class FloorPlan extends React.Component {
  constructor(props) {
    super(props);

    this.pixi = React.createRef();
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      transparent: false,
      antialias: true,
      resolution: window.devicePixelRatio
    });
    this.viewport = new Viewport({
      screenHeight: window.innerWidth,
      screenWidth: window.innerHeight,
      worldHeight: 1000,
      worldWidth: 1000,
      interaction: this.app.renderer.interaction,
    });
    this.app.renderer.backgroundColor = 0x8698aa;
    this.tables = []; // TODO: investigate cleaner solutions
  }

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
      this.props.tables.forEach(table => {
        this.tables.push(table);
        this.circleCreator(table);
      });
    }
  }

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

  circleCreator = table => {
    // Create a circle, make it interactive,
    // and add `cursor: pointer` css style
    const circle = new PIXI.Graphics();
    circle.interactive = true;
    circle.buttonMode = true;

    // Determine the color, size,
    // and location of the circle.
    // But x and y shouldn't be set here
    circle.beginFill(0xffffff);
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

    const onDragStart = event => {
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

    this.viewport.on('wheel', () => {
      console.log(this.pixi.current);
    });

    this.border();

    // TODO: Fix all this shit more
    // TODO: and then comment thit shit!

    window.onresize = () => {
      this.resize();
    };
  };

  resize = () => {
    // TODO: subtracting 300px to allow space for the sidebar, fix later
    const w = window.innerWidth - 300;
    // TODO: subtracting 160 px to allow for top bar and padding, fix later
    const h = window.innerHeight - 160;
    this.app.renderer.resize(w, h);
    this.viewport.resize(w, h, 1000, 1000);
  };

  render() {
    // TODO: Stretch Goal: Use border-radius and arrows to fuck with shit
    return <s.FloorPlan innerRef={this.pixi} />;
  }
}

FloorPlan.propTypes = {
  editing: PropTypes.bool,
  selected: SetType,
  tables: PropTypes.arrayOf(PropTypes.object),
  moveTable: PropTypes.func,
  toggleTable: PropTypes.func
};

FloorPlan.defaultProps = {
  editing: false,
  selected: new Set(),
  tables: [],
  moveTable: () => {},
  toggleTable: () => {}
};

export default FloorPlan;
