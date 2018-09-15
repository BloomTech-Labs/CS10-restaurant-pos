import React from 'react';
import * as PIXI from 'pixi.js';
import PropTypes from 'prop-types';

class FloorPlan extends React.Component {
  constructor(props) {
    super(props);

    this.pixi = React.createRef();
    this.app = new PIXI.Application({
      width: window.innerHeight - 150,
      height: window.innerHeight - 150,
      transparent: false
    });
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
        // table.localPosition = i;
        this.tables.push(table);
        // TODO: Make table numbers come from the database
        this.circleCreator(table, i + 1);
      });
    }
  }

  clear = () => {
    this.app.stage.removeChildren();
    this.tables = [];
  }

  circleCreator = (table, index) => {
    const circle = new PIXI.Graphics();
    circle.interactive = true;
    circle.beginFill(0xffffff);
    circle.drawCircle(0, 0, 30);
    circle.endFill();
    circle.x = table.x;
    circle.y = table.y;
    this.app.stage.addChild(circle);

    const tableNumber = new PIXI.Text(index);
    tableNumber.x = table.x - 10;
    tableNumber.y = table.y - 15;
    this.app.stage.addChild(tableNumber);

    const onDragStart = event => {
      // store a reference to the data
      // the reason for this is because of multitouch
      // we want to track the movement of this particular touch
      circle.data = event.data;
      circle.alpha = 0.5;
      circle.dragging = true;
      tableNumber.data = event.data;
      tableNumber.dragging = true;
    };

    const onDragEnd = () => {
      table.x = circle.x;
      table.y = circle.y;

      this.props.moveTable(this.tables);

      circle.alpha = 1;

      circle.dragging = false;

      // set the interaction data to null
      circle.data = null;

      tableNumber.dragging = false;
      tableNumber.data = null;
    };

    const onDragMove = () => {
      if (circle.dragging) {
        const newPosition = circle.data.getLocalPosition(circle.parent);
        circle.x = newPosition.x;
        circle.y = newPosition.y;

        tableNumber.x = newPosition.x - 10;
        tableNumber.y = newPosition.y - 15;
      }
    };

    // run the render loop
    circle
      .on('mousedown', onDragStart)
      .on('touchstart', onDragStart)
      .on('mouseup', onDragEnd)
      .on('mouseupoutside', onDragEnd)
      .on('touchend', onDragEnd)
      .on('touchendoutside', onDragEnd)
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
    return <div ref={this.pixi} />;
  }
}

FloorPlan.propTypes = {
  tables: PropTypes.arrayOf(PropTypes.object),
  moveTable: PropTypes.func,
};

FloorPlan.defaultProps = {
  tables: [],
  moveTable: () => {},
};

export default FloorPlan;
