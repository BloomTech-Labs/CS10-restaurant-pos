import React from 'react';
import * as PIXI from 'pixi.js';
import Viewport from 'pixi-viewport';
import PropTypes from 'prop-types';
import SetType from 'es6-set-proptypes';

import { theme } from '../../global-styles/variables';
import { MainContainer } from '../../global-styles/styledComponents';
import * as tableImage from '../../assets/Path_33.png';

class FloorPlan extends React.PureComponent {
  constructor(props) {
    super(props);
    // use refs of the sidebar and topbar
    // to calculate the size the viewer needs to be

    const { parent } = this.props;
    const width = parent.current.clientWidth;
    const height = parent.current.clientHeight;

    this.pixi = React.createRef();

    this.app = new PIXI.Application({
      width,
      height,
      transparent: false,
      antialias: true, // special filtering to look smoother
      resolution: window.devicePixelRatio // for different screen resolutions/types
    });
    this.viewport = new Viewport({
      screenWidth: width,
      screenHeight: height,
      worldHeight: 1000,
      worldWidth: 1000,
      interaction: this.app.renderer.interaction,
      passiveWheel: false // presence of unnecessary passive event listeners causes a warning
    });
    this.app.renderer.backgroundColor = parseInt(theme.contentBackground.slice(1), 16);
    this.tables = []; // TODO: investigate cleaner solutions
    this.texture = null;
  }

  state = {
    locked: false
  };

  componentDidMount() {
    // load table sprite and set it as this.texture
    // unless it was previously loaded
    // and start the initialization of the pixi app
    if (!PIXI.loader.resources[tableImage]) {
      PIXI.loader.add(tableImage).load(() => {
        this.texture = PIXI.Texture.fromImage(tableImage);
        this.initialize();
      });
    } else {
      this.texture = PIXI.Texture.fromImage(tableImage);
      this.initialize();
    }
  }

  componentDidUpdate() {
    // upon update clear the tables
    this.clear();

    // ...and redraw them on the stage
    // to keep sync with the database
    this.drawTables();
  }

  componentWillUnmount() {
    // clean up the remaining data when moving away from the page
    this.clear();
    this.pixi.current.removeChild(this.app.view);
    this.app.stage.destroy(true);
    this.stage = null;
    this.viewport.destroy();
    this.app.renderer.destroy(true);
  }

  initialize = () => {
    // add the app view to the page as a child of the rendered div
    this.pixi.current.appendChild(this.app.view);
    this.setup();

    this.drawTables();

    this.animate();
  }

  drawTables = () => {
    this.props.tables.forEach(table => {
      this.tables.push(table);
      this.circleCreator(table);
    });
  }

