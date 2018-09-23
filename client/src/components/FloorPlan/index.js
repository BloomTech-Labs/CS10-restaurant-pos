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
    this.texture = null;
  }

  state = {
    locked: false
  };

  componentDidMount() {
    // load table sprite and set it as this.texture
    // unless it was previously loaded
    if (!PIXI.loader.resources[tableImage]) {
      PIXI.loader.add(tableImage).load(() => {
        this.texture = PIXI.Texture.fromImage(tableImage);
      });
    } else {
      this.texture = PIXI.Texture.fromImage(tableImage);
    }

    // Lay the initial stage
    this.pixi.current.appendChild(this.app.view);
    this.setup();
    this.resize();

    // initially draw the tables from redux state
    this.props.tables.forEach(table => {
      this.tables.push(table);
      this.circleCreator(table);
    });

    this.animate();
  }

  componentDidUpdate() {
    // If any tables were added or removed, clear the stage...
    this.clear();

    // ...and redraw them on the stage
    this.props.tables.forEach(table => {
      this.tables.push(table);
      this.circleCreator(table);
    });
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
      fontSize: '3rem'
    });
    circle.addChild(tableNumber);
    tableNumber.anchor.set(0.5);

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
      this.props.moveTable({ x: this.x, y: this.y, tableId: circle.tableId });
      circle.dragging = false;
      circle.data = null;

      if (this.props.selected.has(circle.tableNumber)) {
        // If the table is selected, it should
        // adjust its appearance appropriately
        circle.tint = 0x114b5f;
      } else {
        // Otherwise it should return to normal
        // after completing the drag
        circle.tint = 0xe30e58;
      }
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
    // use refs of the sidebar and topbar
    // to calculate the size the viewer needs to be
    const { sidebarRef, topbarRef } = this.props;
    const w = window.innerWidth - (
      sidebarRef
        ? sidebarRef.current.clientWidth
        : theme.sideBarWidth);
    const h = window.innerHeight - (
      topbarRef
        ? topbarRef.current.clientHeight
        : theme.topBarHeight);
    this.app.renderer.resize(w, h);
    this.viewport.resize(w, h, 1000, 1000);
  };

  render() {
    return (
      <React.Fragment>
        <MainContainer innerRef={this.pixi} />
        <div style={{ position: 'fixed', right: '100px' }}>
          {/* // ! make these not inline */}
          <label htmlFor="lock">
            <input type="checkbox" id="lock" onClick={this.toggleLock} value={this.state.locked} />
            <span>Lock</span>
          </label>
        </div>
        <div style={{ position: 'fixed', right: '40px' }}>
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
