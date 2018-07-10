
export const storiesOf = function storiesOf() {
  var api = {};
  var story;
  api.add = (name, func, enableSnapshot = true) => {
    story = func();
    if (enableSnapshot) {

      snapshot(name, story);
    }
    return api;
  };
  api.addWithInfo = (name, func) => {
    story = func();
    if (enableSnapshot) {
      snapshot(name, story);
    }
    return api;
  };
  api.addDecorator = () => api;
  return api;
};

export const action = () => {}

export const linkTo = () => {};

export const specs = spec => {
  spec();
};

export const snapshot = (name, story) => {
  it(name, function() {
    let renderer = require("react-test-renderer");
    const tree = renderer.create(story).toJSON();
    expect(tree).toMatchSnapshot();
  });
};

export const describe = jasmine.currentEnv_.describe;
export const it = jasmine.currentEnv_.it;
export const isJestTest = true;