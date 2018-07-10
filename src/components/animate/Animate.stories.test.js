import React from 'react';
import { mount } from "enzyme";
import expect from "expect";

import { specs, describe, it, storiesOf } from '../../../.storybook/facade';
const stories = storiesOf("Game/animation", module);

import IMAGETABLE from '../../consts/imageTable';

import Animate from ".";

stories.add("push up", () => {
  const story = (<Animate images={IMAGETABLE.IMG_PUSHUP}/>);
  specs(() =>
    describe("Displaying push up action", () => {
      it("render without error", () => {
        const output = mount(story);
        expect(output).toBeDefined();
      });
    })
  );

  return story;
});

stories.add("push right", () => {
  const story = (<Animate images={IMAGETABLE.IMG_PUSHRIGHT}/>);
  specs(() =>
    describe("Displaying push up action", () => {
      it("render without error", () => {
        const output = mount(story);
        expect(output).toBeDefined();
      });
    })
  );

  return story;
});

stories.add("push down", () => {
  const story = (<Animate images={IMAGETABLE.IMG_PUSHDOWN}/>);
  specs(() =>
    describe("Displaying push up action", () => {
      it("render without error", () => {
        const output = mount(story);
        expect(output).toBeDefined();
      });
    })
  );

  return story;
});

stories.add("push left", () => {
  const story = (<Animate images={IMAGETABLE.IMG_PUSHLEFT}/>);
  specs(() =>
    describe("Displaying push up action", () => {
      it("render without error", () => {
        const output = mount(story);
        expect(output).toBeDefined();
      });
    })
  );

  return story;
});