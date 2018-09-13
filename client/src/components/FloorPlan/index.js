import React from 'react';
import * as PIXI from 'pixi.js';

class FloorPlan extends React.Component {
  constructor(props) {
    super(props);

    this.pixi = React.createRef();
    this.app = new PIXI.Application({ width: 600, height: 600, transparent: false });
  }

  componentDidMount() {
    this.pixi.current.appendChild(this.app.view);

    this.setup();
  }

  circleCreator = (x, y) => {
    const circle = new PIXI.Graphics();
    circle.interactive = true;
    circle.beginFill(0xffffff);
    circle.drawCircle(0, 0, 30);
    circle.endFill();
    circle.x = x;
    circle.y = y;
    this.app.stage.addChild(circle);

    console.log(circle);

    const onDragStart = event => {
      // store a reference to the data
      // the reason for this is because of multitouch
      // we want to track the movement of this particular touch
      circle.data = event.data;
      circle.alpha = 0.5;
      circle.dragging = true;
    };

    const onDragEnd = () => {
      circle.alpha = 1;

      circle.dragging = false;

      // set the interaction data to null
      circle.data = null;
    };

    const onDragMove = () => {
      if (circle.dragging) {
        const newPosition = circle.data.getLocalPosition(circle.parent);
        circle.x = newPosition.x;
        circle.y = newPosition.y;
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
    for (let i = 0; i < 10; i++) {
      this.circleCreator(i * 10, i * 10);
    }

    const animate = () => {
      this.app.render(this.app.stage);
      requestAnimationFrame(animate);
    };

    animate();

    const resize = () => {
      let w;
      let h;
      if (window.innerWidth / window.innerHeight >= 1) {
        w = window.innerHeight * 1;
        h = window.innerHeight;
      } else {
        w = window.innerWidth;
        h = window.innerWidth / 1;
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

export default FloorPlan;
