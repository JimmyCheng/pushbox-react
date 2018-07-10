import React from 'react';
import styled from 'styled-components';

import IMAGETABLE from '../../consts/imageTable';
import DIRECTIONS from '../../consts/directions';
import Animate from "../animate/index";

const StaticBox = styled.div`
  background-color: #444;
  color: #fff;
  border-radius: 0px;
  padding: 0px;
  font-size: 100%;
`;

const Tile = ({cell}) => {
  if(cell.black) {
    return (<div><img src={IMAGETABLE.IMG_BLACK}/></div>);
  }

  if (cell.wall) {
    return (<div><img src={IMAGETABLE.IMG_WALL}/></div>);
  }

  // Priority to display the upper layer.
  // Box or Spirit -> Ball -> Floor.
  if (cell.box) {
    if (cell.ball) {
      return (<div><img src={IMAGETABLE.IMG_BOXFULL}/></div>);
    } else {
      return (<div><img src={IMAGETABLE.IMG_BOX}/></div>);
    }
  }

  if (cell.spirit) {
    switch (cell.action) {
      case DIRECTIONS.DOWN:
        return (<Animate images={IMAGETABLE.IMG_PUSHDOWN}/>);

      case DIRECTIONS.LEFT:
        return (<Animate images={IMAGETABLE.IMG_PUSHLEFT}/>);

      case DIRECTIONS.RIGHT:
        return (<Animate images={IMAGETABLE.IMG_PUSHRIGHT}/>);

      case DIRECTIONS.UP:
        return (<Animate images={IMAGETABLE.IMG_PUSHUP}/>);

      case DIRECTIONS.NONE:
      default:
        return null;
    }
  }

  if (cell.ball) {
    return (<div className="box"><img src={IMAGETABLE.IMG_BALL}/></div>);
  }

  if (cell.floor) {
    return (<div className="box"><img src={IMAGETABLE.IMG_FLOOR}/></div>);
  }
};

export default Tile;