  toggleLock = () => {
    // pause the dragging functionality when the lock box is checked
    this.setState(
      prev => ({
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
    l.tint = 0xdedede;
    l.position.set(x, y);
    l.width = width;
    l.height = height;
  };

  border = () => {
    const borderWidth = 1;
    this.line(0, 0, this.viewport.worldWidth, borderWidth);
    this.line(0, this.viewport.worldHeight - borderWidth, this.viewport.worldWidth, borderWidth);
    this.line(0, 0, borderWidth, this.viewport.worldHeight);
    this.line(this.viewport.worldWidth - borderWidth, 0, borderWidth, this.viewport.worldHeight);
  };

  circleCreator = table => {
    // Create a circle, make it interactive,
    // set its scale
    // and add `cursor: pointer` css style
    const circle = new PIXI.Sprite(this.texture);
    circle.scale.set(0.7);
    circle.anchor.set(0.5);
    circle.interactive = true;
    circle.buttonMode = true;

    // Position the circle according to
    // its location from the database
    // and add the circle to the stage
    circle.x = table.x;
    circle.y = table.y;
    circle.tableId = table._id;
    circle.tableNumber = table.number;
    this.viewport.addChild(circle);

    // Adds the table number text,
    // adds it as a child to the circle,
    // and adjusts its position to be centered
    const tableNumber = new PIXI.Text(table.number, {
      fontFamily: 'Nunito',
      fontWeight: '700',
      fill: 'white',
      fontSize: '6rem'
    });
    tableNumber.scale.set(0.5);
    tableNumber.anchor.set(0.5);
    circle.addChild(tableNumber);

    if (!this.props.selected.has(table.number)) {
      // If the table doesn't exist in the active Set,
      // add it to the Set and adjust its appearance
      // circle.alpha = 1;
      circle.tint = 0xe30e58;
    } else {
      // If the table does exist in the active Set,
      // remove it from the Set and adjust its appearance
      // circle.alpha = 0.2;
      circle.tint = 0x114b5f;
    }

    // set event listeners
    circle
      .on('mousedown', e => this.onDragStart(e, circle))
      .on('touchstart', e => this.onDragStart(e, circle))
      .on('mouseup', () => this.onDragEnd(circle))
      .on('mouseupoutside', () => this.deleteCircle(circle))
      .on('touchend', () => this.onDragEnd(circle))
      .on('touchendoutside', () => this.deleteCircle(circle))
      .on('mousemove', () => this.onDragMove(circle))
      .on('touchmove', () => this.onDragMove(circle));
  };

  deleteCircle = circle => {
    // This is called on 'mouseupoutside' so that,
    // if you are in editing mode, dragging the
    // circle out of bounds will destroy it
    if (this.props.editing) {
      circle.destroy();
      // TODO: Call action to delete from the database
    }
  };

  toggleActive = circle => {
    if (!this.props.selected.has(circle.tableNumber)) {
      // If the table doesn't exist in the active Set,
      // add it to the Set and adjust its appearance
      // circle.alpha = 0.2;
      circle.tint = 0x114b5f;
    } else {
      // If the table does exist in the active Set,
      // remove it from the Set and adjust its appearance
      // circle.alpha = 1;
      circle.tint = 0xe30e58;
    }
    this.props.toggleTable(circle.tableNumber);
  };

  onDragStart = (event, circle) => {
    if (this.props.editing) {
      // If editing mode is on:
      // Make it transparent on drag, then store a
      // reference to the data to track the movement
      // of this particular touch for multitouch
      circle.alpha = 0.5;
      circle.data = event.data;
      circle.dragging = true;

      // store local mouse click position data for use in
      // calculating the amount to move in onDragMove
      circle.sx = circle.data.getLocalPosition(circle).x * circle.scale.x;
      circle.sy = circle.data.getLocalPosition(circle).y * circle.scale.y;
    } else {
      // If editing mode is off, a click should
      // toggle the table's active status
      this.toggleActive(circle);
    }

    this.viewport.pausePlugin('drag');
  };

  onDragMove(circle) {
    if (this.props.editing) {
      if (circle.dragging) {
        // If you are allowed to edit and the
        // circle is moving then adjust the position
        const newPosition = circle.data.getLocalPosition(circle.parent);

        // subtract the local mouse click stored earlier
        // to eliminate annoying snapping behavior
        circle.x = newPosition.x - circle.sx;
        circle.y = newPosition.y - circle.sy;
      }
    }
  }

  onDragEnd(circle) {
    if (this.props.editing) {
      // If editing mode is on:
      // Update Redux Store's table location,
      // set dragging to false and clear the data
      this.props.moveTable({ x: circle.x, y: circle.y, tableId: circle.tableId });
      circle.dragging = false;
      circle.data = null;
      circle.alpha = 1;
    }
    this.viewport.resumePlugin('drag');
  }

  animate = () => {
    this.app.render(this.app.stage);
    requestAnimationFrame(this.animate);
  };

  setup = () => {
    this.app.stage.addChild(this.viewport);

    this.viewport
      .drag()
      .bounce({ time: 300, friction: 0.6, ease: 'easeInOutQuad' })
      .pinch()
      .wheel()
      .decelerate({ friction: 0.9, bounce: 0.1 });

    this.border();

    window.onresize = () => {
      this.resize();
    };
  };

  resize = () => {
    // calculate the size the editor should
    // resize to based on the parent div
    const parent = this.pixi.current.parentNode;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    this.app.renderer.resize(w, h);
    this.viewport.resize(w, h, 1000, 1000);
  };

  render() {
    return (
      <React.Fragment>
        <MainContainer innerRef={this.pixi} />
        <div style={{ position: 'fixed', right: '100px', top: '150px' }}>
          {/* // ! make these not inline */}
          <label htmlFor="lock">
            <input type="checkbox" id="lock" onClick={this.toggleLock} value={this.state.locked} />
            <span>Lock</span>
          </label>
        </div>
        <div style={{ position: 'fixed', right: '40px', top: '150px' }}>
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
  parent: PropTypes.any, // eslint-disable-line
};

FloorPlan.defaultProps = {
  editing: false,
  selected: new Set(),
  tables: [],
  moveTable: () => {},
  toggleTable: () => {},
  parent: false, // TODO: define as a node
};

export default FloorPlan;
