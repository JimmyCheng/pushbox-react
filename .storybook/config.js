import React from 'react';
import * as storybook from '@storybook/react';
import 'storybook-addon-specifications/register';
import { ThemeProvider } from 'styled-components';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

const req = require.context("../src", true, /(\.stories|\.stories\.test)\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure({ adapter: new Adapter() });
storybook.configure(loadStories, module);
