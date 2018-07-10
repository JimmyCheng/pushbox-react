import { action as actionReal } from "@storybook/addon-actions";
import {
  storiesOf as storiesOfReal,
  linkTo as linkToReal
} from "@storybook/react";
import {
  specs as specsReal,
  describe as describeReal,
  it as itReal
} from "storybook-addon-specifications";

export const storiesOf = storiesOfReal;
export const action = actionReal;
export const linkTo = linkToReal;
export const specs = specsReal;
export const describe = describeReal;
export const it = itReal;
export const isJestTest = false;