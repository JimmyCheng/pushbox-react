import React from "react";
import styled from "styled-components";

import DIRECTIONS from "../../consts/directions";
import Animate from "../Animate/index";

import img_ball from "../../media/Ball.bmp";
import img_black from "../../media/Black.bmp";
import img_box from "../../media/Box.bmp";
import img_boxFull from "../../media/BoxFull.bmp";
import img_floor from "../../media/Floor.bmp";
import img_pushDown1 from "../../media/PushD1.bmp";
import img_pushDown2 from "../../media/PushD2.bmp";
import img_pushLeft1 from "../../media/PushL1.bmp";
import img_pushLeft2 from "../../media/PushL2.bmp";
import img_pushRight1 from "../../media/PushR1.bmp";
import img_pushRight2 from "../../media/PushR2.bmp";
import img_pushUp1 from "../../media/PushU1.bmp";
import img_pushUp2 from "../../media/PushU2.bmp";
import img_wall from "../../media/Wall.bmp";

const StaticBox = styled.div`
  background-color: #444;
  color: #fff;
  border-radius: 0px;
  padding: 0px;
  font-size: 100%;
`;

const getImage = cell => {
  if (cell.black) {
    return <img src={img_black} alt="black" />;
  }

  if (cell.wall) {
    return <img src={img_wall} alt="wall" />;
  }

  // Priority to display the upper layer.
  // Box or Spirit -> Ball -> Floor.
  if (cell.box) {
    if (cell.ball) {
      return <img src={img_boxFull} alt={"boxfull"} />;
    } else {
      return <img src={img_box} alt="box" />;
    }
  }

  if (cell.spirit) {
    switch (cell.action) {
      case DIRECTIONS.DOWN:
        return (
          <Animate images={[img_pushDown1, img_pushDown2]} alt="pushdown" />
        );

      case DIRECTIONS.LEFT:
        return (
          <Animate images={[img_pushLeft1, img_pushLeft2]} alt="pushleft" />
        );

      case DIRECTIONS.RIGHT:
        return (
          <Animate images={[img_pushRight1, img_pushRight2]} alt="pushright" />
        );

      case DIRECTIONS.UP:
        return <Animate images={[img_pushUp1, img_pushUp2]} alt="pushup" />;
      case DIRECTIONS.NONE:
      default:
        return null;
    }
  }

  if (cell.ball) {
    return <img src={img_ball} alt="ball" />;
  }

  if (cell.floor) {
    return <img src={img_floor} alt="floor" />;
  }
};

const Tile = ({ cell }) => {
  return <StaticBox>{getImage(cell)}</StaticBox>;
};

export default Tile;
