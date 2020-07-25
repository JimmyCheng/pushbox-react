import React from "react";
import { mount } from "enzyme";
import expect from "expect";

import Tile from ".";
import DIRECTIONS from "../../consts/directions";
import { specs, describe, it, storiesOf } from "../../../.storybook/facade";
const stories = storiesOf("Game/tile", module);

const initCell = () => ({
  black: false,
  wall: false,
  floor: false,
  box: false,
  ball: false,
  spirit: false,
  action: 0
});

stories.add("background", () => {
  let cell = initCell();
  cell.black = true;

  const story = <Tile cell={cell} />;
  specs(() =>
    describe("Displaying the background", () => {
      it("render without error", () => {
        const output = mount(story);
        expect(output).toBeDefined();
      });
    })
  );

  return story;
});

stories.add("ball", () => {
  let cell = initCell();
  cell.ball = true;
  const story = <Tile cell={cell} />;
  specs(() =>
    describe("Displaying the ball", () => {
      it("render without error", () => {
        const output = mount(story);
        expect(output).toBeDefined();
      });
    })
  );

  return story;
});

stories.add("floor", () => {
  let cell = initCell();
  cell.floor = true;
  const story = <Tile cell={cell} />;

  specs(() =>
    describe("Displaying the floor", () => {
      it("render without error", () => {
        const output = mount(story);
        expect(output).toBeDefined();
      });
    })
  );

  return story;
});

stories.add("wall", () => {
  let cell = initCell();
  cell.wall = true;
  const story = <Tile cell={cell} />;

  specs(() =>
    describe("Displaying the wall", () => {
      it("render without error", () => {
        const output = mount(story);
        expect(output).toBeDefined();
      });
    })
  );

  return story;
});

stories.add("box", () => {
  let cell = initCell();
  cell.box = true;
  const story = <Tile cell={cell} />;
  specs(() =>
    describe("Displaying the box", () => {
      it("render without error", () => {
        const output = mount(story);
        expect(output).toBeDefined();
      });
    })
  );

  return story;
});

stories.add("box with ball", () => {
  let cell = initCell();
  cell.box = true;
  cell.ball = true;

  const story = <Tile cell={cell} />;

  specs(() =>
    describe("Displaying the box with ball", () => {
      it("render without error", () => {
        const output = mount(story);
        expect(output).toBeDefined();
      });
    })
  );

  return story;
});

stories.add("push up", () => {
  let cell = initCell();
  cell.spirit = true;
  cell.action = DIRECTIONS.UP;

  const story = <Tile cell={cell} />;

  specs(() =>
    describe("Displaying push up", () => {
      it("render without error", () => {
        const output = mount(story);
        expect(output).toBeDefined();
      });
    })
  );

  return story;
});

stories.add("push right", () => {
  let cell = initCell();
  cell.spirit = true;
  cell.action = DIRECTIONS.RIGHT;
  const story = <Tile cell={cell} />;

  specs(() =>
    describe("Displaying push right action 1", () => {
      it("render without error", () => {
        const output = mount(story);
        expect(output).toBeDefined();
      });
    })
  );

  return story;
});

stories.add("push left", () => {
  let cell = initCell();
  cell.spirit = true;
  cell.action = DIRECTIONS.LEFT;
  const story = <Tile cell={cell} />;

  specs(() =>
    describe("Displaying push left action 1", () => {
      it("render without error", () => {
        const output = mount(story);
        expect(output).toBeDefined();
      });
    })
  );

  return story;
});

stories.add("push down", () => {
  let cell = initCell();
  cell.spirit = true;
  cell.action = DIRECTIONS.DOWN;
  const story = <Tile cell={cell} />;

  specs(() =>
    describe("Displaying push down action 1", () => {
      it("render without error", () => {
        const output = mount(story);
        expect(output).toBeDefined();
      });
    })
  );

  return story;
});
