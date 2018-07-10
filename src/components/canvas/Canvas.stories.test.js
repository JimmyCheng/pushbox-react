import React from 'react';
import { mount } from "enzyme";
import expect from "expect";

import Canvas from ".";
import matrixParser from "../../utility/matrixParser";

import { specs, describe, it, storiesOf } from '../../../.storybook/facade';
const stories = storiesOf("Game/canvas", module);

stories.add("default", () => {
  const matrix=[
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 3, 2, 3, 4, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 4, 2, 3, 57, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 3, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  const task = matrixParser(matrix);
  const story = (<Canvas task={task} />);

  specs(() =>
    describe("Displaying the canvas", () => {
      it("render without error", () => {
        const output = mount(story);
        expect(output).toBeDefined();
      });
    })
  );

  return story;
});