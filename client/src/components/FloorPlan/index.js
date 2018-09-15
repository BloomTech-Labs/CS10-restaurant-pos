import React from 'react';
import * as PIXI from 'pixi.js';
import PropTypes from 'prop-types';

import * as s from './styles';

class FloorPlan extends React.Component {
  constructor(props) {
    super(props);

    this.pixi = React.createRef();
    this.app = new PIXI.Application({
      width: window.innerHeight - 150,
      height: window.innerHeight - 150,
      transparent: false,
      antialias: true
    });
    this.app.renderer.backgroundColor = 0x8698aa;
    this.tables = []; // TODO: investigate cleaner solutions
  }

  componentDidMount() {
    this.pixi.current.appendChild(this.app.view);

    this.setup();
  }

  componentDidUpdate(prevProps) {
    if (this.props.tables.length !== prevProps.tables.length) {
      this.clear();

      this.props.tables.forEach((table, i) => {
        this.tables.push(table);
        // TODO: Make table numbers come from the database
        this.circleCreator(table, i + 1);
      });
    }
  }

  authorizationFilter = (func) => {
    if (this.props.editing) return func();
  };

  clear = () => {
    this.app.stage.removeChildren();
    this.tables = [];
  };

  circleCreator = (table, index) => {
    const circle = new PIXI.Graphics();
    circle.interactive = true;
    circle.buttonMode = true;
    circle.beginFill(0xffffff);
    circle.drawCircle(0, 0, 30);
    circle.endFill();

    // Position the circle according to
    // its location from the database
    circle.x = table.x;
    circle.y = table.y;
    this.app.stage.addChild(circle);

    const tableNumber = new PIXI.Text(index);
    circle.addChild(tableNumber);
    tableNumber.anchor.set(0.5);

    const activate = () => {
      if (this.props.selected.has(index)) {
        this.props.selectTable(index);
        circle.alpha = 0.2;
      } else {
        circle.alpha = 1;
      }
    };

    const onDragStart = (event) => {
      if (this.props.editing) {
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        circle.data = event.data;
        circle.alpha = 0.5;
        circle.dragging = true;
      } else {
        activate();
      }
    };

    const onDragEnd = () => {
      if (this.props.editing) {
        this.props.moveTable(this.tables);

        circle.alpha = 1;
        circle.dragging = false;
        circle.data = null;
      }
      if (this.props.selected.has(index)) circle.alpha = 0.2;
    };

    const onDragMove = () => {
      if (this.props.editing) {
        if (circle.dragging) {
          const newPosition = circle.data.getLocalPosition(circle.parent);
          circle.x = newPosition.x;
          circle.y = newPosition.y;
        }
      }
    };

    const deleteCircle = () => {
      if (this.props.editing) {
        circle.destroy();
        // TODO: Call action to delete from the database
      }
    };

    // run the render loop
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

    const resize = () => {
      let w;
      let h;
      if (window.innerWidth / window.innerHeight >= 1) {
        w = window.innerHeight * 1 - 160;
        h = window.innerHeight - 160;
      } else {
        w = window.innerWidth - 160;
        h = window.innerWidth / 1 - 160;
      }
      this.app.view.style.width = `${w}px`;
      this.app.view.style.height = `${h}px`;
    };

    window.onresize = () => {
      resize();
    };
  };

  render() {
    // TODO: Stretch Goal: Use border-radius and arrows to fuck with shit
    return <s.FloorPlan innerRef={this.pixi} />;
  }
}

FloorPlan.propTypes = {
  editing: PropTypes.bool,
  selected: PropTypes.array,
  tables: PropTypes.arrayOf(PropTypes.object),
  moveTable: PropTypes.func,
  selectTable: PropTypes.func
};

FloorPlan.defaultProps = {
  editing: false,
  selected: new Set(),
  tables: [],
  moveTable: () => {},
  selectTable: () => {}
};

export default FloorPlan;